import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import DeckViewStyles from '../styles/DeckViewStyles'

class DeckView extends Component {

    constructor(props) {
        super(props);

        const [decks] = props.screenProps,
            deckName = props.navigation.state.params.title

        this.state = {
            deck: decks[deckName]
        }
    }

    render() {
        const { deck } = this.state
        //const { decksStyle, deckItemStyle, deckItemTextStyle } = DeckListViewStyles

        return (
            <View>
                <Text>DeckView for {deck.title}</Text>
                <Text>{deck.questions.length} cards</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCardView', { title: deck.title })}>
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('QuizView')}>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default DeckView