var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = 0;

//cpu selection

function nextSequence() {
    var randomN = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomN];
    var colourSelected = "#" + randomChosenColour;  
    gamePattern.push(randomChosenColour);
    $(colourSelected).animate({opacity: 0}, 100).animate({opacity: 1}, 100);
    playSound(randomChosenColour); 
    level++;
    $("h1").text("level " + level);
    // console.log(gamePattern)    
}

 //user inputs

 $(".btn").on("click", function(){ 
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);      
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    console.log(userClickedPattern);
    });   

//button sounds

function playSound(name) {
  var audio = new Audio("sounds/"+ name + ".mp3");
  audio.play();       
}

//user animation

function animatePress(currentColour){
  var animatedColour = $("." + currentColour)
  $(animatedColour).addClass("pressed");
  setTimeout(function() {
    $(animatedColour).removeClass("pressed");
}, 100);
};

// start sequence
$("body").on("keydown", function () { 
  started++;
  if (started === 1) {
    nextSequence();
  };
});


//checking user answers, and incorrect answers
function checkAnswer(lastColor) {
if(gamePattern[lastColor] == userClickedPattern[lastColor]) {

  if(gamePattern.length === userClickedPattern.length) {
    setTimeout(nextSequence, 1000)
    userClickedPattern.length = 0;
  }
} else {
  startOver();
  var wrongAudio = new Audio("sounds/wrong.mp3");
  wrongAudio.play()
  $("body").addClass("game-over")
  setTimeout( function () {
    $("body").removeClass("game-over")
  }, 200)
  $("h1").text("Game over, press any key to restart")
  
    };
  };

//game restart
  function startOver() {
    userClickedPattern.length = 0;
    level = 0;
    gamePattern.length = 0;
    started = 0;
  };