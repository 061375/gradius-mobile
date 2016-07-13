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
        switch (this.clock) {
            case 100:
                ENEMIES.loadmodel('turtle3',function(obj){
                    for(var i=0;i<200;i+=40) {
                        ENEMIES.c++;
                        ENEMIES.e["turtle"+ENEMIES.c] = new ENEMIES.turtle(-40,(120+i),270,0,obj,ENEMIES.c);
                    }
                });
            break;
        }
    }
}