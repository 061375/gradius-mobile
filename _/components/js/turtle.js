ENEMIES.turtle = function(x,y,a_p) {
    console.log('x '+x);
}

ENEMIES.turtle.prototype = {
    constructor: ENEMIES.turtle,
    a_p:[[{t:20,c:[0,1]},{t:15,c:[1,1]}],[{t:20,c:[0,1]},{t:15,c:[1,1]}]],
    clone: function() {
        return new this.constructor().copy(this);
    },
    copy: function (turtle) {
        console.log('copy');
    }
}