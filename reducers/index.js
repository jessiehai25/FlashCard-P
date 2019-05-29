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
			const {deck, newQuestion} = action
			console.log("reducer",state[deck])
			let deckWNq = {}
			deckWNq = {
				[deck]:{
					...state[deck],
					questions: state[deck].questions.concat([newQuestion])
				}
			}
			return {
				...state,
				...deckWNq,
			}

		default:
			return state	
	}
}