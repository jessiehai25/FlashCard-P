import React, {Component} from 'react'
import {View, ScrollView, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {getDecks} from '../utils/api'
import {receiveDecks} from '../actions'
import {data} from '../utils/_data'
import DeckIndi from './DeckIndi'



class DeckList extends Component {
	componentDidMount(){
		const {dispatch} = this.props
		getDecks()
		.then((decks) => 
			dispatch(receiveDecks(decks)))
	}

	render(){	
		const {decks} = this.props
		return(
			<ScrollView style = {styles.container}>
				{Object.keys(decks).map((deck)=>(
						<TouchableOpacity
							key = {deck} 
							style = {styles.deckBox}
							onPress = {()=>{
								this.props.navigation.navigate('DeckIndi', {deck: deck})
							}}
							title = 'deck list'
						>
							<Text style = {styles.deckTitle}>
								{deck}
							</Text>
							<Text style = {styles.deckDetails}>
								Number of Questions: {decks[deck].questions.length}
							</Text>
						</TouchableOpacity>
				))}

			</ScrollView>
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
	deckTitle:{
		color: '#007AFF',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 35,
	},
	deckDetails:{
		color: '#007AFF',
		fontSize: 15,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 8,
	}
})

function mapStateToProps (decks) {
	return {
		decks
	}
}

export default connect(mapStateToProps)(DeckList)