import React from 'react'
import Cell from './Cell'

const Board = ({ board, puzzle, invalidIndex, onCellClick }) => {
	var boardDOM = []
	for (var i = 0; i < 9; i++) {
		var rowDOM = []
		for (var j = 0; j < 9; j++) {
			const index = i * 9 + j;
			rowDOM.push(
					<Cell 
						key={index} 
						value={board[index]} 
						initial={puzzle[index] !== 0}
						invalid={invalidIndex === index} 
						onClick={() => onCellClick(index)}
					/>
			)
		}
		boardDOM.push(
			<tr key={i}>{rowDOM}</tr>
		)
	}
	return (
		<div className='board'>
			<table>
				<tbody>
					{boardDOM}
				</tbody>
			</table>
		</div>
	)
	
}

export default Board