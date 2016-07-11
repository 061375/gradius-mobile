ENEMIES.turtle = function(x,y,d,a_p,obj) {
    this.x = x;
    this.y = y;
    this.a_pp = a_p;
    this.obj = obj;
    this.tl = TIMELINE.clock;
    this.clock = 0;
    this.obj.position.x = x;
    this.obj.position.y = y;
    this.tspeed = 5;
    this.l = this.a_p[this.a_pp].length;
    this.speed = 25;
    this.obj.rotation.z = Math.radians(d);
    this.obj.scale.x = 3;
    this.obj.scale.y = 3;
    this.obj.scale.z = 3;
    
    scene.add(this.obj);
}

ENEMIES.turtle.prototype = {
    constructor: ENEMIES.turtle,
    a_p:[[{t:1500,c:[-40,0]},{t:1500,c:[71,73]},{t:2550,c:[60,100]}],[{t:350,c:[0,1]},{t:15,c:[1,1]}]],
    now:0,
    loop: function(){

        this.clock++;
        
        if (this.clock <= this.a_p[this.a_pp][this.now].t) {
     
            this.obj = ENEMIES.turn(this.obj,this.a_p[this.a_pp][this.now].c[0],this.a_p[this.a_pp][this.now].c[1],this.tspeed,90);
            //this.obj = ENEMIES.turn(this.obj,player.ship.object.position.x,player.ship.object.position.y,this.tspeed,90);
            this.obj = motion_set_2(this.obj,this.speed);
            if (checkCollisionCoords(this.obj.position.x,this.obj.position.y,this.a_p[this.a_pp][this.now].c[0],this.a_p[this.a_pp][this.now].c[1],30)) {
                 console.log('collision');
                 console.log(Math.degrees(this.obj.rotation.z));
                if(this.now < (this.l-1)) {
                    this.now++;
                }
            }
        }else{
            if(this.now < (this.l-1)) {
                console.log(Math.degrees(this.obj.rotation.z));
                this.now++;
            }
        }
        
        /*
        this.obj.rotation.y+=0.01;
        this.obj.rotation.z+=0.01;
        this.obj.rotation.x+=0.01;
        */
        
    }
}