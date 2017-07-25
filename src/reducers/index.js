import { combineReducers } from 'redux'
import board from './board'
import puzzle from './puzzle'
import gameState from './gameState'

const sudokuApp = combineReducers({
	board,
	puzzle,
	gameState
})

export default sudokuApp
