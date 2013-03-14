
var human   = require("./human.js")
  , rand    = require("./random.js")
  , connect = require("express/node_modules/connect");


var _World = function(_io) {
    this.io          = _io;
    this.width       = 2048;
    this.height      = 2048;
    this.demography  = 1024;
    this.assets      = {
        "inhabitants": {},
        "buildings": []
    };
    this.populate();
};

/*
 *  Populate the world with inhabitants
 */
_World.prototype.populate = function() {
    for(var i = 0 ; i < this.demography ; ++i) {
        var uid = connect.utils.uid(5);
        this.assets['inhabitants'][uid] = new human.Human(uid);
    }
};

/*
 *  Update event, each framerate
 */
_World.prototype.update = function(_now, _delta) {
    for(h in this.assets.inhabitants) {
        this.assets.inhabitants[h].update(_now, _delta);
    }
};

exports.World = _World;
