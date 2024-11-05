// Main event listener to start the quiz
document.getElementById('startQuizButton').addEventListener('click', function () {
    const difficulty = document.getElementById('difficultyLevel').value;
    console.log(`Selected difficulty: ${difficulty}`); // Debugging
    loadQuestions(difficulty);
    document.querySelector('.intro').style.display = 'none'; // Hide the intro
    document.querySelector('.questions-container').style.display = 'block'; // Show the questions container
});

let totalQuestions = 10;
let questionsToLoad = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let generatedQuestionsSet = new Set(); // Set to track generated questions

// Function to generate a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to load questions based on difficulty
function loadQuestions(difficulty) {
    console.log('Loading questions...'); // Debugging
    questionsToLoad = [];
    generatedQuestionsSet.clear(); // Clear the set for new quiz session

    while (questionsToLoad.length < totalQuestions) {
        let question;
        if (difficulty === 'beginner') {
            question = generateBeginnerQuestion();
        } else if (difficulty === 'intermediate') {
            question = generateIntermediateQuestion();
        } else if (difficulty === 'advanced') {
            question = generateAdvancedQuestion();
        }

        // Check if question is unique before adding to the list
        if (question && !generatedQuestionsSet.has(question.question)) {
            questionsToLoad.push(question);
            generatedQuestionsSet.add(question.question);
        }
    }
    
    console.log(`Loaded questions:`, questionsToLoad); // Debugging
    currentQuestionIndex = 0; // Reset index to the beginning of the quiz
    showQuestion(); // Show the first question
}

// Function to generate a random beginner question
function generateBeginnerQuestion() {
    const questionType = getRandomInt(1, 5); // Increased range for more variety
    let question, correctAnswer, steps;

    switch (questionType) {
        case 1:
            // Very Simple Arithmetic: Addition or Subtraction
            const a1 = getRandomInt(1, 10);
            const b1 = getRandomInt(1, 10);
            const operation1 = getRandomInt(0, 1) ? '+' : '-';
            correctAnswer = operation1 === '+' ? (a1 + b1) : (a1 - b1);
            question = `What is ${a1} ${operation1} ${b1}?`;
            steps = [
                `Step 1: ${operation1 === '+' ? 'Add' : 'Subtract'} ${a1} and ${b1} to get ${correctAnswer}.`
            ];
            break;
        case 2:
            // Basic Multiplication
            const a2 = getRandomInt(1, 5);
            const b2 = getRandomInt(1, 5);
            correctAnswer = a2 * b2;
            question = `What is ${a2} * ${b2}?`;
            steps = [
                `Step 1: Multiply ${a2} and ${b2} to get ${correctAnswer}.`
            ];
            break;
        case 3:
            // Simple Fractions
            const numerator = getRandomInt(1, 5);
            const denominator = getRandomInt(1, 5);
            correctAnswer = (numerator / denominator).toFixed(2);
            question = `What is ${numerator}/${denominator} as a decimal?`;
            steps = [
                `Step 1: Divide ${numerator} by ${denominator} to get ${correctAnswer}.`
            ];
            break;
        case 4:
            // Buffalo Bills Question
            question = "If the Buffalo Bills score 3 touchdowns and each touchdown is worth 7 points, how many points did they score?";
            correctAnswer = "21";
            steps = [
                "Step 1: Multiply the number of touchdowns by the points per touchdown: 3 * 7 = 21."
            ];
            break;
        case 5:
            // Baltimore Orioles Question
            question = "If the Baltimore Orioles hit 5 home runs and each home run is worth 4 runs, how many runs did they score?";
            correctAnswer = "20";
            steps = [
                "Step 1: Multiply the number of home runs by the runs per home run: 5 * 4 = 20."
            ];
            break;
    }

    return { question, correctAnswer: correctAnswer.toString(), steps };
}

// Function to generate intermediate-level pre-algebra questions
function generateIntermediateQuestion() {
    const questionType = getRandomInt(1, 5); // Increased range for more variety
    let question, correctAnswer, steps;

    switch (questionType) {
        case 1:
            // Solving One-Step Equations
            const a = getRandomInt(1, 10);
            const b = getRandomInt(1, 20);
            correctAnswer = (b / a).toFixed(2);
            question = `Solve for x: ${a}x = ${b}`;
            steps = [
                `Step 1: Divide both sides by ${a}: x = ${correctAnswer}`
            ];
            break;
        case 2:
            // Simple Inequalities
            const a2 = getRandomInt(1, 10);
            const b2 = getRandomInt(1, 20);
            const c2 = getRandomInt(20, 40);
            correctAnswer = ((c2 - b2) / a2).toFixed(2);
            question = `Solve for x: ${a2}x + ${b2} < ${c2}`;
            steps = [
                `Step 1: Subtract ${b2} from both sides: ${a2}x < ${c2 - b2}`,
                `Step 2: Divide both sides by ${a2}: x < ${correctAnswer}`
            ];
            break;
        case 3:
            // Simplifying Expressions
            const a3 = getRandomInt(1, 5);
            const b3 = getRandomInt(1, 5);
            correctAnswer = `${a3}x + ${a3 * b3}`;
            question = `Simplify: ${a3}(x + ${b3})`;
            steps = [
                `Step 1: Distribute: ${a3} * x + ${a3} * ${b3}`,
                `Step 2: Simplify: ${correctAnswer}`
            ];
            break;
        case 4:
            // Phoenix Suns Question
            question = "If the Phoenix Suns score 2 points for every basket and they made 10 baskets, how many points did they score?";
            correctAnswer = "20";
            steps = [
                "Step 1: Multiply the number of baskets by the points per basket: 10 * 2 = 20."
            ];
            break;
        case 5:
            // Another Inequality
            const a4 = getRandomInt(1, 10);
            const b4 = getRandomInt(1, 20);
            const c4 = getRandomInt(20, 40);
            correctAnswer = ((c4 - b4) / a4).toFixed(2);
            question = `Solve for x: ${a4}x + ${b4} < ${c4}`;
            steps = [
                `Step 1: Subtract ${b4} from both sides: ${a4}x < ${c4 - b4}`,
                `Step 2: Divide both sides by ${a4}: x < ${correctAnswer}`
            ];
            break;
    }

    return { question, correctAnswer: correctAnswer.toString(), steps };
}

// Function to generate advanced-level pre-algebra questions
function generateAdvancedQuestion() {
    const a = getRandomInt(1, 5);
    const b = getRandomInt(1, 10);
    const c = getRandomInt(1, 20);
    let question = `Solve for x: ${a}x² + ${b}x + ${c} = 0`;
    let correctAnswer, steps;

    // Using JavaScript Math functions to calculate the discriminant and roots
    const discriminant = Math.pow(b, 2) - (4 * a * c);

    if (discriminant < 0) {
        correctAnswer = "No real roots";
        steps = [
            `Step 1: Calculate the discriminant: b² - 4ac = ${b}² - 4 * ${a} * ${c} = ${discriminant}`,
            `Step 2: Since the discriminant is negative (${discriminant}), there are no real roots.`
        ];
    } else {
        const root1 = ((-b + Math.sqrt(discriminant)) / (2 * a)).toFixed(2);
        const root2 = ((-b - Math.sqrt(discriminant)) / (2 * a)).toFixed(2);
        correctAnswer = `x = ${root1}, x = ${root2}`;
        steps = [
            `Step 1: Calculate the discriminant: b² - 4ac = ${b}² - 4 * ${a} * ${c} = ${discriminant}`,
            `Step 2: Use the quadratic formula: x = (-b ± √(discriminant)) / 2a`,
            `Step 3: Substitute and solve: x = (-${b} ± √(${discriminant})) / (2 * ${a})`,
            `Step 4: Solutions are: x = ${root1}, x = ${root2}`
        ];
    }

    return { question, correctAnswer, steps };
}

// Function to show one question at a time
function showQuestion() {
    if (currentQuestionIndex >= questionsToLoad.length) {
        generateReportCard();
        return;
    }

    const question = questionsToLoad[currentQuestionIndex];
    const container = document.querySelector('.questions-container');

    container.innerHTML = `
        <div class="question">
            <strong>Question ${currentQuestionIndex + 1} of ${totalQuestions}:</strong>
            <p class="equation">${question.question}</p>
            <form id="questionForm">
                ${generateOptions(question.correctAnswer).map((option, index) => `
                    <div class="option">
                        <input type="radio" id="option${index}" name="answer" value="${option}">
                        <label for="option${index}">${String.fromCharCode(65 + index)}. ${option}</label><br>
                    </div>
                `).join('')}
            </form>
            <button id="submitAnswerButton">Submit Answer</button>
            <div id="feedback${currentQuestionIndex}" class="feedback"></div>
            <div id="steps${currentQuestionIndex}" class="steps" style="display: none;"></div>
            <button id="nextQuestionButton" style="display: none;">Next Question</button>
        </div>
    `;

    // Event listener for submit button
    document.getElementById('submitAnswerButton').addEventListener('click', function () {
        checkAnswer(currentQuestionIndex, question.correctAnswer);
    });

    // Event listener for next question button
    document.getElementById('nextQuestionButton').addEventListener('click', function () {
        currentQuestionIndex++;
        showQuestion();
    });
}

// Function to generate multiple-choice options ensuring uniqueness
function generateOptions(correctAnswer) {
    let options = new Set();
    options.add(correctAnswer);

    while (options.size < 5) {
        let randomOffset = getRandomInt(-5, 5);
        let potentialOption = parseFloat(correctAnswer) + randomOffset;
        options.add(Number.isInteger(potentialOption) ? potentialOption.toString() : potentialOption.toFixed(2));
    }

    return Array.from(options).sort(() => Math.random() - 0.5);
}

// Function to check the user's answer
function checkAnswer(questionIndex, correctAnswer) {
    const selectedOption = document.querySelector(`input[name="answer"]:checked`);
    const feedback = document.getElementById(`feedback${questionIndex}`);
    const stepsContainer = document.getElementById(`steps${questionIndex}`);
    const nextQuestionButton = document.getElementById('nextQuestionButton');

    if (!selectedOption) {
        feedback.textContent = "Hey Mikey, make sure to pick an answer! 🏈";
        feedback.style.color = "red";
        return;
    }

    const userAnswer = selectedOption.value;

    if (userAnswer === correctAnswer) {
        feedback.textContent = "Nice job, Mikey! You got it right! 🎉";
        feedback.style.color = "green";
        correctAnswers++;
    } else {
        feedback.textContent = `Not quite, Mikey! Let's look at how to solve it.`;
        feedback.style.color = "red";
    }

    // Display the original equation before showing the steps
    const originalEquation = questionsToLoad[questionIndex].question;
    stepsContainer.innerHTML = `
        <p class="original-equation">Starting Equation: ${originalEquation.replace(/x/g, '<span class="highlight-x">x</span>')}</p>
        ${questionsToLoad[questionIndex].steps.map(step => `<p>${step.replace(/x/g, '<span class="highlight-x">x</span>')}</p>`).join('')}
    `;
    stepsContainer.style.display = 'block';

    // Enable the next question button
    nextQuestionButton.style.display = 'inline-block';
}

// Generate a report card at the end of the quiz
function generateReportCard() {
    const scorePercentage = (correctAnswers / totalQuestions) * 100;
    let letterGrade;
    let feedback;

    // Determine letter grade and feedback
    if (scorePercentage >= 90) {
        letterGrade = 'A';
        feedback = "Awesome work, Mikey! You're on fire! 🔥";
    } else if (scorePercentage >= 80) {
        letterGrade = 'B';
        feedback = "Great job, Mikey! You're getting the hang of it!";
    } else if (scorePercentage >= 70) {
        letterGrade = 'C';
        feedback = "Good effort, Mikey! Keep practicing those problem areas.";
    } else if (scorePercentage >= 60) {
        letterGrade = 'D';
        feedback = "Keep pushing, Mikey! You can do this!";
    } else {
        letterGrade = 'F';
        feedback = "Don't give up, Mikey! We'll tackle these together.";
    }

    const reportWindow = window.open("", "Report Card", "width=400,height=300");
    reportWindow.document.write(`
        <h1>Mikey's Report Card</h1>
        <p class="score">Score: ${correctAnswers} out of ${totalQuestions} (${scorePercentage.toFixed(2)}%)</p>
        <p class="grade">Letter Grade: ${letterGrade}</p>
        <p class="feedback">${feedback}</p>
    `);
    reportWindow.document.close();
}
