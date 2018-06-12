//react
import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

//style
import QuizViewStyles from '../styles/QuizViewStyles'

class QuizView extends Component {

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

        //go to next question if there are any left
        if (currentQuestionNumber !== deck.questions.length) this.setState({ currentQuestionNumber: (currentQuestionNumber + 1) })
    }

    restartQuiz = () => this.setState({
        currentQuestionNumber: 0,
        correctGuess: 0,
        incorrectGuess: 0,
        showAnswer: false
    })

    showCard = () => {
        const { deck, currentQuestionNumber, showAnswer } = this.state,
            currentQuestion = deck.questions[currentQuestionNumber],
            { guessCorrect, guessIncorrect } = this

        const { container, subContainer, question, cards, answer, showAnswerText, button, correct, incorrect } = QuizViewStyles
        
        return (
            <View style={container}>
                <View style={subContainer}>
                    <Text style={cards}>
                        {currentQuestionNumber + 1}/{deck.questions.length}
                    </Text>
                    <Text style={question}>{currentQuestion.question}</Text>
                    {
                        showAnswer ?
                        <Text style={answer}>{currentQuestion.answer}</Text>
                        :
                        <TouchableOpacity onPress={this.showAnswer}>
                                <Text style={showAnswerText}>Answer</Text>
                            </TouchableOpacity>
                    }
                </View>
                <View style={subContainer}>
                    <TouchableOpacity onPress={guessCorrect}>
                        <Text style={[button, correct]}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={guessIncorrect}>
                        <Text style={[button, incorrect]}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
    showResults = () => {
        const { correctGuess, incorrectGuess, deck: { title } } = this.state,
            { container, subContainer, question, cards, answer, showAnswerText, button, correct, incorrect } = QuizViewStyles

        return (
            <View style={container}>
                <View style={subContainer}>
                    <Text style={{ fontSize: 30 }}>Quiz Results!</Text>
                    <Text style={{ fontSize: 30 }}>Correct answers: {correctGuess}</Text>
                    <Text style={{ fontSize: 30 }}>Incorrect answers: {incorrectGuess}</Text>
                </View>
                <View style={subContainer}>
                    <TouchableOpacity onPress={this.restartQuiz}>
                        <Text style={button}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', { title })}>
                        <Text style={button}>Go Back to Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        const { currentQuestionNumber } = this.state,
            finished = (this.state.deck.questions.length === currentQuestionNumber),
            { showCard, showResults } = this

        return (!finished) ? showCard() : showResults()
    }
}

export default QuizView