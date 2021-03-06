<!doctype html>

<html lang="en">  
<head>
    <title>Gradius Mobile - By Jeremy Heminger</title>
    <link rel="stylesheet" href="_/css/style.css" />
    <?php
    if(!isset($_GET['dev'])) { ?>
    <script src="_/js/script.js"></script>
    <?php }else{ ?>
    <script>console.log('DEVELOPMENT MODE :: true');var developmentmode = true;</script>
    <script src="_/components/js/_loader.js?v=<?php echo strtotime('now')?>"></script>
    <script src="_/components/js/_script.js?v=<?php echo strtotime('now')?>"></script>
    <script src="_/components/js/env.js?v=<?php echo strtotime('now')?>"></script>
    <script src="_/components/js/gui.js?v=<?php echo strtotime('now')?>"></script>
    <script src="_/components/js/listeners.js?v=<?php echo strtotime('now')?>"></script>
    <script src="_/components/js/math.js?v=<?php echo strtotime('now')?>"></script>
    <script src="_/components/js/player.js?v=<?php echo strtotime('now')?>"></script> 
    <script src="_/components/js/scripts.js?v=<?php echo strtotime('now')?>"></script>
    <script src="_/components/js/timeline.js?v=<?php echo strtotime('now')?>"></script>
    <script src="_/components/js/enemies.js?v=<?php echo strtotime('now')?>"></script>
    <script src="_/components/js/turtle.js?v=<?php echo strtotime('now')?>"></script>
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
                <p>
                    Fork This Project: <a target="_blank" class="github" href="https://github.com/061375/gradius-mobile">
                    <svg aria-hidden="true" class="octicon octicon-mark-github" height="28" version="1.1" viewBox="0 0 16 16" width="28">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z">
                            
                        </path>
                    </svg>
                    </a>
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
        <div id="canvas">  
        </div>
        <img src="_/images/star_1.png" class="star_1 sfield" />
        <img src="_/images/star_2.png" class="star_2 sfield" />
        <img src="_/images/star_3.png" class="star_3 sfield" /> 
    </div>
    <?php
    // make sure the server remote address is set
    $r = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : false;
    // if yes
    if(false !== $r) {
        // set a whitelist of localhost ip's
        $dev = array(
        '127.0.0.1',
        '::1'
        );
        // if this is a localhost
        if(in_array($r, $dev))
        // my local IP - chnage to fit your situation
        if($r == '192.168.1.157') {
            echo '<script src="http://192.168.1.154:35729/livereload.js"></script>';
        }else{
            // this is another location
            echo '<script src="http://localhost:35729/livereload.js"></script>';
        }
        // you probably wont need the previous operation unless you are working in more than one location
    }
    // I swear three.js must have other dependancies
    // I tried minifying into one file loading all the three files first and last
    // I tried using only the files I needed and three in a seperate folder
    // it fails...
    // I don't see any calls to a <script> tag in the inspector
    // but,...it must be using something else
    ?>
    <script src="_/js/three/build/three.min.js"></script>
    <script src="_/js/three/examples/js/loaders/OBJLoader.js"></script>
    <script src="_/js/three/examples/js/loaders/MTLLoader.js"></script> 
</body> 
</html>  
