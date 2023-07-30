// start button
var startAndTimerEl = document.getElementById
('start_timerBtn');

// sections
var instructionsSectionEl = document.getElementById('instructions');
var questionSectionEl = document.getElementById('questionSection');
var tryAgainSectionEl = document.getElementById('tryAgain');
var addInitialsSectionEl = document.getElementById('addInitials');
var highscoresSectionEl = document.getElementById('highscores');

// question
var questionTitleEl = document.getElementById('questionTitle');
var buttonOneEl = document.getElementById('1');
var buttonTwoEl = document.getElementById('2');
var buttonThreeEl = document.getElementById('3');
var buttonFourEl = document.getElementById('4');

var scoreTimer;
var questionIndex;

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
    event.preventDefault;
    scoreTimer = 10000;
    questionIndex = 0;
    
    instructionsSectionEl.style.display = 'none';
    
    startAndTimerEl.textContent = scoreTimer;
    startAndTimerEl.classList.add('button-primary')
    
    timerInterval = setInterval(function() {
        scoreTimer--;
        startAndTimerEl.textContent = scoreTimer;
        
        if (scoreTimer >= 0) {
            // // Tests if win condition is met
            // if (isWin && timerCount > 0) {
                // // Clears interval and stops 
                // clearInterval(timerInterval);
                // // winGame();
                // }
            }
            // Tests if time has run out
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

    answerButtonEls = document.querySelectorAll('#questionSection button');
    for (let i = 0; i < answerButtonEls.length; i++) {
        const answerBtn = answerButtonEls[i];
        answerBtn.textContent = questions[questionIndex].choices[i];
        answerBtn.addEventListener('click', handleAnswer);        
    }
}

function handleAnswer(event) {
    event.preventDefault;
    
    var selectedAnswer = this.textContent;
    console.log('clicked');
}


function loseGame() {
    questionSectionEl.style.display = 'none';
    tryAgainSectionEl.style.display = 'block';
    startAndTimerEl.textContent = 'Start';
    startAndTimerEl.classList.remove('button-primary')
}

startAndTimerEl.addEventListener('click', startQuiz);