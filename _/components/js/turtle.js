ENEMIES.turtle = function(x,y,a_p,obj) {
    this.x = x;
    this.y = y;
    this.a_p = a_p;
    this.obj = obj;
    this.tl = TIMELINE.clock;
    this.clock = 0;
    this.obj.position.x = 20;
    this.obj.position.y = 20;
    this.obj.scale.x = 10;
    this.obj.scale.y = 10;
    this.obj.scale.z = 10;
    scene.add(this.obj);
}

ENEMIES.turtle.prototype = {
    constructor: ENEMIES.turtle,
    a_p:[[{t:20,c:[0,1]},{t:15,c:[1,1]}],[{t:20,c:[0,1]},{t:15,c:[1,1]}]],
    loop: function(){
         this.obj.rotation.y+=0.01;
         this.obj.rotation.z+=0.01; 
    }
}