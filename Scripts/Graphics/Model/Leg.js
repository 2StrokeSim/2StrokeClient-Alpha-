    var show_differences = function(sources1, sources2, counts, source_names)
    {       
        var i;
        var j;
        for (j = 0; j < counts.length; j++)
        {
            console.log("differences in " + source_names[j] + ": ");
            for (i = 0; i < counts[j]; i++)
            {
                if (sources1[j][i] != sources2[j][i])
                {
                    console.log(" Index " + i + ", source 1: " + sources1[j][i] + ", source 2: " + sources2[j][i] + ", difference: " + (sources1[j][i] - sources2[j][i]));
                }
            }            
        }
    }

var normal_countW; 
var texcoord_countW; 
var vertex_countW;
var index_countW;
    
var normalsW;
var texcoordsW;
var vertexesW;
var indexesW;    
   
var data_counts;   
   
   
Model.definitions[Model.LOWER_LEG_DEFINITION] = function()
{	
    var normals = [];
    var face = [];
    var texcoords = []; 
    var indexes = [];
    
    this.geometries = [RECTOID_GEOMETRY_BLOB, LOWER_LEG_GEOMETRY_BLOB, RECTOID_GEOMETRY_BLOB];
    
	this.normals = new Float32Array(geometries[LOWER_LEG_GEOMETRY_BLOB].normals);                                                  
                                                  
	this.geometry = new Float32Array(geometries[LOWER_LEG_GEOMETRY_BLOB].vertices);
  
  
	this.texcoords = new Float32Array(geometries[LOWER_LEG_GEOMETRY_BLOB].texcoords);
    
	this.indexes = new Uint16Array(geometries[LOWER_LEG_GEOMETRY_BLOB].indexes);		

//    show_differences([this.normals, this.texcoords, new Float32Array(face), this.indexes], [normalsW, texcoordsW, vertexesW, indexesW], data_counts, ["normals", "texcoords", "vertexes", "indexes"]);

    
    var upper_leg_vertex_indexes = [ 0,  1,    2,   3,  4,   5,   6,   7,   8,  9, 10, 11, 12,
													  13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23 ];            

	var lower_leg_vertex_indexes = [ 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 37, 38, 40, 41 ]; 
													  
    var knee_flex_point_indexes = [36, 39 ];                                                                                                                           
                                                      
    var foot_vertex_indexes = [ 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 
                                62, 63, 64, 65 ];
                                                          
	this.UPPER = 0;
	this.LOWER = 1;
	this.KNEE_FLEX = 2;
	this.FOOT = 3;
			
	this.accents = [];

	this.accents[this.UPPER] = {filter:[0, 1, 0],  indexes: upper_leg_vertex_indexes};	
	this.accents[this.LOWER] = {filter:[0, 1, 0],  indexes: lower_leg_vertex_indexes};
	this.accents[this.KNEE_FLEX] = {filter:[0, 1, 0],  indexes: knee_flex_point_indexes};	
	this.accents[this.FOOT] = {filter:[0, 1, 0],  indexes: foot_vertex_indexes};	

    this.serif = 
    {
        width: 100,
        height: 26, 
        back_color: [13, 13, 7, 255], 
        text: undefined
    };	
	
    this.orbit =   [ 
                        [ [0, -35, 0], [1, 0, 0, 0], [0, 10, 0] ],
                        [ [0, -50, 0], [1, 0, 0, 0], [0, 25, 0] ]
                   ];

	this.connection = [
                        [ [0, 0, 0], [1, 0, 0, 0], [0, 25, 0] ]
                      ];
                      
    this.subplaten_count = 0;
    this.subplatens = [];
    
    this.mapping_length = 4;   
    this.mapping = [ { schematic: 0, orbit: 0, stroke: 3 }, { schematic: 0, orbit: 1, stroke: 1 }, { schematic: 0, orbit: 2, stroke: 0 }, { schematic: 0, orbit: 2, stroke: 2 } ];            

    this.patterns = [Model.LOWER_LEG_DEFINITION];    
};


Model.definitions[Model.UPPER_LEG_DEFINITION] = function()
{																										                                     
    this.geometries = [RECTOID_GEOMETRY_BLOB];
                                     
    this.normals = geometries[RECTOID_GEOMETRY_BLOB].normals; 

	this.geometry = geometries[RECTOID_GEOMETRY_BLOB].vertices;

	this.indexes = geometries[RECTOID_GEOMETRY_BLOB].indexes;
	
	this.texcoords = geometries[RECTOID_GEOMETRY_BLOB].texcoords;	

	this.MIDDLE = 0;
	this.UPPER = 1;
	this.LOWER = 2;

//	this.lumbar_connection = [{accent: this.UPPER, mode: Accent.AXES_SWAP_MODE, parameters: [[0, -25, 0], [0, 25, 0]]}];
//	this.knee_connection = [{accent: this.LOWER, mode: Accent.AXES_SWAP_MODE, parameters: [[0, 25, 0], [0, -25, 0]]}];
	
	this.connection = [{index: 0}];
    
	this.accents = [];	
	
	this.accents[this.MIDDLE] = {filter:[0, 1, 0],  indexes: [4,   5,   6,   7,  9, 11, 12, 14, 18, 19, 20, 21 ]};
	this.accents[this.UPPER] = {filter:[0, 1, 0],  indexes: [2, 3, 10, 15, 16, 17]};		
	this.accents[this.LOWER] = {filter:[0, 0, 1],  indexes: [0, 1, 8, 13, 22, 23]};	
    
    this.serif = 
    {
        width: 100,
        height: 26, 
        back_color: [0, 0, 0, 0], 
        text: "DERP!"
    };	
};



geometries[LOWER_LEG_GEOMETRY_BLOB] = new (function()
{          
    var normals = [	  
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
		  0, -1, 0
  
	];
    			
	var face = 
	[ 	  
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
		-0.5, 0.5, 0.5
	];
		
    var indexes = [ 0,  1,  2,  2, 1, 3, 4,  5,  6,  6,
							5, 7, 8, 9, 10, 10, 9, 11  ];    
		
    var texcoords = [

	   // X- face
	   0, 1, /**/ 1, 1, /**/ 0, 0, /**/ 1, 0, 
	   // Y+ face
	   0, 1, /**/ 1, 1, /**/ 0, 0, /**/ 1, 0, 
	   // Y- face
	   0, 1, /**/ 1, 1, /**/ 0, 0, /**/ 1, 0, 
	   // Z+ face
	   0, 1, /**/ 1, 1, /**/ 0, 0, /**/ 1, 0, 
	   // Z- face
	   0, 1, /**/ 1, 1 
	]    
    
    
    
    
    
    
    var patella_attach_point = [0.4, 0.5, 1.0];
    
    var patella_superior_point = [0.2, 0.5, -1.0];    
    
    var ankle_point = [0.2, 0.5, 1];        
    
    var shin_points = [patella_attach_point, patella_superior_point, ankle_point];
     

    
    var shin_face = create_symmetric_flat_quad_strip_with_dimensions(indexes, face, normals, texcoords, face.length/3.0, indexes.length, shin_points, shin_points.length - 1, mat4.fromRotationTranslation([], quat.setAxisAngle([], [1, 0, 0], Math.PI/2.0), [0, 0.5, 0]));


//    show_differences([normals, texcoords, face, indexes], [normalsW, texcoordsW, vertexesW, indexesW], data_counts, ["normals", "texcoords", "vertexes", "indexes"]);


    
 //   console.log(shin_face);
    
/*    var parameters = [];
    
    var horizontal_vertex_count = 4;

    var horizontal_tri_count = 2 * (horizontal_vertex_count - 1);
    
    parameters[0] = { vertex_count: horizontal_vertex_count, start: 0, arc_count: 1, separation: 0.7, phase: Math.PI * 0.25, differential: Math.PI * 0.25, transform: mat4.fromRotationTranslation([], quat.setAxisAngle([], [0, 0, 1], 0), [0.0, 0, -0.0]), left: Math.PI * 0.5, right: Math.PI * 1.5, step: 2 }  
    parameters[1] = { vertex_count: horizontal_vertex_count, start: 1, arc_count: 2, separation: 0.3, phase: Math.PI * 0.25, differential: Math.PI * 0.25, transform: mat4.fromRotationTranslation([], quat.setAxisAngle([], [0, 0, 1], 0), [0.0, 0, -0.0]), left: Math.PI * 0.5, right: Math.PI * 1.5, step: 1 }  
    parameters[2] = { vertex_count: horizontal_vertex_count, start: 3, arc_count: 1, separation: 0.3, phase: Math.PI * 0.5, differential: Math.PI * 0.15, transform: mat4.fromRotationTranslation([], quat.setAxisAngle([], [0, 0, 1], 0), [0.0, 0, -0.0]), left: Math.PI * 0.5, right: Math.PI * 1.5, step: 1 }  
   
    var vertex_arcs = create_successive_vertex_arcs( face, normals, texcoords, face.length/3.0, 1.0, mat4.fromRotationTranslation([], quat.setAxisAngle([], [0, 0, 1], 0), [0.0, 0, -0.0]), parameters);

    
    show_differences([normals, texcoords, face, indexes], [normalsW, texcoordsW, vertexesW, indexesW], data_counts, ["normals", "texcoords", "vertexes", "indexes"]);

//    parameters[0] = {winding: 0, order: 1, start: 0, step: 2, count: horizontal_tri_count, successions: 2};
//    parameters[1] = {winding: 0, order: 1, start: 1, step: 2, count: horizontal_tri_count, successions: 1};    
    
    
    parameters[0] = {winding: 0, order: 1, start: 0, step: 1, count: horizontal_tri_count, successions: 3};

    var weld = composite_tri_weld( vertex_arcs, indexes, face, normals, texcoords, face.length/3.0, indexes.length, parameters,
                                                    horizontal_tri_count, 1, 0)                                                    
    */
//    var calf_upper = create_tri_cylindrical_section(indexes, face, normals, texcoords, face.length/3.0, indexes.length, 1.35, mat4.fromRotationTranslation([], quat.setAxisAngle([], [0, 0, 1], 0), [0.0, 0, -0.0]),
//                                                Math.PI * 0.25, Math.PI * 0.5, Math.PI * 0.5, Math.PI * 1.5, 4, 1);

//    var calf_lower = create_tri_cylindrical_section(indexes, face, normals, texcoords, face.length/3.0, indexes.length, 1.35, mat4.fromRotationTranslation([], quat.setAxisAngle([], [0, 0, 1], 0), [0.0, 1.0, -0.0]),
//                                                Math.PI * 0.5, Math.PI * 0.2, Math.PI * 0.5, Math.PI * 1.5, 4, 1, 1);
               	this.normals = new Float32Array(normals);                                                  
                                                  
	this.vertices = new Float32Array(face);
  
//	this.geometry = vertexesW;
  
	this.texcoords = new Float32Array(texcoords);
    
	this.indexes = new Uint16Array(indexes);		                                 
})();		