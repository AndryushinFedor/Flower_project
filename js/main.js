const introText1 = [
    "Welcome to the year 2107.",
    "The world as we know it has changed.",
    "The wildlife and plants we once knew to cover this great planet have vanished at the hands of humans.",
    "A longing for what once was is growing amongst the new inhabitants of this world."
];



const introText2 = [
    "To reconnect with our past, we have developed a new personal identification method.",
    "To rebuild society and imagine a world with the beauty that Earth is capable of.",
    "Instead of paper documents, you build your Personalized Identification Flower."
];

const questions = [
    { text: "Pick a color you like", type: "color", colors: ["Red", "Green", "Blue", "Yellow", "Purple", "Orange"] },
    { text: "Do you more follow the path than explore the woods?", type: "choice", choices: ["Agree", "Partly agree", "Not sure", "Disagree", "Strongly disagree"], apiValues: ["Round", "Sharp", "Spiky", "Wavy", "Spiral"] },
    { text: "Are you easily affected by the weather?", type: "choice", choices: ["Agree", "Partly agree", "Not sure", "Disagree", "Strongly disagree"] },
    { text: "Do you base your decisions on logic or feelings?", type: "choice", choices: ["Agree", "Partly agree", "Not sure", "Disagree", "Strongly disagree"] }
];

const flowerTypes = {
    "Agree-Agree": "Rose",
    "Agree-Partly agree": "Tulip",
    "Agree-Not sure": "Daisy",
    "Agree-Disagree": "Sunflower",
    "Agree-Strongly disagree": "Lily",
    "Partly agree-Agree": "Orchid",
    "Partly agree-Partly agree": "Iris",
    "Partly agree-Not sure": "Daffodil",
    "Partly agree-Disagree": "Violet",
    "Partly agree-Strongly disagree": "Hydrangea",
    "Not sure-Agree": "Chrysanthemum",
    "Not sure-Partly agree": "Peony",
    "Not sure-Not sure": "Magnolia",
    "Not sure-Disagree": "Jasmine",
    "Not sure-Strongly disagree": "Lavender",
    "Disagree-Agree": "Poppy",
    "Disagree-Partly agree": "Marigold",
    "Disagree-Not sure": "Gladiolus",
    "Disagree-Disagree": "Hibiscus",
    "Disagree-Strongly disagree": "Camellia",
    "Strongly disagree-Agree": "Anemone",
    "Strongly disagree-Partly agree": "Geranium",
    "Strongly disagree-Not sure": "Petunia",
    "Strongly disagree-Disagree": "Snapdragon",
    "Strongly disagree-Strongly disagree": "Zinnia"
};

const answers = [];
let currentQuestion = 0;
let currentColorIndex = 0;
let currentChoiceIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    showIntroText(introText1, () => {
        setTimeout(() => {
            fadeOutIntroText(() => {
                showIntroText(introText2, () => {
                    setTimeout(() => {
                        fadeOutIntroText(() => showQuestion(currentQuestion));
                    }, 5000);
                });
            });
        }, 5000);
    });
});

document.addEventListener('keydown', function(event) {
    if (event.key === '1') {
        changeSelection(-1);
    } else if (event.key === '5') {
        changeSelection(1);
    } else if (event.key === '3') {
        handleUserInput();
    }
});

function showIntroText(textArray, callback) {
    const container = document.getElementById('container');
    container.innerHTML = ''; // Clear the container
    container.classList.add('intro-text'); // Add class for styling

    textArray.forEach((line, index) => {
        const p = document.createElement('p');
        p.textContent = line;
        container.appendChild(p);

        setTimeout(() => {
            p.style.transition = 'opacity 1s';
            p.style.opacity = 1;
        }, index * 1000);
    });

    setTimeout(callback, textArray.length * 1000 + 1000);
}

function fadeOutIntroText(callback) {
    const container = document.getElementById('container');
    const paragraphs = container.querySelectorAll('p');

    paragraphs.forEach((p, index) => {
        setTimeout(() => {
            p.style.transition = 'opacity 1s';
            p.style.opacity = 0;
        }, index * 70); // Уменьшено время появления до 70%
    });

    setTimeout(() => {
        paragraphs.forEach(p => p.remove());
        callback();
    }, paragraphs.length * 70 + 2000); // Уменьшено время до 70% + 2 секунды
}

function changeSelection(direction) {
    const question = questions[currentQuestion];
    if (question.type === "color") {
        currentColorIndex = (currentColorIndex + direction + question.colors.length) % question.colors.length;
        updateColorDisplay();
    } else if (question.type === "choice") {
        currentChoiceIndex = (currentChoiceIndex + direction + question.choices.length) % question.choices.length;
        updateChoiceDisplay();
    }
}

function handleUserInput() {
    const question = questions[currentQuestion];
    if (question.type === "color") {
        answers.push(question.colors[currentColorIndex]);
    } else if (question.type === "choice") {
        const value = question.apiValues ? question.apiValues[currentChoiceIndex] : question.choices[currentChoiceIndex];
        answers.push(value);
    }
    animateFadeOut();
    setTimeout(nextQuestion, 2000); // Delay for 2 seconds before moving to the next question
}

function updateColorDisplay() {
    const question = questions[currentQuestion];
    if (question.type === "color") {
        const colorCircles = document.querySelectorAll('.color-circle');
        colorCircles.forEach((circle, index) => {
            circle.classList.toggle('selected', index === currentColorIndex);
        });
    }
}

function updateChoiceDisplay() {
    const choicesDiv = document.getElementById('choices');
    const choices = choicesDiv.children;
    for (let i = 0; i < choices.length; i++) {
        choices[i].classList.remove('selected');
    }
    choices[currentChoiceIndex].classList.add('selected');
}

function showQuestion(index) {
    const question = questions[index];
    const container = document.getElementById('container'); // Get the container
    container.innerHTML = ''; // Clear the container
    
    const headerDiv = document.createElement('div');
    headerDiv.className = 'header';
    const questionElement = document.createElement('div');
    questionElement.id = 'question';
    questionElement.className = 'title';
    const instructionsElement = document.createElement('div');
    instructionsElement.id = 'instructions';
    instructionsElement.className = 'instructions';
    headerDiv.appendChild(questionElement);
    headerDiv.appendChild(instructionsElement);
    container.appendChild(headerDiv);

    const choicesDiv = document.createElement('div');
    choicesDiv.id = 'choices';
    choicesDiv.className = 'choices';
    container.appendChild(choicesDiv);

    const colorDisplayDiv = document.createElement('div');
    colorDisplayDiv.id = 'color-display';
    colorDisplayDiv.className = 'color-display';
    container.appendChild(colorDisplayDiv);

    if (questionElement) {
        questionElement.textContent = question.text;
        questionElement.style.opacity = 0;
        questionElement.style.transform = "translateY(20px)";
        setTimeout(() => {
            questionElement.style.opacity = 1;
            questionElement.style.transform = "translateY(0)";
        }, 100); // Delay to ensure the transition works
    } else {
        console.error('Element with ID "question" not found.');
        return;
    }
    if (instructionsElement) {
        instructionsElement.textContent = "Use keys 1 (left) and 5 (right) to change options, and 3 to select";
        instructionsElement.style.opacity = 0;
        instructionsElement.style.transform = "translateY(20px)";
        setTimeout(() => {
            instructionsElement.style.opacity = 1;
            instructionsElement.style.transform = "translateY(0)";
        }, 100); // Delay to ensure the transition works
    } else {
        console.error('Element with ID "instructions" not found.');
        return;
    }

    choicesDiv.innerHTML = '';
    colorDisplayDiv.style.display = 'none';

    if (question.type === "choice") {
        choicesDiv.style.display = "flex";
        question.choices.forEach((choice, i) => {
            const div = document.createElement('div');
            div.className = 'choice';
            div.dataset.value = choice;
            div.dataset.index = i;
            div.textContent = choice;
            choicesDiv.appendChild(div);
        });
        currentChoiceIndex = Math.floor(question.choices.length / 2); // Default to the middle choice
        updateChoiceDisplay();
    } else if (question.type === "color") {
        choicesDiv.style.display = "none";
        colorDisplayDiv.style.display = "flex";
        question.colors.forEach((color, i) => {
            const div = document.createElement('div');
            div.className = 'color-circle';
            if (i === 0) {
                div.classList.add('selected');
            }
            colorDisplayDiv.appendChild(div);
        });
        updateColorDisplay();
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
    fetch('http://172.16.11.43:9980?prompt='+prompt, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
    // body: JSON.stringify({ prompt: prompt })
    })
    // .then(response => response.json())
    .then(response => console.log('Success:', response))
    .catch((error) => {
        console.error('Error:', error);
    });

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

function animateFadeOut() {
    const container = document.getElementById('container');
    const elements = container.querySelectorAll('.choice, .color-circle, .title, .instructions');
    elements.forEach((element, index) => {
        setTimeout(() => element.classList.add('fade-out'), index * 100);
    });
    setTimeout(() => {
        elements.forEach(element => element.classList.add('hidden'));
        elements.forEach(element => {
            element.classList.remove('fade-out');
            element.classList.remove('hidden');
        });
    }, 2000);
}
