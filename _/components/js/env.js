var env = { 
    c:{},
    init: function(obj) {
        this.c = obj.container;
        this.stars.max = (!obj.stars.max ? obj.stars.max : 100);   
    },
    stars:{
        object:{},
        max:100,
        s:[],
        init: function() {
            var textureLoader = new THREE.TextureLoader();
            var map = textureLoader.load( "_/textures/star.png" );
            var mat = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );
            var i = 0;
            env.stars.object = new THREE.Group();
            while(++i<this.max) {
                var z = -50;
                var x = Math.floor(Math.random() * (windowHalfX/2) - (windowHalfX / 4));
                var y = Math.floor(Math.random() * (windowHalfY/2) - (windowHalfY /5));
                var sprite = new THREE.Sprite( mat );
                    sprite.position.set( x, y, z );
                    sprite.scale.x = sprite.scale.y = Math.random() * 2 + 0.5;
                    //sprite.position.normalize();
                    //sprite.position.multiplyScalar( 50 );
                    //sprite.position.x = x;
                    //sprite.position.y = y;
                    //sprite.position.z = z;
                    sprite.yspeed = (Math.random() * 2) + 0.1;
                env.stars.object.add(sprite);
            }
            //console.log(env.stars.object);
            scene.add( env.stars.object );
        },
        update:function(){
            var i = 0;
            var m = env.stars.object.children.length;
            for(i = 0; i<m; i++) {
                env.stars.object.children[i].position.y -= env.stars.object.children[i].yspeed;
                if (env.stars.object.children[i].position.y < -windowHalfY) {
                    env.stars.object.children[i].position.y += (windowHalfY * 2);
                    env.stars.object.children[i].position.x = Math.floor(Math.random() * (windowHalfX/2) - (windowHalfX / 4));
                }
            }
        }
    }
}