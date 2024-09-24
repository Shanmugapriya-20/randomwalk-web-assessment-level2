let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-button');
const modal = document.getElementById('resultModal');
const modalMessage = document.getElementById('modalMessage');
const restartButton = document.getElementById('restartButton');
const continueButton = document.getElementById('continueButton');
const playerXScore = document.getElementById('playerX-score');
const playerOScore = document.getElementById('playerO-score');
let scoreX = 0;
let scoreO = 0;

// Handles the player click on a cell
function handleClick(event) {
    const index = event.target.getAttribute('data-index');

    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer);

    checkResult();
}

// Check if there's a winner or a draw
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        modal.style.display = 'block';
        modalMessage.textContent = `Congratulations, Player ${currentPlayer} Wins!`;
        gameActive = false;
        updateScore();
    } else if (!board.includes('')) {
        modal.style.display = 'block';
        modalMessage.textContent = 'It\'s a Draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    }
}

// Update the score of the winning player
function updateScore() {
    if (currentPlayer === 'X') {
        scoreX++;
        playerXScore.textContent = scoreX;
    } else {
        scoreO++;
        playerOScore.textContent = scoreO;
    }
}

// Reset the game state but keep the scores intact for the 'Continue Match' button
function continueMatch() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';

    // Clear the cells on the board
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });

    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    modal.style.display = 'none';  // Close the modal
}

// Fully reset the game state and scores for the 'Restart' button
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    scoreX = 0;
    scoreO = 0;
    playerXScore.textContent = scoreX;
    playerOScore.textContent = scoreO;

    // Clear the cells on the board
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });

    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    modal.style.display = 'none';  // Close the modal
}

// Event listener for resetting the game (clear scores)
restartButton.addEventListener('click', resetGame);

// Event listener for continuing the match (keep scores)
continueButton.addEventListener('click', continueMatch);

// Reset button at the bottom of the page (manually triggered reset)
resetButton.addEventListener('click', resetGame);

// Attach event listeners to each cell for user interactions
cells.forEach(cell => cell.addEventListener('click', handleClick));
