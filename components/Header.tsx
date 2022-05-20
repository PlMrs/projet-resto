import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Header({isVisited,setVisited}: any){

    function switchHeader(value : boolean){
        value ? setVisited(true) : setVisited(false)
    }


    return(
        <View style={style.viewListHeader}>

            <View style={style.viewListHeaderBloc}>

                <Pressable style={[style.viewListHeaderGone, isVisited? {backgroundColor: '#232134', borderBottomRightRadius: 10}: null]} onPress={() => switchHeader(true)}>

                    <Text style={style.viewListHeaderGoneText}>VISITÉ</Text>

                </Pressable>

                <Pressable style={[style.viewListHeaderGone, !isVisited? {backgroundColor: '#232134', borderBottomLeftRadius: 10}: null]} onPress={() => switchHeader(false)}>

                    <Text style={style.viewListHeaderGoneText}>NON VISITÉ</Text>

                </Pressable>

            </View>

</View>
    )
}

export const style = StyleSheet.create({
    viewListHeader: {

        width: '100%',
        
        height: '15%',
        
        justifyContent: 'space-between',
        
        alignItems: 'center',
        
        },
        
        viewListHeaderBloc: {
        
        width: '100%',
        
        height: '65%',
        
        justifyContent: 'center',
        
        alignItems: 'center',
        
        flexDirection: 'row',
        
        },
        
        viewListHeaderGone: {
        
        width: '50%',
        
        height: '100%',
        
        justifyContent: 'center',
        
        alignItems: 'center',
        
        },
        
        viewListHeaderGoneText: {
            color: 'white',
            fontWeight: 'bold'
        },
        
        viewListHeaderBlocSearch: {
        
        width: '100%',
        
        height: '35%',
        
        },
        
        viewListSearch: {
        
        backgroundColor: "#FFFFFF",
        
        width: "80%",
        
        height: '100%',
        
        borderTopEndRadius: 20,
        
        borderBottomEndRadius: 20,
        
        paddingLeft: 30,
        
        },
})