function swapRows(puzzle, row1, row2) {
	for (var i = 0; i < 9; i++) {
		var index1 = row1 * 9 + i;
		var index2 = row2 * 9 + i;
		var temp = puzzle[index1];
		puzzle[index1] = puzzle[index2];
		puzzle[index2] = temp;
	}
}

function swapCols(puzzle, col1, col2) {
	for (var i = 0; i < 9; i++) {
		var index1 = col1 + i * 9;
		var index2 = col2 + i * 9;
		var temp = puzzle[index1];
		puzzle[index1] = puzzle[index2];
		puzzle[index2] = temp;
	}
}

function shufflePuzzle(puzzle) {
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 2; j++) {
			var row1 = 3 * i + Math.floor(Math.random() * 3);
			var row2 = 3 * i + Math.floor(Math.random() * 3);
			swapRows(puzzle, row1, row2);

			var col1 = 3 * i + Math.floor(Math.random() * 3);
			var col2 = 3 * i + Math.floor(Math.random() * 3);
			swapCols(puzzle, col1, col2);
		}
	}
}

function generatePuzzle() {
	var puzzle = new Array(81).fill(0);
	solvePuzzle(puzzle, 0);
	shufflePuzzle(puzzle);
	
	if (!checkPuzzle(puzzle)) {
		console.error("puzzle is invalid");
	}

	// replace a cell with 0 with probability of (81-25)/81
	// thus keeps around 25 filled cells
	var rand;
	for (var i = 0; i < 81; i++) {
		rand = Math.floor(Math.random() * 81);
		if (rand >= 25) {
			puzzle[i] = 0;
		}
	}

	return puzzle;
}

function getBoard() {
	var puzzle = new Array(81);
	for (var i = 0; i < 81; i++) {
		var el = document.getElementById(i);
		var cell = el.children[0];
		var val = 0;
		var value = "";

		if (cell.tagName === "SPAN") {
			value = cell.textContent;
		} else if (cell.tagName === "INPUT") {
			value = cell.value;
		}

		if (value.match(/^[1-9]$/)) {
			val = parseInt(value);
		}

		puzzle[i] = val;
	}
	return puzzle;
}

function checkCellInRow(puzzle, index, value) {
	var row = Math.floor(index/9);
	for (var i = 0; i < 9; i++) {
		if ((row * 9 + i) != index && puzzle[row * 9 + i] == value) {
			return 0;
		}
	}
	return 1;
}

function checkCellInCol(puzzle, index, value) {
	var col = Math.floor(index%9);
	for (var i = 0; i < 9; i++) {
		if ((col + i * 9) != index && puzzle[col + i * 9] == value) {
			return 0;
		}
	}
	return 1;
}

function checkCellInBlk(puzzle, index, value) {
	var blockRow = Math.floor(index/27)*3;
	var blockCol = Math.floor((index%9)/3)*3;
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if ((blockRow+i)*9+(blockCol+j) != index && puzzle[(blockRow+i)*9+(blockCol+j)] == value) {
				return 0;
			}
		}
	}
	return 1;
}

function checkCell(puzzle, index, value) {
	return checkCellInRow(puzzle, index, value) && checkCellInCol(puzzle, index, value) && checkCellInBlk(puzzle, index, value);
}

function solvePuzzle(puzzle, index) {
	if (index < 0) {
		console.error("Unexpected index");
	}
	if (index >= 81) {
		return 1;
	}
	var val = puzzle[index];
	if (val) {
		return solvePuzzle(puzzle, index+1);
	}
	var row = Math.floor(index/9);
	var col = Math.floor(index%9);
	for (var guess = 1; guess <= 9; guess++) {
		if (checkCell(puzzle, index, guess)) {
			puzzle[index] = guess;
			if (solvePuzzle(puzzle, index+1) == 1) {
				return 1;
			}
			puzzle[index] = val;
		}
	}
	return 0;
}

// returns i, the index of invalid guess, if not a valid solution to puzzle,
//         -1, if a valid solution
function checkPuzzle(puzzle) {

	for (var i = 0; i < 81; i++) {
		var val = puzzle[i];
		var isEmpty = !val;
		var isValid = !checkCell(puzzle, i, val);
		if (isEmpty || isValid) {
			return i;
		}
	}
	return -1;
}

function checkBoard() {
	// reset color
	renderPuzzle(getBoard());

	var isBoardValid = checkPuzzle(getBoard());
	if (isBoardValid != -1) {
		highlightInvalidCell(isBoardValid);
		popMessage("The highlighted cell is not valid!");
	} else {
		popMessage("Congratulation! You did it!");
	}
	return isBoardValid;
}

function clearMessage() {
	popMessage("");
}

function popMessage(message) {
	var el = document.getElementById("gameMessage");
	el.innerHTML = message;
}

function highlightInvalidCell(index) {
	var el = document.getElementById(index);
	el.style.backgroundColor = "#ffffff";
}

function renderNewPuzzle(puzzle) {
	clearMessage();
	for (var i = 0; i < 81; i++) {
		var el = document.getElementById(i);
		el.removeAttribute("style");
		var val = puzzle[i];
		var cell;
		var elClass;

		if (val === 0) {
			cell = document.createElement("input");
			cell.setAttribute("maxlength", 1);
			elClass = "editable";
		} else {
			cell = document.createElement("span");
			cell.textContent = val;
			elClass = "static";
		}
		
		el.innerHTML = "";
		el.setAttribute("class", elClass);
		el.appendChild(cell);
	}
}

function renderPuzzle(puzzle) {
	clearMessage();
	for (var i = 0; i < 81; i++) {
		var el = document.getElementById(i);
		el.removeAttribute("style");
		var val = puzzle[i];
		var cell = el.children[0];
		if (cell.tagName == "INPUT") {
			if (puzzle[i] != 0) {
				cell.value = puzzle[i];
			}
		}
	}
}

function printPuzzle(puzzle) {
	var cout = "The current puzzle is:";
	for (var i = 0; i < 81; i++) {
		if (i%9 == 0) {
			cout += '\n';
		}
		cout += puzzle[i] + " ";
	}
	console.log(cout);
}

function main() {
	var puzzle = generatePuzzle();
	renderNewPuzzle(puzzle);
	printPuzzle(getBoard());

	var solve = document.getElementById('solve');
	solve.addEventListener('click', function() {
		console.log("Solve on click");
		var board = getBoard();
		if(solvePuzzle(board, 0) && checkPuzzle(board)) {
			console.log("Puzzle solved");
			renderPuzzle(board);
			printPuzzle(board);
			popMessage("Here you go! This is the solution")
		} else {
			popMessage("Oops! Current board is not solvable Clear some invalid cells and try again");
		}
	}, false);

	var check = document.getElementById('check');
	check.addEventListener('click', function() {
		console.log("Check on click");
		var isValid = checkBoard();
		console.log("Puzzle Checked");
		if(isValid == -1) {
			console.log("Solution is valid");
		} else {
			console.log("Invalid guess at index " + isValid);
		}
	}, false);

	var newGame = document.getElementById('newGame');
	newGame.addEventListener('click', function() {
		console.log("New Game on click");
		puzzle = generatePuzzle();
		renderNewPuzzle(puzzle);
	}, false);

}

addEventListener('DOMContentLoaded', main, false);