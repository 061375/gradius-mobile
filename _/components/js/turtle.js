/*****
 * turtle
 * a slow and meandering enemy
 * this enemy will be the most common and will usually have power-ups
 * ( if gold )
 *
 * @extends ENEMIES
 * */
ENEMIES.turtle = function(x,y,d,a_p,obj,c) {
    if(typeof ENEMIES.turtle.obj === 'undefined')ENEMIES.turtle.obj = obj;
    
    //ENEMIES.addDebugpathNodes(this.a_p[a_p]);
    
    this.c = c; // enemy count
    
    var scale = 1.5; // model scale
    this.speed = 65; // speed the ship moves
    this.tspeed = 2; // speed the ship turns
 
    
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
    
    ENEMIES.turtle.obj.name = "turtle"+c;
    this.g.add(ENEMIES.turtle.obj.clone());
    scene.add(this.g);
}

ENEMIES.turtle.prototype = { 
    constructor: ENEMIES.turtle,
    a_p:[
         /* ap 1 */[{t:1500,c:[-40,0]},{t:1500,c:[71,73]},{t:2550,c:[60,80]},{t:2550,c:[60,-200]}],
         /* ap 2 */[{t:1500,c:[40,0]},{t:1500,c:[-71,73]},{t:2550,c:[-60,80]},{t:2550,c:[-60,-200]}]
    ],
    now:0,
    loop: function(i){
        this.g = ENEMIES.turn(this.g,
                                this.a_p[this.a_pp][this.now].c[0],
                                this.a_p[this.a_pp][this.now].c[1],
                                this.tspeed,65);
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
        if(player.weapons.single.collision(this.g.position.x,this.g.position.y,5))this.die(false);
    },
    die: function(score){
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
    }
}