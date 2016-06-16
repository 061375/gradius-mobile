$(document).ready(function(){
    $('#ins').on("click",function(e){
        e.preventDefault();
        $('.info .show').removeClass("show");
        $('#_ins').addClass("show");
    });
    $('#abo').on("click",function(e){
        e.preventDefault();
        $('.info .show').removeClass("show");
        $('#_abo').addClass("show");
    });
    $('#pla').on("click",function(e){
        e.preventDefault();
        $('.sfield').fadeOut("fast",function() {
            $('.info').fadeOut("fast",function(){
                $('#canvas').fadeIn("fast",function(){
                    gamerunning = true;
                    $('.info .show').removeClass("show");
                    $('#main').addClass("show");
                    $('.top').addClass("show");
                    $('.pandc').addClass("show");
                });
            });
        });
    });
    
});
var container;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var ship = {x:0,y:-80,speed:1,b:false}
var gamerunning = false;
window.onload = function() {

init();
animate();
}
function init() {
        //container = document.createElement( 'div' );
        //document.body.appendChild( container );
        container = document.getElementById("canvas");
        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
        camera.position.z = 250;
        // scene
        scene = new THREE.Scene();
        var ambient = new THREE.AmbientLight( 0xffffff );
        scene.add( ambient );
        var directionalLight = new THREE.DirectionalLight( 0xffeedd, 2 );
        directionalLight.position.set( 0, 0, 10 );
        scene.add( directionalLight );
        // texture
        var manager = new THREE.LoadingManager();
        manager.onProgress = function ( item, loaded, total ) {
                console.log( item, loaded, total );
        };
        
        var texture = new THREE.Texture();
        var onProgress = function ( xhr ) {
                if ( xhr.lengthComputable ) {
                        var percentComplete = xhr.loaded / xhr.total * 100;
                        console.log( Math.round(percentComplete, 2) + '% downloaded' );
                }
        };
        var onError = function ( xhr ) {
        };
        var loader = new THREE.ImageLoader( manager );
        loader.load( 'textures/UV_Grid_Sm.jpg', function ( image ) {
                texture.image = image;
                texture.needsUpdate = true;
        } );
        
        // model
        var pointLight = new THREE.PointLight( 0xaac1f3, 1, 30 );
            pointLight.castShadow = true;
            pointLight.shadow.camera.near = 1;
            pointLight.shadow.camera.far = 30;
            //pointLight.shadowCameraVisible = true;
            pointLight.shadow.bias = 0.01;
            pointLight.position.x -= 30;
            pointLight.position.y -= 30;
            pointLight.position.z -= 30;
        var loader = new THREE.OBJLoader( manager );
        loader.load( '_/models/viper.obj', function ( object ) {
                
                object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                                child.material.map = texture;
                        }
                } );
                object.add( pointLight );
                //object.position.y = - 80;
                object.position.z = -30;
                
                scene.add( object );
                //console.log(scene);
        }, onProgress, onError );
        //
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor( 0xff0000 );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );
        container.addEventListener( 'click', onDocumentMouseMove, false );
        //
        window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
}
function onDocumentMouseMove( event ) {
    if (gamerunning) {
        ship.x = ( event.clientX - windowHalfX ) / 2;
        if(ship.x > 0){
            ship.x -= (ship.x / 2);
        }else{
            ship.x += (Math.abs(ship.x) / 2);
        }
        ship.y = -(( event.clientY - windowHalfY ) / 2);
        if(ship.y > 0){
            ship.y -= (ship.y / 2);
        }else{
            ship.y += (Math.abs(ship.y) / 2);
        }
    }
}
//
function animate() {
        requestAnimationFrame( animate );
        render();
}
function render() {
    
    if (typeof scene.children[2] !== 'undefined' && gamerunning) {
        var object = scene.children[2];
        var dis = distance_to_point(object.position.x,object.position.y,ship.x,ship.y);
        var sp = ship.speed + (dis / 10000);
       
        var sr = 0.03;
        if (dis > 10) {
            if (object.position.x < (ship.x - sp)) {
                object.position.x += sp;
                if(object.rotation.y < 0.5)object.rotation.y += sr;
            }else{
                if(object.position.x > (ship.x + sp)) {
                object.position.x -= sp;
                if(object.rotation.y > -0.5)object.rotation.y -= sr;
                }
            }
            if (object.position.y < (ship.y - sp)) {
                object.position.y += sp;
            }else{
                if(object.position.y > (ship.y + sp))
                object.position.y -= sp;
            }
            if (distance_to_point(object.position.x,ship.y,ship.x,ship.y) < 25) {
        
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
    }
        //camera.position.x += ( mouseX - camera.position.x ) * .05;
        //camera.position.y += ( - mouseY - camera.position.y ) * .05;
        //camera.lookAt( scene.position );
        renderer.render( scene, camera );
}
function distance_to_point(x1,y1,x2,y2)
{
  if(x1 < x2)
  {
    var x = x2-x1;
  }
  else
  {
    var x = x1-x2;
  }
  if(y1 < y2)
  {
    var y = y2-y1;
  }
  else
  {
    var y = y1-y2;
  }
  var dis = y / x;
  dis = x + dis;
  return dis;
}