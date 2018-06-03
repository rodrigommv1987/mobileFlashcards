import React from 'react'
import { Text, View, Platform } from 'react-native'
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { purple, white } from './utils/colors'
import AppStyles from './styles/AppStyles'
import { FontAwesome, Foundation } from '@expo/vector-icons'
import DeckListView from './components/DeckListView'
import NewDeckView from './components/NewDeckView'
import StatusBarView from './components/StatusBarView'
import { loadDB } from './data/loader'
import { AppLoading } from 'expo'
import { fetchDecks } from './utils/api'

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
        }
    }
)

const MainNavigator = createStackNavigator(
    { Home: Tabs },
    { headerMode: 'none' }
)

export default class App extends React.Component {
    
    state = {
        decks:{}
    }

    componentDidMount = () => {
        fetchDecks().then(a => console.log(JSON.stringify(a)))
    }

    render() {

        //const [decks] = this.state.decks
        //todo: vincular con redux

        return (
            <View style={{ flex: 1 }}>
                <StatusBarView backgroundColor={purple} barStyle="light-content" />
                <MainNavigator screenProps={}/>
            </View>
        )
    }
}