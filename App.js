//react
import React, { Component } from 'react'
import { View } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

//style
import AppStyles from './styles/AppStyles'
import { black } from './styles/_sharedStyles'
import { Foundation } from '@expo/vector-icons'

//utils
import { getDecks } from './utils/api'
import { initScheduler } from './utils/scheduler'
import { loadDB } from './data/loader'

//app components
import AddCardView from './components/AddCardView'
import DeckListView from './components/DeckListView'
import DeckView from './components/DeckView'
import NewDeckView from './components/NewDeckView'
import QuizView from './components/QuizView'
import ScheduleNotificationView from './components/ScheduleNotificationView'
import StatusBarView from './components/StatusBarView'

//preload asyncstorage with some dummy values
loadDB()

const Tabs = createMaterialBottomTabNavigator(
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
        },
        ScheduleNotification: {
            screen: ScheduleNotificationView,
            navigationOptions: {
                tabBarLabel: 'Schedule Notification',
                tabBarIcon: () => <Foundation name='clock' size={20} />
            },
        }
    },
    {
        shifting: true,
        tabBarOptions: { showIcon: true },
        barStyle: AppStyles.tabBar,
    }
)

const MainNavigator = createStackNavigator(
    {
        Home: {
            screen: Tabs,
            navigationOptions: { title: 'Mobile Flashcards' }
        },
        Deck: {
            screen: DeckView
        },
        AddCardView: {
            screen: AddCardView
        },
        QuizView: {
            screen: QuizView,
            navigationOptions: { title: 'Quiz Time!' }
        }
    },
    {
        navigationOptions: {
            headerStyle: AppStyles.navigation,
            headerTintColor: black,
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }
    }
)

export default class App extends Component {

    state = {
        decks: null
    }

    componentDidMount = () => {
        initScheduler()
        getDecks().then(decks => this.setState({ decks }))
    }

    updateDeckState = (decks, cb) => {
        //save deck to state (this will get passed down to children also)
        this.setState({ decks }, () => { if (cb) cb() })
    }

    render() {
        const { decks } = this.state
        const { container } = AppStyles

        return (
            <View style={container}>
                <StatusBarView />
                {decks && <MainNavigator screenProps={{
                    decks,
                    updateDeckState: this.updateDeckState
                }} />}
            </View>
        )
    }
}