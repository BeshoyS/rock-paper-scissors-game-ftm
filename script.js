const rulesBtn = document.querySelector("#rulesBtn");
const closeBtn = document.querySelector("#closeBtn");
const rulesModal = document.querySelector("#rulesModal");
const paperHand = document.querySelector(".hand-paper");
const scissorsHand = document.querySelector(".hand-scissors");
const rockHand = document.querySelector(".hand-rock");
const hands = document.querySelectorAll(".hands > .hand");
const handsSec = document.getElementById("hands");
const contestSec = document.getElementById("contest");
const tryAgainBtn = document.querySelector("#againBtn");
const scoreNum = document.querySelector(".score-num");
let score = localStorage.getItem("RPSscore")
  ? +localStorage.getItem("RPSscore")
  : 0;
scoreNum.textContent = score;
hands.forEach((hand) => {
  hand.addEventListener("click", function () {
    let chosenHand = this.getAttribute("data-hand");

    handsSec.style.display = "none";
    contestSec.style.display = "block";
    //get Random PC Hands
    const pcChosenHand = generateRandHand();
    const userHand = getSideHand(chosenHand, "user");
    const pcHand = getSideHand(pcChosenHand, "pc");

    getJudge(`${userHand}-${pcHand}`);
  });
});

function generateRandHand() {
  const handsArr = ["paper", "scissors", "rock"];
  const randIdx = Math.floor(Math.random() * handsArr.length);
  return handsArr[randIdx];
}

function getSideHand(chosenHand, side) {
  let hand = document.querySelector(`#${side}Hand`);
  hand.classList = "";
  hand.classList.add(`${side}-hand`, "hand", `hand-${chosenHand}`);
  let HandImg = document.getElementById(`${side}HandImg`);
  HandImg.src = `./images/icon-${chosenHand}.svg`;
  return chosenHand;
}

function getDecision(decision) {
  const resultDecision = document.getElementById("resultDecision");
  resultDecision.textContent = decision;
  if (decision === "You Win") {
    score++;
    scoreNum.textContent = score;
    localStorage.setItem("RPSscore", score);
  }
}

function getJudge(result) {
  switch (result) {
    case "rock-rock":
    case "paper-paper":
    case "scissors-scissors":
      getDecision("It's Tie");
      break;
    case "rock-scissors":
    case "paper-rock":
    case "scissors-paper":
      getDecision("You Win");
      break;
    case "scissors-rock":
    case "rock-paper":
    case "paper-scissors":
      getDecision("You Lose");
      break;
    default:
      break;
  }
}

rulesBtn.addEventListener("click", (e) => {
  e.preventDefault();
  rulesModal.style.display = "flex";
});
closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  rulesModal.style.display = "none";
});

tryAgainBtn.addEventListener("click", (e) => {
  e.preventDefault();
  handsSec.style.display = "flex";
  contestSec.style.display = "none";
});
