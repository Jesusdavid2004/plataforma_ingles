import { letters } from "./data.js";
import { save, load } from "./storage.js";
import { speak } from "./speech.js";

let selected = 0;
let learned = new Set(load("letters"));

export function initUI() {
  renderLetters();
  bindEvents();
  selectLetter(0);
  updateProgress();
}

function renderLetters() {
  const grid = document.getElementById("letter-grid");

  grid.innerHTML = letters.map((l, i) => `
    <button class="letter-tile ${i === selected ? "is-selected" : ""}" data-i="${i}">
      ${l.letter}
    </button>
  `).join("");

  document.querySelectorAll(".letter-tile").forEach(btn => {
    btn.onclick = () => selectLetter(btn.dataset.i);
  });
}

function selectLetter(i) {
  selected = Number(i);
  const l = letters[selected];

  learned.add(l.letter);
  save("letters", [...learned]);

  document.getElementById("selected-letter").innerHTML =
    `${l.letter}<span>${l.letter.toLowerCase()}</span>`;

  document.getElementById("letter-ipa").textContent = l.ipa;
  document.getElementById("letter-guide").textContent = l.guide;
  document.getElementById("detail-count").textContent =
    String(selected + 1).padStart(2, "0");

  renderLetters();
  updateProgress();
}

function bindEvents() {
  document.getElementById("listen-letter").onclick = () => {
    speak(letters[selected].letter);
  };
}

function updateProgress() {
  const count = learned.size;
  const percent = (count / 26) * 100;

  document.getElementById("learned-count").textContent = count;
  document.getElementById("daily-progress").style.width = percent + "%";
}