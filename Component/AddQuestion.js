import React, {Component} from 'react'
import {View, Text, TextInput, Button, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons'
import {addCardToDeck} from '../utils/api'
import {addCard} from '../actions'

class AddQuestion extends Component {
	state = {
		question: '',
		answer: '',
	}

  	handleSubmit = (deck) => {
  		const {goBack} = this.props
  		const {question, answer} = this.state
  		const newQuestion = {
  			question,
  			answer,
  		}
  		addCardToDeck(newQuestion)
  		this.props.dispatch(addCard(deck, newQuestion))
  		goBack()
  		this.setState(()=>({
  			question: '',
  			answer: '',
  		}))
  	}
	render(){
		const {question, answer} = this.state
		const deck = this.props.navigation.state.params.deck
		console.log(deck)
		return(
			<View style = {styles.container}>
				<TextInput 
					onChangeText = {(question) => this.setState(()=> ({question: question}))}
					placeholder = 'Please input your new question'
					value = {question}
					style = {styles.inputS}
				>
				</TextInput>
				<TextInput 
					onChangeText = {(answer) => this.setState(()=> ({answer: answer}))}
					placeholder = 'Please input the correct answer'
					value = {answer}
					style = {styles.inputS}
				>
				</TextInput>
				<TouchableOpacity onPress = {(deck)=>this.handleSubmit} style = {styles.submitBtn}>
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
	fontSize: 20,
	justifyContent: 'flex-start',
	alignItems: 'flex-start',
	marginTop: 15,
	marginBottom:15,
	borderColor: '#007AFF',
	borderWidth: 0.5,
	borderRadius: Platform.OS === 'ios' ? 16 : 2,
	marginLeft: 10,
	marginRight: 10,
	padding: 20,
	width: '90%',
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

function mapStateToProps({decks}, {deck}){
	return{
		decks,
		deck
	}
}
export default connect(mapStateToProps)(AddQuestion)
