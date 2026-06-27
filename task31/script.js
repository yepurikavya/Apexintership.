var quizLibrary = [
    { q: "Which symbol starts a jQuery function?", a: ["!", "#", "$"], correct: 2 },
    { q: "What does 'typeof NaN' return?", a: ["number", "NaN", "string"], correct: 0 },
    { q: "Which keyword defines a function scope variable?", a: ["var", "let", "const"], correct: 0 },
    { q: "Is JavaScript a compiled language?", a: ["Yes", "No", "Partially"], correct: 1 },
    { q: "What tag links an external CSS file?", a: ["<style>", "<link>", "<css>"], correct: 1 },
    { q: "How do you log text to the browser console?", a: ["print()", "console.log()", "display()"], correct: 1 },
    { q: "Which symbol is used for strict equality?", a: ["==", "===", "="], correct: 1 },
    { q: "What is the index of the first item in an array?", a: ["0", "1", "-1"], correct: 0 }
];

var qPointer = 0;
var currentScore = 0;

function showQuestion() {
    var data = quizLibrary[qPointer];
    document.getElementById("question-text").innerText = data.q;
    document.getElementById("q-count").innerText = "Question " + (qPointer + 1) + " of " + quizLibrary.length;
    document.getElementById("status-bar").style.width = ((qPointer) / quizLibrary.length) * 100 + "%";
    
    // Hide the next button until an answer is picked
    document.getElementById("next-btn").classList.add("hide");

    var listArea = document.getElementById("options-list");
    listArea.innerHTML = "";
    
    data.a.forEach(function(opt, idx) {
        var btn = document.createElement("button");
        btn.innerText = opt;
        btn.className = "option-btn";
        btn.onclick = function() { processAnswer(this, idx); };
        listArea.appendChild(btn);
    });
}

function processAnswer(clickedBtn, userChoice) {
    var correctIdx = quizLibrary[qPointer].correct;
    var allButtons = document.getElementsByClassName("option-btn");

    // Instant Validation Styling
    if (userChoice === correctIdx) {
        clickedBtn.classList.add("correct");
        currentScore++;
    } else {
        clickedBtn.classList.add("wrong");
        // Also highlight the correct one so user learns
        allButtons[correctIdx].classList.add("correct");
    }

    // Disable all buttons so user can't click twice
    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.add("disabled-btn");
    }

    // Show the "Next Question" button
    document.getElementById("next-btn").classList.remove("hide");
}

function nextQuestion() {
    qPointer++;
    if (qPointer < quizLibrary.length) {
        showQuestion();
    } else {
        showFinalResults();
    }
}

function showFinalResults() {
    document.getElementById("quiz-ui").classList.add("hide");
    document.getElementById("results").classList.remove("hide");
    document.getElementById("score-display").innerText = "You earned " + currentScore + " out of " + quizLibrary.length + " points!";
    document.getElementById("status-bar").style.width = "100%";
}

function resetQuiz() {
    qPointer = 0; currentScore = 0;
    document.getElementById("quiz-ui").classList.remove("hide");
    document.getElementById("results").classList.add("hide");
    showQuestion();
}

// --- API LOGIC (Daily Advice) ---
function getDailyAdvice() {
    var display = document.getElementById("advice-text");
    fetch("https://api.adviceslip.com/advice")
    .then(function(res) { return res.json(); })
    .then(function(data) {
        display.innerText = '"' + data.slip.advice + '"';
    });
}

// Initialize
showQuestion();
getDailyAdvice();