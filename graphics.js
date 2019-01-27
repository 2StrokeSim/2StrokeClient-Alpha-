
const TRANSFORM_ATLAS_TEXTURE_INDEX = 0;
const MODEL_ATLAS_TEXTURE_INDEX = 1;
const MATERIAL_TEXTURE_INDEX = 2;
const TEXTURE_ATLAS_SAMPLER_INDEX = 3;
const TEXTURE_MAP_SAMPLER_INDEX = 4;

//var gl;
//var program;

// the Graphics enclosure.

// How I started starting from scratch on the pipeline:
// Alexander Oldemeier
// Playing around with fragment shaders in WebGL, Dezember 2013
// https://blog.mayflower.de/4584-Playing-around-with-pixel-shaders-in-WebGL.html
// Also:
// Web GL Fundamentals - http://webglfundamentals.org

var WASM_transform_indexed_vertices;

var register_transform_atlas;

// WASM globals
var comm_buffer;

var WASM_access;

// Stroke globals
var stroke_render;

var stroke_create;

var build_bind_and_activate_texture;


// Glyph globals
var glyph_render;

var glyph_create;

var glyph_subordinate;

var build_vertex_buffers;

// Serif globals
var serif_render;

var serif_create;

var serif_handle;

var transform_vertex_buffer;

var glyph_count = 0;

var winding_create;
var winding_differentiate;
var orbit_integrate;
var winding_subordinate;
var subordinate;

var setMisc;
var setTexcoords;
var setNormals;
var setGeometry;
var setIndexes;

var setReflective;

var drawElements;

var create_interpolated_UINT8RGBA_sampler2D;

var build_model_atlas;

var create_discrete_FLOATRGBA_sampler2D;
var set_float_texture;
var update_FLOATRGBA_sampler2D;

var canvas = document.createElement('canvas');
	
var gl = canvas.getContext("webgl2", {alpha:true, antialias: true});

var transform_data = new Float32Array(4096);

var texture_atlas;

var texture_map_sampler;
var texture_atlas_sampler;

var sampler = [];
var sampler_data = [];

var INDEX_COUNT = 0;
var TRANSFORM_INDEXES = 1;
var MODEL_INDEXES = 2;

var index_data = [];

var WASM_parameters = [];
var model_data = [];

var vertex_data = {};

	var auxCanvas = document.createElement("canvas");	
	var textCtx = auxCanvas.getContext("2d");
    
	var auxCanvas2 = document.createElement("canvas");	
	var textCtx2 = auxCanvas2.getContext("2d");
    
//    var auxgl = auxCanvas.getContext('webgl');

//    console.log(textCtx);    

var graphics = function(shader, exports)
{
    console.log("MAX_VERTEX_TEXTURE_IMAGE_UNITS: " + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
    console.log("MAX_VERTEX_UNIFORM_VECTORS: " + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
     
    canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
		
	canvas.style.position = 'absolute';
	canvas.style.left = '0px';
	canvas.style.top = '0px';
	
	document.body.appendChild(canvas);

    gl.pixelStorei ( gl.UNPACK_ALIGNMENT, 1 );
    gl.pixelStorei ( gl.PACK_ALIGNMENT , 1 ); 
    
	var pointSizeRange = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE);
	
	var context = canvas.getContext('2d');

    var model_data = [];
    var transforms = [];
    var index_sets = [];
    var transform_registrations = [];
    
    var transform_index = 0;
    
    
    const vertex_stride = 3;
    const normal_stride = 3;

    const texcoord_stride = 2;
    

    var phase = 0.0;
    
    var transform_count = 0;
    
    // Link the two shaders into a program
    program = shader.buildGeometryRender(gl);
    gl.useProgram(program);
    
	var u_modelViewLoc              = gl.getUniformLocation(program, "u_modelView");	
	var u_worldLoc                  = gl.getUniformLocation(program, "u_world");
	var u_viewInverseLoc            = gl.getUniformLocation(program, "u_viewInverse");
	var u_worldInverseTransposeLoc  = gl.getUniformLocation(program, "u_worldInverseTranspose");
	var u_ambientLoc                = gl.getUniformLocation(program, "u_ambient");
	var u_diffuseLoc                = gl.getUniformLocation(program, "u_diffuse");
	var u_specularLoc               = gl.getUniformLocation(program, "u_specular");
    
	var u_shininessLoc              = gl.getUniformLocation(program, "u_shininess");
    var u_luminescenceLoc           = gl.getUniformLocation(program, "u_luminescence");
    
    var u_transformAtlasLoc         = gl.getUniformLocation(program, "u_transformAtlas[0]");			

	var a_transformIndexLoc         = gl.getAttribLocation(program, "a_transformIndex");						
	var a_modelIndexLoc             = gl.getAttribLocation(program, "a_modelIndex");	
	var a_textureIndexLoc           = gl.getAttribLocation(program, "a_textureIndex");	
	var a_paletteIndexLoc           = gl.getAttribLocation(program, "a_paletteIndex");	

    
    var u_textureAtlasLoc           = gl.getUniformLocation(program, "u_textureAtlas[0]");
    var u_textureInstanceLoc        = gl.getUniformLocation(program, "u_textureAtlas[1]");
    
    
    
    var vertexIndexBuffer           = gl.createBuffer();      
  
    var positionBuffer              = gl.createBuffer();
	// Create a buffer to put normals in
	var normalBuffer = gl.createBuffer();		
	var texcoordBuffer = gl.createBuffer();
    var transformIndexBuffer = gl.createBuffer();
    var transformBuffer = gl.createBuffer();    
    var modelIndexBuffer = gl.createBuffer();      
    var textureIndexBuffer = gl.createBuffer();      
    var paletteIndexBuffer = gl.createBuffer();      

    
    // set texture unit indexes for model and transformation atlases
    gl.uniform1iv(u_transformAtlasLoc,  [
                                            TRANSFORM_ATLAS_TEXTURE_INDEX, 
                                            MODEL_ATLAS_TEXTURE_INDEX
                                        ]);
    
    // set texture unit indexes for texture and material atlases
    gl.uniform1iv(u_textureAtlasLoc,    [
                                            TEXTURE_ATLAS_SAMPLER_INDEX,
                                            TEXTURE_MAP_SAMPLER_INDEX
                                        ]);           

  
    for (i = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) - 1; i >= 0; i--) 
    {
        console.log("Shader Uniform " + i + " : " + gl.getActiveUniform(program, i).name);
    }  
  
    for (i = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES) - 1; i >= 0; i--) 
    {
        console.log("Shader Attribute " + i + " : " + gl.getActiveAttrib(program, i).name);
    }
             
    // Make these vertex and index objects
    register_transform_atlas = function(model_pointer, model_size, atlas_pointer, atlas_size, index_data_pointer, index_data_size, transform_pointer, model_pointer, texture_pointer, palette_pointer, vertex_count, count_pointer, count_size)
    {
        model_data = WASM_access.Uint16Array_from(model_pointer, model_size);           
        index_data = WASM_access.Uint16Array_from(index_data_pointer, index_data_size);   
        transform_data = WASM_access.Float32Array_from(atlas_pointer, atlas_size);      
            
            
        vertex_data.transforms = WASM_access.Uint32Array_from(transform_pointer, vertex_count);
        vertex_data.models = WASM_access.Uint32Array_from(model_pointer, vertex_count);
        vertex_data.textures = WASM_access.Uint32Array_from(texture_pointer, vertex_count);
        vertex_data.palettes = WASM_access.Uint32Array_from(palette_pointer, vertex_count);
        
        WASM_parameters = WASM_access.Uint32Array_from(count_pointer, count_size);
        
        WASM_parameters[INDEX_COUNT] = 0;
        WASM_parameters[MODEL_INDEXES] = 0;
        WASM_parameters[TRANSFORM_INDEXES] = 0;

    }

        
    var InitUINT32VertexAttributeArray =  function(attrib_loc, buffer, tuple_order, normalize, stride, offset )
    {
        //type = gl.UNSIGNED_INT;   // the data is 32bit integer values
        //normalize = false; // normalize the data (convert from 0-255 to 0-1)
        //stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        //offset = 0;        // start at the beginning of the buffer
        
        gl.enableVertexAttribArray(attrib_loc); 
        
        gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
        gl.vertexAttribIPointer( attrib_loc, tuple_order, gl.UNSIGNED_INT, normalize, stride, offset );	            
    };
    
    InitUINT32VertexAttributeArray(a_transformIndexLoc, transformIndexBuffer, 2, false, 0, 0);
    InitUINT32VertexAttributeArray(a_modelIndexLoc, modelIndexBuffer, 2, false, 0, 0);
    InitUINT32VertexAttributeArray(a_textureIndexLoc, textureIndexBuffer, 2, false, 0, 0);
    InitUINT32VertexAttributeArray(a_paletteIndexLoc, paletteIndexBuffer, 2, false, 0, 0);

    setMisc = function(worldInverseTransposeMat)
    {
        gl.uniformMatrix4fv(u_modelViewLoc, false, mat4.create());		
        
        gl.uniformMatrix4fv(u_worldInverseTransposeLoc, false, worldInverseTransposeMat);	 
    };
    
    setReflective = function(texcoordNumComponents)
    {
        gl.uniform1f(u_shininessLoc, 0.5);		
        gl.uniform1f(u_luminescenceLoc, 0.0);		        
    };
    
    
    
    setIndexes = function(indexes)
    {	       
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);

        // Now send the element array to GL

        gl.enableVertexAttribArray(0);        
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexes, gl.STATIC_DRAW);        
    }; 								    
    
    
    function buildTextureAtlas(width, height, color, data, offsets) 
    {
        console.log("BUILD TEXTURE ATLAS!");

        console.log(width);
        console.log(height);
        console.log(color);
        console.log(data);

        auxCanvas.width  = width;
        auxCanvas.height = height;
    
        color = [0, 0, 0, 0];
    
        textCtx.clearRect(0, 0, auxCanvas.width, auxCanvas.height);

//        data = 0;
        
        data = WASM_access.Uint8Array_from(data, 4194304);
        offsets = WASM_access.Uint8Array_from(offsets, 256);
        
        var metric;
        var Xoffset = 0;
        
        textCtx.fillStyle = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + 1.0 + ")";

        textCtx.fillRect(0, 0, auxCanvas.width, auxCanvas.height);

        var glyph_array = [ '0', '1', '2', '3', '4', '5', '6', '7', 
                            '8', '9', 'a', 'b', 'c', 'd', 'e', 'f',
                            'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
                            'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
                            'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 
                            'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 
                            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
                            'U', 'V', 'W', 'X', 'Y', 'Z', '.', '!',
                          ];
                           
 //       glyph_offsets = new Uint8Array(glyph_array.length * 4);
        
       
        textCtx.fillStyle = "rgba(" + 255 + "," + 255 + "," + 255 + "," + 1.0 + ")";
        textCtx.font = "20px monospace";
        textCtx.textAlign = "left";
        textCtx.textBaseline = "top";
            
        var text_offsetX = 0;    
        var text_offsetY = 0;    

        for(var i = 0, k = 0; i < glyph_array.length; k++)
        {
            var line = "";
            
            text_offsetX = 0;
            
            for (var j = 0; j < 11; j++, i++)
            {
                metric = textCtx.measureText(glyph_array[i]);
                offsets[i*4] = Math.round(text_offsetX);
                        console.log("Text index: " + (i * 4) + " offset x: " + offsets[i*4] + "offset y: " + text_offsetY );

                
                offsets[(i*4) + 1] = metric.width;
    
                console.log(glyph_array[i]);
                console.log(metric.width);
                
                text_offsetX += metric.width;              
                
                offsets[(i*4) + 2] = text_offsetY;
                offsets[(i*4) + 3] = 21;
                
                line += glyph_array[i];
            }
            
            text_offsetY += 21;
            textCtx.fillText(line, 0, k * 21);            
        }            
            
        header_offsets = new Uint8Array(8);

        var header1 = "פְּנֵ֣י עַל־ וְחֹ֖שֶׁךְ – וָבֹ֔הוּ ､";
        var header2 = "תֹ֙הוּ֙ הָיְתָ֥ה וְהָאָ֗רֶץ";


        textCtx.fillStyle = "rgba(" + 255 + "," + 255 + "," + 255 + "," + 1.0 + ")";
        textCtx.font = "28px monospace";
        textCtx.textAlign = "left";
        textCtx.textBaseline = "top";
                        
        textCtx.fillText(header1, 256, 0);
        metric = textCtx.measureText(header1);
            
        header_offsets[0] = 0;
        header_offsets[1] = 0;
        for (var i = 0; i < header1.length; i++){ header_offsets[1] += textCtx.measureText(header1).width }                                    
        header_offsets[2] = 0;
        header_offsets[3] = 40;

        textCtx.fillText(header2, 256, 40);
            
        header_offsets[4] = header_offsets[1];
        header_offsets[5] = 0;
        for (var i = 0; i < header2.length; i++){ header_offsets[5] += textCtx.measureText(header2).width }                    
        header_offsets[6] = header_offsets[2];
        header_offsets[7] = 80;
                
        // TODO: gl.readPixels might be much faster...
        var image = textCtx.getImageData(0, 0, auxCanvas.width, auxCanvas.height);
        
        for (var i = 0; i < image.data.length; i++)
        {
            data[i] = image.data[i];
//            texture_atlas2[i] = image.data[i];
        }

        for (var i = 256 * 22 * 4; i < 256 * 23 * 4; i+=4)
        {
            data[i] = 255;
            data[i+1] = 255;
            data[i+2] = 255;
            data[i+3] = 255;
        }
        
        for (var i = 256 * 26 * 4; i < 256 * 27 * 4; i+=4)
        {
            data[i] = 255;
            data[i+1] = 255;
            data[i+2] = 255;
            data[i+3] = 255;
        }

        for (var i = (256 * 2 * 4) + (5 * 4); i < (256 * 67 * 4) + (5 * 4); i+= 256 * 4 * 4)
        {
            data[i] = 255;
            data[i+1] = 255;
            data[i+2] = 255;
            data[i+3] = 255;
            
            data[i+4] = 255;
            data[i+5] = 255;
            data[i+6] = 255;
            data[i+7] = 255;
        }       
 /*      
        for (var i = 0; i < data.length; i+=4)
        {
            data[i+3] = (data[i] + data[i+1] + data[i+2])/3; // TODO: Should probably be a normalized root of squares. Meh.
//            texture_atlas2[i] = image.data[i];
        }       */
       
        return textCtx;
    }	 
    
    var TEXTURE_WIDTH = 256;
    var TEXTURE_HEIGHT = 256;
     
    // discrete: gl.NEAREST at both gl.TEXTURE_MIN_FILTER and gl.TEXTURE_MAX_FILTER    
    // 8-bit data texture, basically
    var create_discrete_UINT8RGBA_sampler = function(width, height, source, texture_index, sampler_reference_index)
    {            
        var texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0 + texture_index);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Set the parameters so we can render any size image.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        
        sampler_data[sampler_reference_index] = WASM_access.Uint8Array_from(source, 4194304);
        
        // Upload the image into the texture.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, sampler_data[sampler_reference_index], 0);

//       gl.uniform1i(u_textureAtlasLoc, texture_index);        
                
        sampler[sampler_reference_index] = texture;
    }    
    
    // interpolated: gl.LINEAR at both gl.TEXTURE_MIN_FILTER and gl.TEXTURE_MAX_FILTER
    create_interpolated_UINT8RGBA_sampler2D = function(width, height, back_color, source, texture_index)
    {            
        var texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0 + texture_index);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Set the parameters so we can render any size image.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        
        // Upload the image into the texture.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);

   //     gl.uniform1i(u_textureAtlasLoc, texture_index);        
                
        return texture;
    }
    
    var poopo = 0;
    
    update_UINT8RGBA_sampler2D = function(sampler_reference_index, texture_unit_index, Xoffset, Yoffset, width, height)
    {
        gl.activeTexture(gl.TEXTURE0 + texture_unit_index);
        gl.bindTexture(gl.TEXTURE_2D, sampler[sampler_reference_index]);     

        
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, sampler_data[sampler_reference_index], 0);
        poopo++;        
    };
    
    create_discrete_FLOATRGBA_sampler2D = function(data, texture_unit_index, width, height)
    {
        var texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0 + texture_unit_index);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);      

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, width, height, 0, gl.RGBA, gl.FLOAT, new Float32Array(data));
        
        return texture; 
    };    
        
    update_FLOATRGBA_sampler2D = function(data, texture, texture_unit_index, Xoffset, Yoffset, width, height)
    {
        gl.activeTexture(gl.TEXTURE0 + texture_unit_index);
        gl.bindTexture(gl.TEXTURE_2D, texture);     
        
        gl.texSubImage2D(gl.TEXTURE_2D, 0, Xoffset, Yoffset, width, height, gl.RGBA, gl.FLOAT, new Float32Array(data)); 
    };

    var render = function(Elapsed)
	{	
		
        var worldInverseTransposeMat = new Float32Array([  1.0, 0.0, 0.0, 0.0, 
                                                                           0.0, 1.0, 0.0, 0.0, 
                                                                           0.0, 0.0, 1.0, 0.0, 
                                                                           0.0, 0.0, 0.0, 1.0 ]);
            setMisc(worldInverseTransposeMat);  

//		interpolations = [];
		
		// on update
//		renderer.clear();

		gl.clearColor(0.1, 0.1, 0.1, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//		gl.clearDepth(0.0);

    // Turn on culling. By default backfacing triangles
    // will be culled.
    gl.enable(gl.CULL_FACE);

    // Enable the depth buffer
    gl.enable(gl.DEPTH_TEST);
	
	//	gl.depthFunc(gl.LEQUAL);
				  
        WASM_access.execute_frame( 0, Elapsed );

          
		for (var i = 0; i < views.length; i++)
		{
			views[i].render();
		}   
        
        // Create the transformation atlas.        
        create_discrete_FLOATRGBA_sampler2D(transform_data, TRANSFORM_ATLAS_TEXTURE_INDEX, 512, 1);
                
        
        // Update buffers.
        gl.bindBuffer( gl.ARRAY_BUFFER, transformIndexBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, vertex_data.transforms, gl.STATIC_DRAW );	
    
        gl.bindBuffer( gl.ARRAY_BUFFER, modelIndexBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, vertex_data.models, gl.STATIC_DRAW );
              
        gl.bindBuffer( gl.ARRAY_BUFFER, textureIndexBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, vertex_data.textures, gl.STATIC_DRAW );

        gl.bindBuffer( gl.ARRAY_BUFFER, paletteIndexBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, vertex_data.palettes, gl.STATIC_DRAW );

        
        setIndexes(index_data);       
/*        
        console.log("WASM_parameters[INDEX_COUNT]: " + WASM_parameters[INDEX_COUNT]);       
        console.log("WASM_parameters[TRANSFORM_INDEXES]: " + WASM_parameters[TRANSFORM_INDEXES]);       
        console.log("WASM_parameters[MODEL_INDEXES]: " + WASM_parameters[MODEL_INDEXES]); */      
 //       console.log("Lengthof model data: " + WASM_parameters[INDEX_COUNT]);       
 
        drawElements(/*index_data.length*/WASM_parameters[INDEX_COUNT]);  
        
        WASM_parameters[INDEX_COUNT] = 0;
        
//        WASM_parameters[INDEX_COUNT] = 0;
//        WASM_parameters[TRANSFORM_INDEXES] = 0;
//        WASM_parameters[MODEL_INDEXES] = 0;
	};
    
    
    exports.insert = function(View)
	{
		views.push(View);
	};
	
	var views = [];
    // TODO: Physics/kinematic/animation object, needs to link in/initialize elsewhere
    var linkages = [];

	// TODO: Should be a camera/view function
	screen_position = function(world_coordinates)
	{
	//	return new THREE.Vector3(world_coordinates.x + renderer_width, world_coordinates.y + renderer_height, world_coordinates.z)
	};
	
		
	var PIXEL_RATIO = (function () 
	{
		var ctx = document.createElement("canvas").getContext("2d"),
			dpr = window.devicePixelRatio || 1,
			bsr = ctx.webkitBackingStorePixelRatio ||
				  ctx.mozBackingStorePixelRatio ||
				  ctx.msBackingStorePixelRatio ||
				  ctx.oBackingStorePixelRatio ||
				  ctx.backingStorePixelRatio || 1;

		return dpr / bsr;
	})();


	var converttoHiPPICanvas = function(w, h, can, ratio) {
		if (!ratio) { ratio = PIXEL_RATIO; }
		can.width = w * ratio;
		can.height = h * ratio;
		can.style.width = w + "px";
		can.style.height = h + "px";
		can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
		return can;
	};

	var createHiPPICanvas = function(w, h, ratio) {
		if (!ratio) { ratio = PIXEL_RATIO; }
		var can = document.createElement("canvas");
		can.width = w * ratio;
		can.height = h * ratio;
		can.style.width = w + "px";
		can.style.height = h + "px";
		can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
		return can;
	};	

    exports.render = render;
    
    exports.create_discrete_UINT8RGBA_sampler = create_discrete_UINT8RGBA_sampler;
    exports.update_UINT8RGBA_sampler2D = update_UINT8RGBA_sampler2D;

    
    exports.buildTextureAtlas = buildTextureAtlas;
    
    exports.interfacing = function( exports, imports )
    {
        exports['glDrawElements'] = gl.drawElements.bind(gl);                                        

        imports.push('type_impress');                
        imports.push('geometry_create');        
        imports.push('build_models');
        imports.push('type_create');        
        imports.push('serif_render');
        imports.push('serif_create');
        imports.push('glyph_render');
        imports.push('glyph_create');
        imports.push('glyph_subordinate');
        imports.push('glyph_render2');        
        imports.push('WASM_transform_indexed_vertices');
        imports.push('stroke_render');
        imports.push('stroke_create');
        imports.push('view_render');
        imports.push('view_create');
        imports.push('view_subordinate');        
        imports.push('initialize_gl');                                        
        imports.push('drawElements');
    };
    
    
    exports.initialize = function( WASM )
    {     
        WASM.initialize_gl(gl.TRIANGLES, gl.UNSIGNED_SHORT);

        Model.register_models(u_transformAtlasLoc);

        Timer.set_renderer( render );
    };
    
    return exports;
};

define([], function () 
{
    build_bind_and_activate_texture = stroke.build_bind_and_activate_texture;   
    serif_handle = serif_handle;
    
    return graphics( shader, stroke, {} ); 
});
//Create canvas with the device resolution.
//var myCanvas = createHiDPICanvas(500, 250);

//Create canvas with a custom resolution.
//var myCustomCanvas = createHiDPICanvas(500, 200, 4);

/*

	var pointSizeRange = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE);
	
	var context = canvas.getContext('2d');*/
	
//	gl.Enable(GL_PROGRAM_POINT_SIZE_EXT);

	// TODO: Should be a camera/view function
/*	var screen_position = function(world_coordinates)
	{
		return new THREE.Vector3(world_coordinates.x + renderer_width, world_coordinates.y + renderer_height, world_coordinates.z)
	};*/
       
/*
	
	var pointSizeRange = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE);

		
	var PIXEL_RATIO = (function () 
	{
		var ctx = document.createElement("canvas").getContext("2d"),
			dpr = window.devicePixelRatio || 1,
			bsr = ctx.webkitBackingStorePixelRatio ||
				  ctx.mozBackingStorePixelRatio ||
				  ctx.msBackingStorePixelRatio ||
				  ctx.oBackingStorePixelRatio ||
				  ctx.backingStorePixelRatio || 1;

		return dpr / bsr;
	})();


	var converttoHiPPICanvas = function(w, h, can, ratio) {
		if (!ratio) { ratio = PIXEL_RATIO; }
		can.width = w * ratio;
		can.height = h * ratio;
		can.style.width = w + "px";
		can.style.height = h + "px";
		can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
		return can;
	};

	var createHiPPICanvas = function(w, h, ratio) {
		if (!ratio) { ratio = PIXEL_RATIO; }
		var can = document.createElement("canvas");
		can.width = w * ratio;
		can.height = h * ratio;
		can.style.width = w + "px";
		can.style.height = h + "px";
		can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
		return can;
	};	*/
		
			
		/*	    window.addEventListener('resize', function() {
		  var WIDTH = window.innerWidth,
			  HEIGHT = window.innerHeight;
		  renderer.setSize(WIDTH, HEIGHT);
		  camera.aspect = WIDTH / HEIGHT;
		  camera.updateProjectionMatrix();
		});*/