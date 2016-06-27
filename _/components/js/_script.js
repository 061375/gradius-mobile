
var container;
var camera, scene, renderer, _frustum;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var gamerunning = false;
window.onload = function() {
init();
animate();
}
function init() {
        container = document.getElementById("canvas");
        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
        camera.position.z = 250;
        //console.log(camera);
        _frustum = new THREE.Frustum();
        // scene
        scene = new THREE.Scene();
        var ambient = new THREE.AmbientLight( 0xffffff );
        scene.add( ambient );
        var directionalLight = new THREE.DirectionalLight( 0xffeedd, 4 );
        directionalLight.position.set( 3, 3, 30 );
        scene.add( directionalLight );
        
        // init game elements
        
        
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
        
        windowHalfX = container.firstChild.style.width.replace('px','') / 2;
        windowHalfY = container.firstChild.style.height.replace('px','') / 2;
        //
        window.addEventListener( 'resize', onWindowResize, false );
        TIMELINE.init(1);
}

//
function animate() {
    requestAnimationFrame( animate );
    render();
}
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