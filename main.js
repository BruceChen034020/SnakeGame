/*
作品名稱: Snake Game
作者: 陳光穎 Bruce Chen
聯絡方式
  Facebook連結: https://www.facebook.com/bruce.chen.372
  LINE ID: brucechen0
最後修改日期:
  Game content: 2017/7/13
  English translation: 2018/2/14
  Highest score recod feature: 2018/2/14
版本: 1.0.0.6
發表於: https://brucechen034020.github.io/
程式碼尺度
  N/A
作者註解:
  1. 如本網頁有 bug 請用 Facebook(Messenger) 通知 Bruce Chen，謝謝。
  2. 如有任何建議，請用 Facebook(Messenger) 通知 Bruce Chen，謝謝。
  */

/* Global variables */
var snake1; // (Snake)
var scl = 10; // the size of a grid (integer)
var food; // (Food)
var keyLocked; // if this value is true, all keys are locked (boolean)
var timerLocked; // if this value is true, all timers are stopped (boolean)
var timer1; // deciseconds to changing the location of the food (integer)
var timer2; // deciseconds to speeding up the snake (integer)
var timer3; // diciseconds to moving the walls (integer)
var timer_tmp = 0; // (integer)
var label1, label2, label3, label4; // (Label)
var timer1Reset = 50; // (integer)
var timer2Reset = 300; // (integer)
var timer3Reset = 150; // (integer)
var score; // points (integer)
var bounceFactor = 0; // (integer)
var thereIsaWall = false; // there is a wall (boolean)
var wall1; // (Wall)
var debug = 0; // (integer)
var frameNumber = 0; // number of frames until a tick of the clock (integer)
var basicFrameRate = 10; // (integer)
var speedUpFactorMax = 7; // the maximum value of Snake.speedUpFactor (integer)

var ip; // IP address of the client (string)
var highestScore; // global highest score (int)
var highestScoreMaker; // (string)

var textBox1; // name (textarea)
var button1; // set name (button)

/* p5 functions */
function setup(){
  $('body').on('contextmenu', 'canvas', function(e){ return false; });

  $.getJSON('https://freegeoip.net/json/', function(data) {
    console.log(JSON.stringify(data, null, 2));
    var userName = data['ip']
    userName += ' (' + (data['country_name']) + ')';
    if(localStorage.getItem("name") == null || localStorage.getItem("name") == undefined)
      localStorage.setItem("name", userName);
    ip = userName.replace('.', '-');
    ip = ip.replace('.', '-');
    ip = ip.replace('.', '-');
    ip = ip.replace('.', '-');
    ip = ip.replace(' ', '-');
    ip = ip.replace('(', '');
    ip = ip.replace(')', '');
    ip = '-' + ip;
  });

    timerLocked = true;

    label5 = createElement('label', 'Your name: ');
    label5.parent(document.body);

    textBox1 = createInput('');

    setTimeout(function(){ textBox1.value(localStorage.getItem('name')); }, 3000);

    button1 = createButton("Set");
    button1.mousePressed(button1_Clicked);

    createP('');

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

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDbUVF1YR_bWAU7FT1FjyFfNQJSLFxUa9U",
      authDomain: "snakegame-ec28c.firebaseapp.com",
      databaseURL: "https://snakegame-ec28c.firebaseio.com",
      projectId: "snakegame-ec28c",
      storageBucket: "snakegame-ec28c.appspot.com",
      messagingSenderId: "1061325859072"
    };
    firebase.initializeApp(config);
    database = firebase.database();

    /* Set ref.on */
    var ref2 = database.ref('highest');
    ref2.on('value', gotData2, errData2);
    //var data2 = {Name: 'Anonymous', Score: 0}
    //ref2.set(data2);

    /* send online message */
    setTimeout(function(){
      var ref1 = database.ref('online/' + ip);
      var now = new Date();
      var data = {name: localStorage.getItem('name'),
                time: now.toString()};
      ref1.set(data);
    }, 3000);


    /* Welcome message */
    alert("歡迎來玩貪吃蛇遊戲。\r\n白色是蛇。紅色是食物。灰色是牆，邊界也是牆。\r\n本遊戲太久沒吃到食物會有懲罰。5秒沒吃到食物，食物會跑掉。15秒沒吃到食物，牆壁會移動。30秒沒吃到食物，蛇會加速，並且扣200分。\r\n所以趕快去吃食物吧! 加油!\r\n除了懲罰性加速外，也能自願性加速。連按同一個方向鍵2次可自願加速。\r\nWelcome to the Snake Game.\r\nWhite is the snake. Red is the food. Gray is the wall, and so are the borders.\r\nYou will be punished if you don’t eat any food for too long. If you haven’t eaten any food for 5 seconds, the food will go away. If you haven’t eaten any food for 15 seconds, the walls will move towards you. If you haven’t eaten any food for 30 seconds, the snake will be accelerated, and you will be taken 200 points off.\r\nSo, go eat the food!\r\nBesides being punished, you can accelerate your snake voluntarily by continuously pressing the same key 2 times.");
}

function draw(){
    if(snake1.speedUpFactor > speedUpFactorMax){
        snake1.speedUpFactor = speedUpFactorMax;
    }
    if(timerLocked === false){
      if(frameNumber === 0){
        timer1 -= 1;
        timer2 -= 1;
        timer3 -= 1;
        timer_tmp -= 1;
        frameNumber = snake1.speedUpFactor;
      }
      frameNumber--;
    }

    background(51);

    frameRate(basicFrameRate*snake1.speedUpFactor);

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

    keyLocked = false;

    if(thereIsaWall){
        if(frameNumber === 0)
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
    if(snake1.speedUpFactor === speedUpFactorMax){
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
        //alert("請按上下左右箭頭");
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
Wall and WallCell are defined in wall.js
*/
