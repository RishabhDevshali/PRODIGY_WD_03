const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restart = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", ""];

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const index = Array.from(cells).indexOf(event.target);

    if (board[index] !== "" || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {
    let winner = null;

    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            winner = board[a];
            break;
        }
    }

    if (winner) {
        status.textContent = `Player ${winner} Wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        status.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
    board = ["", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = "";
    });

    status.textContent = "Player X's Turn";
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restart.addEventListener("click", restartGame);