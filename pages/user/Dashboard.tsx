import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Authcontext } from "../../context/AuthContext";

export default function Dashboard(){

    const {setSignIn} : any = useContext(Authcontext);

    const navigation : any = useNavigation(); 

    return(
        <View style={styles.container}>
            <Text>Dashboard</Text>
            <View style={styles.main}>
                <View style={styles.buttonsContainer}>
                    <Pressable onPress={()=> {
                        AsyncStorage.removeItem('@user')
                        setSignIn(false)
                        navigation.navigate('Home')
                        }}>
                        <Text>Se déconnecter</Text>
                    </Pressable>
                    <Pressable onPress={()=>{
                        navigation.navigate('AlreadyEat')
                    }}>
                        <Text>Où j'ai déja manger</Text>
                    </Pressable>
                    <Pressable onPress={()=>{
                        navigation.navigate('WantToEat')
                    }}>
                        <Text>Où je veux manger</Text>
                    </Pressable>
                    <Pressable onPress={()=>{
                        navigation.navigate('Map')
                    }}>
                        <Text>Map</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    main:{
        flex:1,
        alignItems:'center'
    },
    buttonsContainer:{
        justifyContent: 'space-around',
        height: '70%'
    }
})