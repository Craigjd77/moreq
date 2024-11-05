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
let results = [];

// Function to generate a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to load questions based on difficulty
function loadQuestions(difficulty) {
    console.log('Loading questions...'); // Debugging
    questionsToLoad = [];
    for (let i = 0; i < totalQuestions; i++) {
        let question;
        if (difficulty === 'beginner') {
            question = generateBeginnerQuestion();
        } else if (difficulty === 'intermediate') {
            question = generateIntermediateQuestion();
        } else if (difficulty === 'advanced') {
            question = generateAdvancedQuestion();
        }
        questionsToLoad.push(question);
    }
    console.log(`Loaded questions:`, questionsToLoad); // Debugging
    currentQuestionIndex = 0; // Reset index to the beginning of the quiz
    showQuestion(); // Show the first question
}

// Function to generate beginner-level pre-algebra questions
function generateBeginnerQuestion() {
    const questionType = getRandomInt(1, 4);
    let question, correctAnswer, steps;

    switch (questionType) {
        case 1: // Simple Percentages
            const total = getRandomInt(10, 100);
            const percentage = getRandomInt(10, 50);
            correctAnswer = ((percentage / 100) * total).toFixed(2);
            question = `What is ${percentage}% of ${total}?`;
            steps = [
                `Step 1: Convert percentage to decimal: ${percentage}% = ${percentage / 100}`,
                `Step 2: Multiply by ${total}: (${percentage / 100}) * ${total} = ${correctAnswer}`
            ];
            break;
        case 2: // Fractions
            const numerator = getRandomInt(1, 9);
            const denominator = getRandomInt(2, 10);
            const value = getRandomInt(1, 10);
            correctAnswer = ((numerator / denominator) * value).toFixed(2);
            question = `What is ${numerator}/${denominator} of ${value}?`;
            steps = [
                `Step 1: Divide ${numerator} by ${denominator}: ${numerator}/${denominator} = ${(numerator / denominator).toFixed(2)}`,
                `Step 2: Multiply by ${value}: ${(numerator / denominator).toFixed(2)} * ${value} = ${correctAnswer}`
            ];
            break;
        case 3: // Simple Linear Equations
            const a = getRandomInt(1, 10);
            const b = getRandomInt(1, 10);
            correctAnswer = a + b;
            question = `What is ${a} + ${b}?`;
            steps = [`Step 1: Add ${a} and ${b}: ${a} + ${b} = ${correctAnswer}`];
            break;
        case 4: // Solving simple for x
            const coefficient = getRandomInt(1, 5);
            const valueToAdd = getRandomInt(1, 10);
            const result = getRandomInt(15, 30);
            correctAnswer = ((result - valueToAdd) / coefficient).toFixed(2);
            question = `Solve for x: ${coefficient}x + ${valueToAdd} = ${result}`;
            steps = [
                `Step 1: Subtract ${valueToAdd} from both sides: ${coefficient}x = ${result - valueToAdd}`,
                `Step 2: Divide both sides by ${coefficient}: x = ${correctAnswer}`
            ];
            break;
    }

    return { question, correctAnswer: correctAnswer.toString(), steps, options: generateOptions(correctAnswer) };
}

// Function to generate intermediate-level pre-algebra questions
function generateIntermediateQuestion() {
    const questionType = getRandomInt(1, 3);
    let question, correctAnswer, steps;

    switch (questionType) {
        case 1: // Linear Equations
            const a = getRandomInt(1, 10);
            const b = getRandomInt(1, 20);
            const c = getRandomInt(1, 20);
            correctAnswer = ((c - b) / a).toFixed(2);
            question = `Solve for x: ${a}x + ${b} = ${c}`;
            steps = [
                `Step 1: Subtract ${b} from both sides: ${a}x = ${c - b}`,
                `Step 2: Divide both sides by ${a}: x = ${correctAnswer}`
            ];
            break;
        case 2: // Basic Factoring
            const factorA = getRandomInt(1, 5);
            const factorB = getRandomInt(1, 5);
            correctAnswer = `${factorA}x + ${factorA * factorB}`;
            question = `Expand: ${factorA}(x + ${factorB})`;
            steps = [
                `Step 1: Distribute ${factorA}: ${factorA} * x + ${factorA} * ${factorB}`,
                `Step 2: Simplify: ${correctAnswer}`
            ];
            break;
        case 3: // Inequalities
            const a1 = getRandomInt(1, 10);
            const b1 = getRandomInt(1, 10);
            const c1 = getRandomInt(10, 30);
            correctAnswer = ((c1 - b1) / a1).toFixed(2);
            question = `Solve for x: ${a1}x + ${b1} < ${c1}`;
            steps = [
                `Step 1: Subtract ${b1} from both sides: ${a1}x < ${c1 - b1}`,
                `Step 2: Divide both sides by ${a1}: x < ${correctAnswer}`
            ];
            break;
    }

    return { question, correctAnswer: correctAnswer.toString(), steps, options: generateOptions(correctAnswer) };
}

// Function to generate advanced-level pre-algebra questions
function generateAdvancedQuestion() {
    const a = getRandomInt(1, 5);
    const b = getRandomInt(1, 10);
    const c = getRandomInt(1, 20);
    let question = `Solve for x: ${a}x² + ${b}x + ${c} = 0`;
    let correctAnswer, steps;

    // Using Math.js to calculate the discriminant and roots
    const discriminant = math.pow(b, 2) - (4 * a * c);

    if (discriminant < 0) {
        correctAnswer = "No real roots";
        steps = [
            `Step 1: Calculate the discriminant: b² - 4ac = ${b}² - 4 * ${a} * ${c} = ${discriminant}`,
            `Step 2: Since the discriminant is negative (${discriminant}), there are no real roots.`
        ];
    } else {
        const root1 = math.round((-b + math.sqrt(discriminant)) / (2 * a), 2);
        const root2 = math.round((-b - math.sqrt(discriminant)) / (2 * a), 2);
        correctAnswer = `x = ${root1}, x = ${root2}`;
        steps = [
            `Step 1: Calculate the discriminant: b² - 4ac = ${b}² - 4 * ${a} * ${c} = ${discriminant}`,
            `Step 2: Use the quadratic formula: x = (-b ± √(discriminant)) / 2a`,
            `Step 3: Substitute and solve: x = (-${b} ± √(${discriminant})) / (2 * ${a})`,
            `Step 4: Solutions are: x = ${root1}, x = ${root2}`
        ];
    }

    const options = correctAnswer === "No real roots" ? ["No real roots"] : generateOptions(root1, root2);
    return { question, correctAnswer, steps, options };
}

// Function to generate multiple-choice options ensuring uniqueness
function generateOptions(correctAnswer, secondAnswer = null) {
    let options = new Set();
    if (secondAnswer !== null) {
        options.add(correctAnswer);
        options.add(secondAnswer);
    } else {
        options.add(correctAnswer);
    }

    while (options.size < 5) {
        let randomOffset = getRandomInt(-10, 10);
        let potentialOption = parseFloat(correctAnswer) + randomOffset;
        if (typeof correctAnswer === 'string' && correctAnswer.includes('x =')) {
            continue; // Skip complex answers like quadratic roots for options
        }
        options.add(Number.isInteger(potentialOption) ? potentialOption.toString() : potentialOption.toFixed(2));
    }

    return Array.from(options).sort(() => Math.random() - 0.5);
}

// Function to show one question at a time
function showQuestion() {
    if (currentQuestionIndex >= questionsToLoad.length) {
        generateReportCard();
        return;
    }

    const question = questionsToLoad[currentQuestionIndex];
    const container = document.querySelector('.questions-container');

    // Updated styling for the question to highlight the equation
    container.innerHTML = `
        <div class="question">
            <strong>Question ${currentQuestionIndex + 1} of ${totalQuestions}:</strong>
            <p class="equation">${question.question}</p>
            <form id="questionForm">
                ${question.options.map((option, index) => `
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

    const reportWindow = document.createElement('div');
    reportWindow.className = 'report-card';
    reportWindow.innerHTML = `
        <h1>Mikey's Report Card</h1>
        <p class="score">Score: ${correctAnswers} out of ${totalQuestions} (${scorePercentage.toFixed(2)}%)</p>
        <p class="grade">Letter Grade: ${letterGrade}</p>
        <p class="feedback">${feedback}</p>
    `;
    document.querySelector('.questions-container').appendChild(reportWindow);
}
