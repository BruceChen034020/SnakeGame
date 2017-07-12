function Food(){
    this.Location = createVector(0, 0); // (vector)
    this.show = function(){ // update screen (void)
        
        fill(255, 0, 100);
        rect(this.Location.x, this.Location.y, scl, scl);
    }
}

Food.prototype.pickLocation = function(){ // (vector)
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    this.Location = createVector(floor(random(cols)), floor(random(rows)));
    this.Location.mult(scl);
    return this.Location;
}