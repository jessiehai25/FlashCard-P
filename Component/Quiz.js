import React, {Component} from 'react'
import {View, Text, TextInput, Button, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import QuizIndi from './QuizIndi'
import {AntDesign, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'



class Quiz extends Component{
	state = {
		score: 0,
		questionNumber: 0,
	}
	correct = () => {
		console.log('correct')
		this.setState(()=> ({
			score: this.state.score +1,
			questionNumber: this.state.questionNumber +1,
		}))
	}
	wrong = () => {
		console.log('wrong')
		this.setState(()=> ({
			questionNumber: this.state.questionNumber +1,
		}))
	}
	restart = () => {
		this.setState(()=>({
			questionNumber: 0,
			score: 0
		}))
	}

	goBack = () => {
		this.props.navigation.goBack()
	}
	render(){
		const {decks} = this.props
		const deck = this.props.navigation.state.params.deck
		const totalQuestions= decks ? decks[deck].questions.length : 0
		const {questionNumber, score} = this.state
		
		if (questionNumber === totalQuestions){
			return(
				<View style = {styles.container}>
					<Text style = {styles.header}>Quiz Completed</Text>
					<Ionicons 
						name = {Platform.OS==='ios' ? 'ios-trophy' : 'md-trophy'}
						size = {80}
						color = {'#007AFF'}
					/>
					<Text style = {styles.header}>Your Score :</Text>
					<Text style = {styles.header}>{Math.round(score/totalQuestions*100)}%</Text>
					<TouchableOpacity 
						style = {[styles.btn, {borderColor: '#007AFF',borderWidth: 0.5,backgroundColor:'#007AFF'}]}
						onPress = {this.restart}
					>
					<View style = {{flexDirection : 'row'}}>
						<MaterialCommunityIcons 
							name = 'restart'
							color = 'white'
							size = {20}
						/>
						<Text style={styles.btnText}>Restart the quiz</Text>
					</View>
					</TouchableOpacity>
					<TouchableOpacity 
						style = {[styles.btn, {borderColor: '#007AFF',borderWidth: 0.5,backgroundColor:'#007AFF'}]}
						onPress = {this.goBack}
					>
					<View style = {{flexDirection : 'row'}}>
						<AntDesign 
							name = 'book'
							color = 'white'
							size = {20}
						/>
						<Text style={styles.btnText}> Back to Deck</Text>
					</View>
					</TouchableOpacity>
				</View>
				)
		}

		const {question, answer} = decks[deck].questions[questionNumber]
		console.log(this.state.score, questionNumber)
		return(
			<View style = {styles.container}>
				<Text style = {styles.header}>Quiz   ({questionNumber+1}/{totalQuestions})</Text>
				<QuizIndi question = {question} answer = {answer}/>
				<View style = {styles.selection}>
					<TouchableOpacity 
						style = {[styles.btn,{backgroundColor: 'green', flex: 1}]}
						onPress = {this.correct}
					>
						<AntDesign name='check' style = {styles.btnIcon}/>
					</TouchableOpacity>
					<TouchableOpacity 
						style = {[styles.btn,{backgroundColor: 'red', flex: 1}]}
						onPress = {this.wrong}
					>
						<AntDesign name='close' style = {styles.btnIcon}/>
					</TouchableOpacity>
				</View>
			</View>
		)
	}

}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginLeft: 10,
		marginRight: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	header:{
		color: '#007AFF',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 35,
		marginTop: 20,
		marginBottom:20,
	},
	selection: {
		
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	btn: {
		
		borderRadius: Platform.OS === 'ios' ? 16 : 2,
		padding: 10,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 8,
		marginBottom: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnIcon: {
		fontSize: 80,
		color: '#fff',
	},
	btnText:{
		color: '#fff',
		fontSize: 15,
	},
})

function mapStateToProps(decks){
	return{
		decks,
	}
}

export default connect(mapStateToProps)(Quiz)