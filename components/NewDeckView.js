import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, ToastAndroid, Keyboard } from 'react-native'
import NewDeckViewStyles from '../styles/NewDeckViewStyles'
import { getDecks, saveDeckTitle } from "../utils/api";

class NewDeckView extends Component {
    
    constructor(props) {
        super(props);

        const [decks] = props.screenProps

        this.state = {
            decks: props.screenProps,
            newDeckName: ''
        };
    }

    cleanState () {
        this.setState({newDeckName:''})
    }

    addNewDeck = () => {
        const { newDeckName } = this.state,
            [,updateDeckState] = this.props.screenProps

        if (newDeckName === '') {
            ToastAndroid.show('Hey!!! We need a name for the new deck!!', ToastAndroid.SHORT)
            return
        }

        saveDeckTitle(newDeckName).then( () => {
            getDecks().then(decks => {
                updateDeckState(decks)
                this.cleanState()
                Keyboard.dismiss()
                ToastAndroid.show('Deck saved successfully!', ToastAndroid.SHORT)
            })
        })

    }

    render() {
        const { containerStyle, titleStyle, inputStyle, submitStyle, invalidNameTextStyle } = NewDeckViewStyles
        const { newDeckName } = this.state

        return (
            <View style={containerStyle}>
                <Text style={titleStyle}>Enter New Deck Name:</Text>
                <TextInput 
                    style={inputStyle}
                    value={newDeckName}
                    onChangeText={(text) => this.setState({ newDeckName: text })}
                />

                <TouchableOpacity onPress={this.addNewDeck}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default NewDeckView