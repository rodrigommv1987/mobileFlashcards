import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import DeckListViewStyles from '../styles/DeckListViewStyles'
import { fetchDecks } from '../utils/api'

class DeckListView extends Component {

    state = {
        decks: {}
    }

    componentDidMount = () => {
        fetchDecks().then(decks => {
            this.setState({
                ...this.state,
                decks: {
                    ...this.state.decks,
                    ...decks
                }
            })
        })
    }

    a = () => {
    }

    render() {
        const { decks } = this.state

        //console.log("deck vale" , decks)
        return (
            <View>
                {decks && Object.keys(decks).map(deck => {
                    const {title} = decks[deck]
                    return (
                        <TouchableOpacity key={title}>
                            <Text>{title}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

export default DeckListView