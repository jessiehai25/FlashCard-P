import React, {Component} from 'react'
import {View, Text, TextInput, Button, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {AntDesign} from '@expo/vector-icons'
import {saveDeckTitle} from '../utils/api'
import {addDeck} from '../actions'
import DeckIndi from './DeckIndi'
import DeckList from './DeckList'

class AddDeck extends Component {
	state = {
		text: ''
	}

  	handleSubmit = () => {
  		const {text} = this.state
  		saveDeckTitle(text)
  		this.props.dispatch(addDeck(text))
  		this.props.navigation.navigate('DeckList')
  		this.setState(()=>{
  			text: ''
  		})
  	}
	render(){
		const value = this.state.text
		return(
			<View style = {styles.container}>
				<Text style = {styles.header}>New Deck</Text>
				<AntDesign name='book' size = {80} color='#007AFF' />
				<TextInput 
					onChangeText = {(text) => this.setState(()=> ({text: text}))}
					placeholder = 'Please input your new deck title'
					value = {value}
					style = {styles.inputS}
				>
				</TextInput>
				<TouchableOpacity onPress = {this.handleSubmit} style = {styles.submitBtn}>
				<Text style = {styles.submitText}>Submit</Text>
				</TouchableOpacity>
			</View>

			)
	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
	alignItems: 'center',

  },
  header:{
	color: '#007AFF',
	justifyContent: 'center',
	alignItems: 'center',
	fontSize: 35,
	marginTop: 20,
	marginBottom:20,
  },
  inputS:{
	color: '#007AFF',
	fontSize: 25,
	justifyContent: 'flex-start',
	alignItems: 'flex-start',
	marginTop: 15,
	marginBottom:70,
	borderColor: '#007AFF',
	borderWidth: 0.5,
	borderRadius: Platform.OS === 'ios' ? 16 : 2,
	marginLeft: 10,
	marginRight: 10,
	padding: 20,
	width:'90%'
  },
  submitBtn: {
  	backgroundColor: '#007AFF',
  	marginTop: 50,
  	padding: 10,
  	borderRadius: 7,
  	paddingLeft: 40,
	paddingRight: 40,
	height: 45,
	justifyContent: 'center',
	alignItems: 'center',
  },
  submitText: {
  	color: '#fff',
  	fontSize: 25,
  	justifyContent: 'center',
	alignItems: 'center',
  }
});
export default connect()(AddDeck)
