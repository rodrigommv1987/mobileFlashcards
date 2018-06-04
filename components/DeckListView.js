import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import DeckListViewStyles from '../styles/DeckListViewStyles'

class DeckListView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            decks: props.screenProps
        };
    }

    render() {
        const { decks } = this.state
        const { decksStyle, deckItemStyle, deckItemTextStyle } = DeckListViewStyles

        return (
            <View style={decksStyle}>
                {decks && Object.keys(decks).map(deck => {
                    const { title, questions } = decks[deck]

                    return (
                        <TouchableOpacity key={title} style={deckItemStyle}>
                            <Text style={deckItemTextStyle}>{title}</Text>
                            <Text>{`${questions.length} cards`}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

export default DeckListView