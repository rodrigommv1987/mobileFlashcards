import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import DeckViewStyles from '../styles/DeckViewStyles'

class DeckView extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title'),
        }
    }

    constructor(props) {
        super(props);

        const { decks } = props.screenProps,
            deckName = props.navigation.state.params.title

        this.state = {
            deck: decks[deckName]
        }
    }

    componentWillReceiveProps({ screenProps }) {
        const newDeck = screenProps.decks[this.state.deck.title]

        //if deck in nextProps has different amount of keys, update state
        if (newDeck.length !== this.state.deck.questions.length) this.setState({ deck: newDeck })
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
                <TouchableOpacity onPress={() => this.props.navigation.navigate('QuizView', { deck })}>
                    <Text>Start Quiz!</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default DeckView