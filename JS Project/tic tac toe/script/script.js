document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    const scoreDisplay = document.getElementById('score');

    let board = ['', '', '', '', '', '', '', '', ''];
    let playerTurn = true;
    let playerScore = 0;
    let computerScore = 0;
    let gameOver = false;

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];


    function initializeGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        playerTurn = true;
        status.textContent = "Your Turn (X)";
        cells.forEach(cell => cell.textContent = '');
        restartButton.disabled = true;
        gameOver = false;
    }

    // Handle player's move
    function playerMove(cellIndex) {
        if (board[cellIndex] === '' && !gameOver) {
            board[cellIndex] = 'X';
            cells[cellIndex].textContent = 'X';
            checkWin('Player');
            if (!gameOver) {
                playerTurn = false;
                status.textContent = "Computer's Turn (O)";
                setTimeout(computerMove, 500);
            }
        }
    }


    function computerMove() {
        if (gameOver) return;

        const bestMove = getBestMove();
        board[bestMove] = 'O';
        cells[bestMove].textContent = 'O';
        checkWin('Computer');
        if (!gameOver) {
            playerTurn = true;
            status.textContent = "Your Turn (X)";
        }
    }


    function checkWin(player) {
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                declareWinner(player);
                return;
            }
        }
        if (!board.includes('')) {
            declareWinner('Draw');
        }
    }


    function declareWinner(winner) {
        gameOver = true;

        if (winner === 'Player') {
            playerScore++;
            alert("You Win!");
        } else if (winner === 'Computer') {
            computerScore++;
            alert("You Lose!");
        } else {
            alert("It's a Draw!");
        }

        scoreDisplay.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
        status.textContent = winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`;
        restartButton.disabled = false;
    }


    function getBestMove() {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                if (checkForWin('O')) {
                    board[i] = '';
                    return i;
                }
                board[i] = '';
            }
        }
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                if (checkForWin('X')) {
                    board[i] = '';
                    return i;
                }
                board[i] = '';
            }
        }
        return board.indexOf('') !== -1 ? board.indexOf('') : 4;
    }


    function checkForWin(player) {
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] === player && board[b] === player && board[c] === player;
        });
    }


    cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
            const cellIndex = parseInt(e.target.id);
            playerMove(cellIndex);
        });
    });


    restartButton.addEventListener('click', () => {
        initializeGame();
    });


    initializeGame();
});