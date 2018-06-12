//react
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, ToastAndroid, Keyboard } from 'react-native'

//style
import NewDeckViewStyles from '../styles/NewDeckViewStyles'

//utils
import { getDecks as APIgetDecks, saveDeckTitle as APIsaveDeckTitle } from "../utils/api";

class NewDeckView extends Component {

    constructor(props) {
        super(props);

        const { decks } = props.screenProps

        this.state = {
            decks,
            newDeckName: ''
        }
    }

    componentWillReceiveProps({ screenProps }) {

        const { decks } = screenProps

        //if deck in nextProps has different amount of keys, update state
        if (Object.keys(decks).length !== Object.keys(this.state.decks).length) this.setState({ decks })
    }

    cleanState() {
        this.setState({ newDeckName: '' })
    }

    addNewDeck = () => {
        const { newDeckName, decks } = this.state,
            { updateDeckState } = this.props.screenProps

        if (newDeckName === '') {
            ToastAndroid.show('Hey!!! We need a name for the new deck!!', ToastAndroid.SHORT)
            return
        }

        if (decks[newDeckName]) {
            ToastAndroid.show(`Deck ${newDeckName} already exists, please select other name.`, ToastAndroid.SHORT)
            return
        }
        else {
            //save deck to asyncstorage
            APIsaveDeckTitle(newDeckName).then(() => {
                //get fresh copy of all decks
                APIgetDecks().then(freshDecks => {
                    //save decks to internal state
                    updateDeckState(freshDecks, () => {
                        this.cleanState()
                        Keyboard.dismiss()
                        ToastAndroid.show('Deck saved!', ToastAndroid.SHORT)
                        //route to newly created deck
                        this.props.navigation.navigate('Deck', { title: newDeckName })
                    })
                })
            })
        }
    }

    render() {
        const { container, title, input, submit } = NewDeckViewStyles
        const { newDeckName } = this.state

        return (
            <View style={container}>
                <Text style={title}>Enter Deck Name:</Text>
                <TextInput
                    style={input}
                    value={newDeckName}
                    onChangeText={(text) => this.setState({ newDeckName: text })}
                />
                <TouchableOpacity onPress={this.addNewDeck}>
                    <Text style={submit}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default NewDeckView