# Sudoku
A classic sudoku game built with HTML and javascript  
Play it here [Sudoku](https://jsnzng.github.io/sudoku/)!

### Screenshot
<p align="center">
	<img  width="433" src="https://cloud.githubusercontent.com/assets/14325523/19414852/f35ee6d2-930f-11e6-815b-7f5f086d7391.png" alt="Screenshot"/>
</p>

### Algorithms
##### Randomized Puzzle Generation
1. First generate the "default" solved board by calling solve() on an empty board.  
2. For i = 0:2  
a. Randomly swap two of row(3 x i), (3 x i + 1), (3 x i + 2)  
b. Again, randomly swap two of row(3 x i), (3 x i + 1), (3 x i + 2)  
c. Randomly swap two of column(3 x i), (3 x i + 1), (3 x i + 2)  
d. Again, randomly swap two of column(3 x i), (3 x i + 1), (3 x i + 2)  
3. empty some cells of the full board to make it a puzzle

##### Puzzle Solving
This program basically runs a brute-force search algorithm since there is no better algorithm.  
It tries all possibilities until find a valid solution or notify the player to clean some invalid cells.
