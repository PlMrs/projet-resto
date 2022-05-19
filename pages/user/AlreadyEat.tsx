import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { getPlaces, removeList } from "../../api/Services";
import AddPlace from "../../components/AddPlace";
import { restaus } from "../../interfaces/restau";

export default function AlreadyEat(){

    const [places,setPlaces] = useState([])
    const [defaultPlaces,setDefaultPlaces] = useState([])

    const [changed, setChanged] = useState(false)

    const [search,setSearch] = useState("")

    const updateList = (e : string)=>{

       setSearch(e)

       const filteredPlaces  = places.filter((place : restaus) =>{
           
            if(place.attributes?.address.includes(e) || place.attributes?.title.includes(e) ){
                return true
            }
        })
        e === "" ? setPlaces(defaultPlaces) : setPlaces(filteredPlaces)
    }
    
    async function getPlcs(){

        const {res,userId} = await getPlaces()

        if(res){
            const filtered = res.data.filter(( e : any )=> {
                if(e.attributes.users_permissions_user?.data?.id){
                    return e.attributes.gone && e.attributes.users_permissions_user.data.id === userId
                }
            })
           setPlaces(filtered)
           setDefaultPlaces(filtered)
        }
            
        
    }

    async function rmList(id : number){
        const res = await removeList(id)

        if(res === 200){
            getPlcs()
        }
    }

    useEffect(()=>{
        getPlcs()
    },[])

    useEffect(()=>{
      getPlcs()  
    },[changed])

    return(
        <View style={{flex:1}}>
            <Text style={styles.title}>Vos restaurants : </Text>

            <TextInput  
                style={styles.inputs}
                onChangeText={e=> updateList(e)}
                value={search} 
                placeholder="Rechercher"
            />
            <FlatList
                style={{flex:1}}
                data={places}
                renderItem={({item} : any )=>{
                  return(  
                  <View style={styles.listContainer}>
                        <Text>Nom du restaurant : {item.attributes.title}</Text>
                        <Text>Adresse : {item.attributes.address}</Text>
                        <Text>Type: {item.attributes?.type?.data?.attributes.name} </Text>
                       <Pressable onPress={()=> rmList(item.id)}>
                            <Text>X</Text>
                       </Pressable>
                  </View>    
                  )
                }
                }
            />

            <AddPlace gone={true} getPlcs={getPlcs}/>
        </View>
    )
}

export const styles = StyleSheet.create({
    listContainer: {
        marginTop: 20,
        marginBottm: 20
    },
    title: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
        fontWeight:'bold'
    },
    inputs :{

    }
})