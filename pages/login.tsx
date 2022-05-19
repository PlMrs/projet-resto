import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Register from "../components/login/Register";
import Signup from "../components/login/Signup";

export default function Login(){

    const [loginView, isLoginView] = useState(true)


    return(
        <View style={styles.container}>
            <View style={!loginView ? {display:'none'} : null}>
                <Signup />
             </View>
             <View style={loginView ? {display:'none'} : null} >
                <Register />
             </View>

            <View style={!loginView ? {display:'none'} : null}>
                <Text>Vous n'avez pas de compte ? <Pressable onPress={()=> isLoginView(!loginView)}><Text>Inscrivez vous!</Text></Pressable></Text>
            </View>
            <View style={loginView ? {display:'none'} : null}>
                <Text>Déjà un compte ? <Pressable onPress={()=> isLoginView(!loginView)}><Text>Connectez vous!</Text></Pressable></Text>
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    inputs : {
        margin: 10,
        padding:10
    }
})