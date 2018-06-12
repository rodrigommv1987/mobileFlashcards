import { StyleSheet } from 'react-native'
import { primary, secondary, tertiary } from "../styles/_sharedStyles";

const AddCardStyles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor:secondary
    },
    deckItemStyle:{
        backgroundColor:tertiary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:45,
        marginRight:45,
        marginTop:25,
        paddingTop:15,
        paddingBottom:15,
        borderRadius: 7
    },
    deckItemTextStyle:{
        height:50,
        fontSize: 22,
    }
})

export default AddCardStyles