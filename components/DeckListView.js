import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
//import { connect } from 'react-redux'
import DeckListViewStyles from '../styles/DeckListViewStyles'
import { fetchDecks } from '../utils/api'

class DeckListView extends Component {

    componentDidMount = () => {
        
    }

a = () => {
console.log("aaa")
    //fetchDecks().then(a => console.log(JSON.stringify(a)))
}

    render() {
        return (
            <View>
                <Text>DeckListView</Text>
                <TouchableOpacity onPress={this.a}>
                    <Text>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
/*
function mapStateToProps(deck) {
    const a = 22;

    return {

    }
}

export default connect(
    mapStateToProps,
)(DeckListView)*/

export default DeckListView