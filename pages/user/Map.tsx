import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { getJwt, getPlaces, getTypes } from "../../api/Services";
import { restaus } from "../../interfaces/restau";
import RNPickerSelect from 'react-native-picker-select';


export default function UserMap(){

    async function getUser() {
        const stored = await AsyncStorage.getItem('@user')

        const {jwtDecoded} = await getJwt() 

        setUserId(jwtDecoded.id)

   } 

   const jwtId = getUser()


    const [places,setPlaces] = useState([])

    const [types,setTypes] = useState([])

    const [userId,setUserId] = useState<number>()

    const [defaultPlaces,setDefaultPlaces] = useState([])

    const [text,setText] = useState("")

    async function getPlcs(){

        const {res} = await getPlaces()

        if(res){
           setPlaces(res.data)
           setDefaultPlaces(res.data)
        }        
    }
    
    const filterPlaces = (txt : string)=>{

        setText(txt)
        const filteredPlaces = defaultPlaces.filter((e : restaus ) => {
           return  e.attributes.title.toLowerCase().includes(txt.toLowerCase())
        } )

        setPlaces(filteredPlaces)

    }

    const getTpes = async ()=>{

        const {data} = await getTypes()
        
        let res : any = []

        data.forEach((e : any) => {
            res.push({label : e.attributes.name, value : e.id})
        });

        setTypes(res)
        
    }

    const updateMapOnTypes = ((value : number | null)=>{

        if(value === null){
            return setPlaces(defaultPlaces)
        }

        const filteredPlaces = defaultPlaces.filter((e : restaus ) => {
            return  e.attributes.type?.data?.id === value
         } )
 
         setPlaces(filteredPlaces)

    })

    useEffect(()=>{
        getPlcs()
        getUser()
        getTpes()
    },[])

    return(
        <View style={{flex:1}}>
            <View style={{width: '100%', alignItems:'center'}}>
                <TextInput
                style={styles.searchInput}
                onChangeText={txt => filterPlaces(txt)}
                value={text}
                placeholder="Rechercher ?"
                />
            <View style={styles.selectContainer}>
                <View style={styles.select}>
                    <RNPickerSelect
                        onValueChange={(value) => updateMapOnTypes(value)}
                        items={types}
                    />
                </View>
            </View>
            </View>
            <MapView
                style={{flex:1}}
                
                initialRegion={{
                    latitude: 45.764043,
                    longitude:  4.835659,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}    
            >
                {places.map((marker : restaus, index) => (
                        <Marker
                        style={{backgroundColor: 'blue'}}
                        key={index}
                        coordinate={{latitude: marker.attributes.latitude, longitude: marker.attributes.longitude }}
                        title={marker.attributes.title}
                        description={marker.attributes.comment}
                        pinColor={userId === marker.attributes.users_permissions_user?.data?.id ? marker.attributes.gone ? 'blue' : 'green' : 'red'}
                        />
                    ))}
            </MapView>
        </View>
    )
}

export const styles = StyleSheet.create({
    searchInput : {
        position: 'absolute',
        top: 30,
        zIndex: 10,
        backgroundColor: 'rgba(255,255,255,0.7)',
        width: '60%',
        padding: 10,
        borderRadius: 50
    },
    selectContainer : {
        width:'100%',
        alignItems:'center',
        position:'absolute',
        zIndex: 1,
        top: 90
    },
    select: {
        width:'50%',
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 50
    }
})