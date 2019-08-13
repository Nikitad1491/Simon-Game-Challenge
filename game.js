// create a sequence function

var buttonColors=["red", "blue", "green", "yellow"];

var gamePattern=[];
var userClickedPattern=[];

var gameStarted=false;
var level=0;

$(document).keypress(function(){

  if (gameStarted==false){
    $("#level-title").text("Level "+level);
    nextSequence();
    gameStarted=true;
  }
});

$(".btn").click(function(){
  var userChosenColor=this.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  // console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);

});

function nextSequence(){
  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber=Math.floor((Math.random()*4));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $('#' + randomChosenColor).fadeIn(100).fadeOut(50).fadeIn(100);
  playSound(randomChosenColor);

}



//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}
function startOver(){
level=0;
gamePattern=[];
userClickedPattern=[];
gameStarted=false;
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  },100);
}
