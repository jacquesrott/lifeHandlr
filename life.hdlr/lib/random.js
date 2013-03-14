
exports.randInt   = function(min, max) {
    return parseInt(Math.random() * (max-min) + min);
}

exports.randBool  = function() {
    return Boolean(Math.round(Math.random()));
}

exports.randFloat = function(min, max) {
    return Math.random() * (max-min) + min;
}
