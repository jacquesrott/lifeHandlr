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
