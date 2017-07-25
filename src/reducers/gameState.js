import { combineReducers } from 'redux'

const invalidIndex = (state = -1, action) => {
	switch(action.type) {
		case 'SET_INVALID_INDEX':
			return action.invalidIndex
		case 'INIT_PUZZLE':
			return -1
		case 'SET_BOARD':
			return -1
		default:
			return state
	}
}

const solvable = (state = true, action) => {
	switch(action.type) {
		case 'SET_SOLVABLE':
			return action.solvable
		case 'INIT_PUZZLE':
			return true
		case 'SET_BOARD':
			return true
		default:
			return state
	}
}

const solved = (state = false, action) => {
	switch(action.type) {
		case 'SET_SOLVED':
			return action.solved
		case 'INIT_PUZZLE':
			return false
		case 'SET_BOARD':
			return false
		case 'INCREMENT_CELL':
			return false
		default:
			return state
	}
}

const gameState = combineReducers({ invalidIndex, solvable, solved })

export default gameState