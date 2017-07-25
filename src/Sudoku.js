const generateRandomPuzzle = () => {
	const puzzle = [ 
		1, 2, 3, 4, 5, 6, 7, 8, 9, 
		4, 5, 6, 7, 8, 9, 1, 2, 3,
	  	7, 8, 9, 1, 2, 3, 4, 5, 6,
	  	2, 1, 4, 3, 6, 5, 8, 9, 7,
	  	3, 6, 5, 8, 9, 7, 2, 1, 4,
	  	8, 9, 7, 2, 1, 4, 3, 6, 5,
	  	5, 3, 1, 6, 4, 2, 9, 7, 8,
	  	6, 4, 2, 9, 7, 8, 5, 3, 1,
	  	9, 7, 8, 5, 3, 1, 6, 4, 2
	];
	shufflePuzzle(puzzle);
	removeCells(puzzle);
	return puzzle; 
}

const shufflePuzzle = (puzzle) => {
	// suffle rows
	for (var i = 0; i < 3; i++) {
		var row1 = 3 * i;
		var row2 = 3 * i + Math.floor(Math.random() * 3);
		swapRows(puzzle, row1, row2);
		row1 = 3 * i + 1;
		row2 = 3 * i + 1 + Math.floor(Math.random() * 2);
		swapRows(puzzle, row1, row2);
	}

	// suffle columns
	for (i = 0; i < 3; i++) {		
		var col1 = 3 * i;
		var col2 = 3 * i + Math.floor(Math.random() * 3);
		swapCols(puzzle, col1, col2);
		col1 = 3 * i + 1;
		col2 = 3 * i + 1 + Math.floor(Math.random() * 2);
		swapCols(puzzle, col1, col2);
	}
}

const swapRows = (puzzle, row1, row2) => {
	if (row1 === row2) return;
	for (var i = 0; i < 9; i++) {
		var temp = puzzle[row2 * 9 + i];
		puzzle[row2 * 9 + i] = puzzle[row1 * 9 + i];
		puzzle[row1 * 9 + i] = temp;
	}
}

const swapCols = (puzzle, col1, col2) => {
	if (col1 === col2) return;
	for (var i = 0; i < 9; i++) {
		var temp = puzzle[col2 + i * 9];
		puzzle[col2 + i * 9] = puzzle[col1 + i * 9];
		puzzle[col1 + i * 9] = temp;
	}
}

const removeCells = (puzzle) => {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			var r = Math.floor(Math.random() * 81) + 1;
			if (r > 25) puzzle[i * 9 + j] = 0;
		}
	}
}

const checkBoard = (board, puzzle) => {
	for (var i = 0; i < 81; i++) {
		if (puzzle[i] === 0) {
			if (!checkCell(board, i))
				return i
		}
	}
	return -1
}

const checkCell = (board, index) => {
	var val = board[index]
	if (val === 0) return false
	var row = Math.floor(index / 9)
	var col = index % 9
	for (var i = 0; i < 9; i++) {
		if ((row * 9 + i !== index) && (board[row * 9 + i] === val)) 
			return false
		if ((col + i * 9 !== index) && (board[col + i * 9] === val))
			return false
		if (((Math.floor(row / 3) * 27 + Math.floor(col / 3) * 3 + i % 3 + Math.floor(i / 3) * 9) !== index) 
			&& (board[(Math.floor(row / 3) * 27 + Math.floor(col / 3) * 3 + i % 3 + Math.floor(i / 3) * 9)]) === val)
			return false
	}
	return true
}


const solveBoard = (board, index = 0) => {
	if (index >= 81) return true

	if (board[index] !== 0) {
		if (!checkCell(board, index)) return false;
		return solveBoard(board, index + 1);
	}
	for (var i = 1; i <= 9; i++) {
		board[index] = i;
		if (checkCell(board, index)) {
			if (solveBoard(board, index + 1)) return true;
		}
	}
	board[index] = 0;
	return false;
}

const Sudoku = {
	generate: generateRandomPuzzle,
	check: checkBoard,
	solve: solveBoard
}

export default Sudoku
