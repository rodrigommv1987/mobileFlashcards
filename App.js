import React from 'react'
import { Text, View, Platform, TouchableOpacity, AsyncStorage } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { purple, white, red } from './utils/colors'
import AppStyles from './styles/AppStyles'
import { FontAwesome, Foundation } from '@expo/vector-icons'
import DeckListView from './components/DeckListView'
import NewDeckView from './components/NewDeckView'
import StatusBarView from './components/StatusBarView'
import DeckView from './components/DeckView'
import AddCardView from './components/AddCardView'
import QuizView from './components/QuizView'
import ScheduleNotificationView from './components/ScheduleNotificationView'
import { loadDB } from './data/loader'
import { Notifications, Permissions } from 'expo'
import { getDecks, setLocalNotification, clearLocalNotification } from './utils/api'
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

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
        tabBarOptions: {
            showIcon: true,
            activeTintColor: red,
        }
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
            screen: QuizView
        }
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }
    }
)

export default class App extends React.Component {

    state = {
        decks: null
    }

    componentDidMount = () => {
        getDecks().then(decks => this.setState({ decks }))
    }

    updateDeckState = (decks, cb) => {
        //save deck to state (this will get passed down to children also)
        this.setState({ decks }, () => { if (cb) cb() })
    }

    render() {
        const { decks } = this.state

        return (
            <View style={{ flex: 1 }}>
                <StatusBarView backgroundColor={purple} barStyle="light-content" />
                {decks && <MainNavigator screenProps={{
                    decks,
                    updateDeckState: this.updateDeckState
                }} />}
                <TouchableOpacity onPress={() => {
                    console.log(new Date())
                }}>
                    <Text>check date</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    AsyncStorage.getItem("mobileFlashcards_notification").then(data => {
                        console.log(data)
                    })
                }}>
                    <Text>check notification</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={clearLocalNotification}>
                    <Text>clear all notifications</Text>
                </TouchableOpacity>
            </View>
        )
    }
}