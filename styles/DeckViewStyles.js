import { StyleSheet } from 'react-native'
import { primary, secondary, tertiary, grey } from "../styles/_sharedStyles";

const DeckViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: secondary
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deckItemStyle: {
        backgroundColor: secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    deckName: {
        fontSize: 35,
    },
    deckCards: {
        fontSize: 25,
        color: grey
    },
    button: {
        width: 200,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: tertiary,
        borderRadius: 7,
        height: 50,
        marginBottom: 15
    }
})

export default DeckViewStyles