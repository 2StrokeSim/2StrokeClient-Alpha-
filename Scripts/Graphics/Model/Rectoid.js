geometries[RECTOID_GEOMETRY_BLOB] = new (function()
{  
	this.normals = new Float32Array
	([	  
		  //  Z+ face
		  0, 0, 1, /**/ 0, 0, 1, /**/ 0, 0, 1, /**/ 0, 0, 1, 
		  // Z- face
		  0, 0, -1,
		  0, 0, -1,
		  0, 0, -1,
		  0, 0, -1,
		  // X+ face
		  1, 0, 0,
		  1, 0, 0,
		  1, 0, 0,
		  1, 0, 0,
		  // X- face
		  -1, 0, 0,
		  -1, 0, 0,
		  -1, 0, 0,
		  -1, 0, 0,	  
		  // Y+ face
		  0, 1, 0,
		  0, 1, 0,
		  0, 1, 0,
		  0, 1, 0,	
		  // Y- face
		  0, -1, 0,
		  0, -1, 0,
		  0, -1, 0,
		  0, -1, 0
	]);
			
	this.vertices = new Float32Array([ 	  
	   
   -0.5, -0.5, 0.5,
	0.5, -0.5, 0.5,
   -0.5, 0.5, 0.5,
	0.5, 0.5, 0.5,
	
	0.5, -0.5, -0.5,
	-0.5, -0.5, -0.5,
	0.5, 0.5, -0.5,
	-0.5, 0.5, -0.5,
	
	0.5, -0.5, 0.5,
	0.5, -0.5, -0.5,
	0.5, 0.5, 0.5,
	0.5, 0.5, -0.5,
	
	-0.5, -0.5, -0.5,
	-0.5, -0.5, 0.5,
	-0.5, 0.5, -0.5,
	-0.5, 0.5, 0.5,
	
	-0.5, 0.5, 0.5,
	0.5, 0.5, 0.5,
	-0.5, 0.5, -0.5,
	0.5, 0.5, -0.5,
	
	-0.5, -0.5, -0.5,
	0.5, -0.5, -0.5,
	-0.5, -0.5, 0.5,
	0.5, -0.5, 0.5
	]);

	this.indexes = new Uint16Array([ 0,  1,  2,  2, 1,   3,   4,   5,   6,  6,
                                                    5, 7, 8, 9, 10, 10, 9, 11, 12, 13,
                                                    14, 14, 13, 15, 16, 17, 18, 18, 17, 19,
                                                                        20, 21, 22, 22, 21, 23 ]);
	
	this.texcoords = new Float32Array([
	   // X+ face
	   0, 1, /**/ 1, 1, /**/ 0, 0, /**/ 1, 0,// /**/ 1, 1, /**/ 1, 0,
	   // X- face
	   0, 1, /**/ 1, 1, /**/ 0, 0, /**/ 1, 0, // /**/ 1, 1, /**/ 1, 0,
	   // Y+ face
	   0, 1, /**/ 1, 1, /**/ 0, 0, /**/ 1, 0, // /**/ 1, 1, /**/ 1, 0,
	   // Y- face
	   0, 1, /**/ 1, 1, /**/ 0, 0, /**/ 1, 0, // /**/ 1, 1, /**/ 1, 0,
	   // Z+ face
	   0, 1, /**/ 1, 1, /**/ 0, 0, /**/ 1, 0, // /**/ 1, 1, /**/ 1, 0,
	   // Z- face
	   0, 1, /**/ 1, 1, /**/ 0, 0, /**/ 1, 0 // /**/ 1, 1, /**/ 1, 0
	]);  
    
})();

Model.definitions[Model.RECTOID_DEFINITION] = function()
{
	var complete_vertex_indexes = [  0,  1,    2,   3,  4,   5,   6,   7,   8,  9,
													  10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
													  20, 21, 22, 23 ];

	var front_right_top_vertex_indexes = [2, 3, 23];
	
	var front_right_top_complement_vertex_indexes = [ 0,   1,  4,   5,   6,   7,   8,  9,
																				10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
																				20, 21, 22, 23 ];		
	
    this.geometries = [RECTOID_GEOMETRY_BLOB];
    
	this.normals = geometries[RECTOID_GEOMETRY_BLOB].normals; 

	this.geometry = geometries[RECTOID_GEOMETRY_BLOB].vertices;

	this.indexes = geometries[RECTOID_GEOMETRY_BLOB].indexes;
	
	this.texcoords = geometries[RECTOID_GEOMETRY_BLOB].texcoords;

	this.connection = [{index: 0}];
	
	this.accents = [{filter:[0, 1, 0], base:[], indexes: complete_vertex_indexes}]
    
    this.serif = 
    {
        width: 100,
        height: 26, 
        back_color: [13, 13, 7, 255], 
        text: undefined
    };	
};