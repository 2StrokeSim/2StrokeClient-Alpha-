var load_model;

// TODO: This and Graphics/geometry are the same thing, really
var transform_vertices = function(transform, source, destination, source_start, destination_start, count)
{
    var result = [];
    for (var vertex_index = 0, source_index = source_start*3, destination_index = destination_start*3; vertex_index < count; source_index+=3, destination_index+=3, vertex_index++)
    {
        vec3.transformMat4(result, [source[source_index], source[source_index+1], source[source_index+2]], transform);
        
        destination[destination_index] = result[0];
        destination[destination_index + 1] = result[1];
        destination[destination_index + 2] = result[2];
    }
};

var transform_indexed_vertices = function(transform, source, destination, source_indexes, destination_indexes)
{    
    var result = [];
    
    for (var vertex_index = 0; vertex_index < source_indexes.length; vertex_index++)
    {
        var source_index = source_indexes[vertex_index] * 3;
        var destination_index = destination_indexes[vertex_index] * 3;

        vec3.transformMat4(result, [source[source_index], source[source_index+1], source[source_index+2]], transform);   
   
        destination[destination_index] = result[0];
        destination[destination_index + 1] = result[1];
        destination[destination_index + 2] = result[2];
    }
}

var transform_indexed_vertexes_axis_filtered = function(transform, source, destination, source_indexes, destination_indexes, axes, offset)
{
    var result = [];
    for (var vertex_index = 0; vertex_index < source_indexes.length; vertex_index++)
    {
        source_index = source_indexes[vertex_index] * 3;
        destination_index = destination_indexes[vertex_index] * 3;
        
        vec3.transformMat4(result, [source[source_index] + offset[0], source[source_index+1] + offset[1], source[source_index+2]] + offset[2], transform);
        
        if (axes[0] == 1) {destination[destination_index] = result[0];} else {destination[destination_index] = source[source_index];} 
        if (axes[1] == 1) {destination[destination_index+1] = result[1];} else {destination[destination_index+1] = source[source_index+1];} 
        if (axes[2] == 1) {destination[destination_index+2] = result[2];} else {destination[destination_index+2] = source[source_index+2];} 
    }
}

var scale_vertexes = function(scaled_axes, source, destination, source_start, destination_start, count)
{
    var result = [];
    for (var vertex_index = 0, source_index = source_start*3, destination_index = destination_start*3; vertex_index < count; source_index+=3, destination_index+=3, vertex_index++)
    {
        destination[destination_index] = source[source_index] * scaled_axes[0];
        destination[destination_index + 1] = source[source_index+1] * scaled_axes[1];
        destination[destination_index + 2] = source[source_index+2] * scaled_axes[2];
    }
};

var scale_indexed_vertexes = function(scaled_axes, source, destination, source_indexes, destination_indexes, source_start, destination_start, count)
{
    var result = [];
    
    for (var index = 0, source_index = source_start, destination_index = destination_start; index < count; source_index++, destination_index++, index++)
    {
        var source_vertex_index = source_indexes[source_index]*3;
        var destination_vertex_index = destination_indexes[destination_index]*3;
        
        destination[destination_vertex_index] = source[source_vertex_index] * scaled_axes[0];
        destination[destination_vertex_index+1] = source[source_vertex_index+1] * scaled_axes[1];
        destination[destination_vertex_index+2] = source[source_vertex_index+2] * scaled_axes[2];
    }
};

var get_tri_plane_normal_indexed = function(vertex_source, index_source, index_start)
{
    var A_index = index_source[index_start]*3;
    var B_index = index_source[index_start+1]*3;
    var C_index = index_source[index_start+2]*3;
    
    var AB = [vertex_source[B_index] - vertex_source[A_index], vertex_source[B_index+1] - vertex_source[A_index+1], vertex_source[B_index+2] - vertex_source[A_index+2]];
    var AC = [vertex_source[C_index] - vertex_source[A_index], vertex_source[C_index+1] - vertex_source[A_index+1], vertex_source[C_index+2] - vertex_source[A_index+2]];
    
    return vec3.cross(AB, AB, AC)
}

var flip_tri_vertex_index_winding = function(index_source, normal_source, texcoord_source, index_destination, normal_destination, texcoord_destination, source_index, destination_index)
{
    var temp = index_source[source_index+1];
    
    index_destination[destination_index] = index_source[source_index];
    index_destination[destination_index+1] = index_source[source_index+2];   
    index_destination[destination_index+2] = temp;

    // Scales normals, too! - scale 3 tuples, mebbe?
    scale_indexed_vertexes([-1, -1, -1], normal_source, normal_destination, source_indexes, destination_indexes, source_index, destination_index, 3);
}

var order_convex_indexed_vertexes = function(vertex_source, index_source, index_destination, source_index, destination_index, origin_order, count)
{
    var center = [0, 0, 0];
    
    var vertex = [];
    
    var vertex_index;
    
    for (var i = 0; i < count; i++)
    {
        vertex_index = index_source[source_index+i]*3;
        center[0] += vertex_source[vertex_index];
        center[1] += vertex_source[vertex_index+1];
        center[2] += vertex_source[vertex_index+2];
    }
    
    center[0] /= count; center[1] /= count; center[2] /= count;

    vertex_index = index_source[source_index+origin_order]*3;
    var origin = [vertex_source[vertex_index], vertex_source[vertex_index+1], vertex_source[vertex_index+2]];
    var order = [index_source[source_index+origin_order]]
    
    var direction = vec3.subtract([], center, origin);
    
    var distances = [0];
    
    var indexes = [];
    
    var j;
    for (var i = 0; i < count; i++)
    {
        if (i == origin_order)
        {continue;}
        
        var vertex_index = index_source[source_index+i]*3;
        
        vertex[0] = vertex_source[vertex_index];
        vertex[1] = vertex_source[vertex_index+1];
        vertex[2] = vertex_source[vertex_index+2];

        var distance = vec3.dot(vec3.subtract(vertex, vertex, origin), direction);
        
        for (j = i; j > 1 && distance < distances[j-1]; j--){}
    
         distances.splice(j, 0, distance);
         
         order.splice(j, 0, index_source[source_index+i]);
    }
    
    for (var i = 0; i < count; i++)
    {
        indexes[i] = destination_index+i;
        index_destination[destination_index+i] = order[i]; 
    }  
    
    return indexes;
}


// TODO: Was going to be a more general "multipatch" function, but I'm think an "intermeshing" function would have FAR more reusability
/*var create_odd_patch_on_sphere = function( index_destination, vertex_destination, normal_destination, texcoord_destination, vertex_destination_index, destination_index, radius, transform, 
                                            horizontal_start, horizontal_end, vertical_start, vertical_end, horizontal_vertex_count, vertical_vertex_count, bias = 0)
{
    // UR: Upper Ring. LR: Lower Ring. UP: Upper Point (top). LP: Lower Point (bottom)
    const VertexUR = 0;
    const VertexLR = 5;

    var upper_ring_indexes = [];
    var lower_ring_indexes = [];
    
    var upper_ring = [];
    var lower_ring = [];

    angular_width = 2*Math.PI;
    angular_height = 2*Math.PI;
    
    horizontal_vertex_count = 5;
    vertical_vertex_count = 2;
    
    var even_transform = transform.slice();
    var odd_transform = mat4.multiply([], transform, mat4.fromYRotation([], -Math.PI * 0.2));   

    // angle between each ring/arc
    var vertical_distance = vertical_end - vertical_start;
    var vertical_displacement = vertical_distance / vertical_vertex_count; 
   
    upper_ring_indexes = create_inner_radius_vertex_arc(vertex_destination, normal_destination, texcoord_destination, vertex_destination_index, radius, Math.PI, horizontal_vertex_count, 
                                                                                    mat4.multiply([], mat4.fromRotationTranslation([], quat.setAxisAngle([], [0, 1, 0], 0), [0.0, radius*Math.sin(Math.PI*0.2), 0.0]), even_transform)); 
   
    for 
   
    lower_ring_indexes = create_inner_radius_vertex_arc(vertex_destination, normal_destination, texcoord_destination, vertex_destination_index+horizontal_vertex_count, radius, Math.PI, horizontal_vertex_count, 
                                                                                   mat4.multiply([], mat4.fromRotationTranslation([], quat.setAxisAngle([], [0, 1, 0], 0), [0.0, -radius*Math.sin(Math.PI*0.2), 0.0]), odd_transform));
    
    flat_tri_weld_indexed_one_to_one_simply_ordered(upper_ring_indexes, lower_ring_indexes, index_destination, 0, 0, destination_index, 8);
    
    return { upper_ring: upper_ring_indexes, lower_ring: lower_ring_indexes };
}*/

var indexed_fusion_single_body_point_local = function(body_one_source, body_two_source, body_one_indexes, body_two_indexes, count, 
                                                                                   index_one = 0, traversal_one = 1, index_two = 0, traversal_two = 1)
{
    for (var i = 0; i < count; i++, index_one += traversal_one, index_two += traversal_two)
    {
        body_one_source[body_one_indexes[index_one]] = body_two_source[body_two_indexes[index_two]];
    }
};

indexed_fusion_single_body_point_local.FORWARD_TRAVERSAL = 1;
indexed_fusion_single_body_point_local.BACKWARD_TRAVERSAL = -1;

var reflect_model_across_axis = function(axis, index_source, vertex_source, texcoord_source, normal_source, index_destination, vertex_destination, texcoord_destination, normal_destination, 
                                                                index_source_start, vertex_source_start, index_destination_start, vertex_destination_start, count)
{
    for (var index = 0, source_index = index_source_start, destination_index = index_destination_start; index < count; index++, source_index++, destination_index++)
    {
        index_destination[destination_index] = index_source[source_index] - vertex_source_start +  vertex_destination_start;
    }
    
    scale_indexed_vertexes(axis, source, vertex_source, source_start, vertex_destination_start, count);
};

CREATE_SYMMETRIC_FLAT_QUAD_STRIP_WITH_DIMENSIONS = 0;
CREATE_QUAD_FROM_UNORDERED_INDEXED_VERTEXES = 1;

var geometry_generation_op = [];
geometry_generation_op[CREATE_SYMMETRIC_FLAT_QUAD_STRIP_WITH_DIMENSIONS] = create_symmetric_flat_quad_strip_with_dimensions;
geometry_generation_op[CREATE_QUAD_FROM_UNORDERED_INDEXED_VERTEXES] = create_quad_from_unordered_indexed_vertexes;

var build_models;

var 

// TODO: Pile of crap. Needs fixed upon porting to WASM
Model = new (function()
{
    this.BASE_ACCENT = 0;
    
    // Models defined at session load. Persistant with session.
    this.definitions = [];

    this.instantiate = function()
    {
        
    }
    

    var model_data = [];

    
    var enter_model_atlas_record = function(vertices, normals, texcoords, vertex_count, entry_index)
    {
        console.log("vertex count: " + vertex_count + " entry index: " + entry_index);
        console.log("vertices length: " + vertices.length + " vertices: " + vertices);
        var vertex_stride = 3;
        var row_size = 2048;

        var model_limit = (vertices.length / vertex_stride) * 4;  

        row_size = model_limit;

        var vertex_index = 0;
        var normal_index = 0;
        var texcoord_index = 0; 

        for (var index = 0; index < model_limit; index++)
        {                                            
            model_data[index] = vertices[vertex_index];
            model_data[index + row_size] = normals[normal_index];
            vertex_index++;
            normal_index++;
            
            model_data[index + (2*row_size)] = 0;
            model_data[index + (3*row_size)] = 0;

            index++;
                
            model_data[index] = vertices[vertex_index];
            model_data[index + row_size] = normals[normal_index];           
            vertex_index++;
            normal_index++;
            
            model_data[index + (2*row_size)] = 0;
            model_data[index + (3*row_size)] = 0;
            index++;
                
            model_data[index] = vertices[vertex_index];
            model_data[index + row_size] = normals[normal_index];
            vertex_index++;
            normal_index++;
            
            model_data[index + (2*row_size)] = texcoords[texcoord_index];
            model_data[index + (3*row_size)] = 0;

            index++;

            model_data[index] = texcoords[texcoord_index];           
            
            texcoord_index++;
            model_data[index + row_size] = texcoords[texcoord_index];
            model_data[index + (2*row_size)] = texcoords[texcoord_index];                                    
            texcoord_index++;
            
            model_data[index + (3*row_size)] = 0;

        } 

        console.log("Lengthof model data: " + model_data.length);

        update_FLOATRGBA_sampler2D(model_data, model_atlas, MODEL_ATLAS_TEXTURE_INDEX, entry_index, 0, model_limit/4, 4);            
    }
    
    var model_atlas; 
    
    var u_transformAtlasLoc;
    
    var prototype_atlas_index;
    
    
    const SAMPLER_VERTEXES_PER_MODEL_ATLAS_ROW = 512;
    const SAMPLER_VERTEXES_PER_MODEL_ATLAS_COLUMN = 4;    
    const SAMPLER_ROWS_PER_MODEL_ATLAS_ENTRY = 4;
    const SAMPLER_COLUMNS_PER_MODEL_ATLAS_ENTRY = 1;
    const COORDINATES_PER_MODEL_ATLAS_SAMPLER_VERTEX = 4;
    
    const ONE_D_DATA_LENGTH_OF_ATLAS_SAMPLER = (SAMPLER_VERTEXES_PER_MODEL_ATLAS_ROW * SAMPLER_VERTEXES_PER_MODEL_ATLAS_COLUMN * 4);
    
    this.register_models = function(transformAtlasLoc)
    {   
 /*       for (var property in geometries) {
            if (object.hasOwnProperty(property)) {
                // do stuff
            }
        }    */
    
  //      var geometries = [];
        
        var model_data = [];
        
        
      //  u_transformAtlasLoc = transformAtlasLoc;
        
        var model_offset = 0;  
    
       // build_models();
    
        Model.definitions[Model.RECTOID_DEFINITION] = new Model.definitions[Model.RECTOID_DEFINITION]();
        Model.definitions[Model.LOWER_LEG_DEFINITION] = new Model.definitions[Model.LOWER_LEG_DEFINITION]();
        Model.definitions[Model.UPPER_LEG_DEFINITION] = new Model.definitions[Model.UPPER_LEG_DEFINITION]();
        Model.definitions[Model.PELVIS_DEFINITION] = new Model.definitions[Model.PELVIS_DEFINITION]();
        Model.definitions[Model.GUI_DEFINITION] = new Model.definitions[Model.GUI_DEFINITION]();
            
                
        for (var i = 0; i < ONE_D_DATA_LENGTH_OF_ATLAS_SAMPLER; i++)
        {
            model_data[i] = 0;
        }      

        
        
        model_atlas = create_discrete_FLOATRGBA_sampler2D(model_data, MODEL_ATLAS_TEXTURE_INDEX, 512, 4);
        
        
        
        for (var model_index = 0; model_index < geometries.length; model_index++)
        {          
            var model = geometries[model_index];
                       
            var entry_index = model_offset / 4;        
           
            var vertex_stride = 3;
                                                          
            var model_limit = model_offset + (model.vertices.length / vertex_stride) * 4;           

            model_limit = (model.vertices.length / vertex_stride) * 4;  
 
            // Build the geometry stat record for WASM and send it in
            var vertex_indexes = [];              
                        
            for (var i = 0; i < model.vertices.length/3; i++)
            {
                vertex_indexes[i] = i + entry_index;
            }
                   
            WASM_access.TypedArrays_to_comm(0, new Uint16Array(vertex_indexes), new Uint16Array(model.indexes));
            
            
            console.log("model.vertices.length/3: " + (model.vertices.length/3));
            WASM_access.geometry_create(model_index, model.vertices.length/3, model.indexes.length);   

            // Enter the geometry into the model atlas sampler
            enter_model_atlas_record(model.vertices, model.normals, model.texcoords, model.vertices.length, entry_index);
                        
            model_offset += model_limit;
            
            model.registry = entry_index;         
        }      
        
        
        // Armature
        for (var model_index = 0; model_index < Model.definitions.length; model_index++)
        {
                                  
            var model = Model.definitions[model_index];

            var comm_offset = 0;
                    
            var stroke_lengths = [];
            
            for (var i = 0; i < model.accents.length; i++)
            {	
                stroke_lengths[i] = model.geometry.length/3;//model.accents[i].indexes.length;
            }
        
            WASM_access.TypedArrays_to_comm(0, new Uint16Array(model.geometries), new Uint16Array(stroke_lengths));
            comm_offset += 2 * model.geometries.length;
            comm_offset += 2 * stroke_lengths.length;
            
            for (var i = 0; i < model.accents.length; i++)
            {	
//                console.log("Stroke indexes: ");
//                console.log(model.accents[i].indexes);   
                WASM_access.TypedArray_to_comm(new Uint16Array(model.accents[i].indexes), comm_offset);
                comm_offset += 2 * model.accents[i].indexes.length;
            }                   
            
            comm_offset = WASM_access.TypedArrays_to_comm(comm_offset, new Uint32Array(model.serif.back_color), 
                                                           new Uint32Array([model.serif.width, model.serif.height, 0]),
                                                          );
            

            var entry_index = model_offset / 4;                    
       
       
            WASM_access.type_create(model_index, model.indexes.length, 
                                    model.geometry.length/3, model.accents.length, 1, 0, model.registry);   
      
           
            var vertex_stride = 3;       
                       
                                   
            var model_limit = (model.geometry.length / vertex_stride) * 4;  
                        
            model_offset += model_limit;
        }      
        
//      WASM_access.object_report(0, 4);

        
        prototype_atlas_index = model_offset / 4;       
    };
    
})();

var create_icosahedron = function(index_destination, vertex_destination, normal_destination, texcoord_destination, vertex_destination_index, destination_index, origin, radius, orientation)
{   
    // UR: Upper Ring. LR: Lower Ring. UP: Upper Point (top). LP: Lower Point (bottom)
    var index =  -1;
    const VertexUR_0 = 0;
    const VertexUR_2PiOver5 = 1;
    const VertexUR_4PiOver5 = 2;
    const VertexUR_6PiOver5 = 3;
    const VertexUR_8PiOver5 = 4;
 
    const VertexLR_0 = 5;
    const VertexLR_2PiOver5 = 6;
    const VertexLR_4PiOver5 = 7;
    const VertexLR_6PiOver5 = 8;
    const VertexLR_8PiOver5 = 9;
    
    const VertexUP = 10;
    const VertexLP = 11;
   
    // 0.4 = 2/5. So a radius of 2Pi into 5 sections is Pi * 0.4. Just sayin'.
    // Upper Ring: First point at Z = 1
    vertex_destination[(vertex_destination_index+VertexUR_0)*3] = origin[0]; vertex_destination[(vertex_destination_index+VertexUR_0)*3+1] = radius*Math.sin(Math.PI*0.2)+origin[1]; vertex_destination[(vertex_destination_index+VertexUR_0)*3+2] = radius+origin[2];
    vertex_destination[(vertex_destination_index+VertexUR_2PiOver5)*3] = -radius*Math.sin(Math.PI * 0.4)+origin[0]; vertex_destination[(vertex_destination_index+VertexUR_2PiOver5)*3+1] = radius*Math.sin(Math.PI*0.2)+origin[1]; vertex_destination[(vertex_destination_index+VertexUR_2PiOver5)*3+2] = radius*Math.cos(Math.PI * 0.4)+origin[2];
    vertex_destination[(vertex_destination_index+VertexUR_4PiOver5)*3] = -radius*Math.sin(Math.PI * 0.8)+origin[0]; vertex_destination[(vertex_destination_index+VertexUR_4PiOver5)*3+1] = radius*Math.sin(Math.PI*0.2)+origin[1]; vertex_destination[(vertex_destination_index+VertexUR_4PiOver5)*3+2] = radius*Math.cos(Math.PI * 0.8)+origin[2];
    vertex_destination[(vertex_destination_index+VertexUR_6PiOver5)*3] = -radius*Math.sin(Math.PI * 1.2)+origin[0]; vertex_destination[(vertex_destination_index+VertexUR_6PiOver5)*3+1] = radius*Math.sin(Math.PI*0.2)+origin[1]; vertex_destination[(vertex_destination_index+VertexUR_6PiOver5)*3+2] = radius*Math.cos(Math.PI * 1.2)+origin[2];
    vertex_destination[(vertex_destination_index+VertexUR_8PiOver5)*3] = -radius*Math.sin(Math.PI * 1.6)+origin[0]; vertex_destination[(vertex_destination_index+VertexUR_8PiOver5)*3+1] = radius*Math.sin(Math.PI*0.2)+origin[1]; vertex_destination[(vertex_destination_index+VertexUR_8PiOver5)*3+2] = radius*Math.cos(Math.PI * 1.6)+origin[2];

    // Lower Ring: First point at Z = -1
    vertex_destination[(vertex_destination_index+VertexLR_0)*3] = origin[0]; vertex_destination[(vertex_destination_index+VertexLR_0)*3+1] = -radius*Math.sin(Math.PI*0.2)+origin[1]; vertex_destination[(vertex_destination_index+VertexLR_0)*3+2] = -radius+origin[2];
    vertex_destination[(vertex_destination_index+VertexLR_2PiOver5)*3] = radius*Math.sin(Math.PI * 0.4)+origin[0]; vertex_destination[(vertex_destination_index+VertexLR_2PiOver5)*3+1] = -radius*Math.sin(Math.PI*0.2)+origin[1]; vertex_destination[(vertex_destination_index+VertexLR_2PiOver5)*3+2] = -radius*Math.cos(Math.PI * 0.4)+origin[2];
    vertex_destination[(vertex_destination_index+VertexLR_4PiOver5)*3] = radius*Math.sin(Math.PI * 0.8)+origin[0]; vertex_destination[(vertex_destination_index+VertexLR_4PiOver5)*3+1] = -radius*Math.sin(Math.PI*0.2)+origin[1]; vertex_destination[(vertex_destination_index+VertexLR_4PiOver5)*3+2] = -radius*Math.cos(Math.PI * 0.8)+origin[2];
    vertex_destination[(vertex_destination_index+VertexLR_6PiOver5)*3] = radius*Math.sin(Math.PI * 1.2)+origin[0]; vertex_destination[(vertex_destination_index+VertexLR_6PiOver5)*3+1] = -radius*Math.sin(Math.PI*0.2)+origin[1]; vertex_destination[(vertex_destination_index+VertexLR_6PiOver5)*3+2] = -radius*Math.cos(Math.PI * 1.2)+origin[2];
    vertex_destination[(vertex_destination_index+VertexLR_8PiOver5)*3] = radius*Math.sin(Math.PI * 1.6)+origin[0]; vertex_destination[(vertex_destination_index+VertexLR_8PiOver5)*3+1] = -radius*Math.sin(Math.PI*0.2)+origin[1]; vertex_destination[(vertex_destination_index+VertexLR_8PiOver5)*3+2] = -radius*Math.cos(Math.PI * 1.6)+origin[2];
    
    vertex_destination[(vertex_destination_index+VertexUP)*3] = origin[0]; vertex_destination[(vertex_destination_index+VertexUP)*3+1] = radius+origin[1]; vertex_destination[(vertex_destination_index+VertexUP)*3+2] = origin[2];
    vertex_destination[(vertex_destination_index+VertexLP)*3] = origin[0]; vertex_destination[(vertex_destination_index+VertexLP)*3+1] = -radius+origin[1]; vertex_destination[(vertex_destination_index+VertexLP)*3+2] = origin[2];

    for (var i = 0; i < 12; i++)
    {
        var normal = vec3.normalize([], vertex_destination[(vertex_destination_index+i)*3], vertex_destination[(vertex_destination_index+i)*3+1], vertex_destination[(vertex_destination_index+i)*3+2]);
        normal_destination[(vertex_destination_index+i)*3] = normal[0]; 
        normal_destination[(vertex_destination_index+i)*3+1] = normal[1]; 
        normal_destination[(vertex_destination_index+i)*3+2] = normal[2];

         texcoord_destination[(vertex_destination_index+i)*2] = 0;
         texcoord_destination[(vertex_destination_index+i)*2+1] = 0;         
    }        
    
    // We're Pi radians out of phase between the two rings
    for (var i = 0; i < 5; i++)
    {
        // Top
        var modulo1 = 0;
        var modulo2 = 0;
        var modulo3 = 0;
       
        if (i == 0) modulo1 = 5;
        if (i > 1) modulo2 = -5;
        if (i > 2) modulo3 = -5;
        
        index_destination[i*12 + destination_index] = vertex_destination_index + VertexUP;
        index_destination[i*12 + destination_index + 1] = vertex_destination_index + VertexUR_0 + ((i -1) + modulo1); 
        index_destination[i*12 + destination_index + 2] = vertex_destination_index + VertexUR_0 + i;  
    
        // Middle Belt
        index_destination[i*12 + destination_index + 3] = vertex_destination_index + VertexUR_0 + i;
        index_destination[i*12 + destination_index + 4] = vertex_destination_index + VertexLR_0 + ((i + 3) + modulo2);
        index_destination[i*12 + destination_index + 5] = vertex_destination_index + VertexLR_0 + ((i + 2) + modulo3); 
        
        index_destination[i*12 + destination_index + 6] = vertex_destination_index + VertexLR_0 + i;
        index_destination[i*12 + destination_index + 7] = vertex_destination_index + VertexUR_0 + ((i + 2) + modulo3); 
        index_destination[i*12 + destination_index + 8] = vertex_destination_index + VertexUR_0 + ((i + 3) + modulo2);
        
        // Bottom
        index_destination[i*12 + destination_index + 9] = vertex_destination_index + VertexLP;
        index_destination[i*12 + destination_index + 10] = vertex_destination_index + VertexLR_0 + ((i -1) + modulo1); 
        index_destination[i*12 + destination_index + 11] = vertex_destination_index + VertexLR_0 + i;
    }
}



    const RECTOID_GEOMETRY_BLOB = 0;
    const LOWER_LEG_GEOMETRY_BLOB = 1;
    const PELVIS_GEOMETRY_BLOB = 2;
    const GUI_GEOMETRY_BLOB = 3;
    var geometries = [];

    Model.GUI_DEFINITION = 0;
    Model.RECTOID_DEFINITION = 1;
    Model.LOWER_LEG_DEFINITION = 2;
    Model.UPPER_LEG_DEFINITION = 3;
    Model.PELVIS_DEFINITION = 4;
    Model.PROTOTYPE = 100;


    var walk_step = function(sequence)
    {              
        this.pelvis.projected_time.threshold[0] = 800;        
        this.pelvis.projected_time.potential[0] = 0; 
        
        var switch_leg = this.trail_leg;
        this.trail_leg = this.lead_leg;
        this.lead_leg = switch_leg;
         
        var subsequence = sequence.radius;

        
        subsequence = RelativeAxis.project_partition_forward(new Partition(0, this.trail_leg.action, [sequence, 1000, 'push']), subsequence);
        
        var lead_event = new Partition(0, this.lead_leg.action, [sequence, 600, 'chamber'], undefined );
        
        RelativeAxis.concatenate_interval(lead_event, new Partition( 600, this.lead_leg.action, [sequence, 400, 'kick'] ));

        RelativeAxis.concatenate_interval(lead_event, new Partition( 400, this.walk_step, [sequence, 400] ));
        
        subsequence = RelativeAxis.merge_intervals(lead_event, subsequence);
        
        sequence.radius = subsequence;
        
        WASM_access.operate_pelvis_controller(this.WASM_object);
   
        return subsequence;
    }

	var pelvis_controller = function( connections, controllers, twines, orientations, potentials, thresholds, synapse )
	{   
		this.right_leg = controllers[0];
		this.left_leg = controllers[1];
		this.pelvis = { projected_time: { potential: potentials[6], threshold: thresholds[6] } };//orbits[6];
        
        this.pelvis.potential = potentials[6];
        this.pelvis.threshold = thresholds[6];
		
		this.lead_leg = this.right_leg;
		this.trail_leg = this.left_leg;
		
		this.walk_step = walk_step.bind(this);
        
        this.WASM_object = WASM_access.create_pelvis_controller(synapse[6], controllers[0].WASM_object, controllers[1].WASM_object);
        
        var stage;
        
        stage = new Partition(0, this.trail_leg.action, [Timer.sequence, 1000, 'push']);
        var subsequence = stage;
        
        stage = new Partition(0, this.lead_leg.action, [Timer.sequence, 600, 'chamber'], undefined );
        var lead_event = stage;

        stage = new Partition( 600, this.lead_leg.action, [Timer.sequence, 400, 'kick'] );
        RelativeAxis.concatenate_interval(lead_event, stage);

        stage = new Partition( 400, this.walk_step, [Timer.sequence, 400] );   
        RelativeAxis.concatenate_interval(lead_event, stage);
        
        subsequence = RelativeAxis.merge_intervals(lead_event, subsequence);
	};
    
var update = function(sequence, orientation, phase_goal, orientation_pointer)
{
    WASM_access.do_update(orientation_pointer, phase_goal);
//    orientation[3] = phase_goal;
      
    return sequence;
};
    
	var leg_controller = function(connections, controllers, twines, orientations, potentials, thresholds, synapse)
	{
		var foot = new limb_segment(twines[0], WASM_access.Float32Array_from(orientations[0], 4))															
        var lower_leg = new limb_segment(twines[1], WASM_access.Float32Array_from(orientations[1], 4))																	
        var upper_leg = new limb_segment(twines[2], WASM_access.Float32Array_from(orientations[2], 4))

        foot.orientation_pointer = orientations[0];
        lower_leg.orientation_pointer = orientations[1];
        upper_leg.orientation_pointer = orientations[2];

        var kinematic_frames =
        {
            chamber:
            [
                {
                   index: upper_leg,
                   projection: { phase: -Math.PI / 4, radius: 0 },
                   momentum_interval: { phase: -Math.PI/5, radius: Math.PI/5 },
                },  

                {
                   index: lower_leg,
                   projection: { phase: Math.PI / 2, radius: 0 }, 
                   momentum_interval: { phase: -Math.PI/2, radius: Math.PI/2 },
                },
                
                {
                   index: foot,
                   projection: { phase: -Math.PI / 4, radius: 0 }, 
                   momentum_interval: { phase: -Math.PI/2, radius: Math.PI/2 },
                }             
            ],

            kick:
            [
                {
                    index: upper_leg,
                    projection: { phase: -Math.PI / 12, radius: 0 }, 
                    momentum_interval: { phase: -Math.PI/5, radius: 0 }
                },
                
                {
                    index: lower_leg,
                    projection: { phase: 0, radius: 0 }, 
                    momentum_interval: { phase: -Math.PI/5, radius: Math.PI/2 }
                },
                
                {
                    index: foot,
                    projection: { phase: 0, radius: 0 },
                    momentum_interval: { phase: Math.PI/5, radius: Math.PI/2 }
                }
            ],
            
            push:
            [ 
                {
                   index: upper_leg,
                   projection: { phase: Math.PI / 6, radius: 0 }, 
                   momentum_interval: { phase: 0, radius: Math.PI/5 }
                }, 
            ]            
            
        };
        
        kinematic_frames.chamber.next = kinematic_frames.kick;
        
        kinematic_frames.kick.next = kinematic_frames.push;
        
        kinematic_frames.push.next = undefined;
        
        var frame;
        
        kinematic_frames.root = kinematic_frames.chamber;
        
 //       frame = 
        
        kinematic_frames.chamber.root = kinematic_frames.chamber[0]; 
        kinematic_frames.chamber[0].next = kinematic_frames.chamber[1]; 
        kinematic_frames.chamber[1].next = kinematic_frames.chamber[2]; 
        kinematic_frames.chamber[2].next = undefined;         
        
        
        kinematic_frames.chamber.next = kinematic_frames.kick;
        
        kinematic_frames.kick.root = kinematic_frames.kick[0]; 
        kinematic_frames.kick[0].next = kinematic_frames.kick[1]; 
        kinematic_frames.kick[1].next = kinematic_frames.kick[2]; 
        kinematic_frames.kick[2].next = undefined;                 
        
        
        kinematic_frames.kick.next = kinematic_frames.push;
        
        kinematic_frames.push.root = kinematic_frames.push[0];
        kinematic_frames.push[0].next = undefined;
        
        
        kinematic_frames.push.next = undefined;

        
        
		this.ID = cycle_count;
		cycle_count++;

        this.masses = [ upper_leg, lower_leg, foot ];
        
		this.upper_leg = upper_leg;
		this.lower_leg = lower_leg;
		this.foot = foot;
			
		this.elapsed_time = 0;
			
        this.projected_time = { phase: 0, radius: 0 };    
           	
		var elapsed_time = this.elapsed_time;
        
        this.phase_delta = 0;
        
        this.WASM_object = WASM_access.create_leg_controller(synapse);
    
    
    
    
        this.action = function(sequence, projected_time, index)
        {
            sequence = Timer.sequence.radius;     
                    
            for (var component = kinematic_frames[index].root; component != undefined; component = component.next)
            {                  
                var delta = component.projection.phase - component.index.orientation[3];
                WASM_access.forward_kinematic_frame_projection(projected_time, delta, component.momentum_interval.phase, component.momentum_interval.radius, component.index.twines);        
            }    
            
        }.bind(this);
	};	
   
const COMPONENT_TYPE_SCHEMATIC = 0;
const COMPONENT_TYPE_GLYPH = 1;
const COMPONENT_TYPE_PATTERN = 2;   
   
Patterns = [];

Patterns[Model.PELVIS_DEFINITION] = 
{
  input_count: 1,
  path_count: 2,
  orbit_count: 1,

  orbits: 
  [
    [[0, 0, 0], [1, 0, 0, 0], [0, 0, 0]]   
  ],
  
  inputs: [40],
  
  paths: [ {start: 6, end: 5}, {start: 6, end: 2} ],

  component_count: 4,
  
  components: [  
                  { 
                    type: COMPONENT_TYPE_GLYPH,          

                    template_index: Model.PELVIS_DEFINITION,                    
                  
                    primitive_initiations: [0, 0, 0],

                    primitive_extractions: [],
                    
                    parameter_insertions: [],
                    
                    trace_insertions: [0, 0],
                    
                    trace_extractions: []
                  },
                  
                  { 
                    type: COMPONENT_TYPE_PATTERN,
                    
                    template_index: Model.LOWER_LEG_DEFINITION,                                        
                  
                    primitive_initiations: [0, 3, 2,   1, 3, 3], 
                                      
                    primitive_extractions: [],
                    
                    parameter_insertions: [],
                    
                    trace_insertions: [],
                    
                    trace_extractions: []
                  },
                  
                  { 
                    type: COMPONENT_TYPE_PATTERN,
             
                    template_index: Model.LOWER_LEG_DEFINITION,                    
             
                    primitive_initiations: [0, 3, 4,   1, 3, 5], 
                                      
                    primitive_extractions: [],
                    
                    parameter_insertions: [],
                    
                    trace_insertions: [],
                    
                    trace_extractions: []
                  }, 
                  
                  { 
                    type: COMPONENT_TYPE_SCHEMATIC, 

                    template_index: Model.PELVIS_DEFINITION,                                        
                  
                    primitive_initiations: [40, 3, 0], 
                  
                    primitive_extractions: [0, 0],
                    
                    parameter_insertions: [56, 6,   63, 6],
                    
                    trace_insertions: [],
                    
                    trace_extractions: []                  
                  }, 
              ],  
  
  primitive_extractions: [ [], [], [], [] ],

  parameter_insertions: [ [], [], [], [] ],
  
  constructor: pelvis_controller
};    

Patterns[Model.GUI_DEFINITION] = 
{
  input_count: 1,
  path_count: 0,
  orbit_count: 1,

  orbits: 
  [
    [[0, 0, 0], [1, 0, 0, 0], [0, 0, 0]]   
  ],
  
  inputs: [0],
  

  paths: [/* {start: 6, end: 5}, {start: 6, end: 2} */],

  component_count: 2,
  
    components: [  
                  { 
                    type: COMPONENT_TYPE_GLYPH,
                    
                    template_index: Model.GUI_DEFINITION,
                                    
                    primitive_initiations: [0, 0, 0],
                  
                    primitive_extractions: [],
                    
                    parameter_insertions: [],
                    
                    trace_insertions: [],
                    
                    trace_extractions: []
                  },
                  
                  { 
                    type: COMPONENT_TYPE_SCHEMATIC,                  

                    template_index: Model.GUI_DEFINITION,
                    
                    primitive_initiations: [0, 0, 0], 
                                      
                    primitive_extractions: [],
                    
                    parameter_insertions: [],
                    
                    trace_insertions: [],
                    
                    trace_extractions: []
                  }, 
                ],  
  
  
  
  constructor: function(){}
  
};    

Patterns[Model.LOWER_LEG_DEFINITION] = 
{
  input_count: 1,
  path_count: 2,
  orbit_count: 3,

  orbits: 
  [
    [[0, -35, 0], [1, 0, 0, 0], [0, 10, 0]],
    [[0, -50, 0], [1, 0, 0, 0], [0, 25, 0]],
    [[0, 0, 0], [1, 0, 0, 0], [0, 25, 0]]    
  ],
  
  inputs: [138],
  
  paths: [ {start: 2, end: 1}, {start: 1, end: 0} ],
 
  component_count: 2, 
 
 
   components: [  
                  { 
                    type: COMPONENT_TYPE_GLYPH,
                    
                    template_index: Model.LOWER_LEG_DEFINITION,
                                    
                    primitive_initiations: [0, 0, 0], 
                  
                    primitive_extractions: [],
                    
                    parameter_insertions: [],
                    
                    trace_insertions: [],
                    
                    trace_extractions: []                  
                  }, 
                  
                  
                  {
                    type: COMPONENT_TYPE_SCHEMATIC,
                    
                    template_index: Model.LOWER_LEG_DEFINITION,                    
                  
                    primitive_initiations: [138, 3, 0],
                    
                    primitive_extractions: [0, 0,   32, 1,   64, 2,    64, 3],
                    
                    parameter_insertions: [168, 2,    170, 3,   172, 4,   179, 2,    185, 3,    191, 4  ],
                    
                    trace_insertions: [],
                    
                    trace_extractions: []
                  }, 
              ],   
 
  constructor: leg_controller
};    