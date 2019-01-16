var flat_quad_weld_linearly_indexed_one_to_one_simply_ordered = function(source_one, source_two, destination, source_index_one, source_index_two, destination_index, count, polarity = 0, general_normal_direction)
{        
    var side_one = [];
    var side_two = [];
    
    if (polarity == 0)
    {
        var modulo_zero = 0;
        var modulo_one = 1;
    }
    else if (polarity == 1)
    {
        var modulo_zero = 1;
        var modulo_one = 0;        
    }
    else
    {
        // general normal direction alignment
    }
    
    for (var i = 0, index = destination_index, index_one = source_index_one, index_two = source_index_two; i < count; i++, index_one++, index_two++, index += 6)
    {
        destination[index] = source_one[index_one + modulo_zero];
        destination[index+1] = source_one[index_one+modulo_one];
        destination[index+2] = source_two[index_two+modulo_zero];

        destination[index+3] = source_two[index_two+modulo_zero];        
        destination[index+4] = source_one[index_one+modulo_one];
        destination[index+5] = source_two[index_two+modulo_one];

        side_one[i*3] = index;
        side_one[i*3+1] = index+1;
        side_one[i*3+2] = index+4;
        
        side_two[i*3] = index+2;
        side_two[i*3+1] = index+3;
        side_two[i*3+2] = index+5;        
    }

        return {side_one: side_one, side_two:side_two};
}

var create_symmetric_flat_quad_strip_with_dimensions = function(index_destination, vertex_destination, normal_destination, texcoord_destination, vertex_destination_index, destination_index, coordinate_series, count, transform)
{
    var vertex_pair_count = count+1;

    var left_vertex_index = vertex_pair_count + vertex_destination_index;
    
    create_vertex_line_with_coordinates(vertex_destination, normal_destination, texcoord_destination, vertex_destination_index, coordinate_series, vertex_pair_count, transform);
        
    transform_vertexes(mat4.reflectThroughYZ(), vertex_destination, normal_destination, texcoord_destination, vertex_destination, normal_destination, texcoord_destination, 
                                  vertex_destination_index, left_vertex_index, vertex_pair_count)

//    show_differences([normal_destination, texcoord_destination, vertex_destination], [normalsW, texcoordsW, vertexesW], [data_counts[0], data_counts[1], data_counts[2]], ["normals", "texcoords", "vertexes"]);                                  
                                  
    var right_rail_vertexes = [];
    var left_rail_vertexes = [];
    
    for (var i = 0; i < vertex_pair_count; i++)
    {
        right_rail_vertexes[i] = vertex_destination_index + i;
        left_rail_vertexes[i] = left_vertex_index + i;
    }
    
    var indexes = flat_quad_weld_linearly_indexed_one_to_one_simply_ordered(right_rail_vertexes, left_rail_vertexes, index_destination, 0, 0, destination_index, count, 1);

    return {right_rail_vertexes: right_rail_vertexes, left_rail_vertexes: left_rail_vertexes, right_rail_indexes: indexes.side_one, left_rail_indexes: indexes.side_two};
}

var create_quad_from_unordered_indexed_vertexes = function(vertex_source, index_source, texcoord_destination, normal_destination, index_destination, index, destination_index, general_normal_direction)
{
    var corner_indexes = order_convex_indexed_vertexes(vertex_source, index_source, index_destination, index, destination_index, 0, 4);

    // First four in dest were set in order by order_convex_indexed_vertexes. Move the 4th to the 6th and set 4 and 5 equal to 2 and 1, respectively
    index_destination[destination_index+5] = index_destination[destination_index+3];        
    index_destination[destination_index+3] = index_destination[destination_index+2];
    index_destination[destination_index+4] = index_destination[destination_index+1];
    
    corner_indexes[3] = destination_index+5;
    
    var normal = orient_tri_face_in_general_direction(vertex_source, texcoord_destination, normal_destination, index_destination, index, destination_index, general_normal_direction)  
    orient_tri_face_in_general_direction(vertex_source, texcoord_destination, normal_destination, index_destination, index, destination_index+1, general_normal_direction)      
    
    for (var i = 0; i < 4; i++)
    {
        var normal_destination_index = index_source[i] * 3;
        
        normal_destination[normal_destination_index] = normal[0];
        normal_destination[normal_destination_index+1] = normal[1];
        normal_destination[normal_destination_index+2] = normal[2];
    }
    
    return corner_indexes;
}



var create_quad_from_dimensions = function(width, height, vertex_destination, texcoord_destination, normal_destination, index_destination, vertex_destination_index, destination_index, general_normal_direction)
{
//    var corner_indexes = order_convex_indexed_vertexes(vertex_source, index_source, index_destination, index, destination_index, 0, 4);
     var vertex_index = vertex_destination_index*3;

     vertex_destination[vertex_index] = -width;
     vertex_destination[vertex_index+1] = height;
     vertex_destination[vertex_index+2] = 0;

     vertex_index += 3;
     vertex_destination[vertex_index] = -width;
     vertex_destination[vertex_index+1] = -height;
     vertex_destination[vertex_index+2] = 0;
     
     vertex_index += 3;
     vertex_destination[vertex_index] = width;
     vertex_destination[vertex_index+1] = -height;
     vertex_destination[vertex_index+2] = 0;
     
     vertex_index += 3;
     vertex_destination[vertex_index] = width;
     vertex_destination[vertex_index+1] = height;
     vertex_destination[vertex_index+2] = 0;
 
    
    // First four in dest were set in order by order_convex_indexed_vertexes. Move the 4th to the 6th and set 4 and 5 equal to 2 and 1, respectively
    index_destination[destination_index] = vertex_start;        
    index_destination[destination_index+1] = vertex_start+1;
    index_destination[destination_index+2] = vertex_start+2;
    
    index_destination[destination_index+3] = vertex_start+3;        
    index_destination[destination_index+4] = vertex_start+4;
    index_destination[destination_index+5] = vertex_start+5;
    
    var normal = [0, 0, 1];
    
    for (var i = 0; i < 4; i++)
    {
        var normal_index = index_source[i] * 3;
        
        normal_destination[normal_index] = normal[0];
        normal_destination[normal_index+1] = normal[1];
        normal_destination[normal_index+2] = normal[2];
    }
    
//    return corner_indexes;
}
