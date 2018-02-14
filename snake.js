function Snake(){
    this.x = 0; // the x component of the location of (the head of) the snake (integer)
    this.y = 0; // the y component of the location of (the head of) the snake (integer)
    this.xspeed = 1; // the x component of the speed of the snake (integer)
    this.yspeed = 0; // the y component of the speed of the snake (integer)
    this.total = 0; // the length of the snake (integer)
    this.tail = []; // (vector array)
    this.speedUpFactor = 1;// (integer)

    this.update = function(){ // the snake moves (void)
        /*for(var i = 0; i < this.total-1; i++){
            this.tail[i] = this.tail[i+1];
        }*/
      if(this.total === this.tail.length){
        for(var i = 0; i < this.tail.length-1; i++){
            this.tail[i] = this.tail[i+1];
        }
      }
        this.tail[this.total-1] = createVector(this.x, this.y);

        this.x += this.xspeed*scl;
        this.y += this.yspeed*scl;

        this.x = constrain(this.x, 0, width-scl);
        this.y = constrain(this.y, 0, height-scl);
    }
    this.show = function(){ // update screen (void)
        fill(255);
        for(var i = 0; i < this.tail.length; i++){
            rect(this.tail[i].x, this.tail[i].y, scl, scl)
        }
        rect(this.x, this.y, scl, scl);
    }
    this.dir = function(x, y){ // change direction (void)
        this.xspeed = x;
        this.yspeed = y;
    }
    this.showDir = function(){
        console.log("Speed: x = " + this.xspeed + ", y = " + this.yspeed);
    }
    this.eat = function(food){ // check if the position of the snake is equaled to the position of the food (boolean)
        var pos = food.Location; // (vector)
        var d = dist(this.x, this.y, pos.x, pos.y); // distance
        if(d < 1){
            this.total++;
            console.log("Snake.total = " + this.total);
            console.log("Snake.tail length = " + this.tail.length);
            console.log(this.tail);
            /*for(var i = 0;i < this.total; i++){
                console.log("tail["+i+"] = ("+this.tail[i].x+", "+this.tail[i].y+")");
            }*/
            console.log("Current location = " + this.x + ", " + this.y);
            return true;
        }else{
            return false;
        }
    }
    this.death = function(){ // whether the snake dies (boolean)
        /* whether the snake hits its own tail */
        for(var i = 0;i < this.tail.length;i++){
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if(d < 1){
                var scoree = score;
                console.log("i = " + i + " this.tail length = " + this.tail.length);
                setTimeout(function(){ alert("Game Over\r\n" + scoree + " points.\r\nYour highest score record: " + localStorage.getItem("score")
                  + " points.\r\nGlobal highest score record: " + highestScore + ' points by ' + highestScoreMaker); }, 0);
                if(score > localStorage.getItem("score")){
                  localStorage.setItem("score", scoree);
                }
                if(highestScore < score){
                  var ref = database.ref('highest');
                  var data = {
                    Name: localStorage.getItem("name"),
                    Score: scoree
                  }
                  console.log(data);
                  ref.set(data);
                  setTimeout(function(){ alert('恭喜你破紀錄了! Congratulations! You broke the record!\r\nNew record: ' + highestScore + 'points by ' + highestScoreMaker );}, 0);
                }
                console.log("Game over (hits hits own tail)");
                console.log("Current location = " + this.x + ", " + this.y);
                console.log("Snake.total = " + this.total);
                console.log("Snake.tail length = " + this.tail.length);
                for(var j = 0; j < this.tail.length; j++){
                    console.log("Snake.tail["+j+"] = (" + this.tail[j].x + ", " + this.tail[j].y + ")");
                }
                /* Reset */
                this.total = 0;
                this.tail = [];
                console.log(this.tail);
                this.dir(0, 0);
                this.speedUpFactor = 1;
                timer1 = timer1Reset;
                timer2 = timer2Reset;
                timer3 = timer3Reset;
                timerLocked = true;
                score = 0;

                bounceFactor = 0;
                wall1.Reset();

                return true;
                }
        }

        /* whether the snake hits the wall */

        for(var i = 0; i < wall1.wall.length; i++){

            var pos = wall1.wall[i].Location;
            var d = dist(this.x, this.y, pos.x, pos.y);
            if(d < 1){
                var scoree = score;
                console.log("i = " + i + " this.tail length = " + this.tail.length);
                setTimeout(function(){ alert("Game Over\r\n" + scoree + " points.\r\nYour highest score record: " + localStorage.getItem("score")
                  + " points.\r\nGlobal highest score record: " + highestScore + ' points by ' + highestScoreMaker); }, 0);
                if(score > localStorage.getItem("score")){
                    localStorage.setItem("score", scoree);
                }
                if(highestScore < score){
                  var ref = database.ref('highest');
                  var data = {
                    Name: localStorage.getItem("name"),
                    Score: scoree
                  }
                  console.log(data);
                  ref.set(data);
                  setTimeout(function(){ alert('恭喜你破紀錄了! Congratulations! You broke the record!\r\nNew record: ' + highestScore + 'points by ' + highestScoreMaker );}, 0);
                }
                console.log("Game over (hits the wall)");
                console.log("Current location = " + this.x + ", " + this.y);
                console.log("Snake.total = " + this.total);
                console.log("Snake.tail length = " + this.tail.length);
                for(var j = 0; j < this.tail.length; j++){
                    console.log("Snake.tail["+j+"] = (" + this.tail[j].x + ", " + this.tail[j].y + ")");
                }
                /* Reset */
                this.total = 0;
                this.tail = [];
                console.log(this.tail);
                this.dir(0, 0);
                this.speedUpFactor = 1;
                timer1 = timer1Reset;
                timer2 = timer2Reset;
                timer3 = timer3Reset;
                timerLocked = true;
                score = 0;
                console.log("Here!!!");
                bounceFactor = 0;
                console.log("bounceFactor = " + bounceFactor);
                wall1.Reset();
                console.log("bounceFactor = " + bounceFactor);

                return true;
            }
        }
        return false;
    }
}
