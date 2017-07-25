import React from 'react'
import { connect } from 'react-redux'
import { setInvalidIndex } from '../actions'
import { setSolved } from '../actions'
import Sudoku from '../Sudoku.js'

const mapStateToProps = state => {
	return {
		puzzle: state.puzzle,
		board: state.board
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onClick: (board, puzzle) => {
			var c = Sudoku.check(board, puzzle)			
			dispatch(setInvalidIndex(c))
			if (c === -1)
				dispatch(setSolved(true))
		}
	}
}

let Check = ({ board, puzzle, onClick }) => {
	return (
		<button className='controller-mid'
			onClick={()=>{
				onClick(board, puzzle)
			}}
		>
			CHECK
		</button>
	)
}

Check = connect(
	mapStateToProps,
	mapDispatchToProps
)(Check)

export default Check