import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import DeckViewStyles from '../styles/DeckViewStyles'

class AddCardView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            question: '',
            answer: '',
            deckTitle: props.navigation.state.params.title
        }
    }

    addQuestionToDeck = () => {
        const [,,addQuestion] = this.props.screenProps,
            { deckTitle, question, answer} = this.state

        addQuestion(deckTitle, {question,answer})
    }

    render() {
        const { question, answer } = this.state
        //const { decksStyle, deckItemStyle, deckItemTextStyle } = DeckListViewStyles

        return (
            <View>
                <Text>AddCardView</Text>
                <TextInput 
                    value={question}
                    placeholder="Enter question here..."
                    onChangeText={(text) => this.setState({ question: text })}
                />
                <TextInput 
                    value={answer}
                    placeholder="Enter answer here..."
                    onChangeText={(text) => this.setState({ answer: text })}
                />

                <TouchableOpacity onPress={this.addQuestionToDeck}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default AddCardView