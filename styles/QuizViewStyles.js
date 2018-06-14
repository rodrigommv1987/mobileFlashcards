import { StyleSheet } from 'react-native'
import { grey, secondary, tertiary } from "../styles/_sharedStyles";

const QuizViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: secondary
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 45,
        marginRight: 45,
    },
    cards: {
        fontSize: 18,
        color: grey
    },
    question: {
        fontSize: 25,
        textAlign: 'center'
    },
    showAnswerText: {
        fontSize: 18,
        color: "#4286f4"
    },
    answer: {
        fontSize: 22,
        textAlign: 'center',
        color: "#4286f4"
    },
    button: {
        width: 200,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 7,
        height: 45,
        marginBottom: 15,
        backgroundColor: tertiary,
    },
    correct: {
        backgroundColor: '#0cff6d',
    },
    incorrect: {
        backgroundColor: '#ff290c',
    }
})

export default QuizViewStyles