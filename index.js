buttonColors=["red", "green", "blue", "yellow"];
gamepattern=[];
userClickedPattern=[];
var level=0;
var started=false;

$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});
$(".btn").click(function(){
    var userChosenColor =$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
   // console.log(userClickedPattern);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(gamepattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success ");
        if (userClickedPattern.length === gamepattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        $("h1").html("Game Over, Press Any Key to Restart");
        StartOver();
        console.log("wrong");
    }
}

function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var rand=Math.floor(Math.random()*4);
    gamepattern.push(buttonColors[rand]);
    $("#"+buttonColors[rand]).fadeOut(130).fadeIn(130);
    playSound(buttonColors[rand]);
    
}


function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){$("#"+currentColor).removeClass("pressed");},100);
}



function playSound(name)
{
    var ao = new Audio("sounds/"+name+".mp3");
    ao.play()
}
 
function StartOver(){
    started = false;
    level=0;
    gamepattern=[];
}
