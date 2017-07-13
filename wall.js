function Wall(){
    this.wall = []; // (WallCell array)
    this.initialization = function(){ // (void)
        var cols = floor(width/scl);
        var rows = floor(height/scl);
        for(var i = 0; i < cols; i++){
            this.wall[i] = WallCell.prototype.createWallCell(i, 0);
            this.wall[i].Location.mult(scl);
            this.wall[i].bounce = bounceFactor;
            this.wall[i].dir = createVector(0, 1); // 因為等一下 "不" 會先 UTurn 一次
        }
    }
    this.update = function(){ // the wall moves (void)
        for(var i = 0;i < this.wall.length; i++){
            var pos = this.wall[i].Location;
            var move = true;
            /*if(snake1.x === pos.x && snake1.y === pos.y+20){
                move = false;
            }*/
            for(var j = 0; j < snake1.tail.length; j++){
                if(this.wall[i].dir.y === 1 && snake1.tail[j].x === pos.x && snake1.tail[j].y === pos.y+2*scl){
                    move = false;
                }
                if(this.wall[i].dir.y === 1 && snake1.tail[j].x === pos.x && snake1.tail[j].y === pos.y+scl){
                    move = false;
                }
                if(this.wall[i].dir.y === -1 && snake1.tail[j].x === pos.x && snake1.tail[j].y === pos.y-2*scl){
                    move = false;
                }
                if(this.wall[i].dir.y === -1 && snake1.tail[j].x === pos.x && snake1.tail[j].y === pos.y-scl){
                    move = false;
                }
            }
            if(move){
                this.wall[i].update();
            }
        }
        var Dispose = true;
        for(var i = 0; i < this.wall.length; i++){
            if(this.wall[i].Location.y <= height && this.wall[i].Location.y >= 0){
                Dispose = false;
            }
        }
        if(Dispose){
            thereIsaWall = false;
            timer_tmp = 5;
            bounceFactor += 1; label4.style.color = "green";
            
            this.Reset();
        }
        for(var i = 0; i < this.wall.length; i++){
            if(Wall.prototype.edge(this.wall[i])){
                
                this.wall[i].UTurn();
                this.wall[i].bounce -= 1;
            }
        }
    }
    this.show = function(){ // update screen (void)
        fill(128);
        for(var i = 0; i < this.wall.length; i++){
            rect(this.wall[i].Location.x, this.wall[i].Location.y, scl, scl)
        }
    }
    this.Reset = function(){
        console.log(this);
        this.wall = [];
        thereIsaWall = false;
    }
}
Wall.prototype.edge = function(wallCell){ // whether the wall hits the edge (boolean)
      if(wallCell.Location.y === height-scl){
        return true;
      }
      if(wallCell.Location.y === 0){
        return true;
      }
      return false;
}


function WallCell(){
    this.Location; // (vector)
    this.bounce; // bounces remains (integer)
    this.dir; // direction of its speed (vector)
    this.update = function(){ // move (void)
        this.Location.x += this.dir.x*scl;
        this.Location.y += this.dir.y*scl;
    }
    this.UTurn = function(){ // turn back (void)
        if(this.bounce === 0){
            return;
        }
        if(this.dir.y === 1){
            this.dir.y = -1
        }else if(this.dir.y === -1){
            this.dir.y = 1;
        }
    }
}
WallCell.prototype.createWallCell = function(x, y){ // (WallCell)
    var toReturn = new WallCell();
    toReturn.Location = createVector(x, y);
    return toReturn;
}