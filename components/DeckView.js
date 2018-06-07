import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import DeckViewStyles from '../styles/DeckViewStyles'

class DeckView extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        //const { decks } = this.state
        //const { decksStyle, deckItemStyle, deckItemTextStyle } = DeckListViewStyles

        return (
            <View>
                <Text>DeckView for {this.props.navigation.state.params.title}</Text>
            </View>
        )
    }
}

export default DeckView