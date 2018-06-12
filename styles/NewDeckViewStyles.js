import { StyleSheet } from 'react-native'
import { primary, secondary, tertiary } from "../styles/_sharedStyles"

const NewDeckViewStyles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor:secondary
    },
    title:{
        fontSize:32,
        marginTop:50
    },
    input:{
        alignSelf:'stretch',
        height:40,
        marginLeft:40,
        marginRight:40,
        marginTop:10,
    },
    submit:{
        marginTop:30,
        width:200,
        textAlign:'center',
        textAlignVertical:'center',
        backgroundColor:tertiary,
        borderRadius:7,
        height:50,
    }
})

export default NewDeckViewStyles