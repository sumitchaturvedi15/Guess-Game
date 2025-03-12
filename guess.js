let randomNumber = parseInt(Math.random() * 100 + 1);
const submit = document.querySelector('#submitButton');
const userInput = document.querySelector('#guessField');
const prevGuess = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const highLow = document.querySelector('.lowOrHigh');
const startOver = document.querySelector('.startOver');
const resultDiv = document.querySelector('.result');

let playGame = true;
let guessCount = 1;
let prevGuesses = [];

if (playGame) {
    submit.addEventListener('click', function (event) {
        event.preventDefault();
        const guess = parseInt(userInput.value);
        console.log(guess);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert('Please enter a valid number between 1 to 100');
    } else {
        prevGuesses.push(guess);
        if (guessCount === 10) {
            displayGuess(guess);
            displayMessage(`Game Over! The correct number was ${randomNumber}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`Congratulations! You guessed the number in ${guessCount} attempts.`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage(`Wrong Guess! Number is TOO LOW`);
    } else {
        displayMessage(`Wrong Guess! Number is TOO HIGH`);
    }
}

function displayMessage(message) {
    highLow.textContent = message;
    userInput.value = '';
    
    prevGuess.textContent = prevGuesses.join(', ');
    
    guessCount++;
    remaining.textContent = `${11 - guessCount}`;
}

function displayGuess(guess) {
    userInput.value = '';
    
    prevGuess.textContent = prevGuesses.join(', ');
}

function endGame() {
    userInput.disabled = true;
    submit.disabled = true;
    
    startOver.style.display = 'block';
    startOver.addEventListener('click', newGame);
    
    playGame = false;
}

function newGame() {
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuesses = [];
    guessCount = 1;
    
    prevGuess.textContent = '';
    remaining.textContent = '10';
    highLow.textContent = '';
    userInput.disabled = false;
    submit.disabled = false;
    startOver.style.display = 'none';
    userInput.value = '';
    
    startOver.removeEventListener('click', newGame);
    
    playGame = true;
}