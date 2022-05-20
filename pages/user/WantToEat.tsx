import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { getPlaces, removeList } from "../../api/Services";
import AddPlace from "../../components/AddPlace";
import { restaus } from "../../interfaces/restau";
import { styles } from "../../styles/searchPages";

export default function WantToEat(){

    const [places,setPlaces] = useState([])

    const [defaultPlaces,setDefaultPlaces] = useState([])

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
                    return !e.attributes.gone && e.attributes.users_permissions_user.data.id === userId
                }
            })
           setPlaces(filtered)
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

    return(
        <View style={{flex:1,width: '100%', alignItems: 'center'}}>
            <View style={{width: '100%'}}>
                <TextInput  
                    style={styles.inputs}
                    onChangeText={e=> updateList(e)}
                    value={search} 
                    placeholder="Rechercher"
                />
            </View>
            <FlatList
                data={places}
                renderItem={({item} : any)=>
                <View style={styles.listContainer}>
                    <Text style={styles.listTitle}>{item.attributes.title}</Text>
                    <View style={styles.listDesc}>
                        <Text style={styles.listType}>{item.attributes?.type?.data?.attributes.name} </Text>
                        <Text style={styles.listAddress}>{item.attributes.address}</Text>
                    </View>
                    <Pressable onPress={()=> rmList(item.id)}>
                        <Text>X</Text>
                    </Pressable>
                 </View>    
                }
            />

            <AddPlace gone={false} getPlcs={getPlcs}/>
        </View>
    )
}