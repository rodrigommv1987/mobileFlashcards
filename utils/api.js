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

export function getNotificationData() {
    return AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse)
}

export function clearLocalNotification() {
    return Notifications.cancelAllScheduledNotificationsAsync()
        .then(() => {
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify({
                notificationSet: false
            }))
        })
}

export function setLocalNotification(when) {
    Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
            if (status === 'granted') {
                clearLocalNotification()
                    .then(() => {
                        let tomorrow = new Date()
                        tomorrow.setDate(when.startTomorrow ? tomorrow.getDate() + 1 : tomorrow.getDate())
                        tomorrow.setHours(when.hour)
                        tomorrow.setMinutes(when.minute)
                        tomorrow.setSeconds(0)

                        //if the notification is being set for today but before current time, set it for tomorrow anyway
                        if (tomorrow.getTime() < (new Date()).getTime()) tomorrow.setDate(tomorrow.getDate()+1)
                        console.log("notification scheduled for ", tomorrow)

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
                        return AsyncStorage.mergeItem(NOTIFICATION_KEY, JSON.stringify({
                            notificationSet: true,
                            ...when
                        }))

                    })
            }
        })

}