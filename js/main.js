const questions = [
    { text: "Choose a colour:", type: "color" },
    { text: "Choose a form:", type: "choice", choices: ["Beautiful", "Creative", "Interesting", "Bright", "Gentle"] },
    { text: "Question 3:", type: "choice", choices: ["Option1", "Option2", "Option3", "Option4", "Option5"] },
    { text: "Question 4:", type: "choice", choices: ["Option1", "Option2", "Option3", "Option4", "Option5"] }
];

const flowerTypes = {
    "Option1-Option1": "Rose",
    "Option1-Option2": "Lily",
    "Option1-Option3": "Tulip",
    "Option1-Option4": "Orchid",
    "Option1-Option5": "Lilac",
    "Option2-Option1": "Sunflower",
    "Option2-Option2": "Daisy",
    "Option2-Option3": "Carnation",
    "Option2-Option4": "Peony",
    "Option2-Option5": "Chrysanthemum",
    // Add more combinations as needed
};

const answers = [];
let currentQuestion = 0;

function showQuestion(index) {
    const question = questions[index];
    document.getElementById('question').textContent = question.text;

    const choicesDiv = document.getElementById('choices');
    const colorChoicesDiv = document.getElementById('color-choices');

    choicesDiv.innerHTML = '';
    colorChoicesDiv.style.display = 'none';

    if (question.type === "choice") {
        choicesDiv.style.display = "flex";
        question.choices.forEach(choice => {
            const div = document.createElement('div');
            div.className = 'choice';
            div.dataset.value = choice;
            div.textContent = choice;
            choicesDiv.appendChild(div);
        });
    } else if (question.type === "color") {
        choicesDiv.style.display = "none";
        colorChoicesDiv.style.display = "flex";
    }
}

document.getElementById('choices').addEventListener('click', function(event) {
    if (event.target.classList.contains('choice')) {
        answers.push(event.target.dataset.value);
        nextQuestion();
    }
});

document.getElementById('color-choices').addEventListener('click', function(event) {
    if (event.target.classList.contains('color-circle')) {
        answers.push(event.target.dataset.value);
        nextQuestion();
    }
});

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
    } else {
        generatePrompt();
    }
}

function generatePrompt() {
    console.log("Final Answers: ", answers);

    const flowerType = flowerTypes[`${answers[2]}-${answers[3]}`] || "Unknown flower";
    const prompt = `${answers[0]} ${answers[1]} ${flowerType}`;
    console.log(`Generated Prompt: ${prompt}`);

    // Send data to TouchDesigner
    // fetch('https://your-api-endpoint.com', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ prompt: prompt })
    // }).then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch((error) => {
    //     console.error('Error:', error);
    // });
}

showQuestion(currentQuestion);
