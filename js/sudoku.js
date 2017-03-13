function Sudoku() {

	// ========================================  Public Methods ===============================================

	this.puzzle = []; // aka initial board
	this.board = []; // aka current board

	this.init = function() {
		this.puzzle = initPuzzle();
		this.board = new Array(9);
		for (var i = 0; i < 9; i++) this.board[i] = this.puzzle[i].slice(0);
	};

	this.initZeros = function() {
		this.puzzle = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0]
		];
		this.board = new Array(9);
		for (var i = 0; i < 9; i++) this.board[i] = this.puzzle[i].slice(0);
	};

	this.update = function(val, row, col) {
		this.board[row][col] = val;
	};

	// return {solved: true, row: -1, col: -1} if puzzle if solved
	// return {solved: false, row: "row of first invalid cell", col: "col of first invalid cell"} otherwise	
	this.check = function() {
		return checkPuzzle(this.board);
	};

	// solve the current board and return true if it is solvable
	// otherwise return false 
	this.solve = function() {
		return solvePuzzle(this.board);
	};

	this.printStates = function() {
		// print puzzle
		var out = "intial puzzle:\n";
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++) out += this.puzzle[i][j] + " "
			out += "\n";
		}
		console.log(out);

		// print board
		out = "current board:\n";
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++) out += this.board[i][j] + " "
			out += "\n";
		}
		console.log(out);
	};


	// ========================================  Private Methods ===============================================

	// generate a random puzzle by shuffling a "basic board" and leaving out some cells
	function initPuzzle() {
		var puzzle = [ 
			[1, 2, 3, 4, 5, 6, 7, 8, 9], 
			[4, 5, 6, 7, 8, 9, 1, 2, 3],
		  	[7, 8, 9, 1, 2, 3, 4, 5, 6],
		  	[2, 1, 4, 3, 6, 5, 8, 9, 7],
		  	[3, 6, 5, 8, 9, 7, 2, 1, 4],
		  	[8, 9, 7, 2, 1, 4, 3, 6, 5],
		  	[5, 3, 1, 6, 4, 2, 9, 7, 8],
		  	[6, 4, 2, 9, 7, 8, 5, 3, 1],
		  	[9, 7, 8, 5, 3, 1, 6, 4, 2]
		];
		shufflePuzzle(puzzle);
		removeCells(puzzle);
		return puzzle;
	}

	function shufflePuzzle(puzzle) {
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
		for (var i = 0; i < 3; i++) {		
			var col1 = 3 * i;
			var col2 = 3 * i + Math.floor(Math.random() * 3);
			swapCols(puzzle, col1, col2);
			col1 = 3 * i + 1;
			col2 = 3 * i + 1 + Math.floor(Math.random() * 2);
			swapCols(puzzle, col1, col2);
		}
	}

	function swapRows(puzzle, row1, row2) {
		if (row1 == row2) return;
		var temp = puzzle[row2];
		puzzle[row2] = puzzle[row1];
		puzzle[row1] = temp;
	}

	function swapCols(puzzle, col1, col2) {
		if (col1 == col2) return;
		for (var i = 0; i < 9; i++) {
			var temp = puzzle[i][col2];
			puzzle[i][col2] = puzzle[i][col1];
			puzzle[i][col1] = temp;
		}
	}

	// set ~ 25 out of 81 cells to 0
	function removeCells(puzzle) {
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++) {
				var r = Math.floor(Math.random() * 81) + 1;
				if (r > 25) puzzle[i][j] = 0;
			}
		}
	}

	// check if a puzzle is valid
	function checkPuzzle(puzzle) {
		for (var i = 0; i < 9; i++) {
			var b1 = checkRow(puzzle, i);
			if (!b1.solved) return b1;
			var b2 = checkCol(puzzle, i);
			if (!b2.solved) return b2;
			var b3 = checkBlk(puzzle, i);
			if (!b3.solved) return b3;
		}
		return {
			solved: true,
			row: -1,
			col: -1
		}
	}

	// check if a row is valid
	function checkRow(puzzle, row) {
		var ocur = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (var i = 0; i < 9; i++) {
			var val = puzzle[row][i];
			if (val < 1 || 9 < val) {
				return {
					solved: false,
					row: row,
					col: i
				};
			}
			ocur[val]++;
			if (ocur[val] > 1) {
				return {
					solved: false,
					row: row,
					col: i
				};
			} 
		}
		return {
			solved: true,
			row: -1,
			col: -1
		};
	}

	// check if a column is valid
	function checkCol(puzzle, col) {
		var ocur = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (var i = 0; i < 9; i++) {
			var val = puzzle[i][col];
			if (val < 1 || 9 < val) {
				return {
					solved: false,
					row: row,
					col: i
				};
			}
			ocur[val]++;
			if (ocur[val] > 1) {
				return {
					solved: false,
					row: i,
					col: col
				};
			}
		}
		return {
			solved: true,
			row: -1,
			col: -1
		};
	}

	// check if a 3 x 3 block is valid
	function checkBlk(puzzle, blk) {
		var ocur = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		var row = Math.floor(blk / 3) * 3;
		var col = (blk % 3) * 3;
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				var val = puzzle[row + i][col + j];
				if (val < 1 || 9 < val) {
					return {
						solved: false,
						row: row + i,
						col: col + j
					};
				}
				ocur[val]++;
				if (ocur[val] > 1) {
					return {
						solved: false,
						row: row + i,
						col: col + j
					};
				}
			}
		}
		return {
			solved: true,
			row: -1,
			col: -1
		};
	}

	// check if a single cell is valid
	function checkCell(puzzle, row, col) {
		return checkCellInRow(puzzle, row, col) && checkCellInCol(puzzle, row, col) && checkCellInBlk(puzzle, row, col);
	}

	function checkCellInRow(puzzle, row, col) {
		var val = puzzle[row][col];
		for (var i = 0; i < 9; i++) {
			if (i != col && puzzle[row][i] == val) {
				return false;
			}
		}
		return true;
	}

	function checkCellInCol(puzzle, row, col) {
		var val = puzzle[row][col];
		for (var i = 0; i < 9; i++) {
			if (i != row && puzzle[i][col] == val) {
				return false;
			}
		}
		return true;
	}

	function checkCellInBlk(puzzle, row, col) {
		var val = puzzle[row][col];
		var blockRow = Math.floor(row / 3) * 3;
		var blockCol = Math.floor(col / 3) * 3;
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if (blockRow + i != row && blockCol + j != col && puzzle[blockRow + i][blockCol + j] == val) {
					return false;
				}
			}
		}
		return true;
	}

	function solvePuzzle(puzzle, row, col) {
		if (row === undefined || col === undefined) return solvePuzzle(puzzle, 0, 0);
		if (row > 8) return true;
		if (puzzle[row][col] !== 0) {
			if (!checkCell(puzzle, row, col)) return false;
			return solvePuzzle(puzzle, row + Math.floor((col + 1)/9), (col + 1) % 9);
		}
		for (var i = 1; i <= 9; i++) {
			puzzle[row][col] = i;
			if (checkCell(puzzle, row, col)) {
				if (solvePuzzle(puzzle, row + Math.floor((col + 1)/9), (col + 1) % 9)) return true;
			}
		}
		puzzle[row][col] = 0;
		return false;
	}
}