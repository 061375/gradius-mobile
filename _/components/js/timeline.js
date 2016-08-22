/***
 * the games timeline
 * example:
 * level 1 -> 100 seconds in = add enemies
 *            250 seconds in = add enemies
 *            1800 seconds in = add terrain
 *            25000 seconds in = add boss
 * level 2 ->
 * level 3 ->
 * etc...
 * */
var TIMELINE = {
    run:false,
    clock:0,
    level:1,
    init: function(level){ this.level = level;this.clock = 0;},
    loop:function(){
        if(this.run)this.clock++;
        switch(this.level)
        {
            case 1:this.level_1();break;
            
        }
    },
    level_1:function() {
        switch (this.clock) {
            case 100:
                // this will be the first time loading this enemy
                // so we will load its model
                // models should be small...so this should work most of the time
                // ... it will the load enemy ... or wait
                //Loader._enemies.loadmodel('turtle3',function(obj){
                    for(var i=0;i<200;i+=40) {
                        ENEMIES.c++; // toatl enemy count ++
                        // instansiate a new enemy
                        //example ENEMIES.e[turtle0]
                        ENEMIES.e["turtle"+ENEMIES.c] = new ENEMIES.turtle(-40,(120+i),270,0,undefined,ENEMIES.c);
                    }
                //});
            break;
        case 800:
                    // notice here that for the obj variable we pass NULL
                    // in the 'turtle' object we check if the model was loaded previously
                    // this saves us from re-loading the model
                    // paper.js assumes we might want to load a new model...
                    // we dont right now...
                    // se we use the previous object to save resources
                    for(var i=0;i<200;i+=40) {
                        ENEMIES.c++; // toatl enemy count ++
                        ENEMIES.e["turtle"+ENEMIES.c] = new ENEMIES.turtle(40,(120+i),270,1,null,ENEMIES.c);
                    }
            break;
        case 1400:
                    for(var i=0;i<200;i+=40) {
                        ENEMIES.c++; // toatl enemy count ++
                        ENEMIES.e["turtle"+ENEMIES.c] = new ENEMIES.turtle(40,(120+i),270,0,null,ENEMIES.c);
                    }
            break;
        case 2000:
                    for(var i=0;i<200;i+=40) {
                        ENEMIES.c++; // toatl enemy count ++
                        ENEMIES.e["turtle"+ENEMIES.c] = new ENEMIES.turtle(-40,(120+i),270,1,null,ENEMIES.c);
                    }
            break;
        }
        
    }
}