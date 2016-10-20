'use strict';

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DISTANCE_FROM_EDGE = 60;

var canvas, canvasContext;
var framesPerSecond = 60;
// Ball
var ballX = 75;
var ballY = 75;
var ballSpeedX = 2;
var ballSpeedY = 3;
// Paddle 
var paddleX = 400;

window.onload = function (){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext("2d");

    setInterval(updateAll, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', updateMousePosition);
}

function updateAll(){
    moveAll();
    drawAll();
}

function moveAll(){
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX > canvas.width){
        ballSpeedX *= -1;
    }
    if(ballX < 0){
        ballSpeedX *= -1;
    }

    if(ballY > canvas.height){
       // ballSpeedY *= -1;
       ballReset();
    }
    if(ballY < 0){
        ballSpeedY *= -1;
    }

    let paddleTopEdgeY = canvas.height - PADDLE_DISTANCE_FROM_EDGE;
    let paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
    let paddleLeftEdgeX = paddleX;
    let paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;

    if( ballY > paddleTopEdgeY &&
        ballY < paddleBottomEdgeY &&
        ballX > paddleLeftEdgeX &&
        ballX < paddleRightEdgeX){
            ballSpeedY *= -1;

            let centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
            let ballDistFromPaddleCenterX = ballX - centerOfPaddleX;

            ballSpeedX = ballDistFromPaddleCenterX * 0.35;
        }
}

function drawAll() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    colorCircle(ballX, ballY, 10, 'white');

    colorRect(paddleX, canvas.height - PADDLE_DISTANCE_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, 'red');
}

function colorRect (topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor){
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function updateMousePosition(event){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = event.clientX - rect.left - root.scrollLeft;
    var mouseY = event.clientY - rect.top - root.scrollTop;

    paddleX = mouseX - PADDLE_WIDTH/2;
}

function ballReset(){
    ballX = 0;
    ballY = 0;
}