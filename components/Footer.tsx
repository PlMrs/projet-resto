import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Svg, { G, Path } from "react-native-svg";

export default function Footer(){

    const navigation = useNavigation();

    function navTo(where : string){
        navigation.navigate(where)
    }


    return(
        <View style={styles.container}>
            <View style={styles.imgContainer}>
               <Pressable onPress={()=>{navTo('userDashboard')}}>
                    <Image style={{width: 50, height: 50}} source={require('../assets/restaurant.png')} />
               </Pressable>
            </View>
            <View style={styles.imgContainer}>
                <Pressable onPress={()=>{navTo('Map')}}>
                    <Image style={{width: 50, height: 50}} source={require('../assets/map.png')}/>
                </Pressable>   
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    container : {
        flexDirection: 'row',
        width: '100%',
        height: '15%',
        backgroundColor: '#322F4A',
    },
    imgContainer : {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})