import { AsyncStorage } from 'react-native'
import { STORAGE_KEY } from '../config/index'


export function getDecks() {
    return AsyncStorage.getItem(STORAGE_KEY).then(decks => {
        return JSON.parse(decks)
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

/*
getDecks: return all of the decks along with their titles, questions, and answers. 
getDeck: take in a single id argument and return the deck associated with that id. 
saveDeckTitle: take in a single title argument and add it to the decks. 
addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 

*/

/*
export function submitEntry({ entry, key }) {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [key]: entry
    }))
}

export function removeEntry(key) {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        })
}*/