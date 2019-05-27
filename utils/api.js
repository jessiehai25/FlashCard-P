import {DATA_KEY, data} from './_data'
import {AsyncStorage} from 'react-native'


export const getInitialData = () => {
  return data;
}

//getDecks: return all of the decks along with their titles, questions, and answers. 
//getDeck: take in a single id argument and return the deck associated with that id. 
//saveDeckTitle: take in a single title argument and add it to the decks. 
//addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 

export function getDecks (decks) {
  return AsyncStorage.getItem(DATA_KEY)
  .then (results => {
    console.log('AsyncStorage')
    if(results === null) {
      AsyncStorage.setItem(DATA_KEY, JSON.stringify(data))
      return data
    }else{
      return JSON.parse(results)
    }
  })
}

export function saveDeckTitle (title){
  return AsyncStorage.mergeItem(DATA_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }))
}

export function addCardToDeck (title, card){
  return AsyncStorage.mergeItem(DATA_KEY, JSON.stringify({
    [title]:{
      title: title,
      questions: question
    }
  }))
}