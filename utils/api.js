import {DATA_KEY, data} from './_data'
import {AsyncStorage} from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'FlashCard:notifications'

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
export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}
export function addCardToDeck (title, card){
  return AsyncStorage.getItem(DATA_KEY)
  .then ((results)=>{
    const data = JSON.parse(results)
    data[title] = {
      title: title,
      questions: data[title].questions.concat([card])
    }
    AsyncStorage.setItem(DATA_KEY, JSON.stringify(data))
  })
}

function createNotification () {
  return {
    title: 'Start a Quiz!',
    body: "👋 don't forget to do a quiz for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
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
