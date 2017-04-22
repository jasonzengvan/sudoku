function GameManager() {

	// ======================================== Public ========================================
	this.init = function() {
		sudoku.init();
		clearMessage();
		renderBoard(sudoku.puzzle, sudoku.board);
		$("#newGame").on("click", this.init);
		$("#solve").on("click", this.solve);
		$("#check").on("click", this.check);
	};

	this.solve = function() {
		getBoard();
		resetHighlightedCell();
		if (sudoku.solve()) {
			renderBoard(sudoku.puzzle, sudoku.board);
			popMessage("Here you go! This is the solution");
		} else {
			popMessage("Oops! Current board is not solvable Clear some invalid cells and try again");
		}
	};

	this.check = function() {
		getBoard();
		resetHighlightedCell();
		var c = sudoku.check();
		console.log(c);
		if (c.solved) {
			popMessage("Congratulation! You did it!");
		}
		else {
			popMessage("The highlighted cell is not valid!");
			highlightedCell.row = c.row;
			highlightedCell.col = c.col;
			highlightCell(c.row, c.col);
		}
	};

	// ======================================== Private ========================================
	var sudoku = new Sudoku();
	var highlightedCell = {
		row: -1,
		col: -1
	};

	function renderBoard(puzzle, board) {
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++) {
				if (puzzle[i][j] == 0) {
					$("#" + (i * 9 + j)).attr('class', 'editable');
					$("#" + (i * 9 + j)).html("<input>");
					if (board[i][j] != 0) $("#" + (i * 9 + j) + " input").val(board[i][j]);
				} else {
					$("#" + (i * 9 + j)).attr('class', 'static');
					$("#" + (i * 9 + j)).html("<span>" + puzzle[i][j] + "</span>");
				}
			}
		}
	}

	function popMessage(message) {
		$("#message").html(message);
	}

	function clearMessage() {
		popMessage("");
	}

	function highlightCell(row, col) {
		$("#" + (row * 9 + col)).addClass('highlighted');
	}

	function resetHighlightedCell() {
		$("#" + (highlightedCell.row * 9 + highlightedCell.col)).removeClass('highlighted');
	}

	function getBoard() {
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++) {
				if (sudoku.puzzle[i][j] == 0) {
					var val = parseInt($("#" + (i * 9 + j) + " input").val());
					if (val >= 1 && val <= 9) sudoku.board[i][j] = val;
					else sudoku.board[i][j] = 0;
				}
			}
		}
		sudoku.printStates();
	}
}