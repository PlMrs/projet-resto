import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Authcontext } from "../../context/AuthContext";
import AlreadyEat from "./AlreadyEat";
import WantToEat from "./WantToEat";

export default function Dashboard(){

    const [isVisited, setVisited] = useState(true)

    const {setSignIn} : any = useContext(Authcontext);

    const navigation : any = useNavigation(); 

    return(
        <View style={styles.container}>
            <Header isVisited={isVisited} setVisited={setVisited} />
            <View style={styles.main}>
                {isVisited ? <AlreadyEat/> : <WantToEat />}
            </View>
            <Footer />
        </View>
    )
}

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#322F4A',
        color: 'white'
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