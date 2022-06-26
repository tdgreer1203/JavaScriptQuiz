var highScoresBtn = document.getElementById('viewHighScores');
var quizStartSection = document.querySelector('.quizStart');
var questionViewSection = document.querySelector('.questionView');
var highScoresFormSection = document.querySelector('.highScoresForm');
var highScoresSection = document.querySelector('.highScores');
var timerDisplay = document.getElementById('timer');
var sectionArray = [quizStartSection, questionViewSection, highScoresFormSection, highScoresSection];
var timeLeft = 60;

highScoresBtn.addEventListener('click', function() {
    showSection(highScoresSection);
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