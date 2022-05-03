const COLS = 12;
const ROWS = 12;
const BLOCK_SIZE = 30;

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

function drawBottomRow(){
    ctx.fillStyle = "red";
    ctx.fillRect(0, 11, 12, 12);
}

function drawBlock(x, color){
    ctx.fillStyle = "green";
    ctx.fillRect(x, 11, 2, 1);

    ctx.fillStyle = color;
    ctx.fillRect(x, 1, 2, 8);

}

function drawBlock1(){
    drawBlock(0,"#f09090");
}

function drawBlock2(){
    drawBlock(6,"#ffd8a8");
}

function drawBlock3(){
    drawBlock(8,"#ff7860");
}

function drawBlock4(){
    drawBlock(10,"#f0d8a8");
}

function drawBlock5(){
    drawBlock(4,"#48a8a8");
}

function drawBlock6(){
    drawBlock(2,"#a8d8c0");
}

drawBottomRow();
