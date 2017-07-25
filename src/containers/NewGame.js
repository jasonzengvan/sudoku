import React from 'react'
import { connect } from 'react-redux'
import { initPuzzle } from '../actions'
import Sudoku from '../Sudoku.js'

let NewGame = ({ dispatch }) => {
	return (
		<button className='controller-left' 
			onClick={()=>{
				dispatch(initPuzzle(Sudoku.generate()))
			}}
		>
			NEW GAME
		</button>
	)
}

NewGame = connect()(NewGame)

export default NewGame