
//when the game start
function start()
{
    score = 0;
    flag = 0;
    time = 60;
    bird = 10;
    stopTime = 0;
    document.getElementById("result").innerHTML = "";
    timer();
    display();
    moveBird();
    $("#weapon").show("fold", 800);
    $("#bird").show("fold");
    $("#btnStart").hide("fade",1000);
}

$(document).ready(function()
{
    $("#weapon").hide("drop");
    $("#bird").hide("drop");
}
);

$(document).tooltip();

var score;
var flag;
var time;
var bird;
var stopTime;
var t;
var t2;

$("#weapon").draggable();
$("#bird").droppable({
    drop: function () {
        flag = 1;    
        }
    });

    
function hit()
{
    if(flag==1)
    {
        $("#weapon").effect("shake", { times: 2, distance: 80, direction: "down" }, 500);
        $("#bird").hide("explode");
        flag = 0;
        score += 100;
        bird--;
        display();
        if (bird == 0)
        {
            document.getElementById("result").innerHTML = "You Win!";
            stopGame();
        }
        moveBird();
        $("#bird").show("fold");
    }
}

function newPosition() {

    var height = 602;
    var width = 1432;

    var nh = Math.floor(Math.random() * height);
    var nw = Math.floor(Math.random() * width);
    return [nh, nw];
}

function moveBird() {
    if (flag == 0) {
        var newHW = newPosition();
        $("#bird").animate({ top: newHW[0], left: newHW[1] }, function () {
            clearInterval(t2);
            t2=setTimeout(moveBird, 1000);
        });
    }
    else
    {
        $("#bird").hide("blind");
        return;
    }
    
};

function timer()
{
    if (stopTime == 0) {
        var s = minusSecond();
        document.getElementById("timer").innerHTML = "Time Left: " + s;
        if (s > 0) {
            clearInterval(t);
            t=setTimeout(timer, 1000);
        }
        else {
            document.getElementById("result").innerHTML = "You lose!";
            stopGame();
        }
    }
}

function minusSecond()
{
    return time--;
}

function stopGame()
{
    $("#weapon").hide("drop",800);
    flag = 1;
    stopTime = 1;
}

function display()
{
    document.getElementById("score").innerHTML = "Your Score: " + score;
    document.getElementById("left").innerHTML = "Bird Left: " + bird;
}