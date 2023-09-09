let wordList = ["aparataj", "dulap", "furgoneta", "salupa", "temperament", "timpan", "crocodil", "spanzuratoare", "folositor", "curcubeu"];

let gameWord = wordList[Math.floor(Math.random() * wordList.length)];

let playerLife = 7,
    inputsArray = [],
    pressedKeys = [],
    letterCount = [],
    foundLetters = 0,
    lifeStatus = document.getElementById("life-status"),
    messageBox = document.getElementById("message");

lifeStatus.textContent = `Player life: ${playerLife}`;

generateKeyboard();

newGame();

function newGame() {
    for (let i = 0; i < gameWord.length; ++i) {
        let newInput = document.createElement("input");
        newInput.id = i;
        newInput.classList.add("password");
        document.getElementById("letters").appendChild(newInput);
        inputsArray.push(newInput);
        letterCount.includes(gameWord[i]) ? true : letterCount.push(gameWord[i]);
    }
}

function generateKeyboard() {
    for (let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); ++i) {
        let newButton = document.createElement("button");
        newButton.innerText = String.fromCharCode(i);
        newButton.id = String.fromCharCode(i);
        newButton.classList.add("round");
        newButton.addEventListener("click", function() {
            findLetter(newButton.id)
        });
        document.getElementById("keyboard").appendChild(newButton);
    }
}

function findLetter(id) {
    let match = gameWord.search(id);
    let button = document.getElementById(id);
    if (match === -1 && !pressedKeys.includes(id)) {
        --playerLife;
        button.style.backgroundColor = "red";
        lifeStatus.textContent = `Player life: ${playerLife}`;
        if (playerLife === 0) {
            inputsArray.forEach(input => input.placeholder = gameWord[input.id]);
            messageBox.innerText = "Game Over:( You were Hanged!";
            let buttons = document.querySelectorAll("#keyboard button");
            buttons.forEach(function(button) {
                button.parentNode.removeChild(button);
            });
        }
    } else if (match != -1 && !pressedKeys.includes(id)) {
        ++foundLetters;
        button.style.backgroundColor = "lightgreen";
        gameWord.split('').forEach((letter, i) => {
            gameWord[i] === id ? inputsArray[i].placeholder = id : null;
        });
        foundLetters === letterCount.length ? messageBox.innerText = "Congratulations!!:) You found the word!" : null;
    }
    pressedKeys.includes(id) ? true : pressedKeys.push(id);
}

function restart() {
    location.reload();
}
