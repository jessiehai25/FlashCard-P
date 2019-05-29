import React, {Component} from 'react'
import {View, Text, TextInput, Button, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons'

class QuizIndi extends Component{
	state = {
		showQuestion: true
	}
	render(){
		const {question, answer} = this.props
		const {showQuestion} = this.state
		
		return(
			<View style= {styles.container}>
				<Text style = {styles.header}>{showQuestion ? question : answer}</Text>
				<TouchableOpacity 
					style = {styles.btn}
					onPress = {()=> 
						this.setState(()=>({showQuestion: !this.state.showQuestion}))}>
					<Text style = {styles.btnText}>{showQuestion ? "Show Answer" : "Show Question"}</Text>
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
		justifyContent: 'center',
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
  btn:{
		borderColor: '#007AFF',
		borderWidth: 0.5,
		borderRadius: Platform.OS === 'ios' ? 16 : 2,
		padding: 10,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 8,
		marginBottom: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnText:{
		color: '#007AFF',
		fontSize: 15,
	}
 })

export default QuizIndi