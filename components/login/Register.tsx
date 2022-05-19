import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Authcontext } from "../../context/AuthContext";

export default function Register(){

    const navigation = useNavigation(); 

    const {setSignIn} = useContext(Authcontext);


    const [subUsername, setSubUsername] = useState("");
    const [subEmail, setSubEmail] = useState("");
    const [subPassword, setSubPassword] = useState("");

    async function register(username : string,email : string,password : string){

        try{
            const req = await axios.post('https://digitalcampus.nerdy-bear.com/api/auth/local/register',{
                username : username,
                email : email,
                password: password
            })

            if(req.status === 200){
              await AsyncStorage.setItem('@user', req.data.jwt);
              setSignIn(true)
              navigation.navigate('userDashboard');
            }
        }catch(e){
            console.log(e)
        }

    }

    return(
        <View>
            <TextInput 
                style={styles.inputs}
                onChangeText={setSubUsername}
                value={subUsername} 
                placeholder="Username"
                />
                <TextInput 
                style={styles.inputs}
                onChangeText={setSubEmail}
                value={subEmail} 
                placeholder="e-mail"
                />
                <TextInput 
                style={styles.inputs}
                onChangeText={setSubPassword}
                value={subPassword}
                placeholder="Mot de passe"
                />
                <Pressable onPress={()=>{register(subUsername,subEmail,subPassword)}}>
                    <Text>Inscription</Text>
                </Pressable>
        </View>
    )
}

export const styles = StyleSheet.create({
    inputs : {
        margin: 10,
        padding:10
    }
})