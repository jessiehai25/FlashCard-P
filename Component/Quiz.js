import React, {Component} from 'react'
import {View, Text, TextInput, Button, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons'

class Quiz extends Component{
	render(){
		return(
			<Text>Quiz</Text>
		)
	}
}

export default connect()(Quiz)