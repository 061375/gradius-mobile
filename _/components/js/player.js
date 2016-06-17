var player = {
    ship:{x:0,y:-80,speed:1,b:false,object:{},cweapon:'single'},
    init: function(container) {
        
        var manager = new THREE.LoadingManager();
        manager.onProgress = function ( item, loaded, total ) {
                console.log( item, loaded, total );
        };
        var texture = new THREE.Texture();
        
        var onError = function ( xhr ) {
        };
        var textureLoader = new THREE.TextureLoader();
            var map = textureLoader.load( "_/textures/thrust.png" );
            var mat = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );
        var sprite = new THREE.Sprite( mat );
            sprite.position.set( 0, -10, 0 );
            sprite.scale.x = 10;
            sprite.scale.y = 10;
            
        var loader = new THREE.ImageLoader( manager );
        loader.load( 'textures/UV_Grid_Sm.jpg', function ( image ) {
                texture.image = image;
                texture.needsUpdate = true;
        } ); 
        
        var pointLight = [];
        for(var i=0; i<30; i+=10) {
            pointLight[i] = new THREE.PointLight( 0xaac1f3, 1, i );
            pointLight[i].castShadow = true;
            pointLight[i].shadow.camera.near = 1;
            pointLight[i].shadow.camera.far = 30;
            pointLight[i].shadow.bias = 0.01;
        }
        pointLight[0].position.set(-30,0,-10);
        pointLight[10].position.set(30,0,-10);
        pointLight[20].position.set(-30,-30,-60);
        
        var loader = new THREE.OBJLoader( manager );
        loader.load( '_/models/viper.obj', function ( object ) {
            
            player.ship.object = object;
                player.ship.object.traverse( function ( child ) {
                    if ( child instanceof THREE.Mesh ) {
                            child.material.map = texture;
                    }
                } );
                player.ship.object.add(sprite);
                player.ship.object.add( pointLight[0] );
                player.ship.object.add( pointLight[10] );
                player.ship.object.add( pointLight[20] );
                player.ship.object.position.z = -30;
                scene.add( player.ship.object );
        }, onProgress, onError );
        container.addEventListener( 'click', this.shipClick, false );
    },
    render: function() {
        player.weapons.shotloop();
        var dis = distance_to_point(this.ship.object.position.x,this.ship.object.position.y,this.ship.x,this.ship.y);
        var sp = this.ship.speed + (dis / 10000);
        var sr = 0.03;
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
            if(this.ship.object.rotation.y > 0.02) {
                this.ship.object.rotation.y -=sr;
            }
            if(this.ship.object.rotation.y < -0.02) {
                this.ship.object.rotation.y +=sr;
            }
        }
    },
    shipClick: function(event) {
        if (gamerunning) {
            player.ship.x = ( event.clientX - windowHalfX ) / 2;
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
    weapons: {
        degug:false,
        object:[],
        _single:false,
        shotspeed:5,
        shotclock:0,
        firing:true,
        shotloop:function() {
            if(typeof player.ship.cweapon !== 'undefined') {
                player.weapons.shotclock++;
                if (player.weapons.shotclock > player.weapons.shotspeed) {
                    switch(player.ship.cweapon)
                    {
                        case 'single':player.weapons.single();break;
                    }
                    player.weapons.shotclock = 0;
                }
            }
            if(player.weapons.firing)player.weapons.update();
        },
        single: function() {
            if(!this._single) {
                var textureLoader = new THREE.TextureLoader();
                var map = textureLoader.load( "_/textures/shot.png" );
                this._single.mat = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );   
            }
            var sprite = new THREE.Sprite( this._single.mat );
            sprite.position.set( 0, 0, -1 );
            sprite.scale.x = 2;
            sprite.scale.y = 2;
            sprite.yspeed = 1;
            player.weapons.object.push(sprite);
            scene.add(sprite);
        },
        update:function(){
            if (player.weapons.degug < 10) {
                console.log(player.weapons.object.length);
                player.weapons.degug ++;
            }
            
            var i = 0;
            var m = player.weapons.object.length;
            for(i = 0; i<m; i++) {
                player.weapons.object[i].position.y += player.weapons.object[i].yspeed;
                if (player.weapons.object[i].position.y > windowHalfY) {
                     player.weapons.object.splice(i,1); 
                }
            }
        }
    }
}