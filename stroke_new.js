// Stroke.js: Strokes are CPU side objects that correspond to textures and fragment shader executions.  

const texcoordNumComponents = 2;    
    
function loadImage(url, callback) 
{
    var image = new Image();
    image.src = url;
    image.onload = callback;
    return image;
};

function loadImages(urls, callback) 
{
    var images = [];
    var imagesToLoad = urls.length;

    // Called each time an image finished loading.
    var onImageLoad = function() 
    {
        --imagesToLoad;
        // If all the images are loaded call the callback.
        if (imagesToLoad == 0) 
        {
            callback(images);
        }
    };

    for (var ii = 0; ii < imagesToLoad; ++ii) 
    {
        var image = loadImage(urls[ii], onImageLoad);
        images.push(image);
    }
};

var textures = [];

function loadTexture(images)
{
    // create 2 textures
//		var textures = [];
    
    for (var ii = 0; ii < 1; ++ii) 
    {
        var canvas = makeTextCanvas("Hello!", 100, 26);
        var textWidth  = canvas.width;
        var textHeight = canvas.height;			
        
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Set the parameters so we can render any size image.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        // Upload the image into the texture.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas/*images[ii]*/);

        // add the texture to the array of textures.
        textures.push(texture);		
    }
    
//		gl.uniform1i(u_diffuseLoc, 0);  // texture unit 0

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textures[0]);
    
//        return textures;
};
    
var build_bind_and_activate_texture = function(handle_index)
{  
    handle = strokes[handle_index];
    
 //   var texture = build_texture(handle.width, handle.height, WASM_access.Uint32Array_from(handle.color_ptr, 4), "crap"/*WASM_access.UTF8String_from(handle.text_ptr, handle.text_length)*/); 

//    gl.bindTexture(gl.TEXTURE_2D, texture); 

  //  gl.activeTexture(gl.TEXTURE0);         
};

var strokes = [];
    
var serif_handle = function(width, height, color_ptr, text_ptr, text_length)
{
    console.log("handle definition:" + width + ", " + height + ", " + color_ptr + ", " + text_ptr + ", " + text_length);
    var handle =
    {
        width: width, 
        height: height, 
        color_ptr: color_ptr, 
        text_ptr: text_ptr, 
        text_length: text_length
    };
    
    var index = strokes.length;
    
    strokes.push(handle);
    
    return index;
}

var stroke = {};
stroke.serif_handle = serif_handle;
stroke.build_bind_and_activate_texture = build_bind_and_activate_texture;
/*
define([], function () 
{
    return { serif_handle: serif_handle, build_bind_and_activate_texture: build_bind_and_activate_texture }; 
});    */