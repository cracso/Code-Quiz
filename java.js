var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");


var quizQuestions = [
        {
            question: "Soccer - How many players in total are on the field at the beggining of the game?",
            choiceA: "11",
            choiceB: "15",
            choiceC: "20",
            choiceD: "22",
            correctAnswer: "d"
        },
        
        {
            question: "Baseball - How many players from a team may play on the field at a time?",
            choiceA: "8",
            choiceB: "9",
            choiceC: "10",
            choiceD: "11",
            correctAnswer: "b"
        },
        
        {
            question: "Football - How many points is a touchdowns worth?",
            choiceA: "3",
            choiceB: "6",
            choiceC: "7",
            choiceD: "9",
            correctAnswer: "b"
        },
        {
            question: "Bowling - Which of the following is a perfect score in a game of Bowling?",
            choiceA: "100",
            choiceB: "200",
            choiceC: "300",
            choiceD: "400",
            correctAnswer: "c"
        },
        {
            question: "Tennis - What piece of equipment is used to hit the ball?",
            choiceA: "Racket",
            choiceB: "Bat",
            choiceC: "Club",
            choiceD: "Paddle",
            correctAnswer: "a"
        },
        {
            question: "Pick one - What kind of ball weighs the most",
            choiceA: "A tennis ball",
            choiceB: "A  golf  ball",
            choiceC: "A ping pong",
            choiceD: "A squash ball",
            correctAnswer: "a"
        },
        {
            question: "How long is a marathon?",
            choiceA: "13.5 Miles",
            choiceB: "20 Miles",
            choiceC: "26.2 Miles",
            choiceD: "30 Miles",
            correctAnswer: "c"
        },
        {
            question: "What kind of spot is played with a mallet, and on a horse?",
            choiceA: "Cricket",
            choiceB: "Badminton",
            choiceC: "Croquet",
            choiceD: "Polo",
            correctAnswer: "d"
        }
        
        
    ];
    
    var finalQuestionIndex = quizQuestions.length;
    var currentQuestionIndex = 0;
    var timeLeft = 60;
    var timerInterval;
    var score = 0;
    var correct;

    function generateQuizQuestion(){
        gameoverDiv.style.display = "none";
        if (currentQuestionIndex === finalQuestionIndex){
            return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};
    function startQuiz(){
        gameoverDiv.style.display = "none";
        startQuizDiv.style.display = "none";
        generateQuizQuestion();

        timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}
submitScoreBtn.addEventListener("click", function highscore(){
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        currentQuestionIndex++;
        generateQuizQuestion();
    }else{
        showScore();
    }
}

// This button starts the quiz!
startQuizButton.addEventListener("click",startQuiz);