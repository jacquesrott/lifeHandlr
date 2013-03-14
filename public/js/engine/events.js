
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
