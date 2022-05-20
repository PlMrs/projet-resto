import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    listContainer: {
        marginTop: 20,
        marginBottm: 20,
        color:'white'
    },
    title: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
        fontWeight:'bold'
    },
    inputs :{
        backgroundColor: 'white',
        height: 40,
        width: '50%',
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50
    },
    listTitle : {
        color: 'white',
        fontWeight:'bold',
        textTransform: 'uppercase'
    },
    listType:{
        color:'#F29037',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    listAddress:{
        color: 'white',
        fontSize: 11
    },
    listDesc : {
        flexDirection: 'row',
        alignItems: 'center'
    },
    delButton : {
        position: 'absolute',
        right: 0,
        top: 0
    },
    delButtonImg : {
        width: 20,
        height: 20,
    }
})