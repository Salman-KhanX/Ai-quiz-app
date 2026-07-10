const questions = [
  {
    question: "1. What does AI stand for?",
    answers: [
      { text: "Automatic Internet", correct: false },
      { text: "Artificial Intelligence", correct: true },
      { text: "Advanced Interface", correct: false },
      { text: "Artificial Internet", correct: false }
    ]
  },
  {
    question: "2. Which of the following is an AI application?",
    answers: [
      { text: "Keyboard", correct: false },
      { text: "Printer", correct: false },
      { text: "Chatbots", correct: true },
      { text: "Monitor", correct: false }
    ]
  },
  {
    question: "3. Which programming language is most commonly used in AI?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: false },
      { text: "Python", correct: true },
      { text: "SQL", correct: false }
    ]
  },
  {
    question: "4. Machine Learning is a subset of:",
    answers: [
      { text: "Networking", correct: false },
      { text: "Cyber Security", correct: false },
      { text: "Database", correct: false },
      { text: "Artificial Intelligence", correct: true }
    ]
  },
  {
    question: "5. Which company developed ChatGPT?",
    answers: [
      { text: "Google", correct: false },
      { text: "OpenAI", correct: true },
      { text: "Microsoft", correct: false },
      { text: "Meta", correct: false }
    ]
  },
  {
    question: "6. What is NLP in AI?",
    answers: [
      { text: "Network Level Programming", correct: false },
      { text: "Natural Language Processing", correct: true },
      { text: "New Learning Process", correct: false },
      { text: "Natural Logic Program", correct: false }
    ]
  },
  {
    question: "7. Which AI model is mainly used to recognize images?",
    answers: [
      { text: "Linked List", correct: false },
      { text: "Binary Tree", correct: false },
      { text: "Convolutional Neural Network (CNN)", correct: true },
      { text: "Stack", correct: false }
    ]
  },
  {
    question: "8. AI that performs one specific task is called:",
    answers: [
      { text: "General AI", correct: false },
      { text: "Super AI", correct: false },
      { text: "Hybrid AI", correct: false },
      { text: "Narrow AI", correct: true }
    ]
  },
  {
    question: "9. Which of these is an example of Generative AI?",
    answers: [
      { text: "Calculator", correct: false },
      { text: "MS Paint", correct: false },
      { text: "File Explorer", correct: false },
      { text: "ChatGPT", correct: true }
    ]
  },
  {
    question: "10. Which technique allows AI to learn from data?",
    answers: [
      { text: "Formatting", correct: false },
      { text: "Machine Learning", correct: true },
      { text: "Debugging", correct: false },
      { text: "Compiling", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const questionNumber = document.getElementById("question-number");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next Question ➜";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  questionNumber.innerHTML = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionElement.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";

  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
} 
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  // Show correct answer and disable all buttons
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();

  questionNumber.innerHTML = "Quiz Completed 🎉";
  questionElement.innerHTML = `
    <h2>You scored <b>${score}</b> out of <b>${questions.length}</b></h2>
  `;

  nextButton.innerHTML = "Restart Quiz 🔄";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();