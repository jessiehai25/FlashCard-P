import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './reducers'
import DeckList from './Component/DeckList'
import {Constants} from 'expo'
import DeckIndi from './Component/DeckIndi'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return(
    <View style = {{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor}{...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store = {createStore(reducer)}>
        <View style={styles.container}>
        <UdaciStatusBar />
          <DeckList/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
