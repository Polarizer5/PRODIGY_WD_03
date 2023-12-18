const boxes = document.querySelectorAll(".box");
const restartBtn = document.querySelector(".restart-btn");
const statusText = document.querySelector(".status");

const winConditions = [
  [0, 1, 2],

  [3, 4, 5],

  [6, 7, 8],

  [0, 3, 6],

  [1, 4, 7],

  [2, 5, 8],

  [0, 4, 8],

  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
  running = true;
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
  statusText.textContent = currentPlayer + "'s turn";
  restartBtn.addEventListener("click", restartGame);
}

function boxClicked() {
  const boxIndex = this.getAttribute("id");
  if (options[boxIndex] !== "" || !running) return;
  updateBox(this, boxIndex);
  checkWinner();
}

function updateBox(box, index) {
  options[index] = currentPlayer;
  if (currentPlayer == "X") {
    box.innerHTML = `<i class="fa-solid fa-x"></i>`;
  } else {
    box.innerHTML = `<i class="fa-solid fa-o"></i>`;
  }
}

function checkWinner() {
  let won = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const boxA = options[condition[0]];
    const boxB = options[condition[1]];
    const boxC = options[condition[2]];
    if (boxA == "" || boxB == "" || boxC == "") {
      continue;
    }
    if (boxA == boxB && boxB == boxC) {
      won = true;
      break;
    }
  }

  if (won) {
    statusText.textContent = `${currentPlayer} wins!`;

    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!`;

    running = false;
  } else {
    changePlayer();
  }
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";

  statusText.textContent = `${currentPlayer}'s turn`;
}

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  boxes.forEach((box) => (box.textContent = ""));
  running = true;
}
