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

document.addEventListener('keydown', function(event) {
    if (event.key >= '1' && event.key <= '5') {
        handleUserInput(event.key);
    }
});

function handleUserInput(key) {
    const index = parseInt(key) - 1;
    const question = questions[currentQuestion];
    if (question.type === "choice" && index < question.choices.length) {
        answers.push(question.choices[index]);
    } else if (question.type === "color" && index < document.querySelectorAll('.color-circle').length) {
        const colorCircles = document.querySelectorAll('.color-circle');
        answers.push(colorCircles[index].dataset.value);
    }
    nextQuestion();
}

function showQuestion(index) {
    const question = questions[index];
    document.getElementById('question').textContent = question.text;

    const choicesDiv = document.getElementById('choices');
    const colorChoicesDiv = document.getElementById('color-choices');

    choicesDiv.innerHTML = '';
    colorChoicesDiv.style.display = 'none';

    if (question.type === "choice") {
        choicesDiv.style.display = "flex";
        question.choices.forEach((choice, i) => {
            const div = document.createElement('div');
            div.className = 'choice';
            div.dataset.value = choice;
            div.textContent = `${i + 1}. ${choice}`;
            choicesDiv.appendChild(div);
        });
    } else if (question.type === "color") {
        choicesDiv.style.display = "none";
        colorChoicesDiv.style.display = "flex";
    }
}

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
    console.log(`Final Answers: ${answers.join(', ')}`);
    console.log(`Generated Prompt: ${prompt}`);
    displayTerminalAnimation(prompt);

    // Code for sending data to TouchDesigner API
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

function displayTerminalAnimation(prompt) {
    const terminal = document.getElementById('terminal');
    terminal.style.display = 'block';

    const initialLines = [
        "Initializing data transfer...",
        "Connecting to server...",
        "Transferring data...",
        "Processing...",
        "Retrieving results...",
        "Finalizing..."
    ];

    const rapidLines = [
        "DATA: 0x1F3A9B4C2E3...",
        "DATA: 0xB4C2E9A6EF1...",
        "DATA: 0x9A6EE3B7F5A...",
        "DATA: 0xE3B7F5A4D7C...",
        "DATA: 0x5A4D7C8B2E1...",
        "DATA: 0x7C8B2E1D0F3...",
        "INFO: System check complete...",
        "INFO: Data integrity verified...",
        "INFO: Synchronizing with server...",
        "LOG: Operation successful...",
        "LOG: Transferring additional data...",
        "LOG: Verifying system integrity...",
        "INFO: Rechecking data...",
        "INFO: Optimizing transfer...",
        "INFO: Data optimization complete...",
        "DATA: 0x2E1D0F3A9B4...",
        "DATA: 0xF3A9B4C2E9A...",
        "DATA: 0xB4C2E9A6E3B...",
        "DATA: 0x9A6EE3B7F5A...",
        "DATA: 0xE3B7F5A4D7C...",
        "DATA: 0x5A4D7C8B2E1...",
        "DATA: 0x7C8B2E1D0F3..."
    ];

    let i = 0;
    let isRapidPhase = false;
    const maxLines = 20; // Maximum number of lines displayed on the screen

    function typeWriter() {
        if (!isRapidPhase) {
            if (i < initialLines.length) {
                appendLine(initialLines[i]);
                i++;
                setTimeout(typeWriter, 1000); // Adjust typing speed for initial lines
            } else {
                i = 0;
                isRapidPhase = true;
                setTimeout(typeWriter, 500); // Short delay before starting rapid lines
            }
        } else {
            if (i < rapidLines.length) {
                appendLine(rapidLines[i]);
                i++;
                setTimeout(typeWriter, 100); // Adjust typing speed for rapid lines
            } else {
                i = 0;
                setTimeout(typeWriter, 100); // Restart rapid lines
            }
        }
    }

    function appendLine(text) {
        const line = document.createElement('div');
        line.textContent = text;
        terminal.appendChild(line);

        // Remove extra lines
        if (terminal.children.length > maxLines) {
            terminal.removeChild(terminal.firstChild);
        }

        terminal.scrollTop = terminal.scrollHeight;
    }

    typeWriter();
}

showQuestion(currentQuestion);
