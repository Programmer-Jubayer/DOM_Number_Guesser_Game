// Set the value
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI variables
const minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessInput = document.querySelector("#guess"),
  guessBtn = document.querySelector(".guess-btn"),
  card = document.querySelector(".card"),
  paragraph = document.querySelector(".paragraph"),
  message = document.querySelector(".message");

// Set the minnum & maxnum as Dynamic
minNum.textContent = min;
maxNum.textContent = max;

// Add Event Listner for Play again
card.addEventListener("mousedown", function (e) {
  if (e.target.classList.contains("play-again")) {
    window.location.reload();
  }
});
// Add Event Listner for Submit button
guessBtn.addEventListener("click", function () {
  // Take Input from USER as Integer
  const guessVal = parseInt(guessInput.value);

  //Validate
  if (isNaN(guessVal) || guessVal < min || guessVal > max) {
    setMessage(`Please Enter the Number between ${min} & ${max}`, "#d6083b");
    //Clear Input
    guessInput.value = "";
  } else {
    message.textContent = "";

    // Check If WON
    if (guessVal === winningNum) {
      // Game over -WON
      gameOver(true, `${guessVal} is the Winning Number, YOU WIN!!!`);
    } else {
      // Game over -LOST

      guessesLeft -= 1;
      if (guessesLeft === 0) {
        // Call Game Over
        gameOver(
          false,
          `Game Over, You Lost!!! The correct answer was ${winningNum}`
        );
        message.style.color = "#ffffff";
      } else {
        setMessage(
          `${guessVal} is not correct, Try again. ${guessesLeft} Guesses Left.`,
          "#d6083b"
        );
      }
      //Clear Input
      guessInput.value = "";
    }
  }
});

// Function for Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "#d6083b");

  // Disabled Input
  guessInput.disabled = true;
  // Change the card background
  card.classList.remove("bg-info");
  card.style.backgroundColor = color;
  // Remove the paragraph
  paragraph.style.display = "none";
  setMessage(msg);

  // Play again?
  guessBtn.value = "Play Again";
  guessBtn.className += " play-again";
}

// Set Message function
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Function for random number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
