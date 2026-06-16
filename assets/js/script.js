/* jshint esversion: 6 */

// Quiz state
let questions = [];
let styleResults = {};
let currentQuestionIndex = 0;
let answers = []; // stores the style selected for each question index

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

// Renders the current question, progress bar, answer options, and navigation arrows
function renderQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  var previousAnswer = answers[currentQuestionIndex];

  quizContainer.innerHTML =
    "<div class='progress-bar-container' role='progressbar' aria-valuenow='" +
    progressPercent +
    "' aria-valuemin='0' aria-valuemax='100' aria-label='Quiz progress'>" +
    "<div class='progress-bar-fill' style='width: " + progressPercent + "%'></div>" +
    "</div>" +
    "<p class='question-counter' aria-live='polite'>Question " +
    (currentQuestionIndex + 1) +
    " of " +
    questions.length +
    "</p>" +
    "<h2>" + currentQuestion.question + "</h2>" +
    "<div class='options' role='list'></div>" +
    "<div class='quiz-nav'></div>";

  // Render answer option buttons
  var optionsContainer = quizContainer.querySelector(".options");

  currentQuestion.options.forEach(function (option) {
    var button = document.createElement("button");
    button.textContent = option.text;
    button.className = "option-btn";
    button.setAttribute("role", "listitem");

    // Restore selected state if user came back to this question
    if (previousAnswer === option.style) {
      button.classList.add("selected");
    }

    button.addEventListener("click", function () {
      selectAnswer(button, option.style);
    });
    optionsContainer.appendChild(button);
  });

  // Render navigation arrows
  var navContainer = quizContainer.querySelector(".quiz-nav");

  // Back arrow — hidden on the first question
  if (currentQuestionIndex > 0) {
    var backBtn = document.createElement("button");
    backBtn.className = "nav-btn";
    backBtn.setAttribute("aria-label", "Previous question");
    backBtn.innerHTML = "&#8592;";
    backBtn.addEventListener("click", goBack);
    navContainer.appendChild(backBtn);
  }

  // Forward arrow — only shown if this question was already answered
  if (previousAnswer !== undefined) {
    var forwardBtn = document.createElement("button");
    forwardBtn.className = "nav-btn";
    forwardBtn.setAttribute("aria-label", "Next question");
    forwardBtn.innerHTML = "&#8594;";
    forwardBtn.addEventListener("click", goForward);
    navContainer.appendChild(forwardBtn);
  }
}

// Highlights the clicked button, disables all options, then advances after a short delay
function selectAnswer(selectedButton, style) {
  var allButtons = quizContainer.querySelectorAll(".option-btn");

  allButtons.forEach(function (btn) {
    btn.disabled = true;
  });

  selectedButton.classList.add("selected");

  // Store the answer for this question, then advance
  setTimeout(function () {
    answers[currentQuestionIndex] = style;
    advance();
  }, 350);
}

// Moves to the previous question
function goBack() {
  currentQuestionIndex--;
  renderQuestion();
}

// Moves to the next question using the already-stored answer
function goForward() {
  advance();
}

// Advances to the next question or shows the result
function advance() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

// Calculates scores from the stored answers array and displays the result
function showResult() {
  var scores = { fineline: 0, blackwork: 0, abstract: 0, geometric: 0 };

  answers.forEach(function (style) {
    scores[style]++;
  });

  var winningStyle = Object.keys(scores).reduce(function (a, b) {
    return scores[a] >= scores[b] ? a : b;
  });
  var result = styleResults[winningStyle];

  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  resultContainer.innerHTML =
    "<p class='result-label'>Your style is</p>" +
    "<h2>" + result.name + "</h2>" +
    "<p class='result-description'>" + result.description + "</p>" +
    "<button id='restart-btn'>Take the quiz again</button>" +
    "<a href='https://raigonlab.github.io/raigon-mmxi' target='_blank' rel='noopener noreferrer' class='gallery-link'>See our gallery &rarr;</a>";

  document.getElementById("restart-btn").addEventListener("click", restartQuiz);
}

// Resets all state and returns to the first question
function restartQuiz() {
  currentQuestionIndex = 0;
  answers = [];

  resultContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");

  renderQuestion();
}
