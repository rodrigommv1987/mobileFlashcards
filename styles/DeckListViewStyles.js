import { StyleSheet } from 'react-native'
import { orange } from "../utils/colors";

const DeckListViewStyles = StyleSheet.create({
    decksStyle: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deckItemStyle:{
        backgroundColor:orange,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10
    },
    deckItemTextStyle:{
        height:50,
        fontSize: 22,
    }
})

export default DeckListViewStyles