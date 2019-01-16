'use strict'
var MAX_INTERVAL = 32000; // We could insert null event placeholders to create an arbitrarily long time step.  

var RelativeAxis = new (function()
{
    this.execute = function()
    {
        if (Timer.event.sequence != undefined)
        {
            Timer.schedule = insert_event_into_schedule(Timer.event.sequence, Timer.schedule);
        }
    }
    
    this.null_impulse_operation = function(sequence)
    {
        return sequence;
    };

    this.concatenate = function(first, last, distance)
    {        
        if (distance != undefined) { last.origin += distance; }
        
        for (var index = first; index.next != undefined; index = index.next){}
        
        index.next = last;
        last.last = index;

        return first; 
    }	

    this.concatenate_interval = function(first, last, distance)
    {  
        if (distance != undefined) { last.origin += distance; }

        for (var index = first; index.next != undefined; index = index.next){}
        
        index.next = last;
        last.last = index;

        return first; 
    }	    
    
    this.merge_intervals = function(schedule_one, schedule_two)
    {
        var schedule_two_array = [];
        var schedule_one_array = [];
        var result_array = [];
        
        for (var index = schedule_one; index != undefined; index = index.next)
        {
            schedule_one_array.push(index);
        }

        for (var index = schedule_two; index != undefined; index = index.next)
        {
            schedule_two_array.push(index);
        }	
        
        var result;
        if (schedule_two.origin < schedule_one.origin) result = schedule_two;
        else result = schedule_one;
        
        var next;
        
        for (var index = schedule_two, schedule = schedule_one, next = index.next; index != undefined && schedule != undefined;  schedule = index.next, index = next)
        {
            next = index.next;
            RelativeAxis.project_partition_forward(index, schedule);
            
        }
        
        if (index != undefined)
        {
            this.concatenate_interval(schedule_one, index);
        }
        
        for (var index = result; index != undefined; index = index.next)
        {
            result_array.push(index);
        }
        
        return result;
    }    

     this.subinterval_by_negative_diameter = function(reference, diameter, result = {})
    {
        var last;
        for (result.next = reference, result.last = result.next.last; result.last != undefined; last = result.last.last, result.next = result.last)
        {
            if (result.next.origin <= diameter) { diameter -= result.next.origin; continue; }
            break;
        }
        
        result.last = last;
        result.origin = result.next.origin - diameter;
            
        return result;
    }  
  
/*    this.subinterval_by_positive_diameter = function(reference, diameter, result = {})
    {
        var last;
        for (result.next = reference; result.next != undefined; last = result.next, result.next = result.next.next)
        {
            if (result.next.origin <= diameter) { diameter -= result.next.origin; continue; }
            break;
        }
        
        result.last = last;
        result.origin = diameter;
            
        return result;
    }  */
  
    this.prefix = function(partition, reference, distance)
    {
        
    }
    
    this.postfix = function(partition, reference, distance)
    {
        partition.last = reference;
        partition.origin = distance;
    }
  
    this.precede = function(partition, reference, distance)
    {
        partition.next = reference;
        partition.last = reference.last;
        
        if (partition.last != undefined)
        {
            partition.last.next = partition;
        }
        
        reference.last = partition;    
        
        partition.origin = reference.origin;
        reference.origin = distance;
    }
    
    this.succeed = function(partition, reference, distance)
    {
        partition.next = reference.next;
        partition.last = reference;
        
        if (partition.next != undefined)
        {
           partition.next.last = partition;           
        }
        
        reference.next = partition;
        
        partition.origin = distance;
    }  
  
    this.seek_forward_by_distance_until = function(partition, distance)
    {
        for (;partition.next != undefined; partition.last = partition.next, partition.next = partition.next.next)
        {
            if (partition.next.origin < distance) { distance -= partition.next.origin; continue; }

            break;
        }
        
        partition.origin = distance;
        return partition;
    };  
  
    this.seek_forward_by_distance = function(partition, distance)
    {
        for (;partition.next != undefined; partition.last = partition.next, partition.next = partition.next.next)
        {
            if (partition.next.origin <= distance) { distance -= partition.next.origin; continue; }

            break;
        }
        
        partition.origin = distance;
        return partition;
    }
    
    this.seek_backward_by_distance = function(partition, distance)
    {  
        if (partition.origin > distance)
        {
            partition.origin -= distance;
            return;
        }
        
        for (; partition.last != undefined; partition.next = partition.last, partition.last = partition.last.last)
        {
            if (partition.last.next.origin <= distance) { distance -= partition.last.next.origin; continue; }

            break;
        }

        if (partition.next == undefined) partition.next = partition.last.next;
        if (partition.next != undefined) partition.origin = partition.next.origin - distance;
        
        return partition;
    }
  
/*    this.insert_partition = function(event, schedule)
    {
        if (event.origin == undefined)
        {
            var hrrrmmm = "hrrrmmm";
        }
      
        var distance = event.origin;
       
        this.advance_by_distance(event, distance);

        if (event.next != undefined)
        {		  
            // TODO(ish?): Should an item scheduled for the same time be put before or after another event at the same time? We've got it before, but I'm thinking after. Another idea is to make it conditional on currently not-even-hypothetical circumstances (spooky!)
            event.next.origin -= event.origin;
            
            // Null interval
           if (event.last == undefined) { event.last = schedule.last; }
            // Schedule is a subsequence
            if (event.last != undefined) event.last.next = event;       		
            event.next.last = event;
            
            if ( event.next == schedule ){ schedule = event; }
        }
        else
        {
            event.last.next = event; 
        }    
        
        return schedule;
    }*/
    
    this.NEGATIVE_BIAS = -1;
    this.POSITIVE_BIAS = 1;
    
    this.project_partition_fom_reference = function(partition, reference, bias = this.NEGATIVE_BIAS)
    {  
         if (partition.origin > 0)
         {
             partition.origin *= -1;
             return this.project_partition_backward_from_reference(partition, reference);
         }
         else if   (partition.origin < 0)
         { 
             return this.project_partition_backward_from_reference(partition, reference);
         }
         else
         {
             if (bias == this.NEGATIVE_BIAS) 
             {
                 return this.precede(partition, reference, 0);
             }
             else if (bias == this.POSITIVE_BIAS)
             {
                 return this.succeed(partition, reference, 0);
             }
             else // NULL bias? What's useful behavior, here? Parallel/link sharing without replacement?
             {
                 return reference;
             }
         }
    }
    
    this.project_partition_forward_until = function(event, reference)
    {
        var distance = event.origin;
        
        event.next = reference;
       
        this.seek_forward_by_distance_until(event, distance);

        if (event.next != undefined)
        {		  
            // TODO(ish?): Should an item scheduled for the same time be put before or after another event at the same time? We've got it before, but I'm thinking after. Another idea is to make it conditional on currently not-even-hypothetical circumstances (spooky!)
            event.next.origin -= event.origin;
            
            // Null interval
           if (event.last == undefined) { event.last = event.next.last; }
            // Schedule is a subsequence
            if (event.last != undefined) event.last.next = event;       		
            event.next.last = event;
            
            if ( event.next == reference ){ reference = event; }
        }
        else
        {
            event.last.next = event; 
        }    
        
        return reference;
    }    
    
    this.project_partition_forward = function(event, reference)
    {
        if (event.origin == undefined)
        {
            var hrrrmmm = "hrrrmmm";
        }
      
        var distance = event.origin;
        
        event.next = reference;
       
        this.seek_forward_by_distance(event, distance);

        if (event.next != undefined)
        {		  
            // TODO(ish?): Should an item scheduled for the same time be put before or after another event at the same time? We've got it before, but I'm thinking after. Another idea is to make it conditional on currently not-even-hypothetical circumstances (spooky!)
            event.next.origin -= event.origin;
            
            // Null interval
           if (event.last == undefined) { event.last = event.next.last; }
            // Schedule is a subsequence
            if (event.last != undefined) event.last.next = event;       		
            event.next.last = event;
            
            if ( event.next == reference ){ reference = event; }
        }
        else
        {
            event.last.next = event; 
        }    
        
        return reference;
    }

    this.project_partition_forward_from_reference = function(partition, reference)
    {
        if (reference.next == undefined)
        {
            this.succeed(partition, reference, partition.origin)
        }
        
        return this.project_partition_forward(partition, reference.next)
    }    
    
    this.project_partition_backward = function(event, schedule)
    {
      
     //   var before = this.interval_to_array(schedule.last);
      
        var distance = event.origin;
        
        event.last = schedule;
       
        this.seek_backward_by_distance(event, distance);

        if (event.last != undefined)
        {		  
            // TODO(ish?): Should an item scheduled for the same time be put before or after another event at the same time? We've got it before, but I'm thinking after. Another idea is to make it conditional on currently not-even-hypothetical circumstances (spooky!)
           
            // Null interval
           if (event.next == undefined) { event.next = event.last.next; }
            // Schedule is a subsequence
            if (event.next != undefined) 
            {
                event.next.last = event;
                event.next.origin -= event.origin;
            }
            
            event.last.next = event;
            
            if ( event.next == schedule ){ schedule = event; }
        }
        else
        {
            event.next.last = event; 
        }    
        
   //     var after = this.interval_to_array(schedule.last);
        
        return schedule;
    }    
    
     this.project_partition_backward_from_reference = function(partition, reference)
    {
        if (reference.last == undefined)
        {
            this.succeed(partition, reference, partition.origin)
        }        
        
        return this.project_partition_backward(partition, reference.last)
    }    
    
    this.merge_interval_list = function()
    {
        var schedule = arguments[0];
        
        for (var index = 1; index < arguments.length; index++)
        {
            schedule = RelativeAxis.merge_intervals(schedule, arguments[index]);
        }
        
        return schedule;
    };
    
    
    
    this.execute_span = function(sequence, span)
    {
        var interval_end = new Partition(span, this.null_impulse_operation, [] );
        var interval_start = new Partition(0, this.null_impulse_operation, [] );
 
        sequence = RelativeAxis.project_partition_forward_until(interval_start, sequence);
        sequence = RelativeAxis.project_partition_forward(interval_end, sequence);
        
        Timer.sequence.radius = sequence;

        sequence = Timer.sequence;
        
        for (var index = interval_start.next; index != interval_end && index != undefined; index = sequence.radius)
        {			
            sequence.radius = index.next;
            
            interval_execute(index.ID);
 //           sequence.phase.op(...sequence.phase.param);
        }
        
        interval_end.origin = 0;
        interval_end.last = undefined;

   
        return interval_end;
    }
    
    this.interval_to_array = function(interval, end)
    {
        var result = [];
        
        for (; interval != end; interval = interval.next)
        {
           result.push( { ID: interval.ID, origin: interval.origin } )
        }
        
        return result;
    }
    
     this.interval_to_name_array = function(interval, end)
    {
        var result = [];
        
        for (; interval != end; interval = interval.next)
        {
           result.push( interval.name );
        }
        
        return result;
    }
    
    this.find_self_reference_in_interval = function(interval, end)
    {  
        for (; interval != end; interval = interval.next)
        {
           if (interval.next == interval || interval.last == interval)
           {
                return { ID: interval.ID, origin: interval.origin, reference: interval }
           }
        };
        
        return undefined;
    }

    // Moves the partition "parallel" to the axis, repairing the exited axis without severing its connections
    this.displace_partition = function(partition)
    {  
        if (partition.last != undefined) { partition.last.next = partition.next; }
        if (partition.next != undefined) 
        { 
            partition.next.last = partition.last;
            partition.next.origin += partition.origin;
        }        
    };
    
    
    this.replace_partition = function(original, replacement)
    {
        replacement.origin = original.origin;
        
        replacement.last = original.last; 
        replacement.next = original.next; 
        
        if (replacement.last != undefined) { replacement.last.next = replacement; }
        if (replacement.next != undefined) { replacement.next.last = replacement; }        
    };
    
    this.recursively_execute_exclusive_interval_forward = function(interval_start, interval_end)
    {
        for (var index = interval_start.next; index != interval_end; index = index.next)
        {			
            index = index.impulse(index);
        }
        
        return interval_end;
    }    
    
    this.seek_forward_until_partition = function(start, end)
    {
        var result;
        for (var index = start.next; index != end; index = index.next)
        {result = index}
    
        return result;
    };
    
    this.recursively_execute_exclusive_interval_forward = function(interval_start, interval_end)
    {
        var sequence;
        
        for (var index = interval_start.next; index != interval_end && index != undefined; index = sequence)
        {			
            sequence = index.next;

            sequence = index.impulse(sequence);
        }
        
        return interval_end;
    };
    
    this.recursively_execute_inclusive_interval_forward = function(interval_start, interval_end)
    {
        for (var index = interval_start; index != interval_end && index != undefined; index = index.next)
        {			
            index = index.impulse(index);
        }
        
        if (index != undefined) 
        {
            index = index.impulse(index);
        }
        
        return interval_end;
    };        

    // CAVEAT: TODO(?): THINGIE: So, dumping a parameter vector in here saves us the creation of an array. But is it too trashy/messy?
    this.forward_interval_from_parameters = function()
    {
        var interval = {};
        interval.first = new Partition(arguments[0], arguments[1], arguments[2]);
        
        var previous = interval.first;
        var index = interval.first;
        
        for (var i = 3; i < arguments.length; i+= 3, previous = index)
        {
            index = new Partition(arguments[i], arguments[i+1], arguments[i+2]);
            
            this.succeed(index, previous, arguments[i]);
        }
        
        interval.last = index;
        
        return interval;
    };
    
    this.recursive_execution_step = function(sequence, operation)
    {  
        sequence = operation(sequence, ...parameters);
            
        return sequence;
    };
    
    this.threshold_switch = function(signal, at, below)
    {
        if (signal.phase > signal.radius)
        {
//            at.radius(at.phase);
        }
        else
        {
//            below.radius(below.phase);
        }
        
    }

    this.execute_array = function(sequence, subsequence, stack)
    {
        for (var i = 0; i < subsequence.length; i++)
        {
            interval_execute(subsequence[i].ID);			
 //           subsequence[i].op(...subsequence[i].param);
        }
        
        return sequence;
    };
    
})();

var interval_create;

var interval_execute;

var execute_operation;

var Partition = (function()
{
	var id_count = 0;
		
    var instances = [];    
        
    execute_operation = function(instance_ID)
    {
        instances[instance_ID].op(...instances[instance_ID].param);
    }
        
	return function(distance, operation, parameters)
	{
		this.ID = id_count;
		id_count++;
        
        instances[this.ID] = this;
		
		this.latency = distance;
		this.origin = distance;
        
//        this.state = { phase: parameters, radius: operation };
        interval_create(1000, this.ID);
        
        this.op = function() 
        {
            operation(...arguments);
        }.bind(this);
        
        this.param = parameters;
                
	};
})();

Partition.impulse_name = '';