document.addEventListener("DOMContentLoaded", () => {
    let cards = [];
    let flippedCards = [];
    let matchedCards = [];
    let gameStarted = false;
    let numCards = 4;

    const gameBoard = document.getElementById('gameBoard');
    const status = document.getElementById('status');
    const restartBtn = document.getElementById('restartBtn');
    
    const easyBtn = document.getElementById('easyBtn');
    const mediumBtn = document.getElementById('mediumBtn');
    const hardBtn = document.getElementById('hardBtn');


    easyBtn.addEventListener('click', () => startGame(4));
    mediumBtn.addEventListener('click', () => startGame(8));
    hardBtn.addEventListener('click', () => startGame(12));

    restartBtn.addEventListener('click', () => startGame(numCards));


    function generateColors(n) {
        const colors = [
            "#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#FF8C33", "#33FFF5", "#F5FF33", "#9C33FF",
            "#FF33A6", "#F5FF33", "#33F5A6", "#33F5FF", "#5733FF", "#5733F5", "#F533FF", "#FF5733"
        ];

        const selectedColors = [];
        const numPairs = n / 2;

        for (let i = 0; i < numPairs; i++) {
            selectedColors.push(colors[i], colors[i]);
        }


        for (let i = selectedColors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [selectedColors[i], selectedColors[j]] = [selectedColors[j], selectedColors[i]];  // Swap
        }

        return selectedColors;
    }


    function createBoard(colorValues) {
        gameBoard.innerHTML = '';
        matchedCards = [];

        colorValues.forEach((color, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.backgroundColor = '#009688';
            card.dataset.color = color;
            card.addEventListener('click', () => flipCard(card));
            gameBoard.appendChild(card);
        });


        gameBoard.className = 'game-board';
        if (numCards === 4) {
            gameBoard.classList.add('card-4');
        } else if (numCards === 8) {
            gameBoard.classList.add('card-8');
        } else if (numCards === 12) {
            gameBoard.classList.add('card-12');
        }
    }


    function flipCard(card) {
        if (flippedCards.length < 2 && !card.classList.contains('flipped') && !matchedCards.includes(card)) {
            card.classList.add('flipped');
            card.style.backgroundColor = card.dataset.color;
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }


    function checkMatch() {
        const [card1, card2] = flippedCards;
        
        if (card1.dataset.color === card2.dataset.color) {
            matchedCards.push(card1, card2);
            card1.classList.add('matched');
            card2.classList.add('matched');
            status.textContent = 'Match Found!';
            flippedCards = [];
            if (matchedCards.length === numCards) {
                status.textContent = 'You Win! Click Restart to play again.';
                restartBtn.disabled = false;
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.style.backgroundColor = '#009688';
            card2.style.backgroundColor = '#009688';
            flippedCards = [];
            status.textContent = 'Try Again!';
        }
    }


    function startGame(n) {
        numCards = n;
        matchedCards = [];
        flippedCards = [];
        restartBtn.disabled = true;
        gameStarted = true;
        status.textContent = 'Game Started!';

        const colorValues = generateColors(n);
        createBoard(colorValues);
    }
});