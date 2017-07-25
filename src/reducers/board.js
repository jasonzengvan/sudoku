const board = (state = new Array(81).fill(0), action) => {
	switch(action.type) {
		case 'INIT_PUZZLE':
			return action.puzzle.slice()
		case 'SET_BOARD':
			return action.board.slice()
		case 'INCREMENT_CELL':
			return state
				.slice(0, action.index)
				.concat((state[action.index] + 1) % 10)
				.concat(state.slice(action.index + 1))
		default:
			return state
	}
}

export default board