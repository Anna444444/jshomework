let testContainer = document.getElementById("test-container");
let startTestButton = document.getElementById("start-test");
let testElement = document.getElementById("test");
let resultElement = document.getElementById("result");
let currentQuestion = 0;
let score = 0;

const questions = [
    {
      question: "1 + 1 = ?",
      answers: ["2", "3", "1"],
      correctAnswer: "2"
    },
    {
      question: "2 + 2 = ?",
      answers: ["2", "6", "4"],
      correctAnswer: "4"
    },
    {
      question: "3 + 3 = ?",
      answers: ["3", "6", "9"],
      correctAnswer: "6"
    },
    {
      question: "4 + 4 = ?",
      answers: ["8", "4", "12"],
      correctAnswer: "8"
    },
    {
      question: "5 + 5 = ?",
      answers: ["5", "10", "15"],
      correctAnswer: "10"
    }
];

function saveProgress() {
  localStorage.setItem('currentQuestion', currentQuestion);
  localStorage.setItem('score', score);
}

function loadProgress() {
  let savedCurrentQuestion = parseInt(localStorage.getItem('currentQuestion'));
  let savedScore = parseInt(localStorage.getItem('score'));

  if (!isNaN(savedCurrentQuestion) && !isNaN(savedScore)) {
    currentQuestion = savedCurrentQuestion;
    score = savedScore;
    displayResumePrompt();
  } else {
    startTestButton.classList.remove("hidden");
  }
}

function displayResumePrompt() {
  startTestButton.classList.add('hidden');
  testElement.classList.add('hidden');
  resultElement.classList.remove('hidden');

  resultElement.innerHTML = `
    <h2>Вы остановились на вопросе №${currentQuestion + 1}</h2>
    <p>Хотите продолжить тест или начать заново?</p>
    <button id="continue-test">Продолжить</button>
    <button id="restart-test">Начать заново</button>
  `;

  const continueTestButton = resultElement.querySelector('#continue-test');
  const restartTestButton = resultElement.querySelector('#restart-test');

  continueTestButton.addEventListener('click', () => {
    resultElement.classList.add('hidden');
    testElement.classList.remove('hidden');
    displayQuestion(currentQuestion);
  });

  restartTestButton.addEventListener('click', () => {
    resultElement.classList.add('hidden');
    startTestButton.classList.remove('hidden');
    localStorage.clear();
    currentQuestion = 0;
    score = 0;
  });
}

function displayResult() {
  testElement.classList.add('hidden');
  resultElement.classList.remove('hidden');
  localStorage.clear();

  let percentage = (score / questions.length) * 100;
  let resultMessage;

  if (percentage >= 90) {
      resultMessage = "Отлично!";
  } else if (percentage >= 70) {
      resultMessage = "Хорошо!";
  } else if (percentage >= 50) {
      resultMessage = "Удовлетворительно.";
  } else {
      resultMessage = "Плохо. Попробуйте еще раз.";
  }

  resultElement.innerHTML = `
      <h2>Ваш результат: ${score} из ${questions.length} (${percentage}%)</h2>
      <p>${resultMessage}</p>
      <button id="restart-test">Повторить тест</button>
  `;

  const restartTestButton = resultElement.querySelector("#restart-test");
  restartTestButton.addEventListener("click", () => {
      resultElement.classList.add("hidden");
      startTestButton.classList.remove("hidden");
      currentQuestion = 0;
      score = 0;
      displayQuestion(currentQuestion);
  });
}

loadProgress();

startTestButton.addEventListener("click", () => {
  startTestButton.classList.add("hidden");
  testElement.classList.remove("hidden");
  displayQuestion(currentQuestion);
});

function displayQuestion(index) {
  if (index >= questions.length) {
    displayResult();
    return;
  }

let question = questions[index]
testElement.innerHTML = `<h2>${question.question}</h2>
  <form id="question-form">${question.answers.map((answer, i) => `<label><input type="radio" name="answer" value="${answer}">${answer}</label>`).join("")}<button type="submit" disabled>Дальше</button>
  </form>`;

let questionForm = testElement.querySelector("#question-form");
let submitButton = questionForm.querySelector("button");

questionForm.addEventListener("change", () => {
  submitButton.disabled = false;
});

questionForm.addEventListener("submit", (event) => {    
  event.preventDefault();

  let selectedAnswer = questionForm.querySelector("input[name='answer']:checked").value;

  if (selectedAnswer === question.correctAnswer) {
      score++;
  }

  currentQuestion++;
  saveProgress();
  displayQuestion(currentQuestion);
});
}