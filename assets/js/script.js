//I created this section for the questions. The questions are hard-coded objects
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
var hsForm = document.getElementById('hsForm');
var choiceButtons = [choice1, choice2, choice3, choice4];

//Button Variables
var highScoresBtn = document.getElementById('viewHighScores');
var startBtn = document.getElementById('startQuiz'); 
var goBackBtn = document.getElementById('goBackBtn');
var clearBtn = document.getElementById('clearBtn');

//Form Variables
var initialsField = document.getElementById('initials');
var hsForm = document.getElementById('hsForm');
var scoreHolder = document.getElementById('scoreHolder');

//Data Variables
var timerDisplay = document.getElementById('timer');
var sectionArray = [quizStartSection, questionViewSection, highScoresFormSection, highScoresSection];
var timeLeft = 30;
var score = 0;
var highScores = [];
var questions = [question1, question2, question3, question4];
var currentQuestion = 0;
var score = 0;
var showTime = null;

//This section contains all of my button event listeners except for the choices
highScoresBtn.addEventListener('click', function() {
    loadScores();
    populateScores();
    showSection(highScoresSection);
});

startBtn.addEventListener('click', function() {
    showSection(questionViewSection);
    showQuestion(questions[currentQuestion]);
    showTime = setInterval(startTimer, 1000);
});

goBackBtn.addEventListener('click', function() {
    resetValues();
    showSection(quizStartSection);
});

clearBtn.addEventListener('click', function() {
    highScores = [];
    saveScores();
    populateScores();
});

choice1.addEventListener("click", function() {
    choice1.classList.add('selectedBtn');
    answerSelected(questions[currentQuestion].choices[0].status);
});

choice2.addEventListener("click", function() {
    choice2.classList.add('selectedBtn');
    answerSelected(questions[currentQuestion].choices[1].status);
});

choice3.addEventListener("click", function() {
    choice3.classList.add('selectedBtn');
    answerSelected(questions[currentQuestion].choices[2].status);
});

choice4.addEventListener("click", function() {
    choice4.classList.add('selectedBtn');
    answerSelected(questions[currentQuestion].choices[3].status);
});

//This function makes sure time has not run out, and updates the display after decrementing the time by 1 second.
function startTimer() {
    if(timeLeft < 1) {
        timeLeft = 0;
        endQuiz();
    } else {
        timeLeft--;
    }
    timerDisplay.innerHTML = timeLeft;
}

//When a wrong answer is selected, this function is called to remove 5 seconds off of the time
function wrongAnswer() {
    if(timeLeft < 6) {
        timeLeft = 0;
        timerDisplay.innerHTML = timeLeft;
        endQuiz();
    } else {
        timeLeft -= 5;
    }
}

//This function is used to hide the current screen, and show the requested screen
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

//This function randomizes the choices, and then displays them for the user
function showQuestion(question) {
    var tempValue = null;

    for(var i = 0; i < question.choices.length; i++) {
        var randomNumber = Math.floor(Math.random() * (4));
        tempValue = question.choices[i];
        question.choices[i] = question.choices[randomNumber];
        question.choices[randomNumber] = tempValue;
    }

    questionText.innerHTML = question.text;
    choice1.innerHTML = question.choices[0].text;
    choice2.innerHTML = question.choices[1].text;
    choice3.innerHTML = question.choices[2].text;
    choice4.innerHTML = question.choices[3].text;
}

//This function moves the user to the next question
function nextQuestion() {
    choice1.classList.remove('selectedBtn');
    choice2.classList.remove('selectedBtn');
    choice3.classList.remove('selectedBtn');
    choice4.classList.remove('selectedBtn');
    if(currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(questions[currentQuestion]);
    }
    else {
        endQuiz();
    }
}

//This function ends the quiz by stopping the time, updating the score value, and then bringing up the form screen
function endQuiz() {
    clearInterval(showTime);
    yourScore.innerHTML = "Your final score is: " + score + "."; 
    showSection(highScoresFormSection);
}

/*
Accepts the answer selected by the user, determines accuracy, displays result, and then moves to the next question. 
Buttons were disabled here because mass clicking on the correct answer would increase the score.
*/
function answerSelected(answer) {
    disableButtons();
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
        enableButtons();
        nextQuestion();
    }, 1500);
}

//Function used to prevent multiple button clicks
function disableButtons() {
    choice1.classList.add('disableBtn');
    choice2.classList.add('disableBtn');
    choice3.classList.add('disableBtn');
    choice4.classList.add('disableBtn');
}

//Function used to re-enable the choices
function enableButtons() {
    choice1.classList.remove('disableBtn');
    choice2.classList.remove('disableBtn');
    choice3.classList.remove('disableBtn');
    choice4.classList.remove('disableBtn');
}

//Button used to add the scores to the list of high scores
function addHighScore(event) { 
    event.preventDefault();
    if(!initialsField.value) {
        alert('Please enter your initials');
    } else {
        var newScore = {
            initials:  initialsField.value,
            score: score
        }
        highScores.push(newScore);
        populateScores();
        showSection(highScoresSection);
    }
}

//Populates the value of the highScores array into the ol on the page. Also then saves the scores
function populateScores() {
    scoreHolder.innerHTML = "";
    if(highScores.length > 0) {
        for(var i = 0; i < highScores.length; i++) {
            scoreHolder.innerHTML += "<li>" + highScores[i].initials + " - " + highScores[i].score + "</li>";
        }
    } else {
        scoreHolder.innerHTML = "<li>There are not scores to display at this time</li>";
    }
    saveScores();
}

//Resets all values associated with the quiz except for the scores array
function resetValues() {
    score = 0;
    timeLeft = 30;
    timerDisplay.innerHTML = timeLeft;
    currentQuestion = 0;
    initialsField.value = "";
}

//Saves the highScores array to local storage
function saveScores() {
    localStorage.setItem("scores", JSON.stringify(highScores));
    console.log(saveScores);
}

//Recalls the highScores array from local storage
function loadScores() {
    var loadedScores = localStorage.getItem("scores");
    if(!loadedScores) {
        highScores = [];
    } else {
        highScores = JSON.parse(loadedScores);
    }
    populateScores();
}

//When the application starts, I am loading the scores from storage
loadScores();

hsForm.addEventListener("submit", addHighScore);