var rand = require("./random.js")
  , math = require("./math.js");

var actions = {
    "moves":        mvtHandler,
    "add-building": addBuilding
};

function mvtHandler(data) {
    //console.log(data);
}

function addBuilding(data) {
    //console.log(data);
}

function initUser(socket) {
    socket.set("pos",  math.vec2.fromValues(
        rand.randFloat(0, 2048),
        rand.randFloat(0, 2048)
    ));
    socket.set("citizen", 0);

    for(a in actions) {
        socket.on(a, actions[a]);
    }
};

exports.connectionHandler = function(s) {
    initUser(s);
    s.emit("update-assets", this.world.assets);
}
