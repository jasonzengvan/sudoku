const puzzle = (state = new Array(81).fill(0), action) => {
	switch(action.type) {
		case 'INIT_PUZZLE':
			return action.puzzle.slice()
		default:
			return state
	}
}

export default puzzle