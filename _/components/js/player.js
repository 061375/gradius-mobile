/***
 *
 *
 *
 *
 *
 * */
var player = {
    mat:'',
    map:'',
    sprite:'',
    texture:'',
    ship:{x:0,y:-80,speed:1,b:false,object:{},cweapon:'single'},
    
    init: function(container) {
        /*
        var manager = new THREE.LoadingManager();
        
        manager.onProgress = function ( item, loaded, total ) {
                console.log( item, loaded, total );
        };
        var texture = new THREE.Texture();
        
        var onError = function ( xhr ) {
        };*/
        /*
        var textureLoader = new THREE.TextureLoader();
            var map = textureLoader.load( "_/textures/thrust.png" );
        var mat = new THREE.SpriteMaterial( { map: player.map, color: 0xffffff, fog: true } );
        */
        var sprite = new THREE.Sprite( player.ship.mat );
            sprite.position.set( 0, -10, 0 );
            sprite.scale.x = 10;
            sprite.scale.y = 10;
        /*    
        var loader = new THREE.ImageLoader( manager );
        loader.load( '_/textures/viper.png', function ( image ) {
                texture.image = image;
                texture.needsUpdate = true;
        } ); 
        */
        var pointLight = [];
        for(var i=0; i<30; i+=10) {
            pointLight[i] = new THREE.PointLight( 0xaac1f3, 1, i );
            pointLight[i].castShadow = true;
            pointLight[i].shadow.camera.near = 1;
            pointLight[i].shadow.camera.far = 30;
            pointLight[i].shadow.bias = 0.01;
        }
        pointLight[0].position.set(-30,0,-10);
        //pointLight[10].position.set(30,0,-10);
        //pointLight[20].position.set(-30,-30,-60);
        
        //var loader = new THREE.OBJLoader( manager );
        //loader.load( '_/models/viper.obj', function ( object ) {
            
            //player.ship.object = object;
            /*
                player.ship.object.traverse( function ( child ) {
                    if ( child instanceof THREE.Mesh ) {
                        child.material.map = player.texture;
                    }
                } ); */
                player.ship.object.castShadow = true;
                player.ship.object.receiveShadow = true;
                player.ship.object.add(sprite);
                player.ship.object.add( pointLight[0] );
                //player.ship.object.add( pointLight[10] );
                //player.ship.object.add( pointLight[20] );
                player.ship.object.position.z = -30;
                scene.add( player.ship.object );
                player.weapons.single.init();
        //}, onProgress, onError );
        
        container.addEventListener( 'click', this.shipClick, false );
    },
    /**
     * place the ship and detect if its outside the play area
     * @returns {Void}
     * */
    render: function() {
        // update any weapons
        player.weapons.shotloop();
        // get the distance to the last screen click event
        var dis = distance_to_point(
                                    this.ship.object.position.x,
                                    this.ship.object.position.y,
                                    this.ship.x,
                                    this.ship.y);
        // set the speed of the ship relevant to the distance to the click
        var sp = this.ship.speed + (dis / 10000);
        
        // set the ships roll
        var sr = 0.03;
        
        // if the click is far enough from the ship -> move
        if (dis > 10) {
            
            if (this.ship.object.position.x < (this.ship.x - sp)) {
                this.ship.object.position.x += sp;
                if(this.ship.object.rotation.y < 0.5)this.ship.object.rotation.y += sr;
            }else{
                if(this.ship.object.position.x > (this.ship.x + sp)) {
                this.ship.object.position.x -= sp;
                if(this.ship.object.rotation.y > -0.5)this.ship.object.rotation.y -= sr;
                }
            }
            
            if (this.ship.object.position.y < (this.ship.y - sp)) {
                this.ship.object.position.y += sp;
            }else{
                if(this.ship.object.position.y > (this.ship.y + sp))
                this.ship.object.position.y -= sp;
            }
            
            if (distance_to_point(this.ship.object.position.x,this.ship.y,this.ship.x,this.ship.y) < 25) {
        
                if(this.ship.object.rotation.y > 0.02) {
                    this.ship.object.rotation.y -=(sr+0.02);
                }
                if(this.ship.object.rotation.y < -0.02) {
                    this.ship.object.rotation.y +=(sr+0.02);
                }
            }
        }else{
            // if the ship is close enough to the click event
            // return the ships roll to zero
            if(this.ship.object.rotation.y > 0.02) {
                this.ship.object.rotation.y -=sr;
            }
            if(this.ship.object.rotation.y < -0.02) {
                this.ship.object.rotation.y +=sr;
            }
        }
    },
    /**
     * where the user clicks...the ship should go
     * this calculates the bounding box for the click event based on the screen resolution
     * @param {Object} the click event
     * @returns {Void}
     * */
    shipClick: function(event) {
        // if the game isnt running, we dont want to update this
        if (gamerunning) {
            
            var bd = 1.5;
            
            if (windowHalfX > (500/2))bd = 2;  
            
            player.ship.x = ( event.clientX - windowHalfX ) / bd;
            
            if(player.ship.x > 0){
                player.ship.x -= (player.ship.x / 2);
            }else{
                player.ship.x += (Math.abs(player.ship.x) / 2);
            }
            
            player.ship.y = -(( event.clientY - windowHalfY ) / 2);
            
            if(player.ship.y > 0){
                player.ship.y -= (player.ship.y / 2);
            }else{
                player.ship.y += (Math.abs(player.ship.y) / 2);
            }
        }
    },
    /**
    * single
    * handle the weapons
    * */
    weapons: {
        
        debug:false,
        
        object:[],
        
        _single:false,
        
        firing:true,
        
        i:0,
        /**
         * based on the currently selected weapon
         * run its update loop
         * @returns {Void}
         * */
        shotloop:function() {
            switch(player.ship.cweapon)
            {
                case 'single':
                    player.weapons.single.update();
                    break;
            }
        },
        /**
         * single
         * handle the basic weapon
         * as this is a learning process...this will serve as the basis for all other weapons and upgrades
         * */
        single: {
            i:0,
            clock:20,
            max:20,
            _single:[],
            sprite:'',
            mat:'',
            init: function() {
                //var sprite = player.weapons.single.sprite;
                for(var i = 0; i<this.max; i++) {
                    
                    //var textureLoader = new THREE.TextureLoader();
                    //var map = textureLoader.load( "_/textures/shot.png" );
                    //var mat = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );   
                    var sprite = new THREE.Sprite( this.mat );
                    //var sprite = player.weapons.single.sprite;
                    sprite.position.set(
                                        player.ship.object.position.x,
                                        player.ship.object.position.y+10,
                                        -1
                    ); 
                    sprite.scale.x = 2;
                    sprite.scale.y = 4;
                    sprite.yspeed = 1;
                    sprite.visible = false;
                    this._single.push(sprite);
                    scene.add(sprite);
                }
            },
            /**
             * fire a bullet
             * @returns {Void}
             * */
            shoot: function(){
                this.i++;
                if (this.i >= this.clock) {
                    for(var i = 0; i<this.max; i++) {
                        if(player.weapons.single._single[i].visible == false) {
                            this._single[i].position.x = (player.ship.object.position.x - (player.ship.object.position.x / 10));
                            this._single[i].position.y = player.ship.object.position.y+10;
                            player.weapons.single._single[i].visible = true;
                            i = this.max;
                            this.i = 0;
                        }
                    }
                }
            },
            /**
             * update bullet position and returns it to the ship oisition id outside the game area
             * @returns {Void}
             * */
            update: function() {
                // shoot a bullet if one is needed
                this.shoot();
                for(var i = 0; i<this.max; i++) {
                    // check outside
                    if ( this._single[i].position.y > 100 ) {
                        // if outside then make bullet invisible
                        // if invisble then next loop the bullet will reset
                        this._single[i].visible = false;
                    }else{
                        // update position
                        if(this._single[i].visible)this._single[i].position.y += this._single[i].yspeed;
                    }
                }
            },
            /**
             * a method for enemies to check if they got hit by a bullet
             * TODO: allow rectangle bounding box and maybe polygonal
             * TODO: this MIGHT be better as a global function to player -> weapons
             * @param {Number} other x
             * @param {Number} other y
             * @param {Number} the size of the bounding box
             * @returns {Boolean}
             * */
            collision: function(x,y,s) {
                for(var i = 0; i<this.max; i++) {
                    if (checkCollisionCoords(
                        this._single[i].position.x,
                        this._single[i].position.y,
                        x,
                        y,
                        s)){
                        this._single[i].visible = false;
                        return true;
                    }
                }
                return false;
            }
        },
        /**
        * update player position 
        * @returns {Void}
        * */
        update:function(){
            var i = 0;
            var m = player.weapons.object.length;
            player.weapons.i++;
        }
    }
}