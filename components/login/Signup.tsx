import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import signUp from "../../api/Services";
import { Authcontext } from "../../context/AuthContext";

export default function Signup(){

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, onChangePassword] = useState("");


    const {setSignIn} : any = useContext(Authcontext);

    const navigation : any = useNavigation(); 

    async function sign(id: string, password: string) {

        const signed = await signUp(id, password)   
         
        if(signed === 200){
            setSignIn(true)
            navigation.navigate('userDashboard');
        }
    }

    return(
        <View>
            <TextInput 
                style={styles.inputs}
                onChangeText={setLoginEmail}
                value={loginEmail} 
                placeholder="e-mail"
                />
                <TextInput 
                style={styles.inputs}
                onChangeText={onChangePassword}
                value={loginPassword}
                placeholder="Mot de passe"
                />
                <Pressable onPress={()=> sign(loginEmail,loginPassword)}>
                    <Text>Connexion</Text>
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