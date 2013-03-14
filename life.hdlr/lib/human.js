var math     = require("./math.js")
  , rand     = require("./random.js")
  , handler  = require("./handler.js")
  , iaStates = require("../ia/states.json")     // IA states
  , iaTasks  = require("../ia/tasks.json");     // IA tasks


var _Human = function(_uid) {
    this.id     = _uid;
    this.pos    = math.vec2.fromValues(
        // random position
        rand.randFloat(0, 2048),        // TODO: get world size
        rand.randFloat(0, 2048)
    );
    this.female = rand.randBool();      // Genetic recombination
    this.task   = null;
    this.state  = [];
    this.life   = 100;
    this.mass   = 70.8;             // European average weight
    this.speed  = 1.0;
    this.queue  = [];

    this.setTask("tZoning");
};

/*
 *  Agent Task setter
 */
_Human.prototype.setTask  = function(_name) {
    if(this.task == null || iaTasks[_name].priority < this.task.priority ) {
        this.task = iaTasks[_name];
        this.setState();
    }
};

/*
 *  Initialize states listening
 */
_Human.prototype.setState = function(_index) {
    for(s in this.task.queue) {
        var args = this.task.queue[s].args;
        var def = iaStates[this.task.queue[s].name];
        var binding = {};
        for(var i = 0 ; i < args.length ; ++i) {
            var value = args[i];
            if(value == "rand") {
                value = rand.randFloat(def.randMin, def.randMax);
            }
            binding[def.params[i]] = value;
        }
        binding["obj"] = this;
        this.state.push(handler[def.exec].bind(binding));
    }
};

/*
 *  Agent is never bored, always looking for something...
 */
_Human.prototype.lookForTask = function() {
    if(false) {
        // put conditions
    } else {
        this.setTask("tZoning");
    }
};

/*
 *  Update Agent state, each framerate
 */
_Human.prototype.update   = function(_now, _delta) {
    if(this.state.length) {
        if(this.state[0](_delta)) {
            this.state.shift();
        }
    } else {
        this.lookForTask();
    }
};


exports.Human = _Human;
