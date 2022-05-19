import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { getPlaces, removeList } from "../../api/Services";
import AddPlace from "../../components/AddPlace";

export default function WantToEat(){

    const [places,setPlaces] = useState([])

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
        <View style={{flex:1}}>
            <Text style={styles.title}>Vos restaurants : </Text>
            <FlatList
                data={places}
                renderItem={({item} : any)=>
                    <View style={styles.listContainer}>
                        <Text>Nom du restaurant : {item.attributes.title}</Text>
                        <Text>Adresse : {item.attributes.address}</Text>
                        <Text>Type: {item.attributes.type.data.attributes.name} </Text>
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
    }
})