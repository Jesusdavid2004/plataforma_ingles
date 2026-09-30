const letters = [
  { letter: "A", ipa: "/eɪ/", guide: "Suena como «éi»", tip: "Empieza con una sonrisa: la A inglesa es abierta y clara." },
  { letter: "B", ipa: "/biː/", guide: "Suena como «bí»", tip: "Los labios se juntan al inicio, igual que en español." },
  { letter: "C", ipa: "/siː/", guide: "Suena como «sí»", tip: "La C del abecedario suena como una S suave." },
  { letter: "D", ipa: "/diː/", guide: "Suena como «dí»", tip: "La lengua toca suavemente detrás de los dientes." },
  { letter: "E", ipa: "/iː/", guide: "Suena como «í»", tip: "Alarga un poquito la vocal: es un sonido sostenido." },
  { letter: "F", ipa: "/ɛf/", guide: "Suena como «ef»", tip: "Deja escapar aire entre el labio inferior y los dientes." },
  { letter: "G", ipa: "/dʒiː/", guide: "Suena como «yí»", tip: "Empieza con el sonido de la J inglesa en «jam»." },
  { letter: "H", ipa: "/eɪtʃ/", guide: "Suena como «éich»", tip: "Tiene dos partes: «éi» y un final parecido a «ch»." },
  { letter: "I", ipa: "/aɪ/", guide: "Suena como «ái»", tip: "Desliza la voz de una A abierta hacia una I." },
  { letter: "J", ipa: "/dʒeɪ/", guide: "Suena como «yéi»", tip: "El primer sonido es la J inglesa, no la jota española." },
  { letter: "K", ipa: "/keɪ/", guide: "Suena como «kéi»", tip: "Empieza con una K marcada y termina en «éi»." },
  { letter: "L", ipa: "/ɛl/", guide: "Suena como «el»", tip: "La lengua toca la parte justo detrás de los dientes." },
  { letter: "M", ipa: "/ɛm/", guide: "Suena como «em»", tip: "Cierra los labios al final para formar la M." },
  { letter: "N", ipa: "/ɛn/", guide: "Suena como «en»", tip: "El final es nasal, como la N de «nunca»." },
  { letter: "O", ipa: "/oʊ/", guide: "Suena como «óu»", tip: "La vocal se desliza un poco hacia una U al final." },
  { letter: "P", ipa: "/piː/", guide: "Suena como «pí»", tip: "Suelta un pequeño soplo de aire después de la P." },
  { letter: "Q", ipa: "/kjuː/", guide: "Suena como «kiú»", tip: "La Q tiene tres sonidos juntos: K, una Y suave y U." },
  { letter: "R", ipa: "/ɑːr/", guide: "Suena como «ar»", tip: "En inglés americano la R se oye con claridad al final." },
  { letter: "S", ipa: "/ɛs/", guide: "Suena como «es»", tip: "Alarga el sonido de la S antes de cerrar con una vocal." },
  { letter: "T", ipa: "/tiː/", guide: "Suena como «tí»", tip: "La T inglesa suele sonar más ligera que en español." },
  { letter: "U", ipa: "/juː/", guide: "Suena como «iú»", tip: "Empieza con una Y breve y mantén la vocal final." },
  { letter: "V", ipa: "/viː/", guide: "Suena como «ví»", tip: "Apoya suavemente los dientes superiores en el labio inferior." },
  { letter: "W", ipa: "/ˈdʌbəl juː/", guide: "Suena como «dábel-iú»", tip: "Su nombre significa literalmente «doble U»." },
  { letter: "X", ipa: "/ɛks/", guide: "Suena como «eks»", tip: "Empieza con una E abierta y termina con el grupo KS." },
  { letter: "Y", ipa: "/waɪ/", guide: "Suena como «uái»", tip: "Comienza con una W suave y termina en el sonido de I." },
  { letter: "Z", ipa: "/ziː/", guide: "Suena como «zí» (EE. UU.)", tip: "En Reino Unido también se dice «zed» (/zɛd/)." },
];

const words = [
  { english: "Hello", spanish: "Hola", category: "greetings", label: "Saludos", pronunciation: "həˈloʊ" },
  { english: "Good morning", spanish: "Buenos días", category: "greetings", label: "Saludos", pronunciation: "ɡʊd ˈmɔːrnɪŋ" },
  { english: "Please", spanish: "Por favor", category: "greetings", label: "Saludos", pronunciation: "pliːz" },
  { english: "Water", spanish: "Agua", category: "everyday", label: "Día a día", pronunciation: "ˈwɔːtər" },
  { english: "Book", spanish: "Libro", category: "everyday", label: "Día a día", pronunciation: "bʊk" },
  { english: "Friend", spanish: "Amigo / amiga", category: "everyday", label: "Día a día", pronunciation: "frend" },
];

const quiz = [
  { prompt: "¿Cómo se pronuncia la letra E?", answers: ["/iː/", "/eɪ/", "/ɛf/"], correct: 0 },
  { prompt: "¿Qué significa «water»?", answers: ["Libro", "Agua", "Amigo"], correct: 1 },
  { prompt: "Completa: She ___ English.", answers: ["study", "studies", "studying"], correct: 1 },
];

const progressKey = "ingles-a-tu-ritmo-learned-letters";
let learnedLetters = new Set(JSON.parse(localStorage.getItem(progressKey) || "[]"));
let selectedLetter = 0;
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

const letterGrid = document.querySelector("#letter-grid");

function renderLetters() {
  letterGrid.innerHTML = letters.map(({ letter }, index) => `
    <button class="letter-tile${index === selectedLetter ? " is-selected" : ""}${learnedLetters.has(letter) ? " is-learned" : ""}" type="button" data-index="${index}" aria-label="Letra ${letter}" aria-pressed="${index === selectedLetter}">
      <span class="tile-upper">${letter}</span><span class="tile-lower">${letter.toLowerCase()}</span>
    </button>`).join("");

  letterGrid.querySelectorAll(".letter-tile").forEach((tile) => {
    tile.addEventListener("click", () => selectLetter(Number(tile.dataset.index)));
  });
}

function selectLetter(index) {
  selectedLetter = index;
  const entry = letters[index];
  learnedLetters.add(entry.letter);
  localStorage.setItem(progressKey, JSON.stringify([...learnedLetters]));
  document.querySelector("#selected-letter").innerHTML = `${entry.letter}<span>${entry.letter.toLowerCase()}</span>`;
  document.querySelector("#letter-ipa").textContent = entry.ipa;
  document.querySelector("#letter-guide").textContent = entry.guide;
  document.querySelector("#letter-tip").textContent = entry.tip;
  document.querySelector("#detail-count").textContent = String(index + 1).padStart(2, "0");
  document.querySelector("#learned-count").textContent = learnedLetters.size;
  document.querySelector("#daily-progress").style.width = `${learnedLetters.size / letters.length * 100}%`;
  renderLetters();
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    window.alert("La pronunciación de audio no está disponible en este navegador.");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.82;
  window.speechSynthesis.speak(utterance);
}

function renderWords(filter = "all") {
  const visibleWords = filter === "all" ? words : words.filter((word) => word.category === filter);
  document.querySelector("#word-grid").innerHTML = visibleWords.map((word, index) => `
    <article class="word-card" style="animation-delay:${index * 45}ms">
      <div class="word-top"><span class="word-category">${word.label}</span><button class="icon-button speak-button" data-say="${word.english}" aria-label="Escuchar ${word.english}">▶</button></div>
      <h3>${word.english}</h3><span class="word-translation">${word.spanish}</span>
    </article>`).join("");
  bindSpeakButtons();
}

function bindSpeakButtons() {
  document.querySelectorAll(".speak-button").forEach((button) => {
    button.addEventListener("click", () => speak(button.dataset.say));
  });
}

function renderQuiz() {
  const panel = document.querySelector("#quiz-panel");
  if (quizIndex >= quiz.length) {
    panel.innerHTML = `<div class="quiz-result"><div class="quiz-result-mark">✳</div><h2>¡Buen trabajo!</h2><p>Respondiste correctamente ${quizScore} de ${quiz.length} preguntas.</p><button class="quiz-next" id="restart-quiz" type="button">Intentar de nuevo</button></div>`;
    document.querySelector("#restart-quiz").addEventListener("click", () => {
      quizIndex = 0;
      quizScore = 0;
      renderQuiz();
    });
    return;
  }

  quizAnswered = false;
  const question = quiz[quizIndex];
  panel.innerHTML = `
    <div class="quiz-progress"><span>PREGUNTA ${quizIndex + 1} DE ${quiz.length}</span><span>${quizScore} CORRECTAS</span></div>
    <div class="quiz-progress-track"><span style="width:${quizIndex / quiz.length * 100}%"></span></div>
    <h2 class="quiz-question">${question.prompt}</h2>
    <div class="quiz-answers">${question.answers.map((answer, index) => `<button class="quiz-answer" data-answer="${index}" type="button"><span class="answer-letter">${String.fromCharCode(65 + index)}</span>${answer}</button>`).join("")}</div>
    <p class="quiz-feedback" aria-live="polite"></p>
    <button class="quiz-next" id="next-question" type="button" disabled>${quizIndex === quiz.length - 1 ? "Ver resultado" : "Siguiente"}</button>`;

  panel.querySelectorAll(".quiz-answer").forEach((button) => {
    button.addEventListener("click", () => {
      if (quizAnswered) return;
      quizAnswered = true;
      const isCorrect = Number(button.dataset.answer) === question.correct;
      if (isCorrect) quizScore += 1;
      button.classList.add(isCorrect ? "is-correct" : "is-wrong");
      panel.querySelectorAll(".quiz-answer").forEach((answerButton) => { answerButton.disabled = true; });
      panel.querySelector(".quiz-feedback").textContent = isCorrect ? "¡Exacto! Sigue así." : `Casi. La respuesta correcta es: ${question.answers[question.correct]}.`;
      panel.querySelector("#next-question").disabled = false;
    });
  });
  panel.querySelector("#next-question").addEventListener("click", () => {
    if (!quizAnswered) return;
    quizIndex += 1;
    renderQuiz();
  });
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    const nextView = button.dataset.view;
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.toggle("is-active", item === button);
      if (item === button) item.setAttribute("aria-current", "page");
      else item.removeAttribute("aria-current");
    });
    document.querySelectorAll(".view").forEach((view) => {
      const isCurrent = view.dataset.panel === nextView;
      view.classList.toggle("is-visible", isCurrent);
      view.hidden = !isCurrent;
    });
    document.querySelector("#current-section").textContent = button.textContent.trim();
  });
});

document.querySelector("#listen-letter").addEventListener("click", () => speak(letters[selectedLetter].letter));
document.querySelector("#vocabulary-filter").addEventListener("change", (event) => renderWords(event.target.value));
renderLetters();
renderWords();
renderQuiz();
selectLetter(0);