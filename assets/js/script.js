// Array with all quiz questions, their answer options, and which style each option scores toward
const questions = [
    {
      question: "Which visual pattern attracts you the most?",
      options: [
        { text: "Thin, continuous lines", style: "fineline" },
        { text: "Solid, high-contrast shapes", style: "blackwork" },
        { text: "Fluid, organic curves", style: "abstract" },
        { text: "Precise patterns and symmetry", style: "geometric" }
      ]
    },
    {
      question: "Where do you imagine your tattoo?",
      options: [
        { text: "Forearm or wrist, something discreet", style: "fineline" },
        { text: "Arm or back, a bold piece", style: "blackwork" },
        { text: "Following the body's curve", style: "abstract" },
        { text: "Chest or shoulder, clear symmetry", style: "geometric" }
      ]
    },
    {
      question: "What does this tattoo represent to you?",
      options: [
        { text: "A subtle memory or feeling", style: "fineline" },
        { text: "Strength and presence", style: "blackwork" },
        { text: "Movement and transformation", style: "abstract" },
        { text: "Order, structure, purpose", style: "geometric" }
      ]
    },
    {
      question: "Which of these best describes you?",
      options: [
        { text: "Observant, I like details", style: "fineline" },
        { text: "Direct, I like impact", style: "blackwork" },
        { text: "Intuitive, I follow the flow", style: "abstract" },
        { text: "Rational, I like logic", style: "geometric" }
      ]
    },
    {
      question: "How long would you tolerate a session?",
      options: [
        { text: "Not long, I prefer something quick", style: "fineline" },
        { text: "As long as it takes for impact", style: "blackwork" },
        { text: "Several sessions, it's a process", style: "abstract" },
        { text: "One well-planned session", style: "geometric" }
      ]
    }
  ];
  
  // Object holding the name and description shown for each possible result style
  const styleResults = {
    fineline: {
      name: "Fineline",
      description: "You connect with subtlety and precision. Thin, continuous lines where every stroke carries symbolic weight without shouting."
    },
    blackwork: {
      name: "Blackwork",
      description: "You seek presence and contrast. Solid pieces with strong visual impact that last."
    },
    abstract: {
      name: "Abstract / Flow-line",
      description: "You think in curves and movement. Your tattoo follows the body like a natural flow, without rigidity."
    },
    geometric: {
      name: "Geometric",
      description: "You value structure and purpose. Symmetry and patterns that communicate order and intention."
    }
  };
  
  // Tracks which question the user is currently on
  let currentQuestionIndex = 0;
  
  // Tracks how many points each style has accumulated based on the user's answers
  const scores = { fineline: 0, blackwork: 0, abstract: 0, geometric: 0 };

  // Reference to the HTML element where questions are displayed
const quizContainer = document.getElementById("quiz-container");

// Displays the current question and its progress counter on the page
function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  quizContainer.innerHTML = `
    <p class="question-counter">Question ${currentQuestionIndex + 1} of ${questions.length}</p>
    <h2>${currentQuestion.question}</h2>
    <div class="options"></div>
  `;
}