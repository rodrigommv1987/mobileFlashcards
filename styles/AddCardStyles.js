import { StyleSheet } from 'react-native'
import { primary, secondary, tertiary } from "../styles/_sharedStyles";

const AddCardStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:secondary
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginLeft:45,
        marginRight:45,
    },
    textInput:{
        height:65,
    },
    button:{
        width:200,
        textAlign:'center',
        textAlignVertical:'center',
        backgroundColor:tertiary,
        borderRadius:7,
        height:50,
        marginBottom:15
    }
})

export default AddCardStyles