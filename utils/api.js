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
    return AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(notificationData => {
            console.log("notificationData",notificationData)
            notificationData.notificationSet = false
            console.log(JSON.stringify(notificationData))
            return AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(notificationData))
        })
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification(when = NOTIFICATION_DEFAULT, force = false) {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then((a) => {
            console.log(a)
            return JSON.parse(a)
        })
        .then((data) => {
            console.log("setLocalNotification data es: ",data)
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
                                title: 'Have you studied today???',
                                body: "Quiz yourself today if you haven't!!!",
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
                        AsyncStorage.getItem(NOTIFICATION_KEY)
                            .then((a) => console.log(a))
                            /*.then(notificationData => {
                                console.log(notificationData)
                                notificationData.notificationSet = true
                                return AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(notificationData))
                            })*/
                    }
                })
            }
        })
}