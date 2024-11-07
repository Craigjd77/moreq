// Main event listener to start the quiz
document.getElementById('startQuizButton').addEventListener('click', function () {
    const difficulty = document.getElementById('difficultyLevel').value;
    console.log(`Selected difficulty: ${difficulty}`); // Debugging
    loadQuestions(difficulty);
    document.querySelector('.intro').style.display = 'none'; // Hide the intro
    document.querySelector('.questions-container').style.display = 'block'; // Show the questions container
});

let totalQuestions = 5;
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
        if (difficulty === 'mikey5') {
            question = generateMikey5Question();
        } else if (difficulty === 'mikey4') {
            question = generateMikey4Question();
        } else if (difficulty === 'mikey6') {
            question = generateMikey6Question();
        } else if (difficulty === 'mikey7') { // New level
            question = generateMikey7Question();
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


// Function to generate Mikey IV questions
function generateMikey4Question() {
    const questionType = getRandomInt(1, 6); // Randomly select a question type
    let question, correctAnswer, steps;

    switch (questionType) {
        case 1: // Multiplication
            const a1 = getRandomInt(1, 12);
            const b1 = getRandomInt(1, 12);
            correctAnswer = a1 * b1;
            question = `What is ${a1} × ${b1}?`;
            steps = [
                `**Multiply the numbers:**`,
                `- ${a1} × ${b1} = ${correctAnswer}`,
                `**Final Answer:** ${correctAnswer}`
            ];
            break;

        case 2: // Division
            const a2 = getRandomInt(10, 100);
            const b2 = getRandomInt(1, 10);
            correctAnswer = (a2 / b2).toFixed(2);
            question = `What is ${a2} ÷ ${b2}?`;
            steps = [
                `**Divide the numbers:**`,
                `- ${a2} ÷ ${b2} = ${correctAnswer}`,
                `**Final Answer:** ${correctAnswer}`
            ];
            break;

        case 3: // Addition
            const a3 = getRandomInt(100, 999);
            const b3 = getRandomInt(100, 999);
            correctAnswer = a3 + b3;
            question = `What is ${a3} + ${b3}?`;
            steps = [
                `**Add the numbers:**`,
                `- ${a3} + ${b3} = ${correctAnswer}`,
                `**Final Answer:** ${correctAnswer}`
            ];
            break;

        case 4: // Subtraction
            const a4 = getRandomInt(100, 999);
            const b4 = getRandomInt(1, 99);
            correctAnswer = a4 - b4;
            question = `What is ${a4} - ${b4}?`;
            steps = [
                `**Subtract the numbers:**`,
                `- ${a4} - ${b4} = ${correctAnswer}`,
                `**Final Answer:** ${correctAnswer}`
            ];
            break;

        case 5: // Fractions
            const numerator = getRandomInt(1, 9);
            const denominator = getRandomInt(2, 9);
            correctAnswer = (numerator / denominator).toFixed(2);
            question = `What is ${numerator}/${denominator} as a decimal?`;
            steps = [
                `**Convert the fraction to a decimal:**`,
                `- ${numerator} ÷ ${denominator} = ${correctAnswer}`,
                `**Final Answer:** ${correctAnswer}`
            ];
            break;

        case 6: // Word Problem
            const items = getRandomInt(2, 5);
            const pricePerItem = getRandomInt(1, 20);
            const totalCost = items * pricePerItem;
            const payment = totalCost + getRandomInt(1, 10);
            correctAnswer = (payment - totalCost).toString();
            question = `You buy ${items} items at $${pricePerItem} each. You pay $${payment}. How much change do you get back?`;
            steps = [
                `**Calculate Total Cost:**`,
                `- ${items} items × $${pricePerItem} each = $${totalCost}`,
                `**Calculate Change:**`,
                `- Payment: $${payment}`,
                `- Change: $${payment} - $${totalCost} = $${correctAnswer}`,
                `**Final Answer:** $${correctAnswer}`
            ];
            break;
    }

    return { question, correctAnswer: correctAnswer.toString(), steps };
}

// Function to generate Mikey V questions
function generateMikey5Question() {
    const questionType = getRandomInt(1, 5); // Randomly select a question type
    let question, correctAnswer, steps;

    switch (questionType) {
        case 1: // Multiplication and Division
            const a1 = 571; // Example numbers for detailed explanation
            const b1 = 41;
            correctAnswer = (a1 / b1).toFixed(2);
            question = `Calculate: ${a1} ÷ ${b1}`;
            steps = [
                `**Understanding the Problem:** We need to divide 571 by 41.`,
                `**Estimate the Quotient:** 41 is close to 40, so think of 571 as 560. 560 ÷ 40 is about 14.`,
                `**Perform the Division:**`,
                `- 41 goes into 57 once (1 time), because 41 × 1 = 41.`,
                `- Subtract 41 from 57 to get 16.`,
                `- Bring down the next digit (1) to make it 161.`,
                `- 41 goes into 161 three times (3 times), because 41 × 3 = 123.`,
                `- Subtract 123 from 161 to get 38.`,
                `- Since there are no more digits to bring down, the division stops here.`,
                `**Calculate the Decimal:**`,
                `- Bring down a zero to make it 380.`,
                `- 41 goes into 380 nine times (9 times), because 41 × 9 = 369.`,
                `- Subtract 369 from 380 to get 11.`,
                `- Continue this process to find the decimal.`,
                `**Final Answer:** ${correctAnswer}`
            ];
            break;

        case 2: // Fractions and Decimals
            const numerator1 = getRandomInt(1, 9);
            const denominator1 = getRandomInt(2, 9);
            const numerator2 = getRandomInt(1, 9);
            const denominator2 = getRandomInt(2, 9);
            correctAnswer = ((numerator1 / denominator1) + (numerator2 / denominator2)).toFixed(2);
            question = `Add: ${numerator1}/${denominator1} + ${numerator2}/${denominator2}`;
            steps = [
                `**Convert Fractions to Decimals:**`,
                `- ${numerator1}/${denominator1} = ${(numerator1 / denominator1).toFixed(2)}`,
                `- ${numerator2}/${denominator2} = ${(numerator2 / denominator2).toFixed(2)}`,
                `**Add the Decimals:**`,
                `- ${(numerator1 / denominator1).toFixed(2)} + ${(numerator2 / denominator2).toFixed(2)} = ${correctAnswer}`,
                `**Final Answer:** ${correctAnswer}`
            ];
            break;

        case 3: // Word Problems
            const items = getRandomInt(2, 5);
            const pricePerItem = getRandomInt(1, 20);
            const totalCost = items * pricePerItem;
            const payment = totalCost + getRandomInt(1, 10);
            correctAnswer = (payment - totalCost).toString();
            question = `You buy ${items} items at $${pricePerItem} each. You pay $${payment}. How much change do you get back?`;
            steps = [
                `**Calculate Total Cost:**`,
                `- ${items} items × $${pricePerItem} each = $${totalCost}`,
                `**Calculate Change:**`,
                `- Payment: $${payment}`,
                `- Change: $${payment} - $${totalCost} = $${correctAnswer}`,
                `**Final Answer:** $${correctAnswer}`
            ];
            break;

        case 4: // Geometry and Measurement
            const length = getRandomInt(5, 20);
            const width = getRandomInt(5, 20);
            correctAnswer = (length * width).toString();
            question = `Calculate the area of a rectangle with length ${length} and width ${width}.`;
            steps = [
                `**Use the Formula for Area:**`,
                `- Area = length × width`,
                `- ${length} × ${width} = ${correctAnswer}`,
                `**Final Answer:** ${correctAnswer}`
            ];
            break;

        case 5: // Graphs and Data Interpretation
            // This is a placeholder as graph questions require visual data
            question = "Interpret the data from the given graph.";
            correctAnswer = "Data interpretation varies.";
            steps = [
                `**Analyze the Graph:**`,
                `- Look at the axes and labels.`,
                `- Determine what the graph is showing.`,
                `**Answer Based on the Graph's Data.**`
            ];
            break;
    }

    return { question, correctAnswer, steps };
}

function generateMikey6Question() {
    const questionTypes = [
        'multi-step word problem',
        'fractions and decimals',
        'basic geometry',
        'pre-algebra',
        'data interpretation'
    ];

    const selectedType = questionTypes[getRandomInt(0, questionTypes.length - 1)];
    let question, correctAnswer, steps;

    switch (selectedType) {
        case 'multi-step word problem':
            question = "Mikey has 3 times as many baseball cards as his friend. If his friend has 15 cards, how many cards does Mikey have in total?";
            correctAnswer = 3 * 15;
            steps = [
                "Mikey's friend has 15 cards.",
                "Mikey has 3 times as many cards.",
                "Calculate: 3 × 15 = 45.",
                "Mikey has 45 cards in total."
            ];
            break;

        case 'fractions and decimals':
            question = "Convert 3/4 to a decimal.";
            correctAnswer = (3 / 4).toFixed(2);
            steps = [
                "Divide the numerator by the denominator: 3 ÷ 4.",
                "The result is 0.75.",
                "So, 3/4 as a decimal is 0.75."
            ];
            break;

        case 'basic geometry':
            question = "What is the area of a rectangle with a length of 8 cm and a width of 5 cm?";
            correctAnswer = 8 * 5;
            steps = [
                "Area of a rectangle = length × width.",
                "Calculate: 8 cm × 5 cm = 40 cm².",
                "The area is 40 cm²."
            ];
            break;

        case 'pre-algebra':
            question = "Solve for x: 2x + 3 = 11.";
            correctAnswer = 4;
            steps = [
                "Subtract 3 from both sides: 2x = 8.",
                "Divide both sides by 2: x = 4.",
                "The solution is x = 4."
            ];
            break;

        case 'data interpretation':
            question = "If a bar graph shows that 20 students like soccer, 15 like basketball, and 10 like baseball, how many students like sports in total?";
            correctAnswer = 20 + 15 + 10;
            steps = [
                "Add the number of students for each sport.",
                "Calculate: 20 + 15 + 10 = 45.",
                "A total of 45 students like sports."
            ];
            break;
    }

    return { question, correctAnswer: correctAnswer.toString(), steps };
}


function generateMikey7Question() {
    const questionTypes = [
        'pre-algebra',
        'ratios and proportions',
        'geometry',
        'integers and rational numbers',
        'statistics',
        'probability',
        'basic scientific concepts'
    ];

    const selectedType = questionTypes[getRandomInt(0, questionTypes.length - 1)];
    let question, correctAnswer, steps;

    switch (selectedType) {
        case 'pre-algebra':
            question = "Solve for x: 3x - 5 = 16.";
            correctAnswer = (16 + 5) / 3;
            steps = [
                "Add 5 to both sides: 3x = 21.",
                "Divide both sides by 3: x = 7.",
                "The solution is x = 7."
            ];
            break;

        case 'ratios and proportions':
            question = "If 4 pencils cost $1.20, how much do 10 pencils cost?";
            correctAnswer = (1.20 / 4) * 10;
            steps = [
                "Find the cost of one pencil: $1.20 ÷ 4 = $0.30.",
                "Multiply by 10: $0.30 × 10 = $3.00.",
                "10 pencils cost $3.00."
            ];
            break;

        case 'geometry':
            question = "What is the area of a circle with a radius of 3 cm? (Use π ≈ 3.14)";
            correctAnswer = (3.14 * 3 * 3).toFixed(2);
            steps = [
                "Area of a circle = π × radius².",
                "Calculate: 3.14 × 3² = 28.26 cm².",
                "The area is 28.26 cm²."
            ];
            break;

        case 'integers and rational numbers':
            question = "What is the sum of -7 and 12?";
            correctAnswer = -7 + 12;
            steps = [
                "Add the integers: -7 + 12.",
                "The result is 5.",
                "The sum is 5."
            ];
            break;

        case 'statistics':
            question = "Find the median of the numbers: 3, 7, 9, 2, 5.";
            correctAnswer = 5;
            steps = [
                "Order the numbers: 2, 3, 5, 7, 9.",
                "The middle number is 5.",
                "The median is 5."
            ];
            break;

        case 'probability':
            question = "What is the probability of rolling a 4 on a standard 6-sided die?";
            correctAnswer = "1/6";
            steps = [
                "A standard die has 6 sides.",
                "Only one side shows a 4.",
                "Probability = 1/6."
            ];
            break;

        case 'basic scientific concepts':
            question = "What is the process by which plants make their food using sunlight called?";
            correctAnswer = "Photosynthesis";
            steps = [
                "Plants use sunlight to convert carbon dioxide and water into glucose.",
                "This process is called photosynthesis.",
                "The answer is photosynthesis."
            ];
            break;
    }

    return { question, correctAnswer: correctAnswer.toString(), steps };
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
        feedback.textContent = "CORRECT";
        feedback.style.color = "green";
        correctAnswers++;
        feedback.innerHTML += `<div class="motivational-quote">${getMotivationalQuote(true)}</div>`;
    } else {
        feedback.textContent = "WRONG";
        feedback.style.color = "red";
        feedback.innerHTML += `<div class="motivational-quote">${getMotivationalQuote(false)}</div>`;
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

function getMotivationalQuote(isCorrect) {
    const players = [
        "Cal Ripken Jr.", "Gunnar Henderson","Brooks Robinson", "Adley Rutschman","Jim Palmer", // Orioles
        "Josh Allen", "Jim Kelly", "Thurman Thomas", // Bills
        "Devin Booker", "Charles Barkley", "Steve Nash" // Suns
    ];

    const correctMessages = [
        "You hit that one out of the park, Mikey!",
        "Touchdown! You're unstoppable, Mikey!",
        "Slam dunk, Mikey! Keep it up!",
        "He's on Fire!",
        "Mikey, you're a natural! Keep going!",
        "Eh, I've seen better.",
        "Fantastic play, Trey! You're a star!"
    ];

    const incorrectMessages = [
        "Even the best miss sometimes, Mikey. Keep swinging!",
        "Every loss is a lesson, Mikey. You'll get it next time!",
        "Give up now, you'll never get it dumb dumb.",
        "Don't worry, Mikey. Every shot you don't take is a miss!",
        "Keep your head up, Mikey. You'll nail it next time!",
        "Mikey, every setback is a setup for a comeback!",
        "Wow, you fucking suck at math huh?",
        "You are a LOSER!!",
        "Stay strong, Mikey. Champions are made from challenges!"
    ];

    const messages = isCorrect ? correctMessages : incorrectMessages;
    const randomMessageIndex = getRandomInt(0, messages.length - 1);
    const randomPlayerIndex = getRandomInt(0, players.length - 1);

    const selectedMessage = messages[randomMessageIndex];
    const selectedPlayer = players[randomPlayerIndex];

    return `${selectedMessage}<span class="motivational-quote-author">- ${selectedPlayer}</span>`;
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

    // Open a new window for the report card
    const reportWindow = window.open("", "Report Card", "width=850,height=1100");
    reportWindow.document.write(`
        <html>
        <head>
            <title>Mikey's Report Card</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                    padding: 20px;
                    background: #f9f9f9;
                    width: 8.5in;
                    height: 11in;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                }
                .report-card {
                    width: 7.5in;
                    padding: 1in;
                    border: 1px solid #ccc;
                    background: #fff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    background-image: linear-gradient(to bottom, transparent 95%, rgba(0, 0, 0, 0.05) 96%);
                    background-size: 100% 1.2em;
                }
                h1 {
                    font-family: 'Georgia', serif;
                    font-size: 24px;
                    text-align: center;
                    margin-bottom: 0.5in;
                }
                .score-summary {
                    font-size: 18px;
                    margin-bottom: 0.5in;
                }
                .question-feedback {
                    font-size: 14px;
                    margin-bottom: 0.5in;
                }
                .letter-grade {
                    font-size: 48px;
                    text-align: center;
                    margin-bottom: 0.5in;
                    color: #333;
                }
                .teacher-comments {
                    font-family: 'Cursive', sans-serif;
                    font-size: 16px;
                    border-top: 1px solid #ccc;
                    padding-top: 0.5in;
                }
            </style>
        </head>
        <body>
            <div class="report-card">
                <h1>Mikey's Report Card</h1>
                 <div class="letter-grade">
                    ${letterGrade}
                </div>
                <div class="score-summary">
                    <p>Score: ${correctAnswers} out of ${totalQuestions} (${scorePercentage.toFixed(2)}%)</p>
                </div>
                <div class="question-feedback">
                    ${questionsToLoad.map((q, index) => `
                        <p>Question ${index + 1}: ${q.question} - ${q.correctAnswer === q.userAnswer ? '✔️' : '❌'}</p>
                    `).join('')}
                </div>
               
                <div class="teacher-comments">
                    <p>Teacher Comments:</p>
                    <p>${feedback}</p>
                </div>
            </div>
        </body>
        </html>
    `);
    reportWindow.document.close();
}