const introText1 = [
    "Welcome to the year 2107.",
    "The world as we know it has changed.",
    "The wildlife and plants we once knew to cover this great planet have vanished at the hands of humans.",
    "A longing for what once was is growing amongst the new inhabitants of this world."
];

const introText2 = [
    "To rebuild society and imagine a world with the beauty that Earth is capable of, we have",
    "developed a new recognition method, the Personal identification Flower",
    "To create your own flower, please answer the following questions"
];

const preQuestion3Text = [
    "Imagine you are standing at the edge of a valley, surrounded by mountains.",
    "It is very quiet and the moon is above you.",
    "Before you lies a neat path, going directly to your destination.",
    "But on the left, you see an opening winding through the rocks.",
    "The second path is inviting you to explore it"
];

const preQuestion4Text = [
    "As you move forward, you find a box.",
    "In the box, you find a letter and a bag of seeds.",
    "The letter says:",
    "\"To whoever finds this,",
    "I’ve been collecting these seeds since 2024, hoping they will be useful in the future.",
    "If you find them, use them wisely.\"",
    "Good luck."
];

const questions = [
    { text: "Pick a color you like", type: "color", colors: ["Red", "Green", "Blue", "Yellow", "Purple"] },
    { text: "What is your mood today?", type: "choice", choices: ["Vivid", "Sharp", "Spiky", "Wavy", "Soft"], apiValues: ["Round", "Sharp", "Spiky", "Wavy", "Spiral"] },
    { text: "Which path do you choose?", type: "choice", choices: ["You follow the neat path", "You explore the unpredictable path", "You create your own path", "You observe from the edge", "You turn around"] },
    { text: "You decided to plant them. How does it make you feel?", type: "choice", choices: ["Excited", "Curious", "Patient", "Nervous", "Hopeful"] }
];

const flowerTypes = {
    "Round-You follow the neat path-Excited": "Rose",
    "Round-You follow the neat path-Curious": "Tulip",
    "Round-You follow the neat path-Patient": "Daisy",
    "Round-You follow the neat path-Nervous": "Sunflower",
    "Round-You follow the neat path-Hopeful": "Lily",
    "Sharp-You explore the unpredictable path-Excited": "Orchid",
    "Sharp-You explore the unpredictable path-Curious": "Iris",
    "Sharp-You explore the unpredictable path-Patient": "Daffodil",
    "Sharp-You explore the unpredictable path-Nervous": "Violet",
    "Sharp-You explore the unpredictable path-Hopeful": "Hydrangea",
    "Spiky-You create your own path-Excited": "Chrysanthemum",
    "Spiky-You create your own path-Curious": "Peony",
    "Spiky-You create your own path-Patient": "Magnolia",
    "Spiky-You create your own path-Nervous": "Jasmine",
    "Spiky-You create your own path-Hopeful": "Lavender",
    "Wavy-You observe from the edge-Excited": "Poppy",
    "Wavy-You observe from the edge-Curious": "Marigold",
    "Wavy-You observe from the edge-Patient": "Gladiolus",
    "Wavy-You observe from the edge-Nervous": "Hibiscus",
    "Wavy-You observe from the edge-Hopeful": "Camellia",
    "Soft-You turn around-Excited": "Anemone",
    "Soft-You turn around-Curious": "Geranium",
    "Soft-You turn around-Patient": "Petunia",
    "Soft-You turn around-Nervous": "Snapdragon",
    "Soft-You turn around-Hopeful": "Zinnia",
    "Spiral-You create your own path-Excited": "Gladiolus",
    "Spiral-You create your own path-Curious": "Hibiscus",
    "Spiral-You create your own path-Patient": "Camellia",
    "Spiral-You create your own path-Nervous": "Petunia",
    "Spiral-You create your own path-Hopeful": "Snapdragon"
};

const answers = [];
let currentQuestion = 0;
let currentColorIndex = 0;
let currentChoiceIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    showPressAnyKey();
});

document.addEventListener('keydown', function(event) {
    if (!window.audioStarted) {
        startAudio();
        return;
    }
    
    if (event.key >= '1' && event.key <= '5') {
        changeSelection(parseInt(event.key) - 1);
    } else if (event.key === getConfirmKey(currentQuestion)) {
        handleUserInput();
    }
});

function showPressAnyKey() {
    const container = document.getElementById('container');
    container.innerHTML = '<div class="start-message">Press Enter to start</div>';
    const startMessage = container.querySelector('.start-message');
    setTimeout(() => {
        startMessage.style.opacity = 1;
    }, 100);
}

function startAudio() {
    const audio = new Audio('sounds/anthomania.wav');
    audio.loop = true;
    audio.play().catch(error => console.error("Error playing audio:", error));
    window.audio = audio; // Save to global scope to stop later
    window.audioStarted = true;

    // Start the intro text display
    showIntroText(introText1, () => {
        setTimeout(() => {
            fadeOutIntroText(() => {
                showIntroText(introText2, () => {
                    setTimeout(() => {
                        fadeOutIntroText(() => showQuestion(currentQuestion));
                    }, 4000); // 4 seconds for the second block of text
                });
            });
        }, 4000); // 4 seconds for the first block of text
    });
}

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

    // Wait for 4 seconds after all lines have appeared before fading out
    setTimeout(() => {
        paragraphs.forEach((p, index) => {
            setTimeout(() => {
                p.style.transition = 'opacity 0.7s'; // Transition time for fading out
                p.style.opacity = 0;
            }, index * 100);
        });

        // Remove paragraphs and call the callback after fade out is complete
        setTimeout(() => {
            paragraphs.forEach(p => p.remove());
            callback();
        }, 1000); // Time for fade out animation
    }, 4000); // 4 seconds after all lines have appeared
}

function changeSelection(index) {
    const question = questions[currentQuestion];
    if (question.type === "color") {
        currentColorIndex = index;
        updateColorDisplay();
    } else if (question.type === "choice") {
        currentChoiceIndex = index;
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
    const colorCircles = document.querySelectorAll('.color-circle');
    colorCircles.forEach((circle, index) => {
        circle.classList.remove('selected');
    });
    if (currentQuestion >= 2) {
        colorCircles[currentColorIndex].classList.add('selected');
    }
}

function updateChoiceDisplay() {
    const choicesDiv = document.getElementById('choices');
    const choices = choicesDiv.children;
    for (let i = 0; i < choices.length; i++) {
        choices[i].classList.remove('selected');
        choices[i].style.opacity = 1; // Ensure all choices are fully visible for the first two questions
    }
    if (currentQuestion >= 2) {
        for (let i = 0; i < choices.length; i++) {
            choices[i].style.opacity = (i === currentChoiceIndex) ? 1 : 0.5;
        }
        choices[currentChoiceIndex].classList.add('selected');
    }
}

function showQuestion(index) {
    const question = questions[index];
    const container = document.getElementById('container');
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
        instructionsElement.textContent = `Use keys 1-5 to change options and "Enter" to select`;
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
        updateChoiceDisplay();
    } else if (question.type === "color") {
        choicesDiv.style.display = "none";
        colorDisplayDiv.style.display = "flex";
        question.colors.forEach((color, i) => {
            const div = document.createElement('div');
            div.className = 'color-circle';
            colorDisplayDiv.appendChild(div);
        });
        updateColorDisplay();
    }
}

function getConfirmKey(questionIndex) {
    if (questionIndex === 0) return 'q';
    if (questionIndex === 1) return 'w';
    if (questionIndex === 2) return 'e';
    return 'r';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion === 2) {
        showIntroText(preQuestion3Text, () => {
            setTimeout(() => {
                fadeOutIntroText(() => showQuestion(currentQuestion));
            }, 4000);
        });
    } else if (currentQuestion === 3) {
        showIntroText(preQuestion4Text, () => {
            setTimeout(() => {
                fadeOutIntroText(() => showQuestion(currentQuestion));
            }, 4000);
        });
    } else if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
    } else {
        generatePrompt();
    }
}

function generatePrompt() {
    const flowerType = flowerTypes[`${answers[1]}-${answers[2]}-${answers[3]}`] || "Unknown flower";
    const prompt = `${answers[0]} ${answers[1]} ${flowerType}`;
    document.getElementById('container').style.display = 'none';
    console.log(`Final Answers: ${answers.join(', ')}`);
    console.log(`Generated Prompt: ${prompt}`);
    displayTerminalAnimation(prompt);

    // Stop the audio
    if (window.audio) {
        window.audio.pause();
        window.audio.currentTime = 0;
    }

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

    // Reset the page after 30 seconds
    setTimeout(() => {
        location.reload();
    }, 30000); // 30 seconds
}

function displayTerminalAnimation(prompt) {
    const terminal = document.getElementById('terminal');
    terminal.style.display = 'block';

    const initialLines = [
        "Great, you did it!",
        "Your Personalized Identification Flower is growing...",
        "Now, plant yourself into the circle and move around",
        "Growing...",
        "Growing...",
        "Growing...",
        "FLOWER IS HERE"
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
