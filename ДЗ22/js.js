const testContainer = document.getElementById("test-container");
const startTestButton = document.getElementById("start-test");
const testElement = document.getElementById("test");
const resultElement = document.getElementById("result");

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

startTestButton.addEventListener("click", () => {
  startTestButton.classList.add("hidden");
  testElement.classList.remove("hidden");
  displayQuestion(0);
});

let currentQuestion = 0;
let score = 0;

function displayResult() {
  testElement.classList.add("hidden");
  resultElement.classList.remove("hidden");

  const percentage = (score / questions.length) * 100;
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

function displayQuestion(index) {
  if (index >= questions.length) {
    displayResult();
    return;
  }

  const question = questions[index];
  testElement.innerHTML = `
    <h2>${question.question}</h2>
    <form id="question-form">
        ${question.answers.map((answer, i) => `
            <label>
                <input type="radio" name="answer" value="${answer}">
                ${answer}
            </label>
        `).join("")}
        <button type="submit" disabled>Дальше</button>
    </form>
  `;

  const questionForm = testElement.querySelector("#question-form");
  const submitButton = questionForm.querySelector("button");

  questionForm.addEventListener("change", () => {
    submitButton.disabled = false;
  });

  questionForm.addEventListener("submit", (event) => {    
    event.preventDefault();

    const selectedAnswer = questionForm.querySelector("input[name='answer']:checked").value;

    if (selectedAnswer === question.correctAnswer) {
        score++;
    }

    currentQuestion++;
    displayQuestion(currentQuestion);
  });
}