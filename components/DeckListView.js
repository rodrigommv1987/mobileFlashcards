//react
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

//style
import DeckListViewStyles from '../styles/DeckListViewStyles'

class DeckListView extends Component {

    constructor(props) {
        super(props);

        const { decks } = props.screenProps

        this.state = {
            decks
        }
    }

    componentWillReceiveProps({ screenProps }) {

        const { decks } = screenProps

        //if deck in nextProps has different amount of keys, update state
        if (Object.keys(decks).length !== Object.keys(this.state.decks).length) this.setState({ decks })
        else {
            //if any deck have a different amount of cards, update state
            Object.keys(this.state.decks).map(deckName => {
                if (this.state.decks[deckName].questions.length !== decks[deckName].questions.length) this.setState({ decks })
            })
        }
    }

    renderDeck = ({ item: deck }) => {
        const { title, questions } = deck,
            { deckItemStyle, deckItemTextStyle } = DeckListViewStyles

        return (
            <TouchableOpacity
                key={title}
                style={deckItemStyle}
                onPress={() => this.props.navigation.navigate('Deck', { title })}>

                <Text style={deckItemTextStyle}>{title}</Text>
                <Text>{`${questions.length} cards`}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { decks } = this.state
        const { container } = DeckListViewStyles

        return (
            <View style={container}>
                {decks && <FlatList
                    data={Object.keys(decks).map(deck => decks[deck])}
                    keyExtractor={(item, index) => item.title}
                    renderItem={this.renderDeck}
                />}
            </View>
        )
    }
}

export default DeckListView