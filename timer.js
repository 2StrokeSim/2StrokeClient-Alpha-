var timer = function(exports)
{
    var MS_TO_TIME_UNIT_SCALE = 1;
    var TIME_UNIT_TO_MS_SCALE = 1 / MS_TO_TIME_UNIT_SCALE;
    const LEAD_TIME = 1000;
		    
    
    // TODO: Make the Timer look like a self-executing schedule to the rest of the engine

    var update;

    // Stealing some poor Date object's getTime function and leaving them anonymous because we can't stand the sight of them (true story)
    var get_time = function() { return (new Date()).getTime() };
        
    var date = new Date(); 

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

    //	this.schedule = new Partition(MAX_INTERVAL, RelativeAxis.null_impulse_operation, [] );

    var sequence = this.schedule;

    var updating = false;
    var next;
    var updater;

    var last = new Date().getTime();//get_time();
        
    var cycle = function()
    {
        requestAnimationFrame(cycle);
        // update
        var current = new Date().getTime();
        var elapsed = current - last;
        last = current;
            
        elapsed = (Math.round(elapsed) * MS_TO_TIME_UNIT_SCALE);	
            
           
    /*        sequence = RelativeAxis.execute_span_intermediate(sequence, elapsed);
                    
        renderer(elapsed);
        
        for (var index = 0; index < devices.length; index++)
        {
            devices[index].elapsed += elapsed;
            if (devices[index].elapsed > devices[index].min_interval) 
            {
                devices[index].update(sequence, devices[index].elapsed);
                devices[index].elapsed = 0;
            }
        }*/
        update();
        
    }.bind(this);

    this.set_renderer = function(Renderer){renderer = Renderer;};

    exports.start = function(loop)
    {
        update = loop;
        requestAnimationFrame(cycle);
    }
    
    return exports;
}

define(['graphics/shader/vertex', 'graphics/shader/fragment'], function () 
{
    return timer( {} ); 
});
