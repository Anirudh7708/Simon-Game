var buttonColors= ["red","blue","yellow","green"];
var userClickedPattern = [];
var gamePattern = [];

var level = 0;
var start = false;

$(document).keydown(function(){
    if(!start){
        start = true;
        nextSequence();
    }
})

$(".btn").on("click",function (){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    
    checkAnswer(userClickedPattern.length-1);    

});


function nextSequence(){
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level "+level);
    
    var randomNumber = Math.floor(Math.random()*4);
    
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(50).fadeIn(50);
    
    playSound(randomChosenColor);
}

function playSound(name){    
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animatePress(currentColor){
    var element = $("#"+currentColor);
    element.addClass("pressed");
    setTimeout(function (){
        element.removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if( gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("wrong");
        gameOver();
        startOver();
    }
}

function gameOver(){
    playSound("wrong");
    
    $("#level-title").text("GAME OVER, Press any key to restart");

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },150);
}

function startOver(){
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    start = false;
}