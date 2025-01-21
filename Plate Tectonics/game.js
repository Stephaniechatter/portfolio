document.addEventListener('DOMContentLoaded', () => {
  let score = 0;
  let studentName = '';
  let currentQuestionIndex = 0;
  let questionsCopy = [];
  let isAnswerSelected = false;
  let lives = 3;

  const questions = [
    {
      question: "Which type of boundary creates mountains?",
      options: ["Convergent", "Divergent", "Transform", "None of the above"],
      correctAnswer: "Convergent"
    },
    {
      question: "What landform is created at a divergent boundary?",
      options: ["Trench", "Mid-ocean ridge", "Volcano", "Fault line"],
      correctAnswer: "Mid-ocean ridge"
    },
    {
      question: "Which boundary type creates earthquakes?",
      options: ["Convergent", "Divergent", "Transform", "All of the above"],
      correctAnswer: "All of the above"
    },
    {
      question: "What boundary creates a rift valley?",
      options: ["Divergent", "Convergent", "Transform", "None of the above"],
      correctAnswer: "Divergent"
    },
    {
      question: "What landform is created at a convergent boundary?",
      options: ["Mid-ocean ridge", "Trench", "Volcano", "Rift valley"],
      correctAnswer: "Trench"
    },
    {
      question: "What is the movement of plates at a transform boundary?",
      options: ["Plates move toward each other", "Plates move away from each other", "Plates slide past each other", "Plates do not move"],
      correctAnswer: "Plates slide past each other"
    },
    {
      question: "Which boundary type creates volcanoes?",
      options: ["Convergent", "Divergent", "Both A and B", "Transform"],
      correctAnswer: "Both A and B"
    },
    {
      question: "What is the movement of plates at a divergent boundary?",
      options: ["Plates move toward each other", "Plates move away from each other", "Plates slide past each other", "Plates do not move"],
      correctAnswer: "Plates move away from each other"
    },
    {
      question: "Which boundary creates subduction zones?",
      options: ["Convergent", "Divergent", "Transform", "None of the above"],
      correctAnswer: "Convergent"
    },
    {
      question: "What landform is created at a transform boundary?",
      options: ["Trench", "Mid-ocean ridge", "Fault line", "Volcano"],
      correctAnswer: "Fault line"
    }
  ];

  function updateLivesDisplay() {
    const livesContainer = document.getElementById('lives-container');
    livesContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      if (i >= lives) {
        heart.classList.add('empty');
      }
      livesContainer.appendChild(heart);
    }
  }

  function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerOptions = document.getElementById('answer-options');

    if (currentQuestionIndex < questionsCopy.length) {
      const currentQuestion = questionsCopy[currentQuestionIndex];
      questionContainer.style.display = 'block';
      questionElement.textContent = currentQuestion.question;
      answerOptions.innerHTML = '';

      currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.onclick = (event) => checkAnswer(option, event);
        answerOptions.appendChild(button);
      });
    } else {
      endGame('win');
    }
  }

  function checkAnswer(answer, event) {
    const currentQuestion = questionsCopy[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;

    if (isAnswerSelected) return;
    isAnswerSelected = true;

    if (answer === correctAnswer) {
      score += 10;
      event.target.classList.add('correct');
    } else {
      lives--;
      updateLivesDisplay();
      event.target.classList.add('incorrect');
      if (lives <= 0) {
        endGame('lose');
        return;
      }
    }

    document.getElementById('score').textContent = score;
    setTimeout(() => {
      isAnswerSelected = false;
      currentQuestionIndex++;
      showQuestion();
    }, 1000);
  }

  function endGame(result) {
    const gameArea = document.getElementById('game-area');
    const results = document.getElementById('results');
    const finalName = document.getElementById('final-name');
    const finalScore = document.getElementById('final-score');

    gameArea.style.display = 'none';
    results.style.display = 'block';

    finalName.textContent = studentName;
    finalScore.textContent = score;

    if (result === 'lose') {
      alert('Game Over! Better luck next time.');
    } else {
      alert('You win! Great job!');
    }
  }

  document.getElementById('start-game').addEventListener('click', () => {
    studentName = document.getElementById('student-name').value;
    if (!studentName) {
      alert('Please enter your name to start the game.');
      return;
    }

    questionsCopy = [...questions];
    document.getElementById('student-info').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';
    updateLivesDisplay();
    showQuestion();
  });

  document.getElementById('restart-game').addEventListener('click', () => {
    window.location.reload();
  });
});
