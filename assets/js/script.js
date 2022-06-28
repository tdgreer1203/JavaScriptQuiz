//Declaring Objects (Question and HighScoreEntry)
const question = {
    text: 'What is the capital of Texas',
    choices: [{
        text: 'Austin',
        status: true
    }, {
        text: 'Dallas',
        status: false
    }, {
        text: 'Houston',
        status: false
    }, {
        text: 'San Antonio',
        status: false
    }]
}

const highScoreEntry = {
    initials: "",
    score: 0
}

//Section Variables
var quizStartSection = document.querySelector('.quizStart');
var questionViewSection = document.querySelector('.questionView');
var highScoresFormSection = document.querySelector('.highScoresForm');
var highScoresSection = document.querySelector('.highScores');

//Element Variables
var questionText = document.getElementById('questionText');
var choice1 = document.getElementById('choice1');
var choice2 = document.getElementById('choice2');
var choice3 = document.getElementById('choice3');
var choice4 = document.getElementById('choice4');

//Button Variables
var highScoresBtn = document.getElementById('viewHighScores');
var startBtn = document.getElementById('startQuiz'); 
var goBackBtn = document.getElementById('goBackBtn');

//Data Variables
var timerDisplay = document.getElementById('timer');
var sectionArray = [quizStartSection, questionViewSection, highScoresFormSection, highScoresSection];
var timeLeft = 60;
var score = 0;
var highScores = [];

highScoresBtn.addEventListener('click', function() {
    showSection(highScoresSection);
});

startBtn.addEventListener('click', function() {
    showQuestion(questions[0]);
    showSection(questionViewSection);
    startTimer();
});

goBackBtn.addEventListener('click', function() {
    showSection(highScoresFormSection);
});

function startTimer() {
    setInterval(function countDown() {
        timerDisplay.innerHTML = timeLeft;
        timeLeft--;
    }, 1000);
}

function wrongAnswer() {
    timeLeft -= 5;
}

function showSection(screen) {
    for(var i = 0; i < sectionArray.length; i++) {
        if(screen === sectionArray[i]) {
            sectionArray[i].classList.remove('hidden');
        } else {
            if(!sectionArray[i].classList.contains('hidden')) {
                sectionArray[i].classList.add('hidden');
            }
        }
    }
}

function showQuestion(question) {
    questionText.text = question.text;
    choice1.text = question.choices[0].text;
    choice2.text = question.cohices[0].text;
    choice3.text = question.choices[0].text;
    choice4.text = question.choices[0].text;
}

console.log(testQuestion.text);