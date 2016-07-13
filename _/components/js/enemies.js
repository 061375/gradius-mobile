var ENEMIES = {
    e:{},
    c:0,
    test:true,
    loadmodel: function(name,callback) {
        // currently this assumes that the model has only one texture
        // other sprites should be loaded seperately
        // will add a methid to append other textures if nexxessary
        var mtlLoader = new THREE.MTLLoader();
                    mtlLoader.load( '_/models/'+name+'.mtl', function( materials ) {
            materials.preload();
            
            var loader = new THREE.OBJLoader();
            loader.setMaterials( materials );
            loader.load( '_/models/'+name+'.obj', function ( object ) {
                callback(object); 
            }, onProgress, onError );
        });
    },
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
    // this should be added to a general class
    addDebugpathNodes:function(a_p) {
        var l = a_p.length;
        var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
            for(var i = 0; i < l; i++) {    
                var geometry = new THREE.BoxGeometry( 10, 10, 10 );
                var cube = new THREE.Mesh( geometry, material );
                cube.position.x = a_p[i].c[0];
                cube.position.y = a_p[i].c[1];
                scene.add( cube );
            }

    },
    /**
     * @param {object} obj the enemy object
     * @param {number} x target x
     * @param {number} y target y
     * @param {variant} t can be the turn speed (number) or the string 'variant'
     * @param {number} m roll max ( if roll max < 0 then this roll min)
     * @returns {Object}
     * */
    turn: function(obj,x,y,t,m) {
        var d = point_direction(obj.position.x,obj.position.y,x,y,false);

        // if 'variant' then set the rotation speed based on location of enemy
        if(t == 'variant') t = Math.abs(Math.abs(x) - d);
        
        var r = Math.degrees(obj.rotation.z);

        if (r >= 180 && (360 - d) > 180) {
            if (d > (r-10)){
            r-=t;}
            if (d < (r+10)){
            r+=t;}
        }else{
            if (d > (r-10)){
            r+=t;}
            if (d < (r+10)){
            r-=t;}
        }
        obj = this.roll(obj,r,d,t,m);
        if (r < 0) r=360;
        if (r > 360) r=0;
        obj.rotation.z = Math.radians(r);
        return obj;
    },
    /**
     * @param {object} obj the enemy object
     * @param {number} s roll speed
     * @param {number} m roll max ( if roll max < 0 then this roll min)
     * @returns {Object}
     * */
    roll: function(obj,y,d,s,m) {
        if (Math.degrees(obj.rotation.y) >= m) return obj;
        var r = Math.abs(Math.degrees(obj.rotation.y));
        if ((Math.abs(y) - Math.abs(d)) > 10) {
            if (r < m)r+=s;  
        }else{
            if (r > 0)r-=s;
        }
        if (obj.rotation.y < 0)r = -r;
        obj.rotation.y = Math.radians(r);
        return obj;
    },
    /**
     * Removes the enemy from the scene and its referance in the hierarchy
     * NOTE: I may add this to a more global class...or maybe i'll do that if i make a game engine
     * @param {string} me the name of the enemy to kill
     * @returns {Void}
     * */
    remove: function(me) {
        var selectedObject = scene.getObjectByName(me);
        scene.remove( selectedObject );
        delete ENEMIES.e[me];
    }
}