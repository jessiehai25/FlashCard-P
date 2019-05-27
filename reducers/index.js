import {RECEIVE_DECKS, ADD_DECK, ADD_CARD_TO_DECK} from '../actions'

export default function decks(state = {}, action){
	switch(action.type){
		case RECEIVE_DECKS :
			return {
				...state,
				...action.decks
			}
		case ADD_DECK :
			const newDeck = {
				[action.deck]:{
					title: action.deck,
					questions: [],
				}

			} 
			return {
				...state,
				...newDeck
			}
		case ADD_CARD_TO_DECK : 
			const {newQuestion, deck} = action
			return {
				...state,
				[deck]: {
					...state[deck],
					questions: [...state[deck].questions, newQuestion]
				}

			}
		default:
			return state	
	}
}