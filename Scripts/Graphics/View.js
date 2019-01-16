// screen portal/camera (camera should probably be some sub-object, if not a co-dependent object)

var view_create;
var view_render;
var view_subordinate;

var View = function(Xmin, Ymin, Xmax, Ymax, mode)
{
    this.ID = View.count;
    View.instances[View.count] = this;
    View.count++;
    
    var cameraMatrix;
    
	var u_perspectiveLoc  = gl.getUniformLocation(program, "u_perspective");
	
	var u_viewInverseLoc = gl.getUniformLocation(program, "u_viewInverse");

	var width = Xmax - Xmin;
	var height = Ymax - Ymin;

	// Make a view matrix from the camera matrix.
	var viewMatrix;

   var projections = [];
   
   if (mode == View.PERSPECTIVE)
   {
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        var zNear = 0.1;
        var zFar = 1000;
        var field_of_view = 45;
        var perspective_matrix = mat4.create();
        mat4.perspective(perspective_matrix, 45, aspect , zNear, zFar);

        // Compute a matrix for the camera
         var cameraPosition = [ 0, 0, 0 ];
         var lookAtPoint = [ 0, 0, -10];
         var up = [0, 1, 0];
   }
   else if (mode == View.ORTHOGRAPHIC)
   {       
        var perspective_matrix = mat4.create();       

        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        var zNear = 0.1;
        var zFar = 1000;
        var field_of_view = 45;
        mat4.perspective(perspective_matrix, 45, aspect , zNear, zFar);

        perspective_matrix[15] = 1.0;
        
        // Compute a matrix for the camera
        var cameraPosition = [ 0, 0, 200 ];
        var lookAtPoint = [ 0, 0, -10];
        var up = [0, 1, 0];       
    }
   
	cameraMatrix = mat4.create();
	var worldViewMatrix = mat4.create();
			
	this.insert = function(Node)
	{
/*        if (Node.affix == undefined)
        {
            WASM_access.view_insert(this.WASM_object, Node);
        }
        else
        {*/
            projections.push(Node);
//        }
 	};
    
    
	this.render = function()
	{
		// Compute the camera's matrix using look at.
        // TODO: maybe make mat4.lookAtFromMat4 take a single matrix? framemat + orientation vectors? I dunno.
        // TODO: Totally. Make this not a uniform and instead a "braid" with the transformation matrix inserted 
        // into the root transform of a scene
//        WASM_access.TypedArray_to_comm(new Float32Array(frameMat));   
                
        
        //var cameraMatrix = WASM_access.Float32Array_from_comm(0, 16);    
                
		gl.uniformMatrix4fv(u_perspectiveLoc, false, cameraMat);	

		gl.uniformMatrix4fv(u_viewInverseLoc, false, mat4.transpose([], cameraMat));
	
    
    
    
		for (var i = 0; i < projections.length; i++)
		{
            if (projections[i].affix != undefined)
            {
                projections[i].render();
            }
            else
            {
                WASM_access.glyph_render2(projections[i]);
            }
		}
        
        view_render(WASM_object);

	};
	
    WASM_access.TypedArrays_to_comm(0, new Float32Array(perspective_matrix), new Float32Array(lookAtPoint), new Float32Array(up));   
        
    var WASM_object = view_create(this.ID);
    
    this.WASM_object = WASM_object;
    
    var frameMat_pointer = WASM_access.Uint32Array_from_comm(0, 2)[0]; 
    var cameraMat_pointer = WASM_access.Uint32Array_from_comm(0, 2)[1]; 

    
    frameMat = WASM_access.Float32Array_from(frameMat_pointer, 16);
    cameraMat = WASM_access.Float32Array_from(cameraMat_pointer, 16);    
    
    
	return this;
};

View.instances = [];
View.count = 0;

View.ORTHOGRAPHIC = 0;
View.PERSPECTIVE = 1;