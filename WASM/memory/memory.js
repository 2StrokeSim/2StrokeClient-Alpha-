const memory = function(exports)
{	
	var memory = new WebAssembly.Memory({ initial: 256 });
		
	var Uint8Array_from = function(dataPtr, nDataBytes)
	{
		// Copy data to Emscripten heap (directly accessed from Module.HEAPU8)     
		return new Uint8Array(memory.buffer, dataPtr, nDataBytes);
	};	
		
	var Int32Array_from = function(dataPtr, count)
	{    		 
		return new Int32Array(memory.buffer, dataPtr, count);
	};
    
	var Uint32Array_from = function(dataPtr, count)
	{    		 
		return new Uint32Array(memory.buffer, dataPtr, count);
	};    

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

	exports.Uint8Array_from = Uint8Array_from;
	exports.Int32Array_from = Int32Array_from;
	exports.Uint32Array_from = Uint32Array_from;    
	exports.TypedArray_to = TypedArray_to;	
	
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
		memory(exports);
}
// create define() for Requirejs
else 
{
	define([], function () 
	{
		return memory({}); 
	});
}