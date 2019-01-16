RelativeAxis.seek_forward_by_distance_until_intermediate = function(partition, distance)
{
        
/*    for (;partition.next != undefined; partition.last = partition.next, partition.next = partition.next.next)
    {
        if (partition.next.origin < distance) { distance -= partition.next.origin; continue; }

        break;
    }*/
    
    var thing;
    
    WASM_instance._Reset(distance);    
    
    for (var next = partition.next; next != undefined; next = next.next)
    {
        
        if (next.origin < distance) { thing = WASM_instance._Iterate(next.origin); continue; }

        break;
    }

    for (var limit = WASM_instance._Report(distance), i = 0; i < limit; i++)
    {
        distance -= partition.next.origin;
        partition.last = partition.next, partition.next = partition.next.next;
    }    
    
    partition.origin = distance;
    return partition;
};  

RelativeAxis.seek_forward_by_distance_intermediate = function(partition, distance)
{
    /*for (;partition.next != undefined; partition.last = partition.next, partition.next = partition.next.next)
    {
        if (partition.next.origin <= distance) { distance -= partition.next.origin; continue; }

        break;
    }*/
    
    var thing = 0;
    
    WASM_instance._Reset(distance);    
    
    for (var next = partition.next; next != undefined; next = next.next)
    {
        if (next.origin < distance) { thing = WASM_instance._Iterate(next.origin); continue; }

        break;
    }

    for (var limit = WASM_instance._Report(distance), i = 0; i < limit; i++)
    {
        distance -= partition.next.origin;        
        partition.last = partition.next, partition.next = partition.next.next;
    }        
    
    partition.origin = distance;
    return partition;
}

RelativeAxis.project_partition_forward_until_intermediate = function(event, reference)
{
    var distance = event.origin;
    
    event.next = reference;
   
    this.seek_forward_by_distance_until_intermediate(event, distance);

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

RelativeAxis.project_partition_forward_intermediate = function(event, reference)
{
    if (event.origin == undefined)
    {
        var hrrrmmm = "hrrrmmm";
    }
  
    var distance = event.origin;
    
    event.next = reference;
   
    this.seek_forward_by_distance_intermediate(event, distance);

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


RelativeAxis.execute_span_intermediate = function(sequence, span)
{
    var interval_end = new Partition(span, this.null_impulse_operation, [] );
    var interval_start = new Partition(0, this.null_impulse_operation, [] );

    sequence = RelativeAxis.project_partition_forward_until_intermediate(interval_start, sequence);
    sequence = RelativeAxis.project_partition_forward_intermediate(interval_end, sequence);
    
    Timer.sequence.radius = sequence;

    sequence = Timer.sequence;
    
    for (sequence.phase = interval_start.next; sequence.phase != interval_end && sequence.phase != undefined; sequence.phase = sequence.radius)
    {			
        sequence.radius = sequence.phase.next;
        
        sequence.phase.state.radius(...sequence.phase.state.phase);
    }
    
    interval_end.origin = 0;
    interval_end.last = undefined;

    return interval_end;
}