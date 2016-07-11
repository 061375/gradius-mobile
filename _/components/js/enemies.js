var ENEMIES = {
    e:[],
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
    loop: function() {
        
        if(this.e.length > 0 && this.test){
            //console.log(this.e);
            //this.test = false;
            this.e[1].loop();
        }
        var l = this.e.length;
        for(i = 0; i<l; i++) {
            
        }
    },
    move_direction: function(d,s) {
          
    },
    /**
     * @param {object} obj the enemy object
     * @param {number} x target x
     * @param {number} y target y
     * @param {variant} t can be the turn speed (number) or the string 'variant'
     * @param {number} m roll max ( if roll max < 0 then this roll min)
     * */
    turn: function(obj,x,y,t,m) {
        var d = point_direction(obj.position.x,obj.position.y,x,y,false);
        
        //obj.rotation.z = Math.radians(d);

        // if 'variant' then set the rotation speed based on location of enemy
        if(t == 'variant') t = Math.abs(Math.abs(x) - d);

        var r = Math.degrees(obj.rotation.z);
        
        //console.log(' r:'+r);
        //console.log(' d > '+d);
        //console.log(' t:'+t);
        if (d > (r-10)){//console.log(d+' > '+r);
        r+=t;}
        if (d < (r+10)){//console.log(d+' < '+r);
        r-=t;}
    
        if (r < 0) r=360;
        if (r > 360) r=0;
       
       //console.log(' r:'+r);
       //console.log('------------------------------');
        obj.rotation.z = Math.radians(r);
        //obj.rotation.z = Math.radians(d);
        //this.roll(obj,(t/10),m);
        
        return obj;
    },
    /**
     * @param {object} obj the enemy object
     * @param {number} s roll speed
     * @param {number} m roll max ( if roll max < 0 then this roll min)
     * */
    roll: function(obj,s,m) {
        // jeremy this is psuedo code !!!
        var r = Math.abs(obj.rotation.y); // if this is in the scope of this prototype else param
        if (r < Math.abs(m)) {
            r+=s;  
        }
        if (m < 0)r = -r;
        obj.rotation.y = r;
        return obj;
    }
}