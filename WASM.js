/*const WASM = function(exports)
{	
	var instance;

	var memory = new WebAssembly.Memory({ initial: 1024 });
    
    var comm_buffer;
	
    var UTF8Decoder = new TextDecoder('utf-8');  
    var UTF8Encoder = new TextEncoder();  
    var UTF8String_from = function(dataPtr, length) { return UTF8Decoder.decode(new Uint8Array(memory.buffer, dataPtr, length)); };   
     
	// Copy data to Emscripten heap (directly accessed from Module.HEAPU8)          
	var Uint8Array_from = function(dataPtr, nDataBytes) { return new Uint8Array(memory.buffer, dataPtr, nDataBytes); };	
    var Uint8ClampedArray_from = function(dataPtr, nDataBytes) { return new Uint8ClampedArray(memory.buffer, dataPtr, nDataBytes); };
    var Uint16Array_from = function(dataPtr, count) { return new Uint16Array(memory.buffer, dataPtr, count); };
	var Int32Array_from = function(dataPtr, count) { return new Int32Array(memory.buffer, dataPtr, count); };
	var Uint32Array_from = function(dataPtr, count) { return new Uint32Array(memory.buffer, dataPtr, count); };   
	var Float32Array_from = function(dataPtr, count) { return new Float32Array(memory.buffer, dataPtr, count); };        

    
    var UTF8String_log = function(dataPtr, length) { console.log(UTF8String_from(dataPtr, length)); };
    
    var Uint16Array_log = function(dataPtr, count) { console.log(Uint16Array_from(dataPtr, count)); };
    var Uint32Array_log = function(dataPtr, count) { console.log(Uint32Array_from(dataPtr, count)); };
    var Float32Array_log = function(dataPtr, count) { console.log(Float32Array_from(dataPtr, count)); };

    
	var TypedArray_to = function(data, pointer)
	{
		// Get data byte size, allocate memory on Emscripten heap, and get pointer
		var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
		var dataPtr = pointer;//0;//WASM_instance._malloc(nDataBytes);

		// Copy data to Emscripten heap (directly accessed from Module.HEAPU8)     
		var dataHeap = new Uint8Array(memory.buffer, dataPtr, nDataBytes);
		dataHeap.set(new Uint8Array(data.buffer));
		
		return dataHeap;
	}         
    
	function toUint8Array(buf) {
	  var u = new Uint8Array(buf.length);
	  for (var i = 0; i < buf.length; ++i) {
		u[i] = buf[i];
	  }
	  return u;
	}

	var imports =     
	{
		  env: 
		  {
//			_consoleLog: function(num) { console.log(num) },
//			_broadcast: function(dataPtr, nDataBytes){}//network.broadcast
		  }
	} 
			  
	imports = imports || {};
	imports.env = imports.env || {};
	imports.env.memoryBase = imports.env.memoryBase || 0;
	imports.env.tableBase = imports.env.tableBase || 0;

	if (!imports.env.memory) 
	{
		imports.env.memory = memory;
	}

	if (!imports.env.table) 
	{
		imports.env.table = new WebAssembly.Table({ initial: 0, element: 'anyfunc' });
	}    

	var lib;

		 
	receive_network_input = function(msg)
	{
		var dataPtr;
		var index;
		var response;
		  
		switch (msg)
		{
			case 'left':
				dataPtr = instance._respond(0);//"You go left."
				break;
			case 'cast magic missile':
				dataPtr = instance._respond(1);//"You must choose a target."
				break;
			default:
				dataPtr = instance._respond(2);//"You say: " + msg;
		}

		index = Int32Array_from(dataPtr, 20);		
		
		switch (index[0])
		{
			case 10:
				response = "You go left."
				break;
			case 11:
				response = "You must choose a target."
				break;
			default:
				response = "You say: " + msg;
		}
		
		return response;
	}	 

	exports.respond = function(msg)
	{
		var response;
		  
		switch (msg)
		{
			case 'left':
				response = "You go left."
				break;
			case 'cast magic missile':
				response = "You must choose a target."
				break;
			default:
				response = "You say: " + msg;
		}
		
			return response;
	}

	var cycle = function()
	{
	//	network.broadcast(1000);
	//	WASM.instance._cycle(1000);
		setTimeout(cycle, instance._cycle(1000));
	};
		 
	var instantiate = function(address, import_function_table, export_function_table, succession)
	{
        imports.env._console_LogString = UTF8String_log;
        imports.env._console_LogUshortArray = Uint16Array_log;
        imports.env._console_LogUintArray = Uint32Array_log;
        imports.env._console_LogFloatArray = Float32Array_log;

        
		for(var propName in import_function_table) 
		{
			imports.env['_' + propName] = import_function_table[propName];
		} 
        
//		imports.env._consoleLog = import_function_table.consoleLog;
//		imports.env._broadcast = import_function_table.broadcast;

        var connect = function(instance)
        {
            exports.instance = instance; 

            comm_buffer = Uint8Array_from(instance._get_comm_pointer(), 2000);
            
            export_function_table.push("object_report");
            
            for(var i = 0; i <  export_function_table.length; i++) 
            {                    
                exports[export_function_table[i]] = instance['_' + export_function_table[i]];
            }

            
            
            succession();
//					 cycle(); 
    //			 console.log(lib);            
        };

		if (NODE)
		{
			const fetch = require("node-fetch");

			const fs = require('fs');
			
			var buf = fs.readFileSync(address);
			
//			compile(toUint8Array(buf));
			
			WebAssembly.instantiate(toUint8Array(buf), imports).then(module => connect(module.instance.exports));			
		}
		else
		{
			return fetch(address)
			.then(res => {
			if (res.ok)
			  return res.arrayBuffer();
			throw new Error(`Unable to fetch Web Assembly file ${address}.`);
			})
			.then(bytes => WebAssembly.compile(bytes))
			.then(module => { WebAssembly.instantiate(module, imports).then(instantiation => connect(instantiation.exports)); })
		}
	}	 

    // TODO: This thing isn't nearly parameterized yet. Need byteoffset of data in the new Uint8Array instantiation, as well as a start offset for the contents of the data array itself
	var TypedArray_to_comm = function(data, byteOffset = 0, length)
	{
		comm_buffer.set(new Uint8Array(data.buffer, data.byteOffset, length), byteOffset, length);
	}		 
		
	var TypedArrays_to_comm = function(byteOffset) // data1, data2, data3...
	{
        for (var i = 1; i < arguments.length; i++)
        {
            comm_buffer.set(new Uint8Array(arguments[i].buffer, arguments[i].byteOffset), byteOffset);
            byteOffset += arguments[i].length * arguments[i].BYTES_PER_ELEMENT;
        }
        
        return byteOffset;
	}		        
        
    var UTF8String_to_comm = function(string, byteOffset = 0)
    {
        comm_buffer.set(UTF8Encoder.encode(string), byteOffset);
    }
 
    var Uint16Array_from_comm = function(offset, count)
	{    		 
		return new Uint16Array(memory.buffer, exports.instance._get_comm_pointer()+offset, count);
	}; 
 
    var Uint32Array_from_comm = function(offset, count)
	{    		 
		return new Uint32Array(memory.buffer, exports.instance._get_comm_pointer()+offset, count);
	};   
    
    var Float32Array_from_comm = function(offset, count)
	{    		 
		return new Float32Array(memory.buffer, exports.instance._get_comm_pointer()+offset, count);
	};   
    
    exports.UTF8String_from = UTF8String_from;      
	exports.Uint8Array_from = Uint8Array_from;
    exports.Uint8ClampedArray_from = Uint8ClampedArray_from;
	exports.Uint16Array_from = Uint16Array_from;    
	exports.Int32Array_from = Int32Array_from;
	exports.Uint32Array_from = Uint32Array_from;
	exports.Float32Array_from = Float32Array_from;
    
	exports.Uint32Array_from_comm = Uint32Array_from_comm;
	exports.Float32Array_from_comm = Float32Array_from_comm;
    
    
	exports.TypedArray_to = TypedArray_to;	            
         
	exports.TypedArray_to_comm = TypedArray_to_comm;
	exports.TypedArrays_to_comm = TypedArrays_to_comm;		     
	exports.UTF8String_to_comm = UTF8String_to_comm;		 

    exports.Uint16Array_from_comm = Uint16Array_from_comm;        
    exports.Uint32Array_from_comm = Uint32Array_from_comm;    
    exports.Float32Array_from_comm = Float32Array_from_comm;    
   
   
	exports.receive_client_input = receive_network_input;	 
	exports.instantiate = instantiate;
	exports.start = cycle;
    
    exports.buffer = memory.buffer;
	
	return exports;
	
};

var NODE = false;    
if (typeof process === 'object') {
  if (typeof process.versions === 'object') {
    if (typeof process.versions.node !== 'undefined') {
      NODE = true;
    }
  }
}
// Create exports for Node.js
if (NODE)
{
	
	
		WASM(	require(),
					exports
				  );
}
// create define() for Requirejs
else 
{
	define([], function () 
	{
		return WASM( {} ); 
	});
}*/

const WASM = (function()
{ 
    var exports = {};
	var instance;

	var memory = new WebAssembly.Memory({ initial: 1024 });
    
    var comm_buffer;
	
    var UTF8Decoder = new TextDecoder('utf-8');  
    var UTF8Encoder = new TextEncoder();  
    var UTF8String_from = function(dataPtr, length) { return UTF8Decoder.decode(new Uint8Array(memory.buffer, dataPtr, length)); };   
     
	// Copy data to Emscripten heap (directly accessed from Module.HEAPU8)          
	var Uint8Array_from = function(dataPtr, nDataBytes) { return new Uint8Array(memory.buffer, dataPtr, nDataBytes); };	
    var Uint8ClampedArray_from = function(dataPtr, nDataBytes) { return new Uint8ClampedArray(memory.buffer, dataPtr, nDataBytes); };
    var Uint16Array_from = function(dataPtr, count) { return new Uint16Array(memory.buffer, dataPtr, count); };
	var Int32Array_from = function(dataPtr, count) { return new Int32Array(memory.buffer, dataPtr, count); };
	var Uint32Array_from = function(dataPtr, count) { return new Uint32Array(memory.buffer, dataPtr, count); };   
	var Float32Array_from = function(dataPtr, count) { return new Float32Array(memory.buffer, dataPtr, count); };        

    
    var UTF8String_log = function(dataPtr, length) { console.log(UTF8String_from(dataPtr, length)); };
    
    var Uint16Array_log = function(dataPtr, count) { console.log(Uint16Array_from(dataPtr, count)); };
    var Uint32Array_log = function(dataPtr, count) { console.log(Uint32Array_from(dataPtr, count)); };
    var Float32Array_log = function(dataPtr, count) { console.log(Float32Array_from(dataPtr, count)); };

    
	var TypedArray_to = function(data, pointer)
	{
		// Get data byte size, allocate memory on Emscripten heap, and get pointer
		var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
		var dataPtr = pointer;//0;//WASM_instance._malloc(nDataBytes);

		// Copy data to Emscripten heap (directly accessed from Module.HEAPU8)     
		var dataHeap = new Uint8Array(memory.buffer, dataPtr, nDataBytes);
		dataHeap.set(new Uint8Array(data.buffer));
		
		return dataHeap;
	}         
    
	function toUint8Array(buf) {
	  var u = new Uint8Array(buf.length);
	  for (var i = 0; i < buf.length; ++i) {
		u[i] = buf[i];
	  }
	  return u;
	}

	var imports =     
	{
		  env: 
		  {
//			_consoleLog: function(num) { console.log(num) },
//			_broadcast: function(dataPtr, nDataBytes){}//network.broadcast
		  }
	} 
			  
	imports = imports || {};
	imports.env = imports.env || {};
	imports.env.memoryBase = imports.env.memoryBase || 0;
	imports.env.tableBase = imports.env.tableBase || 0;

	if (!imports.env.memory) 
	{
		imports.env.memory = memory;
	}

	if (!imports.env.table) 
	{
		imports.env.table = new WebAssembly.Table({ initial: 0, element: 'anyfunc' });
	}    

	var lib;

		 
	receive_network_input = function(msg)
	{
		var dataPtr;
		var index;
		var response;
		  
		switch (msg)
		{
			case 'left':
				dataPtr = instance._respond(0);//"You go left."
				break;
			case 'cast magic missile':
				dataPtr = instance._respond(1);//"You must choose a target."
				break;
			default:
				dataPtr = instance._respond(2);//"You say: " + msg;
		}

		index = Int32Array_from(dataPtr, 20);		
		
		switch (index[0])
		{
			case 10:
				response = "You go left."
				break;
			case 11:
				response = "You must choose a target."
				break;
			default:
				response = "You say: " + msg;
		}
		
		return response;
	}	 

	exports.respond = function(msg)
	{
		var response;
		  
		switch (msg)
		{
			case 'left':
				response = "You go left."
				break;
			case 'cast magic missile':
				response = "You must choose a target."
				break;
			default:
				response = "You say: " + msg;
		}
		
			return response;
	}

	var cycle = function()
	{
	//	network.broadcast(1000);
	//	WASM.instance._cycle(1000);
		setTimeout(cycle, instance._cycle(1000));
	};
		 
	var instantiate = function(address, import_function_table, export_function_table, succession)
	{
        imports.env._console_LogString = UTF8String_log;
        imports.env._console_LogUshortArray = Uint16Array_log;
        imports.env._console_LogUintArray = Uint32Array_log;
        imports.env._console_LogFloatArray = Float32Array_log;

        
		for(var propName in import_function_table) 
		{
			imports.env['_' + propName] = import_function_table[propName];
		} 
        
//		imports.env._consoleLog = import_function_table.consoleLog;
//		imports.env._broadcast = import_function_table.broadcast;

        var connect = function(instance)
        {
            exports.instance = instance; 

            comm_buffer = Uint8Array_from(instance._get_comm_pointer(), 2000);
            
            export_function_table.push("object_report");
            
            for(var i = 0; i <  export_function_table.length; i++) 
            {                    
                exports[export_function_table[i]] = instance['_' + export_function_table[i]];
            }

            
            
            succession();
//					 cycle(); 
    //			 console.log(lib);            
        };

		if (NODE)
		{
			const fetch = require("node-fetch");

			const fs = require('fs');
			
			var buf = fs.readFileSync(address);
			
//			compile(toUint8Array(buf));
			
			WebAssembly.instantiate(toUint8Array(buf), imports).then(module => connect(module.instance.exports));			
		}
		else
		{
			return fetch(address)
			.then(res => {
			if (res.ok)
			  return res.arrayBuffer();
			throw new Error(`Unable to fetch Web Assembly file ${address}.`);
			})
			.then(bytes => WebAssembly.compile(bytes))
			.then(module => { WebAssembly.instantiate(module, imports).then(instantiation => connect(instantiation.exports)); })
		}
	}	 

    // TODO: This thing isn't nearly parameterized yet. Need byteoffset of data in the new Uint8Array instantiation, as well as a start offset for the contents of the data array itself
	var TypedArray_to_comm = function(data, byteOffset = 0, length)
	{
		comm_buffer.set(new Uint8Array(data.buffer, data.byteOffset, length), byteOffset, length);
	}		 
		
	var TypedArrays_to_comm = function(byteOffset) // data1, data2, data3...
	{
        for (var i = 1; i < arguments.length; i++)
        {
            comm_buffer.set(new Uint8Array(arguments[i].buffer, arguments[i].byteOffset), byteOffset);
            byteOffset += arguments[i].length * arguments[i].BYTES_PER_ELEMENT;
        }
        
        return byteOffset;
	}		        
        
    var UTF8String_to_comm = function(string, byteOffset = 0)
    {
        comm_buffer.set(UTF8Encoder.encode(string), byteOffset);
    }
 
    var Uint16Array_from_comm = function(offset, count)
	{    		 
		return new Uint16Array(memory.buffer, exports.instance._get_comm_pointer()+offset, count);
	}; 
 
    var Uint32Array_from_comm = function(offset, count)
	{    		 
		return new Uint32Array(memory.buffer, exports.instance._get_comm_pointer()+offset, count);
	};   
    
    var Float32Array_from_comm = function(offset, count)
	{    		 
		return new Float32Array(memory.buffer, exports.instance._get_comm_pointer()+offset, count);
	};   
    
    exports.UTF8String_from = UTF8String_from;      
	exports.Uint8Array_from = Uint8Array_from;
    exports.Uint8ClampedArray_from = Uint8ClampedArray_from;
	exports.Uint16Array_from = Uint16Array_from;    
	exports.Int32Array_from = Int32Array_from;
	exports.Uint32Array_from = Uint32Array_from;
	exports.Float32Array_from = Float32Array_from;
    
	exports.Uint32Array_from_comm = Uint32Array_from_comm;
	exports.Float32Array_from_comm = Float32Array_from_comm;
    
    
	exports.TypedArray_to = TypedArray_to;	            
         
	exports.TypedArray_to_comm = TypedArray_to_comm;
	exports.TypedArrays_to_comm = TypedArrays_to_comm;		     
	exports.UTF8String_to_comm = UTF8String_to_comm;		 

    exports.Uint16Array_from_comm = Uint16Array_from_comm;        
    exports.Uint32Array_from_comm = Uint32Array_from_comm;    
    exports.Float32Array_from_comm = Float32Array_from_comm;    
   
   
	exports.receive_client_input = receive_network_input;	 
	exports.instantiate = instantiate;
	exports.start = cycle;
    
    exports.buffer = memory.buffer;
	
	return exports;
})();

	define([], function () 
	{
		return WASM( {} ); 
	});