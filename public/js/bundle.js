;(function(e,t,n,r){function i(r){if(!n[r]){if(!t[r]){if(e)return e(r);throw new Error("Cannot find module '"+r+"'")}var s=n[r]={exports:{}};t[r][0](function(e){var n=t[r][1][e];return i(n?n:e)},s,s.exports)}return n[r].exports}for(var s=0;s<r.length;s++)i(r[s]);return i})(typeof require!=="undefined"&&require,{1:[function(require,module,exports){
var base = require("./engine/base.js");

function main() {
    var app = new base.BaseContext($("#main-buffer"));
    
    var last = Date.now();
    var render = function() {
        var current = Date.now();
        var delta = current-last;
        last = current;
        app.display(last, delta);
        window.requestAnimationFrame(render);
    }
    window.requestAnimationFrame(render);
}


$(document).ready(main);

},{"./engine/base.js":2}],2:[function(require,module,exports){
var _mouse  = require("./mouse.js")
  , _tools  = require("./tools.js")
  , _quad   = require("./quad.js")
  , e       = require("./events.js");


var BaseContext = function(_canvas) {
    this.canvas = _canvas;
    this.server = "http://localhost:3000/";
    try {
        this.gl = this.canvas[0].getContext("experimental-webgl");
        this.initGL();
    } catch(error) {
        alert("Your web browser doesn't support WebGL.");
    }
    this.mouse = new _mouse.Mouse(this);
    //this.keyboard = new Keyboard(this);
    this.initConnection();
    this.initEvents();
};

/*
 *  WebGL configuration
 */
BaseContext.prototype.initGL = function() {
    this.gl.viewportWidth    = this.canvas.width;
    this.gl.viewportHeight   = this.canvas.height;
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
};

/*
 *  Clear screen
 */
BaseContext.prototype.clear  = function() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
};

/*
 *  Socket event listening initialization
 */
BaseContext.prototype.initConnection = function() {
    this.socket = io.connect(this.server);
    this.socket.on("reconnect", function() { window.location.reload(); });
    this.socket.on("update-assets", e.updateAssets.bind({base: this}));
};

/*
 *  Event initialization
 */
BaseContext.prototype.initEvents = function() {
    this.canvas.on("mousemove", {mouse: this.mouse}, e.updateMousePos);
    this.canvas.on("click", {context: this}, e.sendClick);
};


/*
 *  Rendering context
 */
BaseContext.prototype.display = function(now, delta) {
    this.clear();

    /*for(a in this.assets) {
        console.log(a);
    }*/
};

exports.BaseContext = BaseContext;

},{"./mouse.js":3,"./tools.js":4,"./quad.js":5,"./events.js":6}],4:[function(require,module,exports){

},{}],3:[function(require,module,exports){


// Mouse object
var Mouse = function(_base) {
    this.base   = _base;
    this.pos    = vec2.create();
    this.state  = {};
};

exports.Mouse = Mouse;

},{}],5:[function(require,module,exports){

// One Quad to rule them all, One Quad to find them,
// One Quad to bring them all and in the darkness bind them

},{}],6:[function(require,module,exports){

// Mouse pos event handler
exports.updateMousePos  = function(e) {
    vec2.set(e.data.mouse.pos, e.offsetX, e.data.mouse.base.canvas.context.height-e.offsetY);
};

// Mouse click event handler
exports.sendClick       = function(e) {
    e.data.context.socket.emit('add-building', { mouse: e.data.context.mouse.pos });
};

// Assets update event handler
exports.updateAssets = function(data) {
    this.base.assets = data;
    console.log(this.base.assets);
};

},{}]},{},[1])
;