/**
 *
 * 
 * */
var POWERUPS = {
    e:{},
    c:0,
    /**
     * @returns {Void}
     * */
    loop: function() {
        var i = 0;
        for(var p in this.e) {
            this.e[p].loop(i);
            i++;
        }
    },
    /**
     * @param {string} me the name of the enemy to kill
     * @returns {Void}
     * */
    remove: function(me) {
        var selectedObject = scene.getObjectByName(me);
        scene.remove( selectedObject );
        delete POWERUPS.e[me];
    }
}

POWERUPS.basic = function(x,y,d) {

    var scale = 1.5; // model scale
    
    // create a group
    this.g = new THREE.Group();
    this.g.position.x = x;
    this.g.position.y = y;
    //this.g.rotation.z = Math.radians(d);
    this.g.scale.x = scale;
    this.g.scale.y = scale;
    this.g.scale.z = scale;

    this.g.add(POWERUPS.basic.obj.clone());
    scene.add(this.g);
}

POWERUPS.basic.prototype = { 
    constructor: POWERUPS.basic,
    loop: function(i){
          
    }
}