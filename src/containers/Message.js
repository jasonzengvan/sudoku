import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return {
		invalidIndex: state.gameState.invalidIndex,
		solvable: state.gameState.solvable,
		solved: state.gameState.solved
	}
}

let Message = ({invalidIndex, solvable, solved}) => {

	if (invalidIndex !== -1)
		return (
			<p> The highlighted cell is invalid! </p> 
		)

	if (!solvable) 
		return (
			<p> This board is not solvable, type other combinations </p>
		)

	if (!solved) 
		return (
			<p> Fill each cell with 1 to 9 to solve this puzzle </p>
		)

	return <p> The puzzle is solved! </p>
}

Message = connect(
	mapStateToProps
)(Message)

export default Message