const gameboardArray = [];
const playerTurnElem = document.getElementById('player-turn');

// Create new cell object with returnable index and inner content
const createCell = (index, marker) => {
    return {index, marker};
};

// Fill array with 9 cell objects
const fillArray = () => {
    gameboardArray.length = 0;
    for (let i = 0; i < 9; i++) {
        // Create cell and push to end of array
        const cell = createCell(i, null);
        gameboardArray.push(cell);
    }
};

// Create gameBoard DOM
function createBoardElem() {
    // Create board DOM, add class
    const gameBoardElem = document.createElement('div');
    gameBoardElem.id = "game-board-elem";

    // Loop through array, create cell DOM, add class
    gameboardArray.forEach(cell => {
        const newCell = document.createElement('div');
        newCell.classList = "game-board-cell";
        newCell.id = cell.index;
        newCell.addEventListener('click', placeMarker);
        newCell.addEventListener('mousedown', function(e) {
            e.preventDefault();
        }, false);
        gameBoardElem.appendChild(newCell);
    })
    document.body.appendChild(gameBoardElem);

    playerTurnElem.innerHTML = `Player ${currentPlayer.marker}'s turn`;
}

function placeMarker() {
    if (this.innerHTML == "") {
        this.innerHTML = currentPlayer.marker;
        gameboardArray[this.id].marker = currentPlayer.marker;
    } else {
        return;
    }

    if (checkWin() == "tie") {
        gameTie();
    } else if (checkWin()) {
        playerWin();
    } else {
        togglePlayer();
    }
}

// Toggle turns
function togglePlayer() {
    if (currentPlayer == p1) {
        currentPlayer = p2;
        playerTurnElem.innerHTML = `Player ${p2.marker}'s turn`;
    } else {
        currentPlayer = p1;
        playerTurnElem.innerHTML = `Player ${p1.marker}'s turn`;
    }
}

// Create new player
const player = (marker) => {
    return {marker};
}

function checkWin() {
    let a = gameboardArray;
    // Horizontal check
    for (let i = 0; i < 9; i+=3) {
        if ((a[i].marker != null) && (a[i].marker == a[i+1].marker) 
        && (a[i+1].marker == a[i+2].marker)) {
            return true;
        }
    }

    // Vertical check
    for (let i = 0; i < 3; i++) {
        if ((a[i].marker != null) && (a[i].marker == a[i+3].marker) 
        && (a[i+3].marker == a[i+6].marker)) {
            return true;
        }
    }

    // Diagonal check

    if ((a[0].marker != null) && (a[0].marker == a[4].marker) && (a[4].marker == a[8].marker)) {
        return true;
    } else if ((a[2].marker != null) && (a[2].marker == a[4].marker) && (a[4].marker == a[6].marker)) {
        return true;
    }

    // Tie check
    function markerNull(e) {
        return e.marker != null;
    }
    if (a.every(markerNull)) {
        return "tie";
    }

    return false;
}

function playerWin() {
    playerTurnElem.innerHTML = `Player ${currentPlayer.marker} wins!`;
    const playAgainBtn = document.createElement('button');
    playAgainBtn.classList = "play-again-btn";
    playAgainBtn.innerHTML = "Play again?";
    playAgainBtn.addEventListener('click', playAgain);

    playerTurnElem.appendChild(playAgainBtn);
    const cells = document.getElementsByClassName('game-board-cell');
    for (const cell of cells) {
        cell.removeEventListener('click', placeMarker);
    }
}

function gameTie() {
    const playAgainBtn = document.createElement('button');
    playerTurnElem.innerHTML = "Game tied";
    playAgainBtn.classList = "play-again-btn";
    playAgainBtn.innerHTML = "Play again?";

    playAgainBtn.addEventListener('click', playAgain);

    playerTurnElem.appendChild(playAgainBtn);
}

function playAgain() {
    document.getElementById('game-board-elem').remove();
    togglePlayer();
    fillArray();
    createBoardElem();
}

const p1 = player("X");
const p2 = player("O");
let currentPlayer = p1;

fillArray();
createBoardElem();