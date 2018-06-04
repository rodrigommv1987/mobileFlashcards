import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import NewDeckViewStyles from '../styles/NewDeckViewStyles'
import { getDecks, saveDeckTitle } from "../utils/api";

class NewDeckView extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            decks: props.screenProps,
            newDeckName: '',
            invalidName: false
        };
    }

    componentDidMount = () => {

    }

    addNewDeck = () => {
        const { newDeckName } = this.state

        if (newDeckName === '') {
            this.setState({ invalidName: true })
            return
        }

        saveDeckTitle(newDeckName).then()


    }

    render() {
        const { containerStyle, titleStyle, inputStyle, submitStyle, invalidNameTextStyle } = NewDeckViewStyles
        const { invalidName } = this.state
        // console.log("newDeckView props" , this.props)
        return (
            <View style={containerStyle}>
                <Text style={titleStyle}>Enter New Deck Name:</Text>
                <TextInput style={inputStyle} onChangeText={(text) => this.setState({ newDeckName: text })}></TextInput>
                <TouchableOpacity onPress={this.addNewDeck}>
                    <Text>Submit</Text>
                </TouchableOpacity>

                <Text>{this.state.newDeckName}</Text>
                {invalidName && <Text style={invalidNameTextStyle}>Hey!!! Put some text in there before submit!</Text>}
            </View>
        )
    }
}

export default NewDeckView