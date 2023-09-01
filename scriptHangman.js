let wordList = ["aparataj", "dulap", "furgoneta", "salupa", "temperament", "timpan", "crocodil","spanzuratoare", "folositor", "curcubeu"];

let  gameWord, playerLife = 7, lifeStatus = document.getElementById("life-status");

lifeStatus.textContent = `Player life: ${playerLife}`;

generateKeyboard();

//fetch('wordsforHangman.txt')
  //.then(response => response.text())
  //.then(line => {
    //wordList = line.split('\n').map(word => word.trim());
    //newGame(); 
  //})
  //.catch(error => console.error('Error fetching words:', error));

newGame();

function newGame() {
    gameWord = wordList[Math.floor(Math.random() * wordList.length)];
    for (let i = 0; i < gameWord.length; ++i) {
        let newInput = document.createElement("input");
        newInput.id = i;
        newInput.classList.add("password");
        document.getElementById("letters").appendChild(newInput);
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
    let button = document.getElementById(id);
    let match = gameWord.search(id);
    if (match === -1) {
        button.style.backgroundColor = "red";
        notFound();
    } else {
  		  showLetters(id);
        button.style.backgroundColor = "lightgreen";
    }
}

function showLetters(id) {
	  let remainingLetters = 0;
    for (let i = 0; i < gameWord.length; ++i) {
        let textBox = document.getElementById(i);
        if (id === gameWord[i]) {
            textBox.placeholder = id;
        } 
        if (textBox.placeholder === "") {
        	  ++remainingLetters;
            console.log(remainingLetters);
		    }
    }
    if (remainingLetters === 0 && playerLife > 0) {
    	 document.getElementById("message").innerHTML = "Congratulations!!:) You found the word!";
    }
}

function notFound() {
    --playerLife;
    if (playerLife > 0) {
        lifeStatus.textContent = `Player life: ${playerLife}`;
    } else {
        lifeStatus.textContent = "";
        for (let i = 0; i < gameWord.length; ++i) {
        	showLetters(gameWord[i]);
        }
        document.getElementById("message").innerHTML = "Game Over:( You were Hanged!";
        let buttons = document.querySelectorAll("#keyboard button");
        buttons.forEach(function(button) {
            button.parentNode.removeChild(button);
        });
    }
}

function restart() {
    location.reload();
}
