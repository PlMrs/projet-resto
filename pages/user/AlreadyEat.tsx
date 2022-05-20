import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import RNModal from "react-native-modal";
import { getPlaces, removeList } from "../../api/Services";
import AddPlace from "../../components/AddPlace";
import { style } from "../../components/Header";
import { restaus } from "../../interfaces/restau";
import { styles } from "../../styles/searchPages";

export default function AlreadyEat(){

    const [places,setPlaces] = useState([])
    const [defaultPlaces,setDefaultPlaces] = useState([])

    const [changed, setChanged] = useState(false)

    const [search,setSearch] = useState("")

    const [modalVisible, setModalVisible] = useState(false);

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
        <View style={{flex:1, width: '100%', alignItems: 'center'}}>

            <View style={{width: '100%'}}>
                <TextInput  
                    style={styles.inputs}
                    onChangeText={e=> updateList(e)}
                    value={search} 
                    placeholder="Rechercher"
                />
            </View>
            <FlatList
                style={{flex:1}}
                data={places}
                renderItem={({item} : any )=>{
                  return(  
                  <View style={styles.listContainer}>
                        <Text style={styles.listTitle}>{item.attributes.title}</Text>
                        <View style={styles.listDesc}>
                            <Text style={styles.listType}>{item.attributes?.type?.data?.attributes.name} </Text>
                            <Text style={styles.listAddress}>{item.attributes.address}</Text>
                        </View>
                       <Pressable onPress={()=> rmList(item.id)} style={styles.delButton}>
                           <Image style={styles.delButtonImg} source={require('../../assets/remove.png')}/>
                       </Pressable>
                  </View>    
                  )
                }
                }
            />

            {/*<AddPlace gone={true} getPlcs={getPlcs}/>*/}
            
            <RNModal
            isVisible={modalVisible}
            animationInTiming={100}
            animationOutTiming={100}
            backdropTransitionInTiming={80}
            backdropTransitionOutTiming={80}
            style={{alignItems: 'center'}}
            >
            <View style={{backgroundColor:'white', width: '80%', height: '50%', borderRadius: 10, alignItems:'center'}}>
                <Pressable onPress={() => setModalVisible(false)} style={{position:'absolute', right:10, top: 10}}>
                    <View style={{alignItems: 'flex-end', justifyContent: 'flex-end',}}>
                        <Image style={{width:20,height:20}} source={require('../../assets/close.png')} />
                    </View>
                </Pressable>
                    <AddPlace gone={true} getPlcs={getPlcs}/>
                </View>
            </RNModal>
            <Pressable onPress={() => setModalVisible(true)}>
                <View style={{backgroundColor:'#4C6EAF', width: 50, height: 50, borderRadius: 100, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>+</Text>
                </View>
            </Pressable>
        </View>
    )
}