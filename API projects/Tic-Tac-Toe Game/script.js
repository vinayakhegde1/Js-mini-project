// Variables to keep track of game state
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Represents the game board
let gameActive = true; // Indicates if the game is currently active
let currentPlayer = 'X'; // Represents the current player ('X' or 'O')

// Function to handle a square click
function handleSquareClick(square, index) {
    // If the square is empty and the game is active
    if (gameBoard[index] === '' && gameActive) {
        // Update the square with the current player's symbol
        square.textContent = currentPlayer;
        gameBoard[index] = currentPlayer;

        // Check for a win or a tie
        if (checkWin(currentPlayer)) {
            // Display a win message
            gameActive = false;
            displayMessage(`Player ${currentPlayer} wins!`);
        } else if (isBoardFull()) {
            // If the board is full, it's a tie
            gameActive = false;
            displayMessage("It's a tie!");
        } else {
            // Switch to the other player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Function to check if a player has won
function checkWin(player) {
    // Define winning combinations
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Check if any of the winning combinations have all 'player' symbols
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player;
    });
}

// Function to check if the board is full
function isBoardFull() {
    return gameBoard.every(square => square !== '');
}

// Function to display a message on the screen
function displayMessage(message) {
    // Use the 'message' variable to display the message (e.g., show it on the screen or in a pop-up)
    alert(message);
}

// Function to handle a square reset
function resetSquare(square, index) {
    square.textContent = ''; // Clear the square
    gameBoard[index] = ''; // Clear the corresponding board position
    gameActive = true; // Set the game as active
    currentPlayer = 'X'; // Reset to the starting player
}

// Event listeners for each square
const squares = document.querySelectorAll('.square');
squares.forEach((square, index) => {
    square.addEventListener('click', () => {
        handleSquareClick(square, index);
    });
});

// Event listener for the restart button
const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', () => {
    // Reset each square and the game board
    squares.forEach((square, index) => {
        resetSquare(square, index);
    });
});

