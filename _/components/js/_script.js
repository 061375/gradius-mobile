/**
 *
 *
 *
 * 
 * GRADIUS
 * By Jeremy Heminger
 * 2016 - 
 * http://061375.com
 * https://github.com/061375
 * j.heminger@061375.com
 *
 * just wanted to build a game in paper.js
 * I always want to make a game and I didn't want to use GameMaker or Unity
 * Those tools are great, but I wanted to start as close to scratch as possible
 * and a mobile shooter was a simple starting point
 *
 * I used to play with making games in GameMaker in the 2000's as the forum alias BGJOHNSON
 * 
 * CREDITS
 *      GRADIUS - Konami - 1985
 *      https://en.wikipedia.org/wiki/Gradius
 *      Originally a game for the NES
 *      and a side scroller...
 *      but I thought it would be fun to make a vertical version for a phone
 *
 *
 * */
//----------------------------------
// INIT 
var container;

var camera, scene, renderer, _frustum;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;

var windowHalfY = window.innerHeight / 2;

var gamerunning = false;

var gamescore = 0; 

//----------------------------------
window.onload = function() {
        Loader(function(){
                init();
                animate();
        });
}
//----------------------------------
/**
 * 
 * */
function init() {
        
        container = document.getElementById("canvas");
        
        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
        
        camera.position.z = 250;

        _frustum = new THREE.Frustum();
        
        // scene
        scene = new THREE.Scene();
        
        var ambient = new THREE.AmbientLight( 0xffffff );
        
        scene.add( ambient );
        
        var directionalLight = new THREE.DirectionalLight( 0xffeedd, 4 );
        
        directionalLight.position.set( 3, 3, 30 );
        
        scene.add( directionalLight );
        
        // load player
        player.init(container); 
        
        env.init({container:container,stars:{max:100}});
        
        env.stars.init();
        //
        renderer = new THREE.WebGLRenderer();
        //renderer.setClearColor( 0xff0000 );
        renderer.setPixelRatio( window.devicePixelRatio );
        
        renderer.setSize( document.getElementsByClassName('container')[0].clientWidth,
                         document.getElementsByClassName('container')[0].clientHeight );
        
        container.appendChild( renderer.domElement );
        
        //if (windowHalfX > (768 / 2)) {
                windowHalfX = container.firstChild.style.width.replace('px','') / 2;
                windowHalfY = container.firstChild.style.height.replace('px','') / 2;
        //}
        
        //
        window.addEventListener( 'resize', onWindowResize, false );
        
        TIMELINE.run = true; // we can stop this loop while allowing other stuff to run
        TIMELINE.init(1);
}

//----------------------------------
function animate() {
    requestAnimationFrame( animate );
    render();
}
//----------------------------------
function render() {
    if (gamerunning) {
        player.render();
        env.stars.update();
        ENEMIES.loop();
        TIMELINE.loop();
    }
    
        //camera.position.x += ( mouseX - camera.position.x ) * .05;
        //camera.position.y += ( - mouseY - camera.position.y ) * .05;
        //camera.lookAt( scene.position );
        renderer.render( scene, camera );
} 