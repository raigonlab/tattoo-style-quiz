// Quiz state variables
let questions = [];
let styleResults = {};
let currentQuestionIndex = 0;
const scores = { fineline: 0, blackwork: 0, abstract: 0, geometric: 0 };

const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");

// Loads quiz data from the JSON file and starts the quiz
fetch("assets/data/questions.json")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Could not load quiz data");
    }
    return response.json();
  })
  .then(function (data) {
    questions = data.questions;
    styleResults = data.styleResults;
    renderQuestion();
  })
  .catch(function () {
    quizContainer.innerHTML =
      "<p class='error-msg'>Sorry, the quiz could not be loaded. Please try again later.</p>";
  });

// Renders the current question and its answer options
function renderQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  quizContainer.innerHTML =
    "<p class='question-counter' aria-live='polite'>Question " +
    (currentQuestionIndex + 1) +
    " of " +
    questions.length +
    "</p>" +
    "<h2>" +
    currentQuestion.question +
    "</h2>" +
    "<div class='options' role='list'></div>";

  var optionsContainer = quizContainer.querySelector(".options");

  // Creates a button for each answer option and attaches a click handler
  currentQuestion.options.forEach(function (option) {
    var button = document.createElement("button");
    button.textContent = option.text;
    button.className = "option-btn";
    button.setAttribute("role", "listitem");
    button.addEventListener("click", function () {
      handleAnswer(option.style);
    });
    optionsContainer.appendChild(button);
  });
}

// Runs when the user picks an answer: increments the matching style score,
// then moves to the next question or shows the result
function handleAnswer(style) {
  scores[style]++;
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

// Finds the highest-scoring style and displays the result screen
function showResult() {
  var winningStyle = Object.keys(scores).reduce(function (a, b) {
    return scores[a] >= scores[b] ? a : b;
  });
  var result = styleResults[winningStyle];

  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  resultContainer.innerHTML =
    "<p class='result-label'>Your style is</p>" +
    "<h2>" +
    result.name +
    "</h2>" +
    "<p class='result-description'>" +
    result.description +
    "</p>" +
    "<button id='restart-btn'>Take the quiz again</button>";

  document.getElementById("restart-btn").addEventListener("click", restartQuiz);
}

// Resets all state variables and shows the first question again
function restartQuiz() {
  currentQuestionIndex = 0;
  Object.keys(scores).forEach(function (key) {
    scores[key] = 0;
  });

  resultContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");

  renderQuestion();
}
