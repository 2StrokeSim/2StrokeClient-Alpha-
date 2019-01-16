var UNITY = 1000.0;

var set_WASM_comm_buffer_FtoIScaled1k= function()
{
    var list = [];
    
    for (var i = 0; i < arguments.length; i++)
    {
        list[i] = new Int32Array(arguments[i].length);
        array_to_array_scaled(arguments[i], list[i], arguments[i].length, UNITY); 
    }
    
    set_WASM_comm_buffer(list);
}

var FtoIScaled1k = function(thing)
{
    var result = new Int32Array(thing.length);
    array_to_array_scaled(thing, result, thing.length, UNITY);

    return result;
}

var get_WASM_comm_buffer_ItoFScaled1over1k = function(out, length)
{
    var bytes_per_element = 4;
    var view = get_WASM_comm_buffer(0, length *  bytes_per_element);
             
    int_array = new Int32Array(view.buffer, view.byteOffset, length); 
               
    array_to_array_scaled(int_array, out, length, 1.0/UNITY);
}

var set_WASM_comm_buffer = function()
{
    var nDataBytes = 0;
    var offset = [];
    for ( var i = 0; i < arguments.length; i++ )
    {
        // Get data byte size, allocate memory on Emscripten heap, and get pointer
        offset[i] = nDataBytes;
        nDataBytes += arguments[i].length * arguments[i].BYTES_PER_ELEMENT;
    }

    var dataPtr = WASM_instance._get_comm_pointer();//0;//WASM_instance._malloc(nDataBytes);
    
    // Copy data to Emscripten heap (directly accessed from Module.HEAPU8)     
    var dataHeap = new Uint8Array(WASM_memory.buffer, dataPtr, nDataBytes);

    for ( var i = 0; i < arguments.length; i++ )
    {
        dataHeap.set(new Uint8Array(arguments[i].buffer), offset[i]);
    }
    
    offset.push(nDataBytes);
    
    return offset;
}

var get_WASM_comm_buffer = function(offset, nDataBytes)
{
    
    // Get data byte size, allocate memory on Emscripten heap, and get pointer
//    var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
    var dataPtr = WASM_instance._get_comm_pointer();//0;//WASM_instance._malloc(nDataBytes);

    // Copy data to Emscripten heap (directly accessed from Module.HEAPU8)     
    return new Uint8Array(WASM_memory.buffer, dataPtr, nDataBytes);
    
//    return new Int32Array(view.buffer, view.byteOffset, data.length); 
}


var set_WASM_buffer = function(data, pointer)
{
    // Get data byte size, allocate memory on Emscripten heap, and get pointer
    var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
    var dataPtr = pointer;//0;//WASM_instance._malloc(nDataBytes);

    // Copy data to Emscripten heap (directly accessed from Module.HEAPU8)     
    var dataHeap = new Uint8Array(WASM_memory.buffer, dataPtr, nDataBytes);
    dataHeap.set(new Uint8Array(data.buffer));
    
    return dataHeap;
}

var get_WASM_buffer = function(data, pointer)
{
    // Get data byte size, allocate memory on Emscripten heap, and get pointer
    var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
    var dataPtr = pointer;//0;//WASM_instance._malloc(nDataBytes);

    // Copy data to Emscripten heap (directly accessed from Module.HEAPU8)     
    return new Uint8Array(WASM_memory.buffer, dataPtr, nDataBytes);
}

var Int32Array_from_WASM_heap_view = function(view, length)
{
    return new Int32Array(view.buffer, view.byteOffset, length); 
}

var Float32Array_from_WASM_heap_view = function(view, length)
{
    return new Float32Array(view.buffer, view.byteOffset, length); 
}

var array_to_array_scaled = function(origin, destination, count, scale) 
{
    for (var i = 0; i < count; i++)
    {
        destination[i] = origin[i] * scale;
    }
    
    return destination;
};
