ENEMIES.turtle = function(x,y,d,a_p,obj,c) {
    
    //ENEMIES.addDebugpathNodes(this.a_p[a_p]);
    
    this.c = c; // enemy count
    
    var scale = 1.5; // model scale
    this.speed = 45; // speed the ship moves
    this.tspeed = 5; // speed the ship turns
    
    this.tl = TIMELINE.clock; // game timeclock current 
    this.clock = 0; // clock for this enemy
    
    this.a_pp = a_p;   
    this.l = this.a_p[this.a_pp].length; // 
    
    
    // create a group
    this.g = new THREE.Group();
    this.g.position.x = x;
    this.g.position.y = y;
    this.g.rotation.z = Math.radians(d);
    this.g.scale.x = scale;
    this.g.scale.y = scale;
    this.g.scale.z = scale;
    this.g.name = "turtle"+c; // create a referance to delete later
    
    obj.name = "turtle"+c;
    this.g.add(obj.clone());
    scene.add(this.g);
}

ENEMIES.turtle.prototype = {
    constructor: ENEMIES.turtle,
    a_p:[[{t:1500,c:[-40,0]},{t:1500,c:[71,73]},{t:2550,c:[60,80]}],[{t:350,c:[0,1]},{t:15,c:[1,1]}]],
    now:0,
    loop: function(i){
        //if(this.clock == 0)console.log(this.g);
        //this.clock++;
        
        //if (this.clock <= this.a_p[this.a_pp][this.now].t) {
            this.obj = ENEMIES.turn(this.g,
                                    this.a_p[this.a_pp][this.now].c[0],
                                    this.a_p[this.a_pp][this.now].c[1],
                                    this.tspeed,90);
            this.g = motion_set_2(this.g,this.speed);
            if (checkCollisionCoords(this.g.position.x,
                                     this.g.position.y,
                                     this.a_p[this.a_pp][this.now].c[0],
                                     this.a_p[this.a_pp][this.now].c[1],
                                     10)) {
                if(this.now < (this.l-1)) {
                    this.now++;
                }else{
                    this.die(false);
                }
            }
            /*
        }else{
            if(this.now < (this.l-1)) {
                this.now++;
            }
        } */
    },
    die: function(score){
// psuedo code
        if (score) {
            // if this is a gold ship or if the gold counter exceeded
            if (this.gold || this.gold_c) {
                //create a powerup here
                ENEMIES.create_pup(this.g.position.x,this.g.position.y);
            }
            // create explosion
            // update score
        }
        ENEMIES.remove("turtle"+this.c);
// end psuedo code
    }
}