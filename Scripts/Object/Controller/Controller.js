// Integral Partitioning Simulation Objects - JC

var Controller = function(){};

var GimbalRailArmController = function(gimbal, rail)
{	
    this.input = function(sequence, RadialTranslation, LongitudinalRotation, LatitudinalRotation, AxisRotation)
    {
        var velocity = {};

        gimbal.update_via_projection(20);

        velocity.acceleration = calculate_traversal_acceleration(20, 0, LongitudinalRotation * 0.1, 0, 0);
        velocity.momentum = calculate_traversal_momentum(20, 0, LongitudinalRotation * 0.1, 0, 0);
        velocity.inertia = calculate_traversal_inertia(20, 0, LongitudinalRotation * 0.1, 0, 0);

        velocity.metric = sinusoidal_phase_interval_motion;
        
        gimbal.project( 20, 0, [singularity, singularity, singularity], [0, 1, 0, velocity] );
        
        velocity = {};        
        
        rail.update_via_projection(20);
        
        velocity.acceleration = calculate_traversal_acceleration(20, 0, RadialTranslation, 0, 0);
        velocity.momentum = calculate_traversal_momentum(20, 0, RadialTranslation, 0, 0);
        velocity.inertia = calculate_traversal_inertia(20, 0, RadialTranslation, 0, 0);

        velocity.metric = sinusoidal_phase_interval_motion;
                
        rail.project( 20, 0, [singularity, singularity, velocity], [1, 0, 0, singularity] );

        return sequence;
    };
};

var trash_function_positive = function(sequence)
{
    Mouse.LeftButtonOut = poopah;

    return sequence;
}

var trash_function_negative = function(sequence)
{
    Mouse.LeftButtonOut = undefined;

    return sequence;
}
/*
var Dynamic = function(orbit, XposAxis, XnegAxis)
{
    var position = [];
    var orientation = [];
    
    var differentiation = new Partition( 0, RelativeAxis.null_impulse_operation, [] );
    var integration = new Partition( 0, RelativeAxis.null_impulse_operation, [] );
    
    this.get_prestate = orbit.get_prestate.bind(orbit);
    this.update_via_projection = orbit.update_via_projection.bind(orbit);
    this.project = orbit.project.bind(orbit); 
    this.differentiate = orbit.differentiate.bind(orbit);
    
    this.set_orbit = function(new_orbit)
    {
        orbit.eject(this);
        orbit = new_orbit;
        orbit.insert(this);
    }
    
    this.update = function(sequence, X, Y, delta)
    {
        if (X == 0) return;
        delta = 20;
        
//    	orbit.update_via_projection(delta);
        
        Xvel = {};
       
        Xvel.acceleration = calculate_traversal_acceleration(delta, 0, X, 0, 0)//{ metric: sine, radius: radius , phase: momentum_start_phase, velocity: rate };
        Xvel.momentum = calculate_traversal_momentum(delta, 0, X, 0, 0)
        Xvel.inertia = calculate_traversal_inertia(delta, 0, X, 0, 0)

        Xvel.metric = sinusoidal_phase_interval_motion;

        Yvel = {};
       
        Yvel.acceleration = calculate_traversal_acceleration(delta, 0, Y, 0, 0)//{ metric: sine, radius: radius , phase: momentum_start_phase, velocity: rate };
        Yvel.momentum = calculate_traversal_momentum(delta, 0, Y, 0, 0)
        Yvel.inertia = calculate_traversal_inertia(delta, 0, Y, 0, 0)

        Yvel.metric = sinusoidal_phase_interval_motion;
   
        orbit.origin[0].phase += X;
        orbit.origin[1].phase += Y;
   
        //this.project( 20, 0, [Xvel, Yvel, singularity], [0, 1, 0, singularity] );   
     
        orbit.translation[0].inertia.phase = Xvel.inertia.phase;
        orbit.translation[0].inertia.radius = Xvel.inertia.radius;       

        orbit.translation[0].momentum.phase = Xvel.momentum.phase;
        orbit.translation[0].momentum.radius = Xvel.momentum.radius;       

        orbit.translation[0].acceleration.phase = Xvel.acceleration.phase;
        orbit.translation[0].acceleration.radius = Xvel.acceleration.radius;  

        
        orbit.translation[1].inertia.phase = Yvel.inertia.phase;
        orbit.translation[1].inertia.radius = Yvel.inertia.radius;       

        orbit.translation[1].momentum.phase = Yvel.momentum.phase;
        orbit.translation[1].momentum.radius = Yvel.momentum.radius;       

        orbit.translation[1].acceleration.phase = Yvel.acceleration.phase;
        orbit.translation[1].acceleration.radius = Yvel.acceleration.radius;  

        orbit.projected_time.radius = 20;
        orbit.projected_time.phase = 0;
       
        var end;
        
        if ( X < 0 ) 
        { 
            end = new Partition( -X, RelativeAxis.null_impulse_operation, [] );
            RelativeAxis.project_partition_forward_from_reference(end, XposAxis);
//          RelativeAxis.recursively_execute_exclusive_interval_forward(XposAxis, end); 
            
//          sequence = RelativeAxis.merge_intervals(new Partition( 0, limb_segment.traverse.bind(this), [projected_time, this.angular_velocity] ),
//												 new Partition( projected_time, update.bind(this), [projected_time] ));
   
            var velocity = -X/20;
            
            var projected_time = XposAxis.origin / velocity < 20;
            
            if (projected_time <= 20) //if (XposAxis.next != end)
            {
                RelativeAxis.project_partition_forward_from_reference(new Partition( 20, XposAxis.next.impulse.bind(this), [] ), sequence);//new Partition( projected_time, update.bind(this), [projected_time] ));                                     
            }
             //return event;
        }
        else if ( X > 0 )
        {
            end = new Partition( X, RelativeAxis.null_impulse_operation, [] );
            RelativeAxis.project_partition_backward_from_reference(end, XposAxis);
        }
            
        if (XposAxis.last == undefined)
        {
            var hrrrmmm = "hrrrmmm";
        }
        
         if (end.last == undefined)
        {
            var hrrrmmm = "hrrrmmm";
        }
 
        var crap = RelativeAxis.find_self_reference_in_interval(XposAxis)
        
        if (crap != undefined)
        {
            var duh = 0;           
        }
        
        var wuh = 0;           
        
        RelativeAxis.displace_partition( XposAxis );
        RelativeAxis.replace_partition( end, XposAxis );                
        
        if ( X > 0) 
        { 
            end = new Partition( X, RelativeAxis.null_impulse_operation, [] );
            RelativeAxis.project_partition_forward_from_reference(end, XnegAxis);
            RelativeAxis.recursively_execute_exclusive_interval_forward(XnegAxis, end); 
        }
        else if ( X < 0 )
        {
            end = new Partition( -X, RelativeAxis.null_impulse_operation, [] );
            RelativeAxis.project_partition_backward_from_reference(end, XnegAxis);
        }
        
        RelativeAxis.displace_partition( XnegAxis );
        RelativeAxis.replace_partition( end, XnegAxis );
    
//      RelativeAxis.replace_partition( end, XnegAxis );
        
//      var crap = RelativeAxis.interval_to_array(XposAxis);
        
        var crap = RelativeAxis.find_self_reference_in_interval(XposAxis)
        
        if (crap != undefined)
        {
            var duh = 0;           
        }
        
        var huh = 0;
        
//        var event = RelativeAxis.merge_intervals(sequence,
//                                                                      new Partition( 20, orbit.update_via_projection.bind(orbit), [20] ));

        return sequence;
    };
 
}*/

// TODO: Dumb name. Fits the theme I guess?
var RailOnRailController = function(dynamic, XposAxis, XnegAxis) 
{
    var state = dynamic.get_prestate();
    
    var origin = state.origin;
    
    var crap = RelativeAxis.interval_to_array(XposAxis);
    
    this.update = function(sequence, X, Y, delta)
    {
        dynamic.update(sequence, X, Y, delta);
/*        var nameo = RelativeAxis.interval_to_name_array(leftest_edge);    
    
        var huh = 0;
    
        if (X == 0) return;
        delta = 20;
        
    	dynamic.update_via_projection(delta);
        
        dynamic.project( 20, 0, [calculated_velocity_traversal(delta, 0, X, 0, 0), calculated_velocity_traversal(delta, 0, Y, 0, 0), singularity], [0, 1, 0, singularity] );   
           
        var end;
        
        if ( X < 0 ) 
        { 
            end = new Partition( -X, RelativeAxis.null_impulse_operation, [] );
            RelativeAxis.project_partition_forward(end, XposAxis.next);
//          RelativeAxis.recursively_execute_exclusive_interval_forward(XposAxis, end); 
            
//          sequence = RelativeAxis.merge_intervals(new Partition( 0, limb_segment.traverse.bind(this), [projected_time, this.angular_velocity] ),
//												 new Partition( projected_time, update.bind(this), [projected_time] ));
   
            var velocity = -X/20;
            
            var projected_time = XposAxis.origin / velocity < 20;
            
            if (projected_time <= 20) //if (XposAxis.next != end)
            {
                RelativeAxis.project_partition_forward(new Partition( 20, XposAxis.next.impulse.bind(this), [] ), sequence.next);//new Partition( projected_time, update.bind(this), [projected_time] ));                                     
            }
             //return event;
        }
        else if ( X > 0 )
        {
            end = new Partition( X, RelativeAxis.null_impulse_operation, [] );
            RelativeAxis.project_partition_backward(end, XposAxis.last);
        }
            
        if (XposAxis.last == undefined)
        {
            var hrrrmmm = "hrrrmmm";
        }
        
         if (end.last == undefined)
        {
            var hrrrmmm = "hrrrmmm";
        }
 
        var crap = RelativeAxis.find_self_reference_in_interval(XposAxis)
        
        if (crap != undefined)
        {
            var duh = 0;           
        }
        
        var wuh = 0;           
        
        RelativeAxis.displace_partition( XposAxis );
        RelativeAxis.replace_partition( end, XposAxis );                
        
        if ( X > 0) 
        { 
            end = new Partition( X, RelativeAxis.null_impulse_operation, [] );
            RelativeAxis.project_partition_forward(end, XnegAxis.next);
            RelativeAxis.recursively_execute_exclusive_interval_forward(XnegAxis, end); 
        }
        else if ( X < 0 )
        {
            end = new Partition( -X, RelativeAxis.null_impulse_operation, [] );
            RelativeAxis.project_partition_backward(end, XnegAxis.last);
        }
        
        RelativeAxis.displace_partition( XnegAxis );
        RelativeAxis.replace_partition( end, XnegAxis );
    
//      RelativeAxis.replace_partition( end, XnegAxis );
        
//      var crap = RelativeAxis.interval_to_array(XposAxis);
        
        var crap = RelativeAxis.find_self_reference_in_interval(XposAxis)
        
        if (crap != undefined)
        {
            var duh = 0;           
        }
        
        var huh = 0;
        
        return sequence;*/
    };
};


var Adaptor = function(Constants, Mapping, Output)
{
    
    var argument_out = 
    [
        20, 
        0, 
        [singularity, singularity, singularity], [0, 1, 0, singularity]
    ]
    
    this.update = function()
    {
        arguments_out[3][0] = arguments[0]; 
        arguments_out[3][1] = arguments[1];
        Output(...arguments_out);
    }
};

var Switch = function(controller)
{
    this.update = function()
    {
        Mouse.set_hack_via_function_that_needs_deleted(controller.input); 
    };
}