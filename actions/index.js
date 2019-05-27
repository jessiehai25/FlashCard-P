import {getInitialData} from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECKS'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'


export function receiveDecks (decks) {
	return {
		type: RECEIVE_DECKS,
		decks
	}
}

export function addDeck (deck) {
	return {
		type: ADD_DECK,
		deck
	}
}

export function addCard(newQuestion, deck){
	return {
		type: ADD_CARD_TO_DECK,
		newQuestion,
		deck,
	}
}