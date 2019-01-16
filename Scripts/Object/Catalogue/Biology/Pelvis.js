Mechanisms[PELVIS_MECHANISM] = (function()
{
		    									
	return function(origin)
	{        
        var glyph = Model.fabricate(Model.PELVIS, [44, 30, 20], [origin], 0);

		this.controller = glyph.controller;

		this.action = { mechanic: this.controller, action: walk_step } 
        
        this.trace = glyph.trace[6];
        
        this.potential = glyph.potential[6];
        
        this.threshold = glyph.threshold[6];
        
        this.synapse = glyph.synapse[6];
	};				
	
})();

Mechanisms[GUI_MECHANISM] = (function()
{
		    									
	return function(origin)
	{        
//        var glyph = Model.fabricate2(Model.GUI_DEFINITION, [44, 30, 20], [origin], 0);
	};				
	
})();
/*
        var model_index = Model.GUI_DEFINITION;
        
        var scale = [44, 30, 20];
        
        var connections = [origin];

        var parent = 0;
        

        var model = Model.definitions[model_index];
        
        var convolux = Patterns[model.patterns[0]];
	
        var comm_offset = WASM_access.TypedArrays_to_comm(320, new Float32Array(scale));
    
        for (var i = 0; i < convolux.input_count; i++)
        {
           WASM_access.TypedArray_to_comm(new Float32Array(connections[i]), comm_offset);
           comm_offset += 4 * 3;
        }

        var WASM_object = WASM_access.type_impress2(model_index, parent, 0, 0, 0);*/
        
        
        
/*                orbit_twines[orbit_index] = twining_result[i];//WASM_access.Float32Array_from(pointers[4], 28);     

        orbit_trace[orbit_index] = trace_result[i];
        orbit_potential[orbit_index] = potential_result[i];
        orbit_threshold[orbit_index] = threshold_result[i];
        orbit_synapse[orbit_index] = synapse_result[i];
    }

    glyph.trace = orbit_trace;
    glyph.potential = orbit_potential;
    glyph.threshold = orbit_threshold;
    glyph.synapse = orbit_synapse;

    glyph.orbit_count = convolux.orbit_count;
    var constructor = convolux.constructor.bind(this);*/


	/*	this.controller = glyph.controller;//new pelvis_controller(connections, orbit, controllers)

		this.action = { mechanic: this.controller, action: walk_step } 

        this.glyph = glyph.WASM_object;
        
        this.trace = glyph.trace[0];
        
        this.potential = glyph.potential[0];
        
        this.threshold = glyph.threshold[0];
        
        this.synapse = glyph.synapse[0];*/