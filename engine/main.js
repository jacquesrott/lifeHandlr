var world = require("./lib/world.js")
  , user  = require("./lib/user.js");


var w           = {};
var io          = {};

var rate        = 50;

exports.listen = function(_io) {
    io = _io;
    w = new world.World(io);

    io.sockets.on('connection', user.connectionHandler.bind({world: w}));
    
    var last = Date.now();
    var compute = function() {
        var current = Date.now();
        var delta = current-last;
        last = current;
        w.update(last, delta);
        if(delta < rate)
            setTimeout(compute, rate-delta);
        else
            compute();
    };

    setTimeout(compute, rate);
}
