const grid = document.getElementById("grid");
const targetColorSpan = document.getElementById("targetColor");
const scoreSpan = document.getElementById("score");
const timeSpan = document.getElementById("time");
const endGameDiv = document.getElementById("endGame");
const finalScoreSpan = document.getElementById("finalScore");
const finalPlayerSpan = document.getElementById("finalPlayer");
const rankingList = document.getElementById("ranking");
const startBtn = document.getElementById("startBtn");

let colors = ["red", "blue", "green", "yellow", "purple", "orange"];
let targetColor = "";
let score = 0;
let time = 60;
let interval;
let playerName = "";

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function createGrid() {
  grid.innerHTML = "";
  for (let i = 0; i < 16; i++) {
    const div = document.createElement("div");
    const color = getRandomColor();
    div.classList.add("square");
    div.style.backgroundColor = color;
    div.dataset.color = color;
    div.onclick = () => handleClick(div);
    grid.appendChild(div);
  }
}

function handleClick(div) {
  const clickedColor = div.dataset.color;
  if (clickedColor === targetColor) {
    score += 10;
  } else {
    score = Math.max(0, score - 5);
  }
  updateScore();
  updateTargetColor();
  createGrid();
}

function updateTargetColor() {
  targetColor = getRandomColor();
  targetColorSpan.textContent = targetColor;
}

function updateScore() {
  scoreSpan.textContent = score;
}

function updateTimer() {
  time--;
  timeSpan.textContent = time;
  if (time <= 0) {
    clearInterval(interval);
    endGame();
  }
}

function startGame() {
  playerName = document.getElementById("playerName").value.trim();
  if (!playerName) {
    alert("Digite seu nome antes de começar!");
    return;
  }

  score = 0;
  time = 60;
  updateScore();
  updateTargetColor();
  createGrid();
  endGameDiv.classList.add("hidden");
  interval = setInterval(updateTimer, 1000);
}

function endGame() {
  finalScoreSpan.textContent = score;
  finalPlayerSpan.textContent = playerName;
  endGameDiv.classList.remove("hidden");

  saveRanking(playerName, score);
  renderRanking();
}

function saveRanking(name, score) {
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  ranking.push({ name, score });
  ranking.sort((a, b) => b.score - a.score);
  ranking = ranking.slice(0, 5);
  localStorage.setItem("ranking", JSON.stringify(ranking));
}

function renderRanking() {
  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  rankingList.innerHTML = "";
  ranking.forEach(player => {
    const li = document.createElement("li");
    li.textContent = `${player.name} - ${player.score}`;
    rankingList.appendChild(li);
  });
}

startBtn.addEventListener("click", startGame);
renderRanking();
