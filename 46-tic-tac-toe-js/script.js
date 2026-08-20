const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const scoreXEl = document.getElementById("score-x");
const scoreOEl = document.getElementById("score-o");
const scoreDrawEl = document.getElementById("score-draw");
const restartBtn = document.getElementById("restart-btn");
const resetScoresBtn = document.getElementById("reset-scores-btn");

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = [];
let currentPlayer = "X";
let gameOver = false;
let scores = { X: 0, O: 0, draw: 0 };

function createBoard() {
  boardEl.innerHTML = "";
  board = Array(9).fill(null);
  currentPlayer = "X";
  gameOver = false;
  boardEl.classList.remove("draw");
  updateStatus();

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("button");
    cell.className = "cell";
    cell.type = "button";
    cell.dataset.index = i;
    cell.setAttribute("aria-label", "Cell " + (i + 1));
    cell.addEventListener("click", () => handleMove(i, cell));
    boardEl.appendChild(cell);
  }
}

function handleMove(index, cell) {
  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken", currentPlayer.toLowerCase());

  const win = checkWin(currentPlayer);

  if (win) {
    gameOver = true;
    win.pattern.forEach((idx) => {
      boardEl.children[idx].classList.add("win");
    });
    scores[currentPlayer]++;
    renderScores();
    statusEl.textContent = "Player " + currentPlayer + " wins!";
    statusEl.classList.add("won");
    return;
  }

  if (board.every((cellValue) => cellValue !== null)) {
    gameOver = true;
    scores.draw++;
    renderScores();
    boardEl.classList.add("draw");
    statusEl.textContent = "It's a draw!";
    statusEl.classList.remove("won");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus();
}

function checkWin(player) {
  for (const pattern of WIN_PATTERNS) {
    if (pattern.every((index) => board[index] === player)) {
      return { player, pattern };
    }
  }
  return null;
}

function updateStatus() {
  statusEl.textContent = "Player " + currentPlayer + "'s turn";
  statusEl.classList.remove("won");
}

function renderScores() {
  scoreXEl.textContent = scores.X;
  scoreOEl.textContent = scores.O;
  scoreDrawEl.textContent = scores.draw;
}

function resetScores() {
  scores = { X: 0, O: 0, draw: 0 };
  renderScores();
  createBoard();
}

restartBtn.addEventListener("click", createBoard);
resetScoresBtn.addEventListener("click", resetScores);

createBoard();
renderScores();
