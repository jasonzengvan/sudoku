import { connect } from 'react-redux'
import { incrementCell } from '../actions'
import Board from '../components/Board'

const mapStateToProps = state => {
	return {
		board: state.board,
		puzzle: state.puzzle,
		invalidIndex: state.gameState.invalidIndex
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onCellClick: index => {
			dispatch(incrementCell(index))
		}
	}
}

const BoardContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Board)

export default BoardContainer