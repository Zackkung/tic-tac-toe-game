const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
const playerScoreDisplay = document.getElementById('player-score');
const botScoreDisplay = document.getElementById('bot-score');

let currentPlayer = 'X';
let gameActive = true;
let isBotPlaying = true;
let playerScore = 0;
let botScore = 0;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = parseInt(cell.id);
  if (!gameActive || cell.textContent !== '') {
    return;
  }
  cell.textContent = currentPlayer;
  const winningPlayer = checkWin();
  if (winningPlayer) {
    endGame(winningPlayer);
  } else if (checkDraw()) {
    endGame(null);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Current player: ${currentPlayer}`;
    if (isBotPlaying && currentPlayer === 'O') {
      setTimeout(playBot, 1000);
    }
  }
}

function checkWin() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (cells[a].textContent === currentPlayer && 
        cells[b].textContent === currentPlayer && 
        cells[c].textContent === currentPlayer) {
      return currentPlayer;
    }
  }
  return null;
}

function checkDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function endGame(winningPlayer) {
  gameActive = false;
  const messageText = winningPlayer ? `${winningPlayer} wins!` : "It's a draw!";
  message.textContent = messageText;
  if (winningPlayer === 'X') {
    playerScore++;
    playerScoreDisplay.textContent = playerScore;
  } else if (winningPlayer === 'O') {
    botScore++;
    botScoreDisplay.textContent = botScore;
  }
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  message.textContent = `Current player: ${currentPlayer}`;
  cells.forEach(cell => cell.textContent = '');
}

function playBot() {
  const availableCells = [...cells].filter(cell => cell.textContent === '');
  const randomIndex = Math.floor(Math.random() * availableCells.length);
  const cellIndex = parseInt(availableCells[randomIndex].id);
  availableCells[randomIndex].textContent = 'O';
  const winningPlayer = checkWin();
  if (winningPlayer) {
    endGame(winningPlayer);
  } else if (checkDraw()) {
    endGame(null);
  } else {
    currentPlayer = 'X';
    message.textContent = `Current player: ${currentPlayer}`;
  }
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
