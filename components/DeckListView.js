import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
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
    }

    render() {
        const { decks } = this.state
        const { decksStyle, deckItemStyle, deckItemTextStyle } = DeckListViewStyles

        return (
            <View style={decksStyle}>
                {decks && Object.keys(decks).map(deck => {
                    const { title, questions } = decks[deck]

                    return (
                        <TouchableOpacity
                            key={title}
                            style={deckItemStyle}
                            onPress={() => this.props.navigation.navigate('Deck', { title })}>

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