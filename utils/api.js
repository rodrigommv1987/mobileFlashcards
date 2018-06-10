import { AsyncStorage } from 'react-native'
import { STORAGE_KEY, NOTIFICATION_KEY, NOTIFICATION_DEFAULT } from '../config/index'
import { Notifications, Permissions } from 'expo'


export function getDecks() {
    return AsyncStorage.getItem(STORAGE_KEY).then(decks => {
        return JSON.parse(decks)
    })
}

export function getDeck(title) {
    return AsyncStorage.getItem(STORAGE_KEY).then(decks => {
        return (JSON.parse(decks))[title]
    })
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [title]: {
            "title": title,
            "questions": []
        }
    }))
}

export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(STORAGE_KEY).then(oldDecks => {
        let decks = JSON.parse(oldDecks)
        decks[title].questions.push(card)
        return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
    })
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification(when = NOTIFICATION_DEFAULT, force = false) {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            //if there's no notification set for today
            if (force || (data === null)) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync()

                        let tomorrow = new Date()
                        tomorrow.setDate(when.startTomorrow ? tomorrow.getDate() + 1 : tomorrow.getDate())
                        tomorrow.setHours(when.hour)
                        tomorrow.setMinutes(when.minute)
                        tomorrow.setSeconds(0)
                        console.log("notification scheduled for ",tomorrow)

                        Notifications.scheduleLocalNotificationAsync(
                            {
                                title: 'Log your stats!',
                                body: "👋 don't forget to log your stats for today!",
                                ios: {
                                    sound: true,
                                },
                                android: {
                                    sound: true,
                                    priority: 'high',
                                    sticky: false,
                                    vibrate: true,
                                }
                            },
                            {
                                time: tomorrow,
                                repeat: 'day',
                            }
                        )

                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                    }
                })
            }
        })
}