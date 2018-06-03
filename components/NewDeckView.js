import React, { Component } from 'react'
import { Text } from 'react-native'
import NewDeckViewStyles from '../styles/NewDeckViewStyles'
import { fetchDecks } from "../utils/api";

class NewDeckView extends Component {

    componentDidMount = () => {

    }

    render() {
        return (
            <Text>NewDeckView</Text>
        )
    }
}

export default NewDeckView