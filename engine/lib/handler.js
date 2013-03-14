var m   = require("./math.js");

exports.idleHandler = function(_delta) {
    if(this.counter == undefined)
        this.counter = 0;
    else
        this.counter += _delta;
    return (this.counter >= this.time);
};


exports.moveHandler = function(_delta) {
    if(this.direction == undefined) {
        //this.goal       = m.vec2.fromValues(this.x, this.y);
        this.direction  = m.vec2.create();
        this.velocity   = m.vec2.create();
        m.vec2.sub(this.direction, this.goal, this.obj.pos);
        m.vec2.normalize(this.direction, this.direction);
        m.vec2.scale(this.velocity, this.direction, this.obj.speed);
    }
    var move = m.vec2.create()
      , dist = m.vec2.create();
    m.vec2.scale(move, this.velocity, 1.0/this.obj.mass);
    m.vec2.scale(move, move, _delta);
    m.vec2.add(move, this.obj.pos, move);
    m.vec2.sub(dist, move, this.goal);

    if(Math.round(m.vec2.len(dist)) < 1.0) {
        return false;
    } else {
        m.vec2.add(this.obj.pos, this.obj.pos, move);
        return true;
    }
};
