
exports.updateMousePos  = function(e) {
    vec2.set(e.data.mouse.pos, e.offsetX, e.data.mouse.base.canvas.context.height-e.offsetY);
};

exports.sendClick       = function(e) {
    e.data.context.socket.emit('add-building', { mouse: e.data.context.mouse.pos });
};

exports.updateAssets = function(data) {
    this.base.assets = data;
    console.log(this.base.assets);
};
