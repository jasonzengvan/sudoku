export const incrementCell = index => {
  return {
    type: 'INCREMENT_CELL',
    index: index
  }
}

export const initPuzzle = puzzle => {
  return {
    type: 'INIT_PUZZLE',
    puzzle: puzzle
  }
}

export const setBoard = board => {
  return {
    type: 'SET_BOARD',
    board: board
  }
}

export const setSolved = solved => {
  return {
    type: 'SET_SOLVED',
    solved: solved
  }
}

export const setInvalidIndex = invalidIndex => {
  return {
    type: 'SET_INVALID_INDEX',
    invalidIndex: invalidIndex
  }
}

export const setSolvable = solvable => {
  return {
    type: 'SET_SOLVABLE',
    solvable: solvable
  }
}