const DICE_FACES = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

const tabBtns = document.querySelectorAll(".tab-btn");
const panels = {
  dice: document.getElementById("panel-dice"),
  coin: document.getElementById("panel-coin"),
  picker: document.getElementById("panel-picker"),
};

tabBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    Object.entries(panels).forEach(([key, panel]) => {
      panel.hidden = key !== btn.dataset.tab;
    });
  })
);

// ---------- Würfel ----------
const diceCount = document.getElementById("diceCount");
const diceCountLabel = document.getElementById("diceCountLabel");
const diceRow = document.getElementById("diceRow");
const diceSum = document.getElementById("diceSum");
const rollDiceBtn = document.getElementById("rollDiceBtn");

function rollDice() {
  const count = Number(diceCount.value);
  const results = Array.from({ length: count }, () => 1 + Math.floor(Math.random() * 6));

  diceRow.innerHTML = "";
  results.forEach((value) => {
    const die = document.createElement("div");
    die.className = "die";
    die.textContent = DICE_FACES[value];
    diceRow.appendChild(die);
  });

  diceSum.textContent = count > 1 ? `Summe: ${results.reduce((a, b) => a + b, 0)}` : "";
}

diceCount.addEventListener("input", () => {
  diceCountLabel.textContent = diceCount.value;
  rollDice();
});
rollDiceBtn.addEventListener("click", rollDice);
rollDice();

// ---------- Münze ----------
const coin = document.getElementById("coin");
const coinResult = document.getElementById("coinResult");
const coinStats = document.getElementById("coinStats");
const flipCoinBtn = document.getElementById("flipCoinBtn");

let heads = Number(localStorage.getItem("coin-heads")) || 0;
let tails = Number(localStorage.getItem("coin-tails")) || 0;
updateCoinStats();

function flipCoin() {
  coin.classList.remove("flipping");
  void coin.offsetWidth;
  coin.classList.add("flipping");

  const isHeads = Math.random() < 0.5;
  setTimeout(() => {
    coin.textContent = isHeads ? "🪙" : "🪙";
    coinResult.textContent = isHeads ? "Kopf" : "Zahl";
    if (isHeads) heads += 1;
    else tails += 1;
    localStorage.setItem("coin-heads", String(heads));
    localStorage.setItem("coin-tails", String(tails));
    updateCoinStats();
  }, 500);
}

function updateCoinStats() {
  coinStats.textContent = `Kopf: ${heads} · Zahl: ${tails}`;
}

flipCoinBtn.addEventListener("click", flipCoin);

// ---------- Listen-Los ----------
const pickerList = document.getElementById("pickerList");
const pickerResult = document.getElementById("pickerResult");
const pickBtn = document.getElementById("pickBtn");

function pickFromList() {
  const options = pickerList.value.split("\n").map((s) => s.trim()).filter(Boolean);
  if (!options.length) {
    pickerResult.textContent = "Bitte mindestens eine Option eingeben.";
    return;
  }
  const choice = options[Math.floor(Math.random() * options.length)];
  pickerResult.textContent = choice;
}

pickBtn.addEventListener("click", pickFromList);
