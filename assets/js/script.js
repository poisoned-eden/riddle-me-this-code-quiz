// start button
var startAndTimerEl = document.getElementById
('start_timerBtn');

// sections
var instructionsSectionEl = document.getElementById('instructions');
var questionSectionEl = document.getElementById('questionSection');
var tryAgainSectionEl = document.getElementById('tryAgain');
var addInitialsSectionEl = document.getElementById('addInitials');
var highscoresSectionEl = document.getElementById('highscores');

// questions
var questionTitleEl = document.getElementById('questionTitle');
var answerButtonEls = document.querySelectorAll('#questionSection button');

// save score
var resultHEl = document.getElementById('result');
var initialsInput = document.getElementById('inputInitials');
var saveHighscoreBtnEl = document.getElementById('save');

// highscores
var scoreTableEl = document.getElementById('scoreTable');

var scoreTimer;
var timerInterval;
var questionIndex;
var right;
var wrong;
var localHighScores = [
    {
        initials: 'AMF',
        score: 75
    },
    {
        initials: 'UTI',
        score: 2
    },
];

var questions = [
    {
      title: 'Commonly used data types DO NOT include:',
      choices: ['strings', 'booleans', 'alerts', 'numbers'],
      answer: 'alerts',
    },
    {
      title: 'The condition in an if / else statement is enclosed within ____.',
      choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
      answer: 'parentheses',
    },
    {
      title: 'Arrays in JavaScript can be used to store ____.',
      choices: [
        'numbers and strings',
        'other arrays',
        'booleans',
        'all of the above',
      ],
      answer: 'all of the above',
    },
    {
      title:
        'String values must be enclosed within ____ when being assigned to variables.',
      choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
      answer: 'quotes',
    },
    {
      title:
        'A very useful tool used during development and debugging for printing content to the debugger is:',
      choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
      answer: 'console.log',
    },
  ];

function startQuiz(event) {
    scoreTimer = 75;
    questionIndex = 0;
    
    instructionsSectionEl.style.display = 'none';
    
    startAndTimerEl.textContent = scoreTimer;
    startAndTimerEl.classList.add('button-primary')
    
    timerInterval = setInterval(function() {
        scoreTimer--;
        startAndTimerEl.textContent = scoreTimer;
        
        if (scoreTimer === 0) {
            // Clears interval
            clearInterval(timerInterval);
            loseGame();
        }
        }, 1000);
    
    displayQs();
}
    
function displayQs(params) {
    questionSectionEl.style.display = 'block';
    questionTitleEl.textContent = questions[questionIndex].title;

    for (let i = 0; i < answerButtonEls.length; i++) {
        const answerBtn = answerButtonEls[i];
        answerBtn.textContent = questions[questionIndex].choices[i];
        answerBtn.addEventListener('click', handleAnswer);
    }
}

function handleAnswer(event) {
    var selectedAnswer = this.textContent;

    if (selectedAnswer === questions[questionIndex].answer) {
        startAndTimerEl.style.backgroundColor = 'green';
    } else {
        startAndTimerEl.style.backgroundColor = 'red';
        scoreTimer -= 15;
    }        

    if (questionIndex < questions.length -1) {
        questionIndex++;
        displayQs();
    } else {
        clearInterval(timerInterval);
        yourScore();
    }

}

function yourScore(params) {
    questionSectionEl.style.display = 'none';
    addInitialsSectionEl.style.display = 'block';

    resultHEl.textContent = scoreTimer;

    saveHighscoreBtnEl.addEventListener('click', function () {
        var saveScore = {
            initials: initialsInput.value,
            score: scoreTimer
        }
        localHighScores = JSON.parse(localStorage.getItem('scores'));
        localHighScores.push(saveScore);
        localStorage.setItem('scores', JSON.stringify(localHighScores));

        showHighscores();
    })
    
}

function showHighscores() {
    addInitialsSectionEl.style.display = 'none';
    highscoresSectionEl.style.display = 'block';
    localHighScores = JSON.parse(localStorage.getItem('scores'));
    localHighScores.forEach(entry => {
        var row = document.createElement('tr');
        row.innerHTML = `<tr>
                            <td>${entry.initials}</td>
                            <td>${entry.score}</td>
                        </tr>`;
        scoreTableEl.appendChild(row);
    });
}

function loseGame() {
    questionSectionEl.style.display = 'none';
    tryAgainSectionEl.style.display = 'block';
    startAndTimerEl.textContent = 'Start';
    startAndTimerEl.classList.remove('button-primary')
}

startAndTimerEl.addEventListener('click', startQuiz);