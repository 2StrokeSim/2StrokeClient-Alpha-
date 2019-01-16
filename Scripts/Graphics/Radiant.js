// Light and other perceptible particles/fields

/////////////////////////////////////////////////////////////////////////////////////////////////////    Ambient Light    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
AmbientRadiant = function()
{
	var u_ambientLoc = gl.getUniformLocation(program, "u_ambient");
	
	gl.uniform4fv(u_ambientLoc, vec3.normalize([0, 0, 0, 1.0], [0.4, 0.4, 0.8, 1.0]));  // red light		
	 
	 this.update = function(params)
	{
		gl.uniform4fv(u_ambientLoc, vec3.normalize([0, 0, 0, 1.0], params));  // red light		
		
	};		 
};

PointRadiant = function(controller)
{
	var u_lightColorLoc          = gl.getUniformLocation(program, "u_lightColor");
	var u_lightWorldPosLoc       = gl.getUniformLocation(program, "u_lightWorldPos");

	var worldMat = mat4.create();
	
	this.affix = function(newWorldMat, newWorldMatInv)
	{
		worldMat = newWorldMat;
		
		return this;
	};
	
    var pointers;
    
    WASM_access.braid_create();
    
    pointers = WASM_access.Uint32Array_from_comm(0, 2);
    this.braid = pointers[0];
    this.innerMat = pointers[1]; 
    
    
    
	this.render = function()
	{
		gl.uniform3fv(u_lightColorLoc, vec3.normalize([], [0.10, 0.0375, 0.0375]));  // red light

		gl.uniform3fv(u_lightWorldPosLoc, [worldMat[12], worldMat[13], worldMat[14]]/*[0.0, 0.0, -3.0]*/);
        
        WASM_access.radiant_render(this.innerMat);
	};   
};