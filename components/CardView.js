import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import CardViewStyles from '../styles/CardViewStyles'

class CardView extends Component {

    constructor(props) {
        super(props);

        const [decks] = props.screenProps

        this.state = {
            decks
        }
    }

    componentWillReceiveProps ({screenProps}) {

        const [decks] = screenProps

        //console.log("componentWillReceiveProps", Object.keys(decks).length)
        //console.log("componentWillReceiveProps", Object.keys(this.state.decks).length)

        //if deck in nextProps has different amount of keys, update state
        if (Object.keys(decks).length !== Object.keys(this.state.decks).length) this.setState({decks})
    }

    render() {
        const { decks } = this.state
        const { decksStyle, deckItemStyle, deckItemTextStyle } = DeckListViewStyles

        return (
            <View style={decksStyle}>
                            <TouchableOpacity onPress={() => {
                                console.log(this.state)
                            }}>
                    <Text>log</Text>
                </TouchableOpacity>
                {decks && Object.keys(decks).map(deck => {
                    const { title, questions } = decks[deck]
            
                    return (
                        <TouchableOpacity key={title} style={deckItemStyle}>
                            <Text style={deckItemTextStyle}>{title}</Text>
                            <Text>{`${questions.length || 0} cards`}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

export default CardView