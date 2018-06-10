import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import DeckViewStyles from '../styles/DeckViewStyles'
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
        
        //save question to asyncstorage
        APIaddCardToDeck(deckTitle, { question, answer }).then( () => {
            //get fresh copy of all decks
            APIgetDecks().then(decks => {
                //save decks to internal state
                updateDeckState(decks, () => {
                    ToastAndroid.show('Card added!', ToastAndroid.SHORT)
                    this.props.navigation.navigate('Deck', {title:deckTitle})
                })
            })
        })
    }

    render() {
        const { question, answer } = this.state
        //const { decksStyle, deckItemStyle, deckItemTextStyle } = DeckListViewStyles

        return (
            <View>
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