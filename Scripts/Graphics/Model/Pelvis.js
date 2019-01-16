geometries[PELVIS_GEOMETRY_BLOB] = new (function()
{ 
	var index = -1;
	
	const pubic_crest_width = 0.9;
	
	const PUBIC_CREST_DEXTER_DWN = ++index, PUBIC_CREST_DEXTER_RHT = ++index, PUBIC_CREST_DEXTER_FWD = ++index;
	
	// Anterior Superior Iliac Spine
	const ASIS_width = 0.11;
	const ASIS_height = 0.19;
	
	const ASIS_DEXTER_UP = ++index, ASIS_DEXTER_RHT = ++index, ASIS_DEXTER_FWD = ++index;

	// Lateral Iliac Crest - furthest lateral point on Iliac Crest, which should be furthest X-axis point of the pubic bone
	LIC_vertical = -0.11;
	LIC_depth = -0.31
	
	const LIC_DEXTER_UP = ++index, LIC_DEXTER_RHT = ++index, LIC_DEXTER_FWD = ++index;

	// Superior Iliac Crest - highest point on the Iliac Crest, which should be highest Y-axis point of the pubic bone
	const SIC_horizontal = -1.0;
	const SIC_depth = -0.59
	
	const SIC_DEXTER_UP = ++index, SIC_DEXTER_RHT = ++index, SIC_DEXTER_FWD = ++index;

	// Posterior Iliac Crest 
	const PIC_horizontal = -0.25;
	const PIC_depth = 0.14;
	const PIC_height = -0.14;

	const PIC_DEXTER_UP = ++index, PIC_DEXTER_RHT = ++index, PIC_DEXTER_FWD = ++index;
	
	// Posterior Superior Iliac Spine
	const PSIS_horizontal = -0.27;
	const PSIS_depth = 0.05;
	const PSIS_height = -0.28;

	const PSIS_DEXTER_UP = ++index, PSIS_DEXTER_RHT = ++index, PSIS_DEXTER_FWD = ++index;

    ++index;

	const PUBIC_CREST_SINISTER_DWN = PUBIC_CREST_DEXTER_DWN + index, PUBIC_CREST_SINISTER_LFT = PUBIC_CREST_DEXTER_RHT + index, PUBIC_CREST_SINISTER_FWD = PUBIC_CREST_DEXTER_FWD + index; 
	const ASIS_SINISTER_UP = ASIS_DEXTER_UP + index, ASIS_SINISTER_LFT = ASIS_DEXTER_RHT + index, ASIS_SINISTER_FWD = ASIS_DEXTER_FWD + index;
	const LIC_SINISTER_UP = LIC_DEXTER_UP + index, LIC_SINISTER_LFT = LIC_DEXTER_RHT + index, LIC_SINISTER_FWD = LIC_DEXTER_FWD + index;
	const SIC_SINISTER_UP = SIC_DEXTER_UP + index, SIC_SINISTER_LFT = SIC_DEXTER_RHT + index, SIC_SINISTER_FWD = SIC_DEXTER_FWD + index;
	const PIC_SINISTER_UP = PIC_DEXTER_UP + index, PIC_SINISTER_LFT = PIC_DEXTER_RHT + index, PIC_SINISTER_FWD = PIC_DEXTER_FWD + index;			
	const PSIS_SINISTER_UP = PSIS_DEXTER_UP + index, PSIS_SINISTER_LFT = PSIS_DEXTER_RHT + index, PSIS_SINISTER_FWD = PSIS_DEXTER_FWD + index;		

    const VERTEX_COUNT = index;
   	
	var face = [];
	
	var normals = 
	[	  
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
	]
	
	var texcoords = [
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
	]
	
	face[PUBIC_CREST_DEXTER_DWN*3] = face[PUBIC_CREST_DEXTER_RHT*3] = face[PUBIC_CREST_DEXTER_FWD*3] = 0.1;
	face[PUBIC_CREST_DEXTER_DWN*3+1] = face[PUBIC_CREST_DEXTER_RHT*3+1] = face[PUBIC_CREST_DEXTER_FWD*3+1] = -0.36;
	face[PUBIC_CREST_DEXTER_DWN*3+2] = face[PUBIC_CREST_DEXTER_RHT*3+2] = face[PUBIC_CREST_DEXTER_FWD*3+2] = 0.5;
	
	face[ASIS_DEXTER_UP*3] = face[ASIS_DEXTER_RHT*3] = face[ASIS_DEXTER_FWD*3] = 0.5 - ASIS_width;
	face[ASIS_DEXTER_UP*3+1] = face[ASIS_DEXTER_RHT*3+1] = face[ASIS_DEXTER_FWD*3+1] = 0.5 - ASIS_height;
	face[ASIS_DEXTER_UP*3+2] = face[ASIS_DEXTER_RHT*3+2] = face[ASIS_DEXTER_FWD*3+2] = 0.5;	
	
	face[LIC_DEXTER_UP*3] = face[LIC_DEXTER_RHT*3] = face[LIC_DEXTER_FWD*3] = 0.5;
	face[LIC_DEXTER_UP*3+1] = face[LIC_DEXTER_RHT*3+1] = face[LIC_DEXTER_FWD*3+1] = 0.5 + LIC_vertical;
	face[LIC_DEXTER_UP*3+2] = face[LIC_DEXTER_RHT*3+2] = face[LIC_DEXTER_FWD*3+2] = 0.5 + LIC_depth;
	
	face[SIC_DEXTER_UP*3] = face[SIC_DEXTER_RHT*3] = face[SIC_DEXTER_FWD*3] = 0.5 + SIC_horizontal;
	face[SIC_DEXTER_UP*3+1] = face[SIC_DEXTER_RHT*3+1] = face[SIC_DEXTER_FWD*3+1] = 0.5;
	face[SIC_DEXTER_UP*3+2] = face[SIC_DEXTER_RHT*3+2] = face[SIC_DEXTER_FWD*3+2] = 0.5 + SIC_depth;
	
	face[PIC_DEXTER_UP*3] = face[PIC_DEXTER_RHT*3] = face[PIC_DEXTER_FWD*3] = 0.5 + PIC_horizontal;
	face[PIC_DEXTER_UP*3+1] = face[PIC_DEXTER_RHT*3+1] = face[PIC_DEXTER_FWD*3+1] = 0.5 + PIC_height;
	face[PIC_DEXTER_UP*3+2] = face[PIC_DEXTER_RHT*3+2] = face[PIC_DEXTER_FWD*3+2] = -0.5 + PIC_depth;

	texcoords[PIC_DEXTER_UP*2] =  0; texcoords[PIC_DEXTER_UP*2 + 1] = 0;
	texcoords[PIC_DEXTER_RHT*2] =  0; texcoords[PIC_DEXTER_RHT*2 + 1] = 0;
	texcoords[PIC_DEXTER_FWD*2] =  0; texcoords[PIC_DEXTER_FWD*2 + 1] = 0;

	normals[PIC_DEXTER_RHT*3] = 1; normals[PIC_DEXTER_UP*3] = 0; normals[PIC_DEXTER_UP*3+2] = 0;
	normals[PIC_DEXTER_UP*3] = 0; normals[PIC_DEXTER_UP*3+1] = 1; normals[PIC_DEXTER_UP*3+2] = 0;
	normals[PIC_DEXTER_FWD*3] = 0; normals[PIC_DEXTER_FWD*3+1] = 1; normals[PIC_DEXTER_FWD*3+2] = 0;		
	
	face[PSIS_DEXTER_UP*3] = face[PSIS_DEXTER_RHT*3] = face[PSIS_DEXTER_FWD*3] = 0.5 + PSIS_horizontal;
	face[PSIS_DEXTER_UP*3+1] = face[PSIS_DEXTER_RHT*3+1] = face[PSIS_DEXTER_FWD*3+1] = 0.5 + PSIS_height ;
	face[PSIS_DEXTER_UP*3+2] = face[PSIS_DEXTER_RHT*3+2] = face[PSIS_DEXTER_FWD*3+2] = -0.5 + PSIS_depth;

	texcoords[PSIS_DEXTER_UP*2] =  0; texcoords[PSIS_DEXTER_UP*2 + 1] = 0;
	texcoords[PSIS_DEXTER_RHT*2] =  0; texcoords[PSIS_DEXTER_RHT*2 + 1] = 0;
	texcoords[PSIS_DEXTER_FWD*2] =  0; texcoords[PSIS_DEXTER_FWD*2 + 1] = 0;

	normals[PSIS_DEXTER_RHT*3] = 1; normals[PSIS_DEXTER_UP*3] = 0; normals[PSIS_DEXTER_UP*3+2] = 0;
	normals[PSIS_DEXTER_UP*3] = 0; normals[PSIS_DEXTER_UP*3+1] = 1; normals[PSIS_DEXTER_UP*3+2] = 0;
	normals[PSIS_DEXTER_FWD*3] = 0; normals[PSIS_DEXTER_FWD*3+1] = 1; normals[PSIS_DEXTER_FWD*3+2] = 0;	
	
	// reflect/complete symmetric midline structures
	scale_vertexes([-1, 1, 1], face, face, PUBIC_CREST_DEXTER_DWN, PUBIC_CREST_SINISTER_DWN, VERTEX_COUNT); 
	
	// TODO: Make a function out of this, one that actually translates or creates the data rather than just stuff placeholders
	for (var i = VERTEX_COUNT; i < VERTEX_COUNT*2; i++)
	{
		texcoords[i*2] = 0; texcoords[i*2+1] = 0;
		normals[i*3] = 1; normals[i*3+1] = 0; normals[i*3+2] = 0;		
	}
        
    var indexes = [];
    
    var index = 0;
    create_quad_from_unordered_indexed_vertexes(face, [ ASIS_DEXTER_FWD, LIC_DEXTER_FWD, LIC_SINISTER_FWD, ASIS_SINISTER_FWD ], texcoords, normals, indexes, 0, indexes.length, [0, 0, 1]); index+=6;
    create_quad_from_unordered_indexed_vertexes(face, [ ASIS_DEXTER_FWD, LIC_DEXTER_FWD, SIC_DEXTER_FWD, LIC_SINISTER_FWD], texcoords, normals, indexes, 0, indexes.length, [0, 0, 1]); index+=6;
    create_quad_from_unordered_indexed_vertexes(face, [ ASIS_DEXTER_FWD, SIC_DEXTER_FWD, ASIS_SINISTER_FWD,  SIC_SINISTER_FWD], texcoords, normals, indexes, 0, indexes.length, [0, 0, 1]); index+=6;
        
        
    // Superior Sacral Iliac Joint
    var SSI_point = [0.5 + PIC_horizontal - 0.02, (-0.5 + PIC_depth + 0.03), -0.14];    
	// Inferior Sacral Iliac Joint
    var ISI_point = [0.5 + PSIS_horizontal - 0.02, (-0.5 + PSIS_depth + 0.01), -0.32];    
    var coccyx_point = [0.04, (-0.5 + PIC_depth + 0.03), -0.1];    
    var sacrum_points = [coccyx_point, ISI_point, SSI_point];    
        
//    var sacrum_face = create_symmetric_flat_quad_strip_with_dimensions(indexes, face, normals, texcoords, face.length/3.0, indexes.length, sacrum_points, sacrum_points.length - 1, mat4.fromRotationTranslation([], quat.setAxisAngle([], [1, 0, 0], -Math.PI/2.0), [0, -0.1, 0]));

    index += (sacrum_points.length - 1) * 6;
    
     // Superior Sacral Iliac Joint
    var pubic_crest_point = [0.1, 0.45, 0.30];

    var pubic_inferior_point = [0.1, 0.30, 0.32];
    
    var pubic_points = [pubic_crest_point, pubic_inferior_point, coccyx_point, ISI_point, SSI_point]
    
    var pubic_face = create_symmetric_flat_quad_strip_with_dimensions(indexes, face, normals, texcoords, face.length/3.0, indexes.length, pubic_points, pubic_points.length - 1, mat4.fromRotationTranslation([], quat.setAxisAngle([], [1, 0, 0], Math.PI/2.0), [0, 0.0, 0]));

    
    create_quad_from_unordered_indexed_vertexes(face, [ pubic_face.left_rail_vertexes[0], pubic_face.right_rail_vertexes[0], ASIS_SINISTER_FWD, ASIS_DEXTER_FWD ], texcoords, normals, indexes, 0, indexes.length, [0, 0, 1]); index+=6;

/*	// Inferior Sacral Iliac Joint
    var ISI_point = [0.5 + PSIS_horizontal - 0.02, -(-0.5 + PSIS_depth + 0.01), 0.32];    
    var coccyx_point = [0.04, -(-0.5 + PIC_depth + 0.03), 0];    
    var sacrum_points = [coccyx_point, ISI_point, SSI_point];    
        
    var sacrum_face = create_symmetric_quad_strip_with_dimensions(indexes, face, normals, texcoords, face.length/3.0, indexes.length, sacrum_points, sacrum_points.length - 1, mat4.fromRotationTranslation([], quat.setAxisAngle([], [1, 0, 0], -Math.PI/2.0), [0, -0.1, 0]));
*/
    index += (sacrum_points.length - 1) * 6;
        
        
//    var gluteus = create_tri_strip_on_sphere(indexes, face, normals, texcoords, face.length/3.0, index, 0.35, mat4.fromRotationTranslation([], quat.setAxisAngle([], [0, 0, 1], Math.PI/2.0), [-0.32, 0, -1.4]),
//                                                Math.PI * 0.8, Math.PI * 1.2, Math.PI * 0.5, Math.PI * 1.5, 4);
    
//    indexed_fusion_single_body_point_local(indexes, indexes, gluteus.upper_arc, [ISI_DEXTER, COCCYX_DEXTER], 2);
//      flat_tri_weld_meta_indexed_one_to_one_simply_ordered(indexes, indexes, indexes, gluteus.lower_arc, coccyx_face, indexes.length, 2);
    
 //   create_tri_patch_on_sphere(indexes, face, normals, texcoords, face.length/3.0, index, 0.35, mat4.fromRotationTranslation([], quat.setAxisAngle([], [0, 0, 1], 0), [1.0, 0, -0.4]),
//                                              Math.PI * 0.8, Math.PI * 1.2, 0, Math.PI * 2, 8);
    
	this.normals = new Float32Array(normals);
	
	this.vertices = new Float32Array(face);
	
	this.texcoords = new Float32Array(texcoords);
    
    this.indexes = new Uint16Array(indexes);    
    
})();

Model.definitions[Model.PELVIS] = function()
{
	var complete_vertex_indexes = [  0,  1,    2,   3,  4,   5,   6,   7,   8,  9,
													  10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
													  20, 21, 22, 23 ];

	var front_right_top_vertex_indexes = [2, 3, 24];
	
	var front_right_top_complement_vertex_indexes = [ 0,   1,  4,   5,   6,   7,   8,  9,
																				10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
																				20, 21, 22, 23 ];		
    
    this.geometries = [PELVIS_GEOMETRY_BLOB];
    
	this.normals = geometries[PELVIS_GEOMETRY_BLOB].normals;
	
	this.geometry = geometries[PELVIS_GEOMETRY_BLOB].vertices;
	
	this.texcoords = geometries[PELVIS_GEOMETRY_BLOB].texcoords;
    
    this.indexes = geometries[PELVIS_GEOMETRY_BLOB].indexes;

    this.pubic_crest_point_dexter = 36;
    
    this.pubic_crest_point_sinister = 41;
   
    this.ASIS_point_dexter = 5;
   
    this.ASIS_point_sinister = 23;
    
    
    this.serif = 
    {
        width: 100,
        height: 26, 
        back_color: [13, 13, 7, 255], 
        text: undefined
    };	
    
	this.connection = [{index: 0}];
	    
        
        
	this.accents = [{filter:[0, 1, 0], base:[], indexes: [5, 8, 23, 23, 8, 26, 5, 8, 26, 26, 8, 11, 5, 29, 23, 23, 29, 11, 37, 36, 42, 42, 36, 41, 38,
                                                                         37, 43, 43, 37, 42, 39, 38, 44, 44, 38, 43, 40, 39, 45, 45, 39, 44, 41, 36, 23, 23, 36, 5]}]
    this.mapping_length = 1;   
    this.mapping = [ { schematic: 2, orbit: 0, stroke: 0 } ];            

    this.subplaten_count = 2;
    this.subplatens = 
    [
        [ Model.LOWER_LEG_DEFINITION, [20, 50, 20], [[-14, -25, 0]]],
        [ Model.LOWER_LEG_DEFINITION, [20, 50, 20], [[14, -25, 0]]]
    ];
    
    this.patterns = [Model.PELVIS];
};