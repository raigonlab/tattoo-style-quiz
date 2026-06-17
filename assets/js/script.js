/* jshint esversion: 6 */

// Quiz state
let questions = [];
let styleResults = {};
let currentQuestionIndex = 0;
let answers = [];
let selectedGender = null;
let typeWriterInterval = null;

const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");

// Loads quiz data from the JSON file and shows the gender selection screen
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
    renderGenderSelection();
  })
  .catch(function () {
    quizContainer.innerHTML =
      "<p class='error-msg'>Sorry, the quiz could not be loaded. Please try again later.</p>";
  });

// Renders the gender selection screen
function renderGenderSelection() {
  quizContainer.innerHTML =
    "<p class='gender-label'>Before we start</p>" +
    "<h2>How do you identify?</h2>" +
    "<p class='gender-sub'>This helps us show you relevant tattoo examples — your quiz result is the same regardless.</p>" +
    "<div class='gender-options'></div>";

  var genderContainer = quizContainer.querySelector(".gender-options");

  var genders = [
    { label: "Feminine", value: "female" },
    { label: "Masculine", value: "male" },
    { label: "Non-binary / Other", value: "other" }
  ];

  genders.forEach(function (gender) {
    var btn = document.createElement("button");
    btn.textContent = gender.label;
    btn.className = "gender-btn";
    btn.addEventListener("click", function () {
      selectGender(gender.value);
    });
    genderContainer.appendChild(btn);
  });
}

// Stores the selected gender and shows the style gallery
function selectGender(gender) {
  selectedGender = gender;
  renderStyleGallery();
}

// Shows all 5 tattoo styles with images so the user knows what they are choosing between
function renderStyleGallery() {
  var styles = Object.keys(styleResults);

  var cardsHTML = styles.map(function (key) {
    var style = styleResults[key];
    var imagePath = "assets/images/" + selectedGender + "/" + style.image;

    return "<div class='style-card'>" +
      "<img src='" + imagePath + "' alt='" + style.name + " tattoo example' class='style-card-img' onerror=\"this.style.display='none'\">" +
      "<p class='style-card-name'>" + style.name + "</p>" +
      "</div>";
  }).join("");

  quizContainer.innerHTML =
    "<p class='gender-label'>These are the styles</p>" +
    "<h2>Which catches your eye?</h2>" +
    "<p class='gender-sub'>Take the quiz to find out which one truly fits you.</p>" +
    "<div class='style-gallery'>" + cardsHTML + "</div>" +
    "<button id='start-quiz-btn' class='start-btn'>Start Quiz &rarr;</button>";

  document.getElementById("start-quiz-btn").addEventListener("click", function () {
    renderQuestion();
  });
}

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

  var optionsContainer = quizContainer.querySelector(".options");

  currentQuestion.options.forEach(function (option) {
    var button = document.createElement("button");
    button.textContent = option.text;
    button.className = "option-btn";
    button.setAttribute("role", "listitem");

    if (previousAnswer === option.style) {
      button.classList.add("selected");
    }

    button.addEventListener("click", function () {
      selectAnswer(button, option.style);
    });
    optionsContainer.appendChild(button);
  });

  var navContainer = quizContainer.querySelector(".quiz-nav");

  // Back arrow — on question 1 goes back to gender selection
  var backBtn = document.createElement("button");
  backBtn.className = "nav-btn";
  backBtn.setAttribute("aria-label", "Go back");
  backBtn.innerHTML = "&#8592;";
  backBtn.addEventListener("click", goBack);
  navContainer.appendChild(backBtn);

  if (previousAnswer !== undefined) {
    var forwardBtn = document.createElement("button");
    forwardBtn.className = "nav-btn";
    forwardBtn.setAttribute("aria-label", "Next question");
    forwardBtn.innerHTML = "&#8594;";
    forwardBtn.addEventListener("click", goForward);
    navContainer.appendChild(forwardBtn);
  }
}

// Highlights the selected button, disables all options, then advances
function selectAnswer(selectedButton, style) {
  var allButtons = quizContainer.querySelectorAll(".option-btn");

  allButtons.forEach(function (btn) {
    btn.disabled = true;
  });

  selectedButton.classList.add("selected");

  setTimeout(function () {
    answers[currentQuestionIndex] = style;
    advance();
  }, 350);
}

// Goes back one question, or back to gender selection on question 1
function goBack() {
  if (currentQuestionIndex === 0) {
    selectedGender = null;
    answers = [];
    renderGenderSelection();
  } else {
    currentQuestionIndex--;
    renderQuestion();
  }
}

// Moves forward using the already-stored answer
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

// Calculates scores from answers and displays the result with image
function showResult() {
  var scores = { fineline: 0, blackwork: 0, abstract: 0, geometric: 0, realism: 0 };

  answers.forEach(function (style) {
    scores[style]++;
  });

  var winningStyle = Object.keys(scores).reduce(function (a, b) {
    return scores[a] >= scores[b] ? a : b;
  });
  var result = styleResults[winningStyle];

  var imagePath = "assets/images/" + selectedGender + "/" + result.image;

  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  resultContainer.innerHTML =
    "<img src='" + imagePath + "' alt='Example of " + result.name + " tattoo' class='result-img' onerror=\"this.style.display='none'\">" +
    "<p class='result-label'>Your style is</p>" +
    "<h2 class='result-title'>" + result.name + "</h2>" +
    "<p class='result-description' id='result-desc' aria-live='polite'></p>" +
    "<div id='result-actions' class='result-actions hidden'>" +
    "<button id='restart-btn'>Take the quiz again</button>" +
    "<a href='https://raigonlab.github.io/raigon-mmxi' target='_blank' rel='noopener noreferrer' class='gallery-link'>See our gallery &rarr;</a>" +
    "</div>";

  document.getElementById("restart-btn").addEventListener("click", restartQuiz);

  typeWriter(result.description, document.getElementById("result-desc"), function () {
    document.getElementById("result-actions").classList.remove("hidden");
  });
}

// Types text character by character, then calls callback when done
function typeWriter(text, element, callback) {
  var index = 0;

  typeWriterInterval = setInterval(function () {
    element.textContent += text[index];
    index++;

    if (index >= text.length) {
      clearInterval(typeWriterInterval);
      typeWriterInterval = null;
      if (callback) {
        callback();
      }
    }
  }, 25);
}

// Resets all state and returns to the gender selection screen
function restartQuiz() {
  if (typeWriterInterval) {
    clearInterval(typeWriterInterval);
    typeWriterInterval = null;
  }

  currentQuestionIndex = 0;
  answers = [];
  selectedGender = null;

  resultContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");

  renderGenderSelection();
}
