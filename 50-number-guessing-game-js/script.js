const guessForm = document.getElementById("guess-form");
const guessInput = document.getElementById("guess-input");
const messageEl = document.getElementById("message");
const attemptsEl = document.getElementById("attempts");
const historyEl = document.getElementById("history");
const playAgainBtn = document.getElementById("play-again-btn");

const MIN = 1;
const MAX = 100;

let secretNumber = 0;
let attempts = 0;
let gameOver = false;

function newGame() {
  secretNumber = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
  attempts = 0;
  gameOver = false;
  attemptsEl.textContent = "0";
  historyEl.innerHTML = "";
  messageEl.hidden = true;
  playAgainBtn.hidden = true;
  guessInput.disabled = false;
  guessInput.value = "";
  guessInput.focus();
}

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = "message";
  if (type) messageEl.classList.add(type);
  messageEl.hidden = false;
}

function addHistory(guess, label, type) {
  const li = document.createElement("li");
  const guessSpan = document.createElement("span");
  const labelSpan = document.createElement("span");
  guessSpan.textContent = "Guess " + guess;
  labelSpan.textContent = label;
  li.appendChild(guessSpan);
  li.appendChild(labelSpan);
  li.className = type;
  historyEl.appendChild(li);
  historyEl.scrollTop = historyEl.scrollHeight;
}

guessForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (gameOver) return;

  const raw = guessInput.value.trim();
  if (raw === "") {
    showMessage("Please enter a number.", "error");
    return;
  }

  const guess = Number(raw);
  if (!Number.isInteger(guess) || guess < MIN || guess > MAX) {
    showMessage("Enter a whole number between 1 and 100.", "error");
    return;
  }

  attempts++;
  attemptsEl.textContent = String(attempts);
  guessInput.value = "";

  if (guess === secretNumber) {
    gameOver = true;
    guessInput.disabled = true;
    playAgainBtn.hidden = false;
    showMessage(
      "You got it! The number was " + secretNumber + ". Solved in " + attempts + " attempt" + (attempts > 1 ? "s" : "") + ".",
      "win"
    );
    addHistory(guess, "Correct!", "win");
    return;
  }

  if (guess > secretNumber) {
    showMessage("Too high! Try a smaller number.", "high");
    addHistory(guess, "Too high", "high");
  } else {
    showMessage("Too low! Try a bigger number.", "low");
    addHistory(guess, "Too low", "low");
  }

  guessInput.focus();
});

playAgainBtn.addEventListener("click", newGame);

newGame();