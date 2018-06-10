import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
//import QuizViewStyles from '../styles/QuizViewStyles'

class QuizView extends Component {

    static navigationOptions = {
        title: 'Quiz Time!'
    }

    constructor(props) {
        super(props);

        this.state = {
            deck: props.navigation.state.params.deck,
            currentQuestionNumber: 0,
            showAnswer: false,
            correctGuess: 0,
            incorrectGuess: 0
        }
    }

    showAnswer = () => this.setState({ showAnswer: true })

    guessCorrect = () => this.setState({
        correctGuess: (this.state.correctGuess + 1),
        showAnswer: false
    }, this.next)

    guessIncorrect = () => this.setState({
        incorrectGuess: (this.state.incorrectGuess + 1),
        showAnswer: false
    }, this.next)

    next = () => {
        const { currentQuestionNumber, deck } = this.state;

        //are there any more questions???
        (currentQuestionNumber !== deck.questions.length) ?
            //go to next question
            this.setState({ currentQuestionNumber: (currentQuestionNumber + 1) })
            :
            null
    }

    showCard = () => {
        const { deck, currentQuestionNumber, showAnswer } = this.state
        currentQuestion = deck.questions[currentQuestionNumber],
            { guessCorrect, guessIncorrect } = this

        return (
            <View>
                <Text>{currentQuestionNumber + 1}/{deck.questions.length}</Text>
                <Text>{currentQuestion.question}</Text>
                {
                    showAnswer ?
                        <Text>{currentQuestion.answer}</Text>
                        :
                        <TouchableOpacity onPress={this.showAnswer}>
                            <Text>Answer</Text>
                        </TouchableOpacity>
                }
                <TouchableOpacity onPress={guessCorrect}>
                    <Text>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={guessIncorrect}>
                    <Text>Incorrect</Text>
                </TouchableOpacity>
            </View>
        )
    }

    restartQuiz = () => this.setState({
        currentQuestionNumber: 0,
        correctGuess: 0,
        incorrectGuess: 0,
        showAnswer: false
    })

    showResults = () => {
        const { correctGuess, incorrectGuess, deck: { title } } = this.state

        return (
            <View>
                <Text style={{ fontSize: 30 }}>Quiz Results!</Text>
                <Text style={{ fontSize: 30 }}>Correct answers: {correctGuess}</Text>
                <Text style={{ fontSize: 30 }}>Incorrect answers: {incorrectGuess}</Text>
                <TouchableOpacity onPress={this.restartQuiz}>
                    <Text>Restart Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', { title })}>
                    <Text>Go Back to Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { currentQuestionNumber } = this.state,
            finished = (this.state.deck.questions.length === currentQuestionNumber),
            { showCard, showResults } = this

        //const { decksStyle, deckItemStyle, deckItemTextStyle } = DeckListViewStyles

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {
                    (!finished) ?
                        showCard()
                        :
                        showResults()
                }
            </View>
        )
    }
}

export default QuizView