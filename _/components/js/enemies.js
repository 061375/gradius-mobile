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
    }
}