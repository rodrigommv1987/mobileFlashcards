import { ADD_DECK } from '../actions'

function decks(state = {}, action) {
    switch (action.type) {
        case ADD_DECK:
            const newState = {
                ...state,
                decks: {
                    ...state.deck,
                    ...action.deck
                }
            }
            console.log("ADD_DECK", newState)
            return newState
        default:
            return state
    }
}

export default decks