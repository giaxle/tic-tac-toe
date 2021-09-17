// player factory function
const createPlayer = (name, marker) => {
    return {name, marker};
}

// gameboard gameboard object
const GameBoard = (() => {
    
    let board = [];
    for (let i = 0; i < 9; i++) {
        board.push('');
    }

    function displayGame() {

        // display cells for each array item
        const gameContainer = document.querySelector('.gameContainer');
        const gameBoard = document.createElement('div');
        gameBoard.classList.add('grid');
        gameContainer.appendChild(gameBoard);

        board.forEach((item, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            gameBoard.appendChild(cell);
        })
        
        // add event listeners for each cell 
        Array.from(gameBoard.children).forEach((cell, index) => {
            cell.addEventListener('click', () => {
                // display active player marker
                cell.classList.add(game.activePlayer.marker);
    
                // update the array to match active player marker
                this.board[index] = game.activePlayer.marker;
                // console.log(this.board);
    
                // remove event listener
                cell.style.pointerEvents = 'none';
    
                // update remaining turns
                game.turnsRemaining -= 1;
                console.log(game.turnsRemaining);
    
                // check for win after player turn
                game.playerWin();
                if (game.winnerDeclared === false) {
                    if (game.turnsRemaining > 0) {
                        // console.log('fucker');
                        game.nextPlayer();
                        game.showPlayerTurn();
                        // console.log(game.activePlayer);
                    } else if (game.turnsRemaining === 0) {
                        game.declareTie();
                    }
                }
            })
        })
    }
    

    // add event listeners to each cell
    function addBoardEvent() {
        
    }
    
    function resetGame() {
        this.board = [];
        for (let i = 0; i < 9; i++) {
            this.board.push('');
        }
        const removeOldBoard = document.querySelector('.gameContainer');
        const oldBoard = document.querySelector('.grid')
        removeOldBoard.removeChild(oldBoard);
        game.winnerDeclared = false;
        game.turnsRemaining = 9;
        game.activePlayer = game.playerOne;
        this.displayGame();
    }

    return {
        board,
        displayGame,
        addBoardEvent,
        resetGame,
    };
})();

// game object
const game = (() => {

    // start game screen and event listener
    const startScreen = document.querySelector('#overlay');
    const startGameBtn = document.querySelector('#startGame');
    startGameBtn.addEventListener('click', () => {
        startScreen.style.display = 'none';
        GameBoard.displayGame();
    })


    // declare players
    const playerOne = createPlayer('Player 1', 'x');
    const playerTwo = createPlayer('Player 2', 'o');

    // game beginning variables
    let activePlayer = playerOne;
    let winnerDeclared = false;
    let turnsRemaining = 9;

    // area for game text
    const gameText = document.querySelector('.gameText');
    gameText.textContent = `${activePlayer.name}'s turn...`

    // // add game events
    // GameBoard.addBoardEvent();

    // changes player after the activePlayer makes their turn
    function nextPlayer() {
        this.activePlayer === playerOne ? this.activePlayer = playerTwo : this.activePlayer = playerOne;
        // console.log(this.activePlayer);
    }

    // endgamescreen event listener
    const restartBtn = document.querySelector('#playAgain');
    restartBtn.addEventListener('click', () => {
        // console.log('works');
        const overlay = document.querySelector('#overlay');
        overlay.style.display = 'none';
        GameBoard.resetGame();
    })

    // winning conditions
    const winCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    function playerWin() {
        winCombos.forEach((item, index) => {
            if (GameBoard.board[item[0]] === this.activePlayer.marker && GameBoard.board[item[1]] === this.activePlayer.marker && GameBoard.board[item[2]] === this.activePlayer.marker) {
                // console.log('winner');
                this.winnerDeclared = true;

                // removes startscreen modal and displays endScreen modal on overlay
                const overlay = document.querySelector('#overlay');
                const removeStartModal = document.querySelector('#startScreen');
                const displayEndModal = document.querySelector('#endScreen')

                // removes start screen from overlay
                removeStartModal.style.display = 'none';

                // displays overlay and adds endScreen
                overlay.style.display = 'block';
                displayEndModal.style.display = 'block';

                // displays results from game 
                const result = document.querySelector('#result');
                result.textContent = `${this.activePlayer.name} has won!`;
            }
        })
    }

    function declareTie() {
        // removes startscreen modal and displays endScreen modal on overlay
        const overlay = document.querySelector('#overlay');
        const removeStartModal = document.querySelector('#startScreen');
        const displayEndModal = document.querySelector('#endScreen')

        // removes start screen from overlay
        removeStartModal.style.display = 'none';

        // displays overlay and adds endScreen
        overlay.style.display = 'block';
        displayEndModal.style.display = 'block';
        const tie = document.querySelector('#result');
        tie.textContent = "It was a tie!"
    }

    // player turn display
    function showPlayerTurn() {
        gameText.textContent = `${this.activePlayer.name}'s turn...`;
    }

    return {
        activePlayer,
        playerOne,
        playerTwo,
        winnerDeclared,
        turnsRemaining,
        winCombos,
        nextPlayer,
        playerWin,
        declareTie,
        showPlayerTurn,
    }
})();