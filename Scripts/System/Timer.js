 'use strict'     

var MS_TO_TIME_UNIT_SCALE = 1;
var TIME_UNIT_TO_MS_SCALE = 1 / MS_TO_TIME_UNIT_SCALE;
const LEAD_TIME = 1000;
		

// TODO: Make the Timer look like a self-executing schedule to the rest of the engine

var Timer = new (function()
{
	var renderer = function(){};

    var devices = [];
        
    var subject;	

    this.sequence = { phase: 0, radius: 0 };
	
	this.register_device = function(Update, MinInterval)
	{
		var timer = { min_interval: MinInterval, update: Update, elapsed: 0, prev_elapsed: 0 }
		devices.push(timer)
		return timer;
	}
	
    var sequence;
    
	var updating = false;
	var next;
	var updater;
	
	var last; 
		
    var cycle = function()
    {
        requestAnimationFrame(cycle);
        // update
        var current = Date.now();//get_time();//new Date().getTime();
        var elapsed = current - last;
        last = current;
            
        elapsed = (Math.round(elapsed) * MS_TO_TIME_UNIT_SCALE);	
          
        WASM_access.execute_frame2(elapsed);
          
        sequence = RelativeAxis.execute_span(sequence, elapsed);
   
        WASM_access.execute_frame3(elapsed);
   
        renderer(elapsed);
        
        for (var index = 0; index < devices.length; index++)
        {
            devices[index].elapsed += elapsed;
            if (devices[index].elapsed > devices[index].min_interval) 
            {
                devices[index].update(sequence, devices[index].elapsed);
                devices[index].elapsed = 0;
            }
        }
        
    }.bind(this);
	
	this.set_renderer = function(Renderer){renderer = Renderer;};
	
    this.start = function()
    {
    //    this.schedule = new Partition(MAX_INTERVAL, RelativeAxis.null_impulse_operation, [] );

        sequence = this.schedule;

        last = Date.now();
        
        cycle();
              
    }.bind(this);
    
})();