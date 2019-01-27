"use strict";

require(['graphics', 'timer', 'network'], function(graphics, timer, network)
{
    var welcomestring = "undetected browser";

    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    if (isOpera) { welcomestring = "Opera"; }

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';
    if (isFirefox) { welcomestring = "Firefox"; }
    
    // Safari 3.0+ "[object HTMLElementConstructor]" 
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
    if (isSafari) { welcomestring = "Safari"; }
    
    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;
    if (isChrome) { welcomestring = "Chrome"; }
    
    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    console.log('%c /////////////////////////////////////////////////////////// ', 'background: #222; color: #e13375');    
    console.log('%c //  Good morning, ' + welcomestring + '!                 //', 'background: #222; color: #bada55');
    console.log('%c //////////////////////////////////////////////////////////// ', 'background: #222; color: #e13375');    
    
    
//    console.log('%c', 'padding:28px 119px;line-height:100px;background:url(http://cdn.sstatic.ne‌​t/stackoverflow/img/‌​sprites.png?v=6) no-repeat;');
	var responses = network.client_messages;
	
//	var socket = io('http://10.0.0.3:3000');
//	$('form').submit(function(){
//	  socket.emit('chat message', $('#m').val());
//	  $('#m').val('');
//	  return false;
//	});

	var add_chat_text = function(message)
	{
		message = WASM.Int32Array_from_comm(1);
		console.log(message);		
//		$('#messages').append($('<li>').text(message[0]));
//		window.scrollTo(0, document.body.scrollHeight);
	};
	
	var receive_state = function(message)
	{
		var somecrap = new Int32Array([444]);
		
		WASM.TypedArray_to_comm(somecrap);

		WASM.receive_state(4); 
	};
	
	var receive_delta = function(message)
	{
		WASM.receive_delta(4); 
	};
    
	
    var transform_vertex_buffer;
    
	var start = function()
	{
        
//		socket.on( 'state', receive_state );
//		socket.on( 'delta', receive_delta );

        
        comm_buffer = WASM.comm_buffer;
        
        WASM_access = WASM;        
        
        
        build_models = WASM.build_models;
        
        
        serif_render = WASM.serif_render;
        serif_create = WASM.serif_create;
        
        
        glyph_render = WASM.glyph_render;
        glyph_create = WASM.glyph_create;
        
        
        stroke_render = WASM.stroke_render;
        stroke_create = WASM.stroke_create;
             
        view_render = WASM.view_render;
        view_create = WASM.view_create;     
        view_subordinate = WASM.view_subordinate;  
     
        winding_differentiate = WASM.winding_differentiate;
        winding_create = WASM.winding_create;
        winding_subordinate = WASM.winding_subordinate;
        
        
        
        subordinate = WASM.subordinate;
                
        
        drawElements = WASM.drawElements;
        
        interval_create = WASM.interval_create;
        
        interval_execute = WASM.interval_execute;
               
        
        WASM_transform_indexed_vertices = WASM.WASM_transform_indexed_vertices;
     
        graphics.initialize(WASM);
          
        var right_knee_transform;
        var right_hip_transform;
        var left_knee_transform;
        var left_hip_transform;
         
        var compile = function()
        {	
            var interface_view = new View( 0, 0, window.innerWidth, window.innerHeight, View.ORTHOGRAPHIC );
            
            graphics.insert(interface_view);
            
            var GUI = Mechanism(GUI_MECHANISM, []);//new Component(PELVIS_MECHANISM, []);

                        
            var eye_view = new View( 0, 0, window.innerWidth, window.innerHeight, View.PERSPECTIVE );																			
                    
            new AmbientRadiant();		
            
            WASM_access.braid_create();
        
            var pointers = WASM_access.Uint32Array_from_comm(0, 2);
            var braid = pointers[0];
            var innerMat = pointers[1];    

            
            WASM_access.TypedArrays_to_comm(0, new Float32Array([0, 0, 200, 1, 0, 0, 0]), new Float32Array([0, 0, 0]),
                                            new Float32Array([ 0, 0, 0, 0, 1, 0,        0, 0, 0, 0, 1, 0,         0, 0, 0, 0, 1, 0,       0, 0, 0, 0, 1, 0 ]));
            
            var winding = winding_create(innerMat, braid);
            
            
                    pointers = WASM_access.Uint32Array_from_comm(0, 8);
    
        var worldMatPointer = pointers[0];     
       
        var worldMat = WASM_access.Float32Array_from(worldMatPointer, 16);   
        var origin = WASM_access.Float32Array_from(pointers[2], 3);	
        var orientation = WASM_access.Float32Array_from(pointers[3], 4);	
        var twines = WASM_access.Float32Array_from(pointers[4], 28);
        
                var trace = pointers[6];//WASM_access.trace_create(winding, 1, 0);
    
        //var trace2 = WASM_access.trace_create(braid, 2, 0);
    
        var rail_orbit_trace = trace; 
    
        // Sequences of stages of braids feeding windings
//        WASM_access.trace_sequence_append(trace, trace2);
            
            var rail_orbit_innerMat = innerMat;
            
//            var rail_orbit = new Orbit( origin, orientation, [0, 0, 0], braid, innerMat, winding, worldMat, twines, trace );
            
     //       rail_orbit.insert(eye_view);
            view_subordinate( eye_view.WASM_object, rail_orbit_innerMat );

            
            
            var light = new PointRadiant();
       
            eye_view.insert(light);
            
        WASM_access.braid_create();
    
        pointers = WASM_access.Uint32Array_from_comm(0, 2);
        braid = pointers[0];
        innerMat = pointers[1];    

        
        WASM_access.TypedArrays_to_comm(0, new Float32Array([0, 0, 0, 
                                        1, 0, 0, 0]), new Float32Array([0, 25, 0]),
                                        new Float32Array([ 0, 0, 0, 0, 1, 0,        0, 0, 0, 0, 1, 0,         0, 0, 0, 0, 1, 0,       0, 0, 0, 0, 1, 0 ]));
        
        winding = winding_create(innerMat, braid);
        
        pointers = WASM_access.Uint32Array_from_comm(0, 8);
    
        worldMatPointer = pointers[0];     
       
        worldMat = WASM_access.Float32Array_from(worldMatPointer, 16);   
        origin = WASM_access.Float32Array_from(pointers[2], 3);	
        orientation = WASM_access.Float32Array_from(pointers[3], 4);	
        twines = WASM_access.Float32Array_from(pointers[4], 28);
        trace = pointers[6];//WASM_access.trace_create(winding, 1, 0);
    
     //   trace2 = WASM_access.trace_create(braid, 2, 0);
    
        var gimbal_orbit_trace = trace;     
    
        WASM_access.initstuff();
    

            WASM_access.trace_sequence_append( gimbal_orbit_trace, rail_orbit_trace );
             
            WASM_access.linkstuff(gimbal_orbit_trace);
            
            
            
            Timer.start();                
                                            
        	graphics.insert(eye_view);            
            
            WASM.start();
        }

        compile();
       
	};
    
    var request_record = function(record_index)
    {
        WASM_access.TypedArrays_to_comm(0, new Uint32Array([9,                      // reference count
                                                            (2 * 4) +               // header offset
                                                            (3 * 4) + (3 * 4) + (3 * 4) + (3 * 4) +
                                                            (1 * 4) + (2 * 4) +
                                                            (4 * 4) +
                                                            (1 * 4) + (1 * 4)]),  // byte sizes byte index
                                           new Float32Array([50, 0, 0]), // new_origin 
                                           new Uint32Array([1, 2, 3,     2, 0, 1]), // anode, cathode
                                           new Float32Array([44, 30, 20]),
                                           new Uint32Array([2,         0, 1]), // entanglement count, entanglements
                                           new Uint32Array([0, 0, 0, 0]), // entanglement count, entanglements
                                           new Uint32Array([0,  3]), // domain/codomain indexes                                           
                                           new Uint32Array([3 * 4, 3 * 4, 3 * 4, 3 * 4,
                                                            1 * 4, 2 * 4,
                                                            4 * 4,
                                                            1 * 4, 1 * 4])); // byte sizes

        WASM_access.load_record();        
    }
    
    var imports = 	{
                        consoleLog: function(num) { console.log(num) },
                        broadcast: function(dataPtr, nDataBytes) {},
                        render: graphics.render,
                        add_chat_text: add_chat_text,
                        setReflective: setReflective,	
                        build_bind_and_activate_texture: build_bind_and_activate_texture,   
                        serif_handle: serif_handle,
                        transform_indexed_vertices: transform_indexed_vertices,
                        transform_vertex_buffer: transform_vertex_buffer,
                        register_transform_atlas: register_transform_atlas,
                        execute_operation: execute_operation, 
                        request_record: request_record,
                        create_discrete_UINT8RGBA_sampler: graphics.create_discrete_UINT8RGBA_sampler,
                        buildTextureAtlas: graphics.buildTextureAtlas,
                        update_UINT8RGBA_sampler2D: graphics.update_UINT8RGBA_sampler2D
                        
                    };
    
    var exports =	[   
                            'button_up',                                
                            'button_down',
                            'analog_move',
                            'initiate',
                            'receive_state',
                            'receive_delta',
                            'interval_create',
                            'interval_execute',
                            'braid_create',
                            'braid_differentiate',                            
                            'winding_create',
                            'winding_create3',
                            'winding_differentiate',
                            'winding_subordinate',
                            'radiant_render',
                            'radiant_create',
                            'schematic_create',
                            'subordinate',
                            'execute_frame',
                            'trace_create',
                            'trace_insert',
                            'trace_sequence_append',
                            'sinusoidal_phase_integral',
                            'prototype_glyph',
                            'initstuff',
                            'linkstuff',
                            'create_pelvis_controller',
                            'create_leg_controller',
                            'operate_pelvis_controller',
                            'forward_kinematic_frame_projection',
                            'do_update',
                            'set_update',
                            'view_insert',
                            'view_create_object',
                            'execute_frame2',
                            'execute_frame3',
                            'load_record',
                            'start'

                            
                        ];
                            
    graphics.interfacing( imports, exports );

        function FileHelper()
        {
            FileHelper.prototype.readStringFromFileAtPath = function(pathOfFileToReadFrom, callback)
            {
                var request = new XMLHttpRequest();
                request.onload = this.readStringFromFileAtPath_OnLoad.bind(this, callback);
                request.open("GET", pathOfFileToReadFrom, true);
                request.send();
            }

            FileHelper.prototype.readStringFromFileAtPath_OnLoad = function(callback, event)
            {
                var request = event.target;
                var returnValue = request.responseText;
                console.log("Return value: " + returnValue);
                geometries[RECTOID_GEOMETRY_BLOB].obj = returnValue;
                callback(returnValue);
            }
        }
        
        var file_helper = new FileHelper();
        
        
    var asset_index = 0;
    var asset_refs = [ 
                        { path: "./Data/Rectoid.obj" }
                     ];
                     
                     
                     
    var load_assets = function()
    {
        if (asset_index < asset_refs.length)
        {   
            var asset_ref = asset_refs[asset_index];
            asset_index++;
            file_helper.readStringFromFileAtPath(asset_ref.path, load_assets);      
        }
        else
        {
            setTimeout(start, 0);
        }
    }
    
	WASM.instantiate(	'./client.wasm',
                                    
                                    imports,
									
									exports,
									
									function(){Database.create_database_from_object("AlphaMenu", menu_library, load_assets);}
								);	
	
});