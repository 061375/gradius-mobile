<!doctype html>

<html lang="en">  
<head>
    <title>Gradius Mobile - By Jeremy Heminger</title>
    <link rel="stylesheet" href="_/css/style.css" />
    <script   src="https://code.jquery.com/jquery-1.12.4.min.js"   integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="   crossorigin="anonymous"></script> 
    <?php
    if(!isset($_GET['dev'])) { ?>
    <script src="_/js/script.js"></script>
    <?php }else{ ?>
    <script>console.log('DEVELOPMENT MODE :: true');var developmentmode = true;</script>
    <script src="_/components/js/_script.js?v=<?=strtotime('now')?>"></script>
    <script src="_/components/js/env.js?v=<?=strtotime('now')?>"></script>
    <script src="_/components/js/gui.js?v=<?=strtotime('now')?>"></script>
    <script src="_/components/js/listeners.js?v=<?=strtotime('now')?>"></script>
    <script src="_/components/js/math.js?v=<?=strtotime('now')?>"></script>
    <script src="_/components/js/player.js?v=<?=strtotime('now')?>"></script> 
    <script src="_/components/js/scripts.js?v=<?=strtotime('now')?>"></script>
    <script src="_/components/js/timeline.js?v=<?=strtotime('now')?>"></script>
    <script src="_/components/js/enemies.js?v=<?=strtotime('now')?>"></script>
    <script src="_/components/js/turtle.js?v=<?=strtotime('now')?>"></script>
    <?php } ?>
    <meta name="viewport" content="width=device, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
</head>  
<body>
    <div class="container">
        <div class="top">
            <ul>
                <li><img src="_/icons/ship.png" /></li>
                <li><img src="_/icons/ship.png" /></li>
                <li><img src="_/icons/ship.png" /></li>
            </ul>
            <h3>0</h3>
        </div>
        <div class="info">
            <table> 
                <tr>
                    <td id="pla">play</td>
                    <td id="ins">instructions</td>
                    <td id="abo">about</td>
                </tr>
            </table>
            <div id="main" class="show">
                <img src="_/images/logo.png" />
                <br />
                <center>
                    <p>by jeremy heminger - 2016</p>
                </center>
            </div>
            <div id="_ins">
                <h2>Lorem Ipsum Title Instructions</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores totam quam aspernatur sint voluptate odio omnis magnam cupiditate qui fugit voluptatibus quibusdam consequuntur optio blanditiis quas quaerat maiores nesciunt placeat.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit quas praesentium repellendus assumenda consectetur commodi voluptatem culpa ipsum ad ut accusantium eius dolorem officiis quae modi rerum voluptate. Provident minus!</p>
            </div>
            <div id="_abo">
                <h2>Credits</h2>
                <p><strong>GRADIUS - Konami 1985</strong></p>
                <p><a href="https://en.wikipedia.org/wiki/Gradius" target="_blank">https://en.wikipedia.org/wiki/Gradius</a><br />
                    </p>
                <p>
                    Originally a game for the NES<br />
                    and a side scroller...<br />
                    but I thought it would be fun to make a vertical version for a phone.
                </p>
              
                <p>
                    <strong>Built on:</strong>
                    <ul>
                        <li><a href="http://threejs.org/" target="_blank">Three.js</a></li>
                        <li><a href="https://jquery.com/" target="_blank">Jquery</a></li>
                        <li><a href="http://sass-lang.com/" target="_blank">SASS</a></li>
                        <li><a href="http://gruntjs.com/" target="_blank">Grunt</a></li>
                    </ul>
                </p>
            </div>
        </div>
        
        <div class="pandc">
            <ul>
                <li>
                    <div class="select left">
                        <img src="_/icons/upgrade.png" />
                        <div class="bomb">
                            <img src="_/icons/bomb.png" />
                        </div>
                    </div>
                </li>
                <li>  
                    <table>
                        <tr>
                            <td><img src="_/icons/speedup.png" /></td>
                            <td><img src="_/icons/lazer.png" /></td>
                            <td><img src="_/icons/double.png" /></td>
                            <td><img src="_/icons/reverse.png" /></td>
                            <td><img src="_/icons/shield.png" /></td>
                        </tr>
                    </table>
                </li>
                <li>
                    <div class="select right">
                        <img src="_/icons/upgrade.png" />
                        <div class="bomb">
                            <img src="_/icons/bomb.png" />
                        </div>
                    </div>
                </li> 
            </ul>
        </div>
        <!--canvas></canvas--> 
        <div id="canvas"> 
        </div>
        <img src="_/images/star_1.png" class="star_1 sfield" />
        <img src="_/images/star_2.png" class="star_2 sfield" />
        <img src="_/images/star_3.png" class="star_3 sfield" /> 
    </div>
    <script src="http://192.168.1.154:81/three.js/build/three.js"></script>
    <script src="http://192.168.1.154:81//three.js/examples/js/loaders/OBJLoader.js"></script>
    <script src="http://192.168.1.154:81//three.js/examples/js/loaders/MTLLoader.js"></script>
    <script src="http://192.168.1.154:35729/livereload.js"></script>
    <!--script src="/jstesting/three.js/build/three.js"></script>
    <script src="/jstesting/three.js/examples/js/loaders/OBJLoader.js"></script>
    <script src="/jstesting/three.js/examples/js/loaders/MTLLoader.js"></script>
    <script src="/jstesting/three.js/examples/js/materials/MeshPhongMaterial.js"></script>
    <script src="http://localhost:35729/livereload.js"></script-->
    
</body> 
</html>  
