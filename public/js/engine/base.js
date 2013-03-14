var _mouse  = require("./mouse.js")
  , _tools  = require("./tools.js")
  , _quad   = require("./quad.js")
  , e       = require("./events.js");


var _BaseContext = function(_canvas) {
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

_BaseContext.prototype.initGL = function() {
    this.gl.viewportWidth    = this.canvas.width;
    this.gl.viewportHeight   = this.canvas.height;
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
};

_BaseContext.prototype.clear  = function() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
};

_BaseContext.prototype.initConnection = function() {
    this.socket = io.connect(this.server);
    this.socket.on("reconnect", function() { window.location.reload(); });
    this.socket.on("update-assets", e.updateAssets.bind({base: this}));
};

_BaseContext.prototype.initEvents = function() {
    this.canvas.on("mousemove", {mouse: this.mouse}, e.updateMousePos);
    this.canvas.on("click", {context: this}, e.sendClick);
};


_BaseContext.prototype.display = function(now, delta) {
    this.clear();

    /*for(a in this.assets) {
        console.log(a);
    }*/
};

exports.BaseContext = _BaseContext;
