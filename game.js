// game play
var gamePattern = [];

var playerAnswers = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var answerValidation = [];

var level = 0;

var started = false;

$(document).keydown(function () {
  if (started === false){
    nextSequence();
    started = true;
}
})


function nextSequence(){

playerAnswers = [];

answerValidation = [];

var randomNumber = Math.floor(Math.random() * 4);

var randomColor = buttonColors[randomNumber];

buttonSounds(randomColor);

buttonAnimation(randomColor);

gamePattern.push(randomColor);

$("h1").text("Level " + (level + 1));

console.log(gamePattern);

level++;

}

// playerinputs

$(".btn").click(function(){
    buttonSounds(this.id);
    buttonAnimation(this.id);
    playerAnswers.push(this.id);
    console.log(playerAnswers);
    checkAnswer(playerAnswers.length - 1);
    // Don't want to have to match the length of gamePattern to playerAnswers, otherwise player would have to keep inputing after an incorrect answer just to reset the game
})


// Answers

function checkAnswer (currentLevel) {
  if (playerAnswers[currentLevel] === gamePattern[currentLevel]) {
    // this just checks the last answer given by the player
    for (i = 0; i < playerAnswers.length; i++) {
      // this checks the rest of their answers except the last one
      if (playerAnswers[i] === gamePattern[i]) {
        answerValidation.push(1);
      } else {
        answerValidation.push(0);
      }
    } if (answerValidation.includes(0) === true){
      gameOverSound();
      gameOverAnimation();
      restartGame();
      $("h1").html("Game Over<br>Press Any Key To Restart");
      started = false;
      console.log("Game Over 4");
    } else if (gamePattern.length === playerAnswers.length) {
    // this needs to be delayed or else the game will start the next level as soon as the first button is right
      console.log("Success")
      setTimeout(function(){
        nextSequence();
      }, 1000)
    }
  } else {
    gameOverAnimation();
    gameOverSound();
    restartGame();
    $("h1").html("Game Over<br>Press Any Key To Restart");
    started = false;
    console.log("GAME OVER 3")
  }
}

// Restart GAME
function restartGame () {
  level = 0;
  gamePattern = [];
  playerAnswers = [];
}

// Animations
function buttonAnimation (clickedButton) {
    $("." + clickedButton).addClass("pressed");
    setTimeout(function () {
      $("." + clickedButton).removeClass("pressed");
    }, 100)
}
function gameOverAnimation () {
  $("body").addClass("game-over");
  setTimeout (function (){
    $("body").removeClass("game-over");
  }, 200)
}

// Audio
function buttonSounds (color) {
  var buttonAudio = new Audio("sounds/" + color + ".mp3");
  buttonAudio.play();
}
function gameOverSound () {
  var gameOverAudio = new Audio ("sounds/wrong.mp3");
  gameOverAudio.play();
}
