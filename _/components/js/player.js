var player = {
    ship:{x:0,y:-80,speed:1,b:false},
    init: function(container) {
        
        var manager = new THREE.LoadingManager();
        manager.onProgress = function ( item, loaded, total ) {
                console.log( item, loaded, total );
        };
        var texture = new THREE.Texture();
        
        var onError = function ( xhr ) {
        };
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
                object.traverse( function ( child ) {
                    if ( child instanceof THREE.Mesh ) {
                            child.material.map = texture;
                    }
                } );
                object.add( pointLight[0] );
                object.add( pointLight[10] );
                object.add( pointLight[20] );
                object.position.z = -30;
                scene.add( object );
        }, this.onProgress, this.onError );
        container.addEventListener( 'click', this.shipClick, false );
    },
    render: function(object) {
        var dis = distance_to_point(object.position.x,object.position.y,this.ship.x,this.ship.y);
        var sp = this.ship.speed + (dis / 10000);
        var sr = 0.03;
        if (dis > 10) {
            if (object.position.x < (this.ship.x - sp)) {
                object.position.x += sp;
                if(object.rotation.y < 0.5)object.rotation.y += sr;
            }else{
                if(object.position.x > (this.ship.x + sp)) {
                object.position.x -= sp;
                if(object.rotation.y > -0.5)object.rotation.y -= sr;
                }
            }
            if (object.position.y < (this.ship.y - sp)) {
                object.position.y += sp;
            }else{
                if(object.position.y > (this.ship.y + sp))
                object.position.y -= sp;
            }
            if (distance_to_point(object.position.x,this.ship.y,this.ship.x,this.ship.y) < 25) {
        
                if(object.rotation.y > 0.02) {
                    object.rotation.y -=(sr+0.02);
                }
                if(object.rotation.y < -0.02) {
                    object.rotation.y +=(sr+0.02);
                }
            }
        }else{
            if(object.rotation.y > 0.02) {
                object.rotation.y -=sr;
            }
            if(object.rotation.y < -0.02) {
                object.rotation.y +=sr;
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
    onProgress: function ( xhr ) {
        if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    },
    onError: function(xhr) {
        
    }
}