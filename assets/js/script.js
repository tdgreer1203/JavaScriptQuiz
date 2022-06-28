//Declaring Objects (Question and HighScoreEntry)
const question1 = {
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
};

const question2 = {
    text: 'What is the capital of Georgia',
    choices: [{
        text: 'Atlanta',
        status: true
    }, {
        text: 'Macon',
        status: false
    }, {
        text: 'Augusta',
        status: false
    }, {
        text: 'Columbus',
        status: false
    }]
};

const question3 = {
    text: 'What is the capital of Louisiana',
    choices: [{
        text: 'Baton Rouge',
        status: true
    }, {
        text: 'New Orleans',
        status: false
    }, {
        text: 'Shreveport',
        status: false
    }, {
        text: 'Lafayette',
        status: false
    }]
};

const question4 = {
    text: 'What is the capital of Alabama',
    choices: [{
        text: 'Montgomery',
        status: true
    }, {
        text: 'Birmingham',
        status: false
    }, {
        text: 'Huntsville',
        status: false
    }, {
        text: 'Mobile',
        status: false
    }]
};

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
var answerDisplay = document.getElementById('answerDisplay');
var yourScore = document.getElementById('yourScore');
var choiceButtons = [choice1, choice2, choice3, choice4];

//Button Variables
var highScoresBtn = document.getElementById('viewHighScores');
var startBtn = document.getElementById('startQuiz'); 
var goBackBtn = document.getElementById('goBackBtn');

//Form Variables
var initialsField = document.getElementById('initials');
var hsForm = document.getElementById('hsForm');

//Data Variables
var timerDisplay = document.getElementById('timer');
var sectionArray = [quizStartSection, questionViewSection, highScoresFormSection, highScoresSection];
var timeLeft = 60;
var score = 0;
var highScores = [];
var questions = [question1, question2, question3, question4];
var currentQuestion = 0;
var score = 0;
var showTime = null;

highScoresBtn.addEventListener('click', function() {
    showSection(highScoresSection);
});

startBtn.addEventListener('click', function() {
    showSection(questionViewSection);
    showQuestion(questions[currentQuestion]);
    showTime = setInterval(startTimer, 1000);
});

goBackBtn.addEventListener('click', function() {
    showSection(highScoresFormSection);
});

function startTimer() {
    timerDisplay.innerHTML = timeLeft;
    timeLeft--;
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
    questionText.innerHTML = question.text;
    choice1.innerHTML = question.choices[0].text;
    choice2.innerHTML = question.choices[1].text;
    choice3.innerHTML = question.choices[2].text;
    choice4.innerHTML = question.choices[3].text;
}

function nextQuestion() {
    if(currentQuestion < 3) {
        currentQuestion++;
        showQuestion(questions[currentQuestion]);
    }
    else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(showTime);
    yourScore.innerHTML = "Your final score is: " + score + "."; 
    showSection(highScoresFormSection);
}

function answerSelected(answer) {
    answerDisplay.classList.remove('hidden');
    if(answer) {
        answerDisplay.innerHTML = "<h2 style='color: green;'>Correct</h2>";
        answerDisplay.style.borderTop = "5px solid green";
        score++;
    } else {
        answerDisplay.innerHTML = "<h2 style='color: red;'>Incorrect</h2>";
        answerDisplay.style.borderTop = "5px solid red";
        wrongAnswer();
    }
    setTimeout(function() {
        answerDisplay.classList.add('hidden');
        nextQuestion();
    }, 2000);
}

function addHighScore() {
    if(!initialsField.value) {
        alert('Please enter your initials');
    } else {
        var newScore = {
            initials:  initialText,
            score: score
        }
    
        highScores.push(newScore);
        showSection(highScoresSection);
    }
}

function populateScores() {

}

choice1.addEventListener("click", function() {
    answerSelected(questions[currentQuestion].choices[0].status);
});

choice2.addEventListener("click", function() {
    answerSelected(questions[currentQuestion].choices[1].status);
});

choice3.addEventListener("click", function() {
    answerSelected(questions[currentQuestion].choices[2].status);
});

choice4.addEventListener("click", function() {
    answerSelected(questions[currentQuestion].choices[3].status);
});