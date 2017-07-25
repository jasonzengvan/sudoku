import React from 'react'
import { connect } from 'react-redux'
import Sudoku from '../Sudoku'
import { setBoard } from '../actions'
import { setSolved } from '../actions'
import { setSolvable } from '../actions'

const mapStateToProps = state => {
	return {
		board: state.board,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onClick: (board) => {
			var b = board.slice()
			if (Sudoku.solve(b)) {
				dispatch(setBoard(b))
				dispatch(setSolved(true))
			} else {
				dispatch(setSolvable(false))
			}
		}
	}
}

let Solve = ({ board, onClick }) => {
	return (
		<button className='controller-right'
			onClick={()=>{
				onClick(board)
			}}
		>
			SOLVE
		</button>
	)
}

Solve = connect(
	mapStateToProps,
	mapDispatchToProps
)(Solve)

export default Solve