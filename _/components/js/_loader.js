var Loader = function(_callback) {
    
    var _textures = "_/textures/"; // the length of this variable is about the same as the length of the string
                                    // BUT Grunt will compile the variable into a single letter...So the string is longer
    var _extension = ".png"; // same goes for the extension (we will only be using *.png)
    
    var _models = "_/models/";
    
    /**
     * 
     *
     * */
    var _sprite = function($t,txt,obj,callback) {
        var textureLoader = new THREE.TextureLoader();
        var map = textureLoader.load( _textures+txt+_extension );
            obj.map = map;
            $t.mat = new THREE.SpriteMaterial( obj );
            callback();
    }
    /**
     *
     *
     * */
    var _loadmodel = function($t,name,callback) {
        // currently this assumes that the model has only one texture
        // other sprites should be loaded seperately
        // will add a method to append other textures if nexxessary
        var mtlLoader = new THREE.MTLLoader();
                    mtlLoader.load(_models+name+'.mtl', function( materials ) {
            materials.preload();
            
            var loader = new THREE.OBJLoader();
            loader.setMaterials( materials );
            loader.load( _models+name+'.obj', function ( object ) {
                $t = object;
                callback(object); 
            }, onProgress, onError );
        });
    }
    var _env = {
        stars:function(callback) {
            _sprite(env.stars,"star",{ map: null, color: 0xffffff, fog: true },callback);
        }
    }
    /***
     * We will load players assets a little different
     * */
    var _player = {
        ship:function(callback) {
            var manager = new THREE.LoadingManager();
            
            manager.onProgress = function ( item, loaded, total ) {
                    console.log( item, loaded, total );
            };
            player.texture = new THREE.Texture();
            
            var textureLoader = new THREE.TextureLoader();
                player.map = textureLoader.load(_textures+"thrust"+_extension );
            
            var loader = new THREE.ImageLoader( manager );
                loader.load( _textures+"viper"+_extension, function ( image ) {
                        player.texture.image = image;
                        player.texture.needsUpdate = true;
                        var loader = new THREE.OBJLoader( manager );
                            loader.load( _models+'viper.obj', function ( object ) {
                                player.ship.object = object;
                                player.ship.object.traverse( function ( child ) {
                                    if ( child instanceof THREE.Mesh ) {
                                        child.material.map = player.texture;
                                    }
                                } );
                                callback();
                        }, onProgress, onError );
                } );
        },
        weapons: {
            single:function(callback) {
                _sprite(player.weapons.single,"shot",{ map: null, color: 0xffffff, fog: true },callback);
            }
        }
    }
    var _enemies = {
        loadmodel:function(name,callback) {
            ENEMIES.loadmodel(name,function(obj){
                callback(obj);   
            });
        }
    }
    _env.stars(function(){
        _player.ship(function() {
            _player.weapons.single(function() {
                _loadmodel(ENEMIES.turtle.obj,'turtle3',function(obj) {
                    ENEMIES.turtle.obj = obj;
                    _loadmodel(ENEMIES.turtle.obj,'powerup',function(obj) {
                        _callback();
                    });
                });
            });
        });
    });
}