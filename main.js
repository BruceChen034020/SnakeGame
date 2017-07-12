/* Global variables */
var snake1; // (Snake)
var scl = 10; // the size of a grid (integer)
var food; // (Food)
var keyLocked; // if this value is true, all keys are locked (boolean)
var timerLocked; // if this value is true, all timers are stopped (boolean)
var timer1; // deciseconds to changing the location of the food (integer)
var timer2; // deciseconds to speeding up the snake (integer)
var timer3; // diciseconds to moving the walls (ingeger)
var timer_tmp = 0; // (integer)
var label1, label2, label3, label4; // (Label)
var timer1Reset = 50; // (integer)
var timer2Reset = 300; // (integer)
var timer3Reset = 150; // (integer)
var score; // points (integer)
var bounceFactor = 0; // (ingeger)
var thereIsaWall = false; // there is a wall (boolean)
var wall1; // (Wall)
var debug = 0; // (integer)

/* p5 functions */
function setup(){
    timerLocked = true;

    createCanvas(600, 600);
    snake1 = new Snake();
    frameRate(10);
    food = new Food();
    food.pickLocation();
    timer1 = timer1Reset;
    timer2 = timer2Reset;
    timer3 = timer3Reset;

    label1 = document.createElement("label");
    document.body.appendChild(label1);
    label1.innerHTML = timer1Reset;
    label1.style.fontSize = "72px";

    label2 = document.createElement("label");
    document.body.appendChild(label2);
    label2.innerHTML = timer2Reset;
    label2.style.fontSize = "24px";

    label3 = document.createElement("label");
    document.body.appendChild(label3);
    label3.innerHTML = timer3Reset;
    label3.style.fontSize = "36px";

    createP('');

    label4 = document.createElement("label");
    document.body.appendChild(label4);
    label4.innerHTML = "0 points";
    label4.style.fontSize = "20px";

    score = 0;

    wall1 = new Wall();

    /* Welcome message */
    alert("歡迎來玩貪吃蛇遊戲。\r\n白色是蛇。紅色是食物。灰色是牆，邊界也是牆。\r\n本遊戲太久沒吃到食物會有懲罰。5秒沒吃到食物，食物會跑掉。15秒沒吃到食物，牆壁會移動。30秒沒吃到食物，蛇會加速，並且扣200分。\r\n所以趕快去吃食物吧! 加油!\r\n除了懲罰性加速外，也能自願性加速。連按同一個方向鍵2次可自願加速。");
}

function draw(){
    if(snake1.speedUpFactor > 11){
        snake1.speedUpFactor = 11;
    }
    if(timerLocked === false){
        timer1 -= 1;
        timer2 -= 1;
        timer3 -= 1;
        timer_tmp -= 1;
    }

    background(51);
    
    for(var i = 0;i < snake1.speedUpFactor; i++){
        if(debug < 11) 
            snake1.death();
        
        snake1.update();
        snake1.show();
        food.show();
        if(snake1.eat(food)){
            food.pickLocation();
            timer1 = timer1Reset;
            timer2 = timer2Reset;
            timer3 = timer3Reset;
            score += 15;
        }
    }
    
    keyLocked = false;

    if(thereIsaWall){
        wall1.update();
        wall1.show();
    }

    /* Changing the location of the food */
    label1.innerHTML = timer1/10;
    if(timer1 <= 0){
        food.pickLocation();
        timer1 = timer1Reset;
    }

    /* Speeding up the snake */
    label2.innerHTML = timer2/10;
    if(timer2 <= 0){
        snake1.speedUpFactor += 1;
        /*if(snake1.xspeed !== 0)
            snake1.xspeed = snake1.xspeed / abs(snake1.xspeed) * snake1.speedUpFactor;
        if(snake1.yspeed !== 0)
            snake1.yspeed = snake1.yspeed / abs(snake1.yspeed) * snake1.speedUpFactor;*/
        timer2 = timer2Reset;
        score -= 200;
    }

    /* Moving the walls */
    label3.innerHTML = timer3/10;
    if(timer3 <= 0){
        timer3 = timer3Reset;
        //setTimeout(function(){ bounceFactor += 1; label4.style.color = "green"; }, 3000);
        wall1.initialization();
        thereIsaWall = true;
    }
    if(thereIsaWall){
        timer3 = timer3Reset+1;
    }

    /* Showing score */
    label4.innerHTML = score + " points, " + "Speed: " + snake1.speedUpFactor;
    if(snake1.speedUpFactor === 11){
        label4.innerHTML += "(max)";
    }
    label4.innerHTML += ", 牆反彈次數: " + bounceFactor;
    
    if(timer_tmp <= 0)
      if(score < 0){
        label4.style.color = "red";
      }else{
        label4.style.color = "black";
      }
}

function keyPressed(){
    timerLocked = false;
    if(keyLocked){
        return;
    }
    if(keyCode === UP_ARROW){
        if(snake1.yspeed === 1){
            return;
        }
        if(snake1.yspeed === -1){
            snake1.speedUpFactor += 1;
        }
        snake1.dir(0, -1);
        keyLocked = true;
    }else if(keyCode === DOWN_ARROW){
        if(snake1.yspeed === -1){
            return;
        }
        if(snake1.yspeed === 1){
            snake1.speedUpFactor += 1;
        }
        snake1.dir(0, 1);
        keyLocked = true;
    }else if(keyCode === LEFT_ARROW){
        if(snake1.xspeed === 1){
            return;
        }
        if(snake1.xspeed === -1){
            snake1.speedUpFactor += 1;
        }
        snake1.dir(-1, 0);
        keyLocked = true;
    }else if(keyCode == RIGHT_ARROW){
        if(snake1.xspeed === -1){
            return;
        }
        if(snake1.xspeed === 1){
            snake1.speedUpFactor += 1;
        }
        snake1.dir(1, 0);
        keyLocked = true;
    }else{
        alert("請按上下左右箭頭");
    }
    snake1.showDir();
    if(debug === 0 && keyCode === 66){
        debug++;
    }
    if(debug === 1 && keyCode === 82){
        debug++;
    }
    if(debug === 2 && keyCode === 85){
        debug++;
    }
    if(debug === 3 && keyCode === 67){
        debug++;
    }
    if(debug === 4 && keyCode === 69){
        debug++;
        alert("debug mode");
    }
    if(debug === 5 && keyCode === 67){
        debug++;
    }
    if(debug === 6 && keyCode === 69){
        debug++;
    }
    if(debug === 7 && keyCode === 76){
        debug++;
    }
    if(debug === 8 && keyCode === 73){
        debug++;
    }
    if(debug === 9 && keyCode === 78){
        debug++;
    }
    if(debug === 10 && keyCode === 69){
        debug++;
        alert("debug mode (enternity)");
    }
    if(debug >= 5 && keyCode === 109){ // subtract
        if(snake1.speedUpFactor > 1){
            snake1.speedUpFactor--;
        }
    }
}

function mousePressed(){
  if(debug >= 5){
    snake1.total++;
    score += 15;
  }
}
/* User-defined functions */
// nothing

/*
Food is defined in food.js
Snake is defined in snake.js
*/