var TIMELINE = {
    clock:0,
    level:1,
    init: function(level){ this.level = level;this.clock = 0;},
    loop:function(){
        this.clock++;
        switch(this.level)
        {
            case 1:this.level_1();break;
            
        }
    },
    level_1:function() {
        /*
        switch (this.clock) {
            case 100:
                ENEMIES.loadmodel('turtle',function(obj){
                    for(var i=400;i<500;i+=20) {
                        ENEMIES.c++;
                        ENEMIES.e[ENEMIES.c] = new ENEMIES.turtle(0,-30,0,obj);
                    }});
            break;
        }*/
    }
}