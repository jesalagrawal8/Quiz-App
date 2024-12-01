const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            { text: "Shark", correct:false},
            { text: "Blue Whale", correct:true},
            { text: "Elephant", correct:false},
            { text: "Giraffe", correct:false},
        ]
    },
    {
        question: "Which is smallest country in the world?",
        answers: [
            { text: "Vatican City", correct:true},
            { text: "Bhutan", correct:false},
            { text: "Nepal", correct:false},
            { text: "Sri Lanka", correct:false},
        ]
    },
    {
        question: "Which is largest desert in the world?",
        answers: [
            { text: "Kalahari", correct:false},
            { text: "Gobi", correct:false},
            { text: "Sahara", correct:true},
            { text: "Antarctica", correct:false},
        ]
    },
    {
        question: "Which is smallest continent in the world?",
        answers: [
            { text: "Asia", correct:false},
            { text: "Australia", correct:true},
            { text: "Arctic", correct:false},
            { text: "Africa", correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none"; // Hide the "Next" button initially
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild); // Remove old answer buttons
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct"); // Mark the correct answer
        }
        button.disabled = true; // Disable all buttons
    });
    nextButton.style.display = "block"; // Show the "Next" button after selection
}

function showScore(){
    resetState(); // Clear the state
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; // Show final score
    nextButton.innerHTML = "Play Again"; // Change button text to "Play Again"
    nextButton.style.display = "block"; // Show the "Play Again" button
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion(); // Show the next question
    } else {
        showScore(); // Show the score after all questions are done
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton(); // Go to the next question
    } else {
        startQuiz(); // Restart the quiz when "Play Again" is clicked
    }
});

startQuiz(); // Start the quiz when the page loads
