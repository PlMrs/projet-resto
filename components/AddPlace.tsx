import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { getTypes, postPlaces } from "../api/Services";
import RNPickerSelect from 'react-native-picker-select';

export default function AddPlace({gone, getPlcs} : any){

    const [title, setTitle] = useState("");

    const [comment, setComment] = useState("");

    const [types,setTypes] = useState([])

    const [type,setType] = useState()

    const [address, setAddress] : any = useState({
        label : "",
        coord : []
    });

    const [addresses, setAddresses] : any = useState([]);

    function setTextAddress(txt : any ){
        setAddress({...address, label : txt})
    }

    async function getAddresses(){
        const elements= address.label.replace(' ','+')
        const tempAddress = address.label

        setTimeout(()=>{
            if(tempAddress === address.label){
                if(getAddresses.length === 1 && address.label === addresses[0].label){
                    return;
                }
                setAddresses([])

                axios.get(`https://api-adresse.data.gouv.fr/search/?q=${elements}&limit=5`).then(e => {
                    e.data.features.forEach((d : any) =>{
                        const obj = {coord: d.geometry.coordinates, label : d.properties.label }

                        setAddresses([...addresses, obj])
                    })
                })
                
            }
        }, 500)
    }

    function majAddresse(item : any){
        setAddress({
            label: item.label,
            coord: item.coord
        })

        setAddresses([])

       // console.log(address)

    }

    const getTpes = async ()=>{

        const {data} = await getTypes()
        
        let res : any = []

        data.forEach((e : any) => {
            res.push({label : e.attributes.name, value : e.id})
        });

        setTypes(res)
        
    }

    useEffect(()=>{
        getAddresses()
    },[address])

    useEffect(()=>{
        getTpes()
    },[])

    async function sendPlace(){
        const data = {
            "data":{
                "title" : title,
                "address" : address.label,
                "longitude": address.coord[0],
                "latitude": address.coord[1],
                "gone": gone ? true : false ,
                "users_permissions_user" : null,
                "comment" : comment,
                "type" : type
            }
        }


        const res = await postPlaces(data)

        if(res === 200){
            getPlcs()
            setTitle("")
            setComment("")
            setAddress({})
            setAddresses([])
        }

    }


    return(
        <View style={{flex:1}}>
            <Text>Ajouter un endroit</Text>

            <TextInput 
                style={styles.inputs}
                onChangeText={setTitle}
                value={title} 
                placeholder="Nom de lieu"
            />
            <View style={styles.addressesContainer}>
                <FlatList
                    style={styles.addresses} 
                    data={addresses}
                    renderItem={({item} : any) =>  
                      <Pressable style={styles.addressesInputs} onPress={()=>{majAddresse(item)}} >
                            <Text style={{color:'black'}}>{item.label}</Text>
                     </Pressable>   
                    }
                />
            </View>
            <TextInput 
                style={styles.inputs}
                onChangeText={newTxt => setTextAddress(newTxt)}
                value={address.label} 
                placeholder="Adresse"
            />
            <TextInput 
                style={styles.inputs}
                onChangeText={setComment}
                value={comment} 
                placeholder="Commentaire"
            />

            <RNPickerSelect
                onValueChange={(value)=>{setType(value)}}
                items={types}
            />

            <Pressable style={styles.submitButtonContainer} onPress={sendPlace}>
                <Text style={styles.submitButton}>Ajouter</Text>
            </Pressable>
        </View>
    )
}

export const styles = StyleSheet.create({
    inputs: {
        
    },
    addressesInputs : {
        padding:10
    },
    addressesContainer: {
        position:'absolute',
        zIndex: 10,
        bottom: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    addresses: {
        backgroundColor: 'white',
    },
    submitButtonContainer: {
        alignItems: 'center'
    },
    submitButton : {backgroundColor:'blue',
     color: 'white',
    fontSize: 15,
    fontWeight:'bold', 
    width: 100, 
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'center',
    padding:10,
    borderRadius: 100,
    marginTop: 50

    }
})