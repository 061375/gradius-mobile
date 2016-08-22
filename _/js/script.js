function init(){container=document.getElementById("canvas"),camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,2e3),camera.position.z=250,_frustum=new THREE.Frustum,scene=new THREE.Scene;var a=new THREE.AmbientLight(16777215);scene.add(a);var b=new THREE.DirectionalLight(16772829,4);b.position.set(3,3,30),scene.add(b),player.init(container),env.init({container:container,stars:{max:100}}),env.stars.init(),renderer=new THREE.WebGLRenderer,renderer.setPixelRatio(window.devicePixelRatio),renderer.setSize(document.getElementsByClassName("container")[0].clientWidth,document.getElementsByClassName("container")[0].clientHeight),container.appendChild(renderer.domElement),windowHalfX=container.firstChild.style.width.replace("px","")/2,windowHalfY=container.firstChild.style.height.replace("px","")/2,window.addEventListener("resize",onWindowResize,!1),TIMELINE.run=!0,TIMELINE.init(1)}function animate(){requestAnimationFrame(animate),render()}function render(){gamerunning&&(player.render(),env.stars.update(),ENEMIES.loop(),TIMELINE.loop()),renderer.render(scene,camera)}function onWindowResize(){windowHalfX=window.innerWidth/2,windowHalfY=window.innerHeight/2,camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}function onProgress(a){if(a.lengthComputable){var b=a.loaded/a.total*100;console.log(Math.round(b,2)+"% downloaded")}}function onError(a){}function distance_to_point(a,b,c,d){if(c>a)var e=c-a;else var e=a-c;if(d>b)var f=d-b;else var f=b-d;var g=f/e;return g=e+g}function point_direction(a,b,c,d,e){var f=c-a,g=d-b,h=Math.atan2(g,f),i=h*(180/Math.PI);return 0>i&&(i+=360),e?h:i}function motion_set_2(a,b){var c=a.position.x,d=a.position.y,e=a.rotation.z;return c+=Math.cos(e)*Math.PI/180*b,d+=Math.sin(e)*Math.PI/180*b,a.position.x=c,a.position.y=d,a}function motion_set_3(a,b,c,d,e){var f=new Object,g=d*(Math.PI/180);return a+=Math.cos(g)*Math.PI/180*e,b+=Math.sin(g)*Math.PI/180*e,c+=Math.sin(g)*Math.PI/180*e,f.x=a,f.y=b,f.z=c,f}function move_to_contact(a,b){var c=point_direction(a.x,a.y,b.x,b.y);c+=180;var d=15;for(a.speed>1?d=a.speed:b.speed>1&&(d=b.speed);1==checkCollision(a,b);){var e=c*(Math.PI/180);a.x+=Math.cos(e)*Math.PI/180*a.speed,a.y+=Math.sin(e)*Math.PI/180*a.speed}}function checkCollision(a,b){for(var c=new Array(a.x-a.negXcollisionBox,a.x+a.posXcollisionBox),d=new Array(a.y-a.negYcollisionBox,a.y+a.posYcollisionBox),e=0;2>e;e++)for(var f=0;2>f;f++)if(c[e]>b.x-b.negXcollisionBox&&c[e]<b.x+b.posXcollisionBox&&d[f]>b.y-b.negYcollisionBox&&d[f]<b.y+b.posYcollisionBox)return!0;return!1}function checkCollisionCoords(a,b,c,d,e){new Array(a-e,a+e),new Array(d-e,d+e);return a>c-e&&c+e>a&&b>d-e&&d+e>b}function f_intersects(a){camera.updateMatrixWorld(),camera.matrixWorldInverse.getInverse(camera.matrixWorld),cameraViewProjectionMatrix.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse),frustum.setFromMatrix(cameraViewProjectionMatrix),frustum.intersectsObject(a)}function removeEntity(a,b,c){var d=scene.getObjectByName(a.name);scene.remove(d),toEnd(b,c),animate()}function toEnd(a,b){return a.push(a.splice(b,1)),a}function TextureAnimator(a,b,c,d,e){this.tilesHorizontal=b,this.tilesVertical=c,this.numberOfTiles=d,a.wrapS=a.wrapT=THREE.RepeatWrapping,a.repeat.set(1/this.tilesHorizontal,1/this.tilesVertical),this.tileDisplayDuration=e,this.currentDisplayTime=0,this.currentTile=0,this.update=function(b){for(this.currentDisplayTime+=b;this.currentDisplayTime>this.tileDisplayDuration;){this.currentDisplayTime-=this.tileDisplayDuration,this.currentTile++,this.currentTile==this.numberOfTiles&&(this.currentTile=0);var c=this.currentTile%this.tilesHorizontal;a.offset.x=c/this.tilesHorizontal;var d=Math.floor(this.currentTile/this.tilesHorizontal);a.offset.y=d/this.tilesVertical}}}var Loader=function(a){var b="_/textures/",c=".png",d="_/models/",e=function(a,d,e,f){var g=new THREE.TextureLoader,h=g.load(b+d+c);e.map=h,a.mat=new THREE.SpriteMaterial(e),f()},f=function(a,b,c){var e=new THREE.MTLLoader;e.load(d+b+".mtl",function(e){e.preload();var f=new THREE.OBJLoader;f.setMaterials(e),f.load(d+b+".obj",function(b){a=b,c(b)},onProgress,onError)})},g={stars:function(a){e(env.stars,"star",{map:null,color:16777215,fog:!0},a)}},h={ship:function(a){var e=new THREE.LoadingManager;e.onProgress=function(a,b,c){console.log(a,b,c)},player.texture=new THREE.Texture;var f=new THREE.TextureLoader;player.map=f.load(b+"thrust"+c);var g=new THREE.ImageLoader(e);g.load(b+"viper"+c,function(b){player.texture.image=b,player.texture.needsUpdate=!0;var c=new THREE.OBJLoader(e);c.load(d+"viper.obj",function(b){player.ship.object=b,player.ship.object.traverse(function(a){a instanceof THREE.Mesh&&(a.material.map=player.texture)}),a()},onProgress,onError)})},weapons:{single:function(a){e(player.weapons.single,"shot",{map:null,color:16777215,fog:!0},a)}}};g.stars(function(){h.ship(function(){h.weapons.single(function(){f(ENEMIES.turtle.obj,"turtle3",function(b){ENEMIES.turtle.obj=b,f(ENEMIES.turtle.obj,"powerup",function(b){a()})})})})})},container,camera,scene,renderer,_frustum,mouseX=0,mouseY=0,windowHalfX=window.innerWidth/2,windowHalfY=window.innerHeight/2,gamerunning=!1,gamescore=0;window.onload=function(){Loader(function(){init(),animate()})};var EFFECTS={boom:function(a,b,c,d){}},ENEMIES={e:{},c:0,points:{turtle:10,demon:20},test:!0,loadmodel:function(a,b){var c=new THREE.MTLLoader;c.load("_/models/"+a+".mtl",function(c){c.preload();var d=new THREE.OBJLoader;d.setMaterials(c),d.load("_/models/"+a+".obj",function(a){b(a)},onProgress,onError)})},loop:function(){var a=0;for(var b in this.e)this.e[b].loop(a),a++;$(".top.show h3").html(gamescore)},addDebugpathNodes:function(a){for(var b=a.length,c=new THREE.MeshBasicMaterial({color:16777215}),d=0;b>d;d++){var e=new THREE.BoxGeometry(10,10,10),f=new THREE.Mesh(e,c);f.position.x=a[d].c[0],f.position.y=a[d].c[1],scene.add(f)}},turn:function(a,b,c,d,e){var f=point_direction(a.position.x,a.position.y,b,c,!1);"variant"==d&&(d=Math.abs(Math.abs(b)-f));var g=Math.degrees(a.rotation.z);return g>=180&&360-f>180?(f>g-10&&(g-=d),g+10>f&&(g+=d)):(f>g-10&&(g+=d),g+10>f&&(g-=d)),a=this.roll(a,g,f,d,e),0>g&&(g=360),g>360&&(g=0),a.rotation.z=Math.radians(g),a},roll:function(a,b,c,d,e){if(Math.degrees(a.rotation.y)>=e)return a;var f=Math.abs(Math.degrees(a.rotation.y));return Math.abs(b)-Math.abs(c)>10?e>f&&(f+=d):f>0&&(f-=d),a.rotation.y<0&&(f=-f),a.rotation.y=Math.radians(f),a},remove:function(a){var b=scene.getObjectByName(a);scene.remove(b),delete ENEMIES.e[a]}},env={c:{},warp:50,init:function(a){this.c=a.container,this.stars.max=a.stars.max?100:a.stars.max},stars:{object:{},max:200,s:[],mat:null,init:function(){var a=0;for(env.stars.object=new THREE.Group;++a<this.max;){var b=-50,c=Math.floor(Math.random()*(windowHalfX/2)-windowHalfX/4),d=Math.floor(Math.random()*(windowHalfY/2)-windowHalfY/5),e=new THREE.Sprite(this.mat);e.position.set(c,d,b),e.scale.x=e.scale.y=2*Math.random()+.5,e.yspeed=2*Math.random()+.1,env.stars.object.add(e)}scene.add(env.stars.object)},update:function(){var a=0,b=env.stars.object.children.length;for(a=0;b>a;a++)env.stars.object.children[a].position.y-=env.stars.object.children[a].yspeed+this.warp,this.warp>1?this.warp-=this.warp/8.6:this.warp=0,env.stars.object.children[a].position.y<-windowHalfY&&(env.stars.object.children[a].position.y+=2*windowHalfY,env.stars.object.children[a].position.x=Math.floor(Math.random()*(windowHalfX/2)-windowHalfX/4))}}};$(document).ready(function(){$("#ins").on("click",function(a){a.preventDefault(),$(".info .show").removeClass("show"),$("#_ins").addClass("show")}),$("#abo").on("click",function(a){a.preventDefault(),$(".info .show").removeClass("show"),$("#_abo").addClass("show")}),$("#pla").on("click",function(a){a.preventDefault(),$(".sfield").fadeOut("fast",function(){$(".info").fadeOut("fast",function(){$("#canvas").fadeIn("fast",function(){gamerunning=!0,$(".info .show").removeClass("show"),$("#main").addClass("show"),$(".top").addClass("show"),$(".pandc").addClass("show")})})})})}),Math.radians=function(a){return a*Math.PI/180},Math.degrees=function(a){return 180*a/Math.PI},Math.sqr=function(a){return a*a};var player={map:"",sprite:"",texture:"",ship:{x:0,y:-80,speed:1,b:!1,object:{},cweapon:"single"},init:function(a){var b=new THREE.SpriteMaterial({map:player.map,color:16777215,fog:!0}),c=new THREE.Sprite(b);c.position.set(0,-10,0),c.scale.x=10,c.scale.y=10;for(var d=[],e=0;30>e;e+=10)d[e]=new THREE.PointLight(11190771,1,e),d[e].castShadow=!0,d[e].shadow.camera.near=1,d[e].shadow.camera.far=30,d[e].shadow.bias=.01;d[0].position.set(-30,0,-10),d[10].position.set(30,0,-10),d[20].position.set(-30,-30,-60),player.ship.object.castShadow=!0,player.ship.object.receiveShadow=!0,player.ship.object.add(c),player.ship.object.add(d[0]),player.ship.object.add(d[10]),player.ship.object.add(d[20]),player.ship.object.position.z=-30,scene.add(player.ship.object),player.weapons.single.init(),a.addEventListener("click",this.shipClick,!1)},render:function(){player.weapons.shotloop();var a=distance_to_point(this.ship.object.position.x,this.ship.object.position.y,this.ship.x,this.ship.y),b=this.ship.speed+a/1e4,c=.03;a>10?(this.ship.object.position.x<this.ship.x-b?(this.ship.object.position.x+=b,this.ship.object.rotation.y<.5&&(this.ship.object.rotation.y+=c)):this.ship.object.position.x>this.ship.x+b&&(this.ship.object.position.x-=b,this.ship.object.rotation.y>-.5&&(this.ship.object.rotation.y-=c)),this.ship.object.position.y<this.ship.y-b?this.ship.object.position.y+=b:this.ship.object.position.y>this.ship.y+b&&(this.ship.object.position.y-=b),distance_to_point(this.ship.object.position.x,this.ship.y,this.ship.x,this.ship.y)<25&&(this.ship.object.rotation.y>.02&&(this.ship.object.rotation.y-=c+.02),this.ship.object.rotation.y<-.02&&(this.ship.object.rotation.y+=c+.02))):(this.ship.object.rotation.y>.02&&(this.ship.object.rotation.y-=c),this.ship.object.rotation.y<-.02&&(this.ship.object.rotation.y+=c))},shipClick:function(a){if(gamerunning){var b=1.5;windowHalfX>250&&(b=2),player.ship.x=(a.clientX-windowHalfX)/b,player.ship.x>0?player.ship.x-=player.ship.x/2:player.ship.x+=Math.abs(player.ship.x)/2,player.ship.y=-((a.clientY-windowHalfY)/2),player.ship.y>0?player.ship.y-=player.ship.y/2:player.ship.y+=Math.abs(player.ship.y)/2}},weapons:{debug:!1,object:[],_single:!1,firing:!0,i:0,shotloop:function(){switch(player.ship.cweapon){case"single":player.weapons.single.update()}},single:{i:0,clock:20,max:20,_single:[],sprite:"",mat:"",init:function(){for(var a=0;a<this.max;a++){var b=new THREE.Sprite(this.mat);b.position.set(player.ship.object.position.x,player.ship.object.position.y+10,-1),b.scale.x=2,b.scale.y=4,b.yspeed=1,b.visible=!1,this._single.push(b),scene.add(b)}},shoot:function(){if(this.i++,this.i>=this.clock)for(var a=0;a<this.max;a++)0==player.weapons.single._single[a].visible&&(this._single[a].position.x=player.ship.object.position.x-player.ship.object.position.x/10,this._single[a].position.y=player.ship.object.position.y+10,player.weapons.single._single[a].visible=!0,a=this.max,this.i=0)},update:function(){this.shoot();for(var a=0;a<this.max;a++)this._single[a].position.y>100?this._single[a].visible=!1:this._single[a].visible&&(this._single[a].position.y+=this._single[a].yspeed)},collision:function(a,b,c){for(var d=0;d<this.max;d++)if(checkCollisionCoords(this._single[d].position.x,this._single[d].position.y,a,b,c))return this._single[d].visible=!1,!0;return!1}},update:function(){player.weapons.object.length;player.weapons.i++}}},POWERUPS={e:{},c:0,loop:function(){var a=0;for(var b in this.e)this.e[b].loop(a),a++},remove:function(a){var b=scene.getObjectByName(a);scene.remove(b),delete POWERUPS.e[a]}};POWERUPS.basic=function(a,b,c){var d=1.5;this.g=new THREE.Group,this.g.position.x=a,this.g.position.y=b,this.g.scale.x=d,this.g.scale.y=d,this.g.scale.z=d,this.g.add(POWERUPS.basic.obj.clone()),scene.add(this.g)},POWERUPS.basic.prototype={constructor:POWERUPS.basic,loop:function(a){}};var TIMELINE={run:!1,clock:0,level:1,init:function(a){this.level=a,this.clock=0},loop:function(){switch(this.run&&this.clock++,this.level){case 1:this.level_1()}},level_1:function(){switch(this.clock){case 100:for(var a=0;200>a;a+=40)ENEMIES.c++,ENEMIES.e["turtle"+ENEMIES.c]=new ENEMIES.turtle(-40,120+a,270,0,void 0,ENEMIES.c);break;case 800:for(var a=0;200>a;a+=40)ENEMIES.c++,ENEMIES.e["turtle"+ENEMIES.c]=new ENEMIES.turtle(40,120+a,270,1,null,ENEMIES.c);break;case 1400:for(var a=0;200>a;a+=40)ENEMIES.c++,ENEMIES.e["turtle"+ENEMIES.c]=new ENEMIES.turtle(40,120+a,270,0,null,ENEMIES.c);break;case 2e3:for(var a=0;200>a;a+=40)ENEMIES.c++,ENEMIES.e["turtle"+ENEMIES.c]=new ENEMIES.turtle(-40,120+a,270,1,null,ENEMIES.c)}}};ENEMIES.turtle=function(a,b,c,d,e,f){"undefined"==typeof ENEMIES.turtle.obj&&(ENEMIES.turtle.obj=e),this.c=f;var g=1.5;this.speed=65,this.tspeed=2,this.tl=TIMELINE.clock,this.clock=0,this.a_pp=d,this.l=this.a_p[this.a_pp].length,this.g=new THREE.Group,this.g.position.x=a,this.g.position.y=b,this.g.rotation.z=Math.radians(c),this.g.scale.x=g,this.g.scale.y=g,this.g.scale.z=g,this.g.name="turtle"+f,ENEMIES.turtle.obj.name="turtle"+f,this.g.add(ENEMIES.turtle.obj.clone()),scene.add(this.g)},ENEMIES.turtle.prototype={constructor:ENEMIES.turtle,a_p:[[{t:1500,c:[-40,0]},{t:1500,c:[71,73]},{t:2550,c:[60,80]},{t:2550,c:[60,-200]}],[{t:1500,c:[40,0]},{t:1500,c:[-71,73]},{t:2550,c:[-60,80]},{t:2550,c:[-60,-200]}]],now:0,loop:function(a){this.g=ENEMIES.turn(this.g,this.a_p[this.a_pp][this.now].c[0],this.a_p[this.a_pp][this.now].c[1],this.tspeed,65),this.g=motion_set_2(this.g,this.speed),checkCollisionCoords(this.g.position.x,this.g.position.y,this.a_p[this.a_pp][this.now].c[0],this.a_p[this.a_pp][this.now].c[1],10)&&(this.now<this.l-1?this.now++:this.die(!1)),player.weapons.single.collision(this.g.position.x,this.g.position.y,5)&&this.die(!0)},die:function(a){a&&((this.gold||this.gold_c)&&ENEMIES.create_pup(this.g.position.x,this.g.position.y),gamescore+=ENEMIES.points.turtle),ENEMIES.remove("turtle"+this.c)}};