import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './reducers'
import DeckList from './Component/DeckList'
import AddDeck from './Component/AddDeck'
import {Constants} from 'expo'
import DeckIndi from './Component/DeckIndi'
import AddQuestion from './Component/AddQuestion'
import Quiz from './Component/Quiz'
import {FontAwesome, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons'
import {createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation'

const RouteConfigs = {
  DeckList:{
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "DeckList",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name='ios-bookmarks' size = {30} color={tintColor} />
      )
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "Create Deck",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name='plus-square' size = {30} color={tintColor} />
      )
    }
  },

}
const TabNavigatorConfig = {

  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: '#007AFF',
    style: {
      height: 56,
      backgroundColor: '#fff',
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
    shadowRadius: 6,
    shadowOpacity: 1
    }
  }
};

const Tabs =
  Platform.OS === "ios"
  ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
  : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

const MainNavigator = createStackNavigator({
  Home:{
    screen: Tabs,
  },
  DeckIndi:{
    screen: DeckIndi,
  },
  Quiz:{
    screen: Quiz,
    navigationOptions:{
      title: "Quiz"
    }
  },
  AddQuestion:{
    screen: AddQuestion,
  }
})


const Container = createAppContainer(MainNavigator)

export default class App extends React.Component {
  render() {
    return (
      <Provider store = {createStore(reducer)}>
        <View style={{flex:1}}>
        {/*<UdaciStatusBar />*/}
          <Container/>
          {/*<DeckIndi deck="React"/>*/}
        </View>
      </Provider>
    );
  }
}

