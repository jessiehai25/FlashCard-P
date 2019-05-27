import React, {Component} from 'react'
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {getInitialData} from '../utils/api'
import {receiveDecks, handleInitialData} from '../actions'
import {data} from '../utils/_data'
import {getDecks} from '../utils/api'
import AddQuestion from './AddQuestion'
import Quiz from './Quiz'
 
class DeckIndi extends Component {
	static navigationOptions = ({navigation}) => {
		const {deck} = navigation.state.params
		return {
			title: deck
		}
	}

	addQ = (deck)=>{
		console.log(deck)
		this.props.navigation.navigate('AddQuestion', {deck: deck})
	}
	quiz = (deck, questionsNumber)=>{
		if(questionsNumber===0){
			alert('Sorry, you cannot take a quiz because there are no cards in the deck.')
		}
		this.props.navigation.navigate('Quiz', {entryId: deck})
	}
	render(){
		const deck = this.props.navigation.state.params.deck
		const {decks} = this.props
		const questionsNumber= decks ? decks[deck].questions.length : 0
		return(
			<View style = {styles.deckBox}>
				<Text style = {styles.deckDetails}>
					Number of Questions: {questionsNumber}
				</Text>
				<TouchableOpacity style = {styles.btn} onPress = {()=>this.addQ(deck)}>
					<Text style = {styles.btnText}>Add Quesion</Text>
				</TouchableOpacity>
				<TouchableOpacity style = {styles.btn} onPress = {()=>this.quiz(deck, questionsNumber)}>
					<Text style = {styles.btnText}>Start Quiz</Text>
				</TouchableOpacity>
			</View>

			)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginLeft: 10,
		marginRight: 10,
	},
	deckBox:{
		borderColor: '#007AFF',
		borderWidth: 0.5,
		borderRadius: Platform.OS === 'ios' ? 16 : 2,
		padding: 20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 17,
		marginBottom: 17,
		justifyContent: 'flex-start',
		alignItems: 'center',
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0,0,0,0.24)',
		shadowOffset: {
			width: 0,
			height: 3,
		},
	},
	deckTitle:{
		color: '#007AFF',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 35,
	},
	deckDetails:{
		color: '#007AFF',
		fontSize: 25,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 8,
		marginBottom:70,
	},
	btn:{
		backgroundColor: '#007AFF',
		borderRadius: Platform.OS === 'ios' ? 16 : 2,
		padding: 20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 8,
		marginBottom: 8,
		justifyContent: 'center',
		alignItems: 'center',
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0,0,0,0.24)',
		shadowOffset: {
			width: 0,
			height: 3,
		},
	},
	btnText:{
		color: '#fff',
		fontSize: 15,
	}
})

function mapStateToProps (decks) {

	return{
		decks,
	}
}

export default connect(mapStateToProps)(DeckIndi)