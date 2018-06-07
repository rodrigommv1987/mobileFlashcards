import React from 'react'
import { Text, View, Platform } from 'react-native'
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { purple, white, red } from './utils/colors'
import AppStyles from './styles/AppStyles'
import { FontAwesome, Foundation } from '@expo/vector-icons'
import DeckListView from './components/DeckListView'
import NewDeckView from './components/NewDeckView'
import StatusBarView from './components/StatusBarView'
import DeckView from './components/DeckView'
import { loadDB } from './data/loader'
import { AppLoading } from 'expo'
import { getDecks } from './utils/api'

//preload asyncstorage with some dummy values
loadDB()

const Tabs = createMaterialTopTabNavigator(
    {
        DeckListView: {
            screen: DeckListView,
            navigationOptions: {
                tabBarLabel: 'Deck List',
                tabBarIcon: () => <Foundation name='list' size={20} />
            },
        },
        NewDeckView: {
            screen: NewDeckView,
            navigationOptions: {
                tabBarLabel: 'Add New Deck',
                tabBarIcon: () => <Foundation name='plus' size={20} />
            },
        }
    },
    {
        tabBarOptions: {
            showIcon: true,
            activeTintColor: red
        }
    }
)

const MainNavigator = createStackNavigator(
    { 
        Home: {
            screen: Tabs,
            title: 'Home'
        },
        Deck: {
            screen: DeckView
        }
    },
    { headerMode: 'none' }
)

export default class App extends React.Component {

    state = {
        decks: null
    }

    componentDidMount = () => {
        getDecks().then(decks => {
            this.setState({
                ...this.state,
                decks: {
                    ...this.state.decks,
                    ...decks
                }
            })
        })
    }

    updateDeckState = (decks) => {
        //save deck to state (this will get passed down to children also)
        this.setState({decks})
    }

    render() {
        const { decks } = this.state

        return (
            <View style={{ flex: 1 }}>
                <StatusBarView backgroundColor={purple} barStyle="light-content" />
                {decks && <MainNavigator screenProps={[decks, this.updateDeckState]} /> }
            </View>
        )
    }
}