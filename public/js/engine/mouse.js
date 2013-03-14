

// Mouse object
var Mouse = function(_base) {
    this.base   = _base;
    this.pos    = vec2.create();
    this.state  = {};
};

exports.Mouse = Mouse;
