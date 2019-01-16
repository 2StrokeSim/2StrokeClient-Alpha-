// Graphics/Geometry.js: Math utilities for graphics
// TODO: CAVEAT: THINGS: Lookout/beware recreating functionality in other mathy areas (objects/simulation/mechanics)

var transform_tri = function(input_offset, output_offset, input, output, transform)
{
	var result = [];
	for (var index = 0; index < 3; index++, input_offset += 3, output_offset += 3)
	{	
		vec3.transformMat4(result, [input[input_offset + 0], input[input_offset + 1], input[input_offset + 2]], transform); 
		output[output_offset] = result[0];
		output[output_offset + 1] = result[1];
		output[output_offset + 2] = result[2];
	}
}

var transform_quad = function(input_offset, output_offset, input, output, transform)
{
	transform_tri(input_offset, output_offset, input, output, transform);
	input_offset += 9;
	output_offset += 9;
	transform_tri(input_offset, output_offset, input, output, transform);
}

var cube_from_quad = function(face)
{
	var identity = mat4.create();
	var transform = [];
	var result = new Float32Array(108);
	var input_offset = 0;
	
	result[0] = face[0];    /**/ result[1] = face[1];    /**/ result[2] = face[2];     /**/ result[3] = face[3];    /**/ result[4] = face[4];    /**/ result[5] = face[5]; 
	result[6] = face[6];    /**/ result[7] = face[7];    /**/ result[8] = face[8];     /**/ result[9] = face[9];    /**/ result[10] = face[10]; /**/ result[11] = face[11]; 
	result[12] = face[12]; /**/ result[13] = face[13]; /**/ result[14] = face[14]; /**/ result[15] = face[15]; /**/ result[16] = face[16]; /**/ result[17] = face[17]; 
	
	var output_offset = 18;
	mat4.rotateY(transform, identity, Math.PI);
	transform_quad(input_offset, output_offset, face, result, transform);
	
	mat4.rotateY(transform, identity, Math.PI/2);		
	output_offset += 18;		
	transform_quad(input_offset, output_offset, face, result, transform);
	
	mat4.rotateY(transform, identity, Math.PI * 3/2);		
	output_offset += 18;		
	transform_quad(input_offset, output_offset, face, result, transform);		
	
	mat4.rotateX(transform, identity, Math.PI*3/2);		
	output_offset += 18;		
	transform_quad(input_offset, output_offset, face, result, transform);
	
	mat4.rotateX(transform, identity, Math.PI/2);		
	output_offset += 18;		
	transform_quad(input_offset, output_offset, face, result, transform);	
	
	return result;
}






///////////////////////////////////////////////////////////////////////////////////////////////////////////////// Deprecated Junkyard ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Code from back when I was going to make a much more standard general game engine. Centers models, and normalizes the diameter across all axes to 1 for homogeneous scaling;
/*
Model = function(vertices, faces, texcoords)
{
	axes_density = function(Mesh)
	{
		var mass = new Array();
		mass[0] = 0; mass[1] = 0; mass[2] = 0;
		
		for (vertex_index = 0; vertex_index < Mesh.length; vertex_index++)
		{
			mass[0] += Mesh[vertex_index][0];
			mass[1] += Mesh[vertex_index][1];
			mass[2] += Mesh[vertex_index][2];
		}
		
		var inv_denominator = 1.0 / Mesh.length;
		
		mass[0] *= inv_denominator;
		mass[1] *= inv_denominator;
		mass[2] *= inv_denominator;

		return mass;
	}

	var density = axes_density(vertices);
	
		// TODO: This should all happen in the Import function
	var result = Graphics.normalize_mesh(vertices, density); 

//	var inverted_radii = new THREE.Vector3(1 / (result.max_axes_radius.x * result.inverse_length), 1 / (result.max_axes_radius.y * result.inverse_length), 1 / (result.max_axes_radius.z * result.inverse_length)); 
	
	var inverse_diameters = result.inv_axes_diameter;
	
	this.get_XYZ_scaled_vertices = function(Result)
	{
		for ( vert_index = 0; vert_index < vertices.length; vert_index++) 
		{ 	
//			Result[vert_index] = new THREE.Vector3(vertices[vert_index][0], 
//																	     vertices[vert_index][1], 
//																	     vertices[vert_index][2]);	
		}  
	}

	this.get_faces = function(Result)
	{
		for ( face_index = 0; face_index < faces.length; face_index++) 
		{ 
	//		Result[face_index] = new THREE.Face3(faces[face_index][0], faces[face_index][1], faces[face_index][2]); 
		}  
	}
		
	this.get_texcoords = function(Result)
	{
		for ( mat_index = 0; mat_index < texcoords.length; mat_index++) 
		{ 
			Result[mat_index] = new Array();
			for ( face_index = 0; face_index < texcoords[mat_index].length; face_index++) 
			{ 
				Result[mat_index][face_index] = new Array
												(
//													new THREE.Vector2(texcoords[mat_index][face_index][0][0], texcoords[mat_index][face_index][0][1]),
//													new THREE.Vector2(texcoords[mat_index][face_index][1][0], texcoords[mat_index][face_index][1][1]),
//													new THREE.Vector2(texcoords[mat_index][face_index][2][0], texcoords[mat_index][face_index][2][1])
												);
			}  
		}
	}
}


Graphics.models = new Array();

// Reduces the distance of the furthest vertex from the origin to 1
normalize_mesh = function(Mesh, Origin)
{
	var max_length = 0;
//	var max_axes = new THREE.Vector3(0, 0, 0);
//	var neg_axes = new THREE.Vector3(0, 0, 0);
//	var pos_axes = new THREE.Vector3(0, 0, 0);
	var length = 0;
	
	for (vertex_index = 0; vertex_index < Mesh.length; vertex_index++)
	{
		length = Math.sqrt(((Mesh[vertex_index][0] - Origin[0]) * (Mesh[vertex_index][0] - Origin[0])) + 
						          ((Mesh[vertex_index][1] - Origin[1]) * (Mesh[vertex_index][1] - Origin[1])) +
				                  ((Mesh[vertex_index][2] - Origin[2]) * (Mesh[vertex_index][2] - Origin[2])));
						   
//		var axes_length = new THREE.Vector3(Math.abs(Mesh[vertex_index][0] - Origin[0]), Math.abs(Mesh[vertex_index][1] - Origin[1]), Math.abs(Mesh[vertex_index][2] - Origin[2]));				   
		
		if (length > max_length) max_length = length;

		if (axes_length.x > max_axes.x) max_axes.x = axes_length.x;
		if (axes_length.y > max_axes.y) max_axes.y = axes_length.y;
		if (axes_length.z > max_axes.z) max_axes.z = axes_length.z;
		
		if (Mesh[vertex_index][0] > 0) { if (axes_length.x > pos_axes.x) { pos_axes.x = axes_length.x; } }
		else if (Mesh[vertex_index][0] < 0) { if (-1.0 * axes_length.x < neg_axes.x) { neg_axes.x = axes_length.x; } }

		if (Mesh[vertex_index][1] > 0) { if (axes_length.y > pos_axes.y) { pos_axes.y = axes_length.y; } }
		else if (Mesh[vertex_index][1] < 0) { if (-1.0 * axes_length.y < neg_axes.y) { neg_axes.y = axes_length.y; } }

		if (Mesh[vertex_index][2] > 0) { if (axes_length.z > pos_axes.z) { pos_axes.z = axes_length.z; } }
		else if (Mesh[vertex_index][2] < 0) { if (-1.0 * axes_length.z < neg_axes.z) { neg_axes.z = axes_length.z; } }
	}
	
	var inv_length = 1.0 / max_length;
	
//	var inv_diameters = new THREE.Vector3( 1.0 / (pos_axes.x + neg_axes.x), 1.0 / (pos_axes.y + neg_axes.y), 1.0 / (pos_axes.z + neg_axes.z) );
	
	for (vertex_index = 0; vertex_index < Mesh.length; vertex_index++)
	{
		Mesh[vertex_index][0] *= inv_diameters.x;
		Mesh[vertex_index][1] *= inv_diameters.y;
		Mesh[vertex_index][2] *= inv_diameters.z;		
	}
	
	return {inverse_length: inv_length, max_axes_radius: max_axes, inv_axes_diameter: inv_diameters};
}*/