var buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = []
let userClickedPattern = []

let level = 0
let started = false


function playSound(randomChosenColor) {
    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();
}

function nextSequence(){  
    userClickedPattern = []

    level++
    $("h1").text("Level " + level)

    let randomNumber = Math.floor(Math.random()*4)
    let randomChosenColor = buttonColours[randomNumber]

    gamePattern.push(randomChosenColor)

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function gameOver(){
    playSound("wrong")
    $("body").addClass("game-over")
    $("h1").text("Game Over! Press Any Key To Restart")

    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}

function startOver(){
    gamePattern = []
    started = false
    level = 0
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } 
    else {
        gameOver()
        startOver()
    }
}

$(document).keypress(function(level){
    if (!started){
        nextSequence()
    }
    started = true
}) 


$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour)
    
    animatePress(userChosenColour)
    playSound(userChosenColour)
    checkAnswer(userClickedPattern.length-1) 
})

