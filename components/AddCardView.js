//react
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, ToastAndroid, KeyboardAvoidingView } from 'react-native'

//style
import AddCardStyles from '../styles/AddCardStyles'
import { black } from '../styles/_sharedStyles'

//utils
import { addCardToDeck as APIaddCardToDeck, getDecks as APIgetDecks } from "../utils/api"

class AddCardView extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: `Adding card to ${navigation.getParam('title')}`,
        }
    }

    constructor(props) {
        super(props)

        this.state = {
            question: '',
            answer: '',
            deckTitle: props.navigation.state.params.title
        }
    }

    addQuestionToDeck = () => {
        const { updateDeckState } = this.props.screenProps,
            { deckTitle, question, answer } = this.state

        if ((question === "") || (answer === "")) {
            ToastAndroid.show('Please complete both question and answer', ToastAndroid.SHORT)
            return
        }

        //save question to asyncstorage
        APIaddCardToDeck(deckTitle, { question, answer }).then(() => {
            //get fresh copy of all decks
            APIgetDecks().then(decks => {
                //save decks to internal state
                updateDeckState(decks, () => {
                    ToastAndroid.show('Card added!', ToastAndroid.SHORT)
                    this.props.navigation.navigate('Deck', { title: deckTitle })
                })
            })
        })
    }

    render() {
        const { question, answer } = this.state
        const { container, subContainer, textInput, button } = AddCardStyles

        return (
            <KeyboardAvoidingView behavior='padding' style={container}>
                <View style={subContainer}>
                    <TextInput
                        style={textInput}
                        value={question}
                        placeholder="Enter question here..."
                        placeholderTextColor={black}
                        onChangeText={(text) => this.setState({ question: text })}
                    />
                    <TextInput
                        style={textInput}
                        value={answer}
                        placeholder="Enter answer here..."
                        placeholderTextColor={black}
                        onChangeText={(text) => this.setState({ answer: text })}
                    />
                </View>

                <KeyboardAvoidingView behavior='padding' style={[subContainer, { alignSelf: 'center' }]}>
                    <TouchableOpacity onPress={this.addQuestionToDeck}>
                        <Text style={button}>Submit</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </KeyboardAvoidingView>
        )
    }
}

export default AddCardView