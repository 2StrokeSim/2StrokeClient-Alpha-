	// Glyph.js: Strokes are CPU side objects that correspond to render geometry and vertex shader executions.  
	
// Strokes handle the render geometry at the mesh level. Mesh level transformation/morphing/scaling. Transformations of higher order are handled by the scene nodes, or "Glyphs". 	
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// SHADERS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Bits and pieces inspired/stolen from:
	// Jean Lescure at https://gist.github.com/jeanlescure/e27c93b73a10b64e85e4
	// and surely many others I've forgotten by now - JClark


// Major inspiration/assistance in making the pipeline independent from THREE.js:
// Alexander Oldemeier
// Playing around with fragment shaders in WebGL, Dezember 2013
// https://blog.mayflower.de/4584-Playing-around-with-pixel-shaders-in-WebGL.html
// Also:
// Web GL Fundamentals - http://webglfundamentals.org

	
Stroke = (function()
{
    stroke_count = 0;
    
	return function(size, differentials, position, model)
	{		
        this.ID = stroke_count;
        stroke_count++;
    
		var worldMat;
		var ancestorMat;
		var frameMat;
		var originMat;

		var accents = [];
		var serifs = [];							   
		var strokes = [];
        
		this.accents = accents;
		
		var model = Model.instantiate_defined(model);
		
		var normals = model.normals;	
		var texcoords = model.texcoords; // TODO: Deprecated? Not in use? Useful for something not being done?

		var indexes = model.indexes;
		
		// TODO: This should be replaced again by geometry once our (now far more complex) transforms find their way back into the vertex shader
		var hackup = model.geometry;
		var geometry = new Float32Array(model.geometry.length);

		var connections = {position: [ 0, 0, 0]};
		
		for (var i = 0; i < model.accents.length; i++)
		{			   
			accents.push(new Accent(this, model.accents[i].filter, mat4.create(), model.accents[i].indexes, geometry, geometry ));
		}
		
		var modelViewMat = new Float32Array([1.0, 0.0, 0.0, 0.0, 
																	0.0, 1.0, 0.0, 0.0, 
																	0.0, 0.0, 1.0, 0.0, 
																	0.0, 0.0, 0.0, 1.0]);
																						 
		var worldInverseTransposeMat = new Float32Array([1.0, 0.0, 0.0, 0.0, 
																					  0.0, 1.0, 0.0, 0.0, 
																					  0.0, 0.0, 1.0, 0.0, 
																					  0.0, 0.0, 0.0, 1.0]);
																				 					
	//  TODO: Just hand over the array and this isn't necessary	
	   this.affix = function(newWorldMat, newAncestorMat, newFrameMat, newOriginMat)
	   {
		   worldMat = newWorldMat;
		   ancestorMat = newAncestorMat;
		   frameMat = newFrameMat;
		   originMat = newOriginMat;		

		   	for (var i = 0; i < accents.length; i++)
			{	
				accents[i].base = newWorldMat;
			}
	   };
		
		var elapsed;
		
		this.differentiate = function(Elapsed, worldViewMatrix)
		{
			scale_vertexes(size, hackup, geometry, 0, 0, hackup.length/3);
			
			for (var i = 0; i < accents.length; i++)
			{
				index = accents[i].indexes[0] * 3;
				
//				vec3.transformMat4(accents[i].origin, [geometry[index], geometry[index+1], geometry[index+2]], worldMat);
				accents[i].kinesis();
			}
		};
		
		this.connect = function(source_index, target)
		{
			this.accents[source_index].insert(target);
		}
        
	   this.render = function()
	   {
            setMisc(worldInverseTransposeMat);

			for (var index = 0; index < strokes.length; index++)
			{
//				serifs[index].render();
                stroke_render(strokes[index]);

			}
									
			for (var i = 0; i < accents.length; i++)
			{
				accents[i].render(worldMat.slice());
			}
		
			setGeometry(indexes, geometry);

			setTexcoords(texcoords);
			
			setNormals(normals);
            
            drawElements(indexes.length);
						
	//		gl.drawArrays(gl.TRIANGLES, 0, 36);		   
	   };
			
        var text_length;
        if (model.serif.text == undefined) { text_length = 0; } else { text_length = model.serif.text.length; } 
        
        WASM_access.UTF8String_to_comm(model.serif.text);
                
        strokes.push(stroke_create(model.serif.width, model.serif.height, model.serif.back_color[0], model.serif.back_color[1], model.serif.back_color[2], model.serif.back_color[3], text_length));    
	};
    
})();


