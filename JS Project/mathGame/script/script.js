let score = 0;
let currentLevel = null;
let questions = [];

const levelButtons = document.getElementById("level-buttons").getElementsByTagName("button");
const gameContainer = document.getElementById("game");
const restartButton = document.getElementById("restart-button");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons").getElementsByTagName("button");
const scoreElement = document.getElementById("score");

const levels = {
  1: { numQuestions: 5, operators: ["+"], range: 10 },
  2: { numQuestions: 7, operators: ["+", "-"], range: 20 },
  3: { numQuestions: 10, operators: ["+", "-", "*", "/"], range: 30 },
};

const generateQuestion = (level) => {
  const operator = levels[level].operators[Math.floor(Math.random() * levels[level].operators.length)];
  const num1 = Math.floor(Math.random() * levels[level].range);
  const num2 = Math.floor(Math.random() * levels[level].range);
  let question = `${num1} ${operator} ${num2}`;
  let correctAnswer;

  switch (operator) {
    case "+":
      correctAnswer = num1 + num2;
      break;
    case "-":
      correctAnswer = num1 - num2;
      break;
    case "*":
      correctAnswer = num1 * num2;
      break;
    case "/":
      correctAnswer = num2 !== 0 ? num1 / num2 : num1;
      break;
  }

  return { question, correctAnswer };
};

const loadQuestions = (level) => {
  questions = [];
  for (let i = 0; i < levels[level].numQuestions; i++) {
    const { question, correctAnswer } = generateQuestion(level);
    questions.push({ question, correctAnswer });
  }
};

const startGame = (level) => {
  currentLevel = level;
  score = 0;
  loadQuestions(level);
  scoreElement.textContent = `ניקוד: ${score}`;
  gameContainer.style.display = "block";
  document.getElementById("level-buttons").style.display = "none";
  restartButton.style.display = "block";
  askQuestion();
};

const askQuestion = () => {
  if (questions.length === 0) {
    alert("המשחק נגמר! הניקוד שלך הוא " + score);
    resetGame();
    return;
  }

  const { question, correctAnswer } = questions.shift();
  questionElement.textContent = question;
  const correctButtonIndex = Math.floor(Math.random() * 4);
  for (let i = 0; i < 4; i++) {
    const answerButton = answerButtons[i];
    if (i === correctButtonIndex) {
      answerButton.textContent = correctAnswer;
      answerButton.onclick = () => {
        score++;
        scoreElement.textContent = `ניקוד: ${score}`;
        askQuestion();
      };
    } else {
      let incorrectAnswer;
      do {
        incorrectAnswer = Math.floor(Math.random() * (levels[currentLevel].range * 2));
      } while (incorrectAnswer === correctAnswer);
      answerButton.textContent = incorrectAnswer;
      answerButton.onclick = () => {
        alert("תשובה שגויה");
        askQuestion();
      };
    }
  }
};

const resetGame = () => {
  gameContainer.style.display = "none";
  document.getElementById("level-buttons").style.display = "block";
  restartButton.style.display = "none";
};

restartButton.addEventListener("click", () => {
  resetGame();
});

Array.from(levelButtons).forEach((button) => {
  button.addEventListener("click", () => {
    const level = parseInt(button.getAttribute("data-level"));
    startGame(level);
  });
});
