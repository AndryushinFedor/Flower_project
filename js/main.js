const questions = [
    { text: "Choose a colour:", type: "color" },
    { text: "Choose a form:", type: "choice", choices: ["Beautiful", "Creative", "Interesting", "Bright", "Gentle"] },
    { text: "Question 3:", type: "choice", choices: ["Option1", "Option2", "Option3", "Option4", "Option5"] },
    { text: "Question 4:", type: "choice", choices: ["Option1", "Option2", "Option3", "Option4", "Option5"] }
];

const flowerTypes = {
    "Option1-Option1": "Rose",
    "Option1-Option2": "Tulip",
    "Option1-Option3": "Daisy",
    "Option1-Option4": "Sunflower",
    "Option1-Option5": "Lily",
    "Option2-Option1": "Orchid",
    "Option2-Option2": "Iris",
    "Option2-Option3": "Daffodil",
    "Option2-Option4": "Violet",
    "Option2-Option5": "Hydrangea",
    "Option3-Option1": "Chrysanthemum",
    "Option3-Option2": "Peony",
    "Option3-Option3": "Magnolia",
    "Option3-Option4": "Jasmine",
    "Option3-Option5": "Lavender",
    "Option4-Option1": "Poppy",
    "Option4-Option2": "Marigold",
    "Option4-Option3": "Gladiolus",
    "Option4-Option4": "Hibiscus",
    "Option4-Option5": "Camellia",
    "Option5-Option1": "Anemone",
    "Option5-Option2": "Geranium",
    "Option5-Option3": "Petunia",
    "Option5-Option4": "Snapdragon",
    "Option5-Option5": "Zinnia"
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
    const flowerType = flowerTypes[`${answers[2]}-${answers[3]}`] || "Unknown flower";
    const prompt = `${answers[0]} ${answers[1]} ${flowerType}`;
    document.getElementById('container').style.display = 'none';
    displayTerminalAnimation(prompt, flowerType);
}

function displayTerminalAnimation(prompt, flowerType) {
    const terminal = document.getElementById('terminal');
    terminal.style.display = 'block';
    const text = `Generating flower...\nColour: ${answers[0]}\nForm: ${answers[1]}\nType: ${flowerType}\n\nGenerated Prompt: ${prompt}`;
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            terminal.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50); // Adjust typing speed here
        } else {
            // Send data to TouchDesigner after typing is complete
            /*
            fetch('https://your-api-endpoint.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: prompt })
            }).then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch((error) => {
                console.error('Error:', error);
            });
            */
        }
    }

    typeWriter();
}

showQuestion(currentQuestion);
