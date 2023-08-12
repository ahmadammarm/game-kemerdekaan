// Getting all required elements
const startBtn = document.querySelector(".start-btn button");
const rulesBox = document.querySelector(".rules-box");
const quitBtn = rulesBox.querySelector(".buttons .quit");
const continueBtn = rulesBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz-box");

// If Start Quiz Button Clicked
startBtn.onclick = () => {
    rulesBox.classList.add("activeRules");
}

// If Exit Button Clicked
quitBtn.onclick = () => {
    rulesBox.classList.remove("activeRules");
}

// If Continue Button Clicked
continueBtn.onclick = () => {
    rulesBox.classList.remove("activeRules");
    quizBox.classList.add("activeQuiz");
}

