import { StyleSheet } from 'react-native'
import { black, red } from "../utils/colors";

const NewDeckViewStyles = StyleSheet.create({
    containerStyle:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor:'#cde456'
    },
    titleStyle:{
        fontSize:32,
        paddingTop:30
    },
    inputStyle:{
        width:200,
        height:40,
        padding:8,
        borderWidth:1,
        paddingTop:10
    },
    submitStyle:{
        width:200,
        height:40,
        padding:8,
        paddingTop:5
    },
    invalidNameTextStyle:{
        fontWeight:'bold',
        fontSize:35
    }
})

export default NewDeckViewStyles