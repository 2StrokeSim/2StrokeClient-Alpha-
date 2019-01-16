var transform_vertexes = function(transform, vertex_source, normal_source, texcoord_source, vertex_destination, normal_destination, texcoord_destination, source_start, destination_start, count)
{
    var vector = [];
    for (var index = 0, vertex_source_index = source_start*3, texcoord_source_index = source_start*2, vertex_destination_index = destination_start*3, texcoord_destination_index = destination_start*2; 
                  index < count; vertex_source_index+=3, texcoord_source_index+=2, vertex_destination_index+=3, texcoord_destination_index+=2, index++)
    {
        vector[0] = vertex_source[vertex_source_index]; 
        vector[1] = vertex_source[vertex_source_index + 1]; 
        vector[2] = vertex_source[vertex_source_index + 2];
        
                console.log("input: " + vector);
        
        vec3.transformMat4(vector, vector, transform);
        
        console.log("output: " + vector);
        
        vertex_destination[vertex_destination_index] = vector[0];
        vertex_destination[vertex_destination_index + 1] = vector[1];
        vertex_destination[vertex_destination_index + 2] = vector[2];
        
        vector[0] = normal_source[vertex_source_index]; 
        vector[1] = normal_source[vertex_source_index + 1]; 
        vector[2] = normal_source[vertex_source_index + 2];
        
        vec3.normalize(vector, vec3.transformMat4(vector, vector, transform));
        
        normal_destination[vertex_destination_index] = vector[0];
        normal_destination[vertex_destination_index + 1] = vector[1];
        normal_destination[vertex_destination_index + 2] = vector[2];
        
        normal_destination[vertex_destination_index] = vector[0];
        normal_destination[vertex_destination_index + 1] = vector[1];
        normal_destination[vertex_destination_index + 2] = vector[2];
        
        texcoord_destination[texcoord_destination_index] = texcoord_source[texcoord_source_index];
        texcoord_destination[texcoord_destination_index + 1] = texcoord_source[texcoord_source_index+1];
    }
};

var create_vertex_arc = function(vertex_destination, normal_destination, texcoord_destination, destination_index, radius, start_angle, end_angle, vertex_count, transform, facing = 1, indexes)
{
    var indexes = [];

//        if (derp != undefined) {derp = mat4.multiply([], transform, mat4.fromYRotation([], -Math.PI * 0.2));}
  //  else {derp = transform;}

    var span = end_angle - start_angle;
    var vertex_separation = span / (vertex_count - 1);
   
    var offset1 = 1;
    var offset2 = 2;   
   
    if (facing == 0)
    {
        var offset1 = 2
        var offset2 = 1;
    }
    
    for (var i = 0, angle = start_angle; i < vertex_count; i++, angle += vertex_separation)
    {        
        indexes[i] = destination_index+i;
        var vertex = [radius*Math.sin(angle), 0, radius*Math.cos(angle)];
        vec3.transformMat4(vertex, vertex, transform);
            
        vertex_destination[indexes[i]*3] = vertex[0]; 
        vertex_destination[indexes[i]*3+offset1] = vertex[1]; 
        vertex_destination[indexes[i]*3+offset2] = vertex[2];
            
        var normal = vec3.normalize([], vertex);
        normal_destination[indexes[i]*3] = normal[0]; 
        normal_destination[indexes[i]*3+offset1] = normal[1]; 
        normal_destination[indexes[i]*3+offset2] = normal[2];    

        texcoord_destination[indexes[i]*2] = 0;
        texcoord_destination[indexes[i]*2+1] = 0;
    }
    
    return indexes;
};

create_vertex_arc.facing_inward = 0;
create_vertex_arc.facing_outward = 1;
/*
var create_successive_alternating_vertex_arcs = function( index_destination, vertex_destination, normal_destination, texcoord_destination, vertex_destination_index, destination_index, radius, transform, 
                                                                    bottom, top, left, right, horizontal_vertex_count, arc_count, stagger_order = 0, metric_index = 1, vertex_arcs = [], arc_start, vertex_start = 0, stagger_alignment = 0)
{
    if (arc_start == undefined) 
    {
        arc_start = vertex_arcs.length;
    }
    
    var radial_metric = create_tri_cylindrical_section.metrics[metric_index];
        
    var span = right - left;
    
    var tri_width = span / ((horizontal_vertex_count) * 0.5);
    var tri_height = 1.0 / (arc_count-1);
    
    var longitudinal_angle_ratio = (top-bottom);
    
    var offset = tri_width * 0.5;
    
    var even_vertex_count;   
    var odd_vertex_count;
    
    var even;
    var odd;
   
    even_vertex_count = horizontal_vertex_count-1;   
    odd_vertex_count = horizontal_vertex_count;
        
    var longitude;
    var longitudinal_angle;
    var weld; 
        
    for (var i = 0, vertex_index = vertex_destination_index, arc_index = arc_start; i < arc_count; i++, vertex_index+= even_vertex_count, arc_index++)
    {
        longitude = i*tri_height;
        longitudinal_angle = bottom + (longitude*longitudinal_angle_ratio);
                
        vertex_arcs[arc_index] = create_vertex_arc(vertex_destination, normal_destination, texcoord_destination, vertex_index, Math.sin(longitudinal_angle) * radius, left, right, odd_vertex_count, 
                                                                                       mat4.multiply([], transform, mat4.fromRotationTranslation([], quat.setAxisAngle([], [0, 1, 0], 0), [0.0, longitude, 0.0])));
        i++;
        if (i >= arc_count) { break; }
        vertex_index+= odd_vertex_count;
        arc_index++;
        
        longitude = i*tri_height;
        longitudinal_angle = bottom + (longitude*longitudinal_angle_ratio);
        
        vertex_arcs[arc_index] = create_vertex_arc(vertex_destination, normal_destination, texcoord_destination, vertex_index, Math.sin(longitudinal_angle) * radius, left+offset, right-offset,  even_vertex_count, 
                                                                                        mat4.multiply([], transform, mat4.fromRotationTranslation([], quat.setAxisAngle([], [0, 1, 0], 0), [0.0, longitude, 0.0])));     
    }

     return vertex_arcs;
};*/
           
var create_successive_vertex_arcs = function( vertex_destination, normal_destination, texcoord_destination, vertex_destination_index, radius, transform, 
                                                                       parameters, vertex_arcs = [], arc_start, vertex_start = 0)
{
    if (arc_start == undefined) 
    {
        arc_start = vertex_arcs.length;
    }
    
    var radial_metric = Math.sin;

    var longitude = 0;
 
   var vertex_index = vertex_destination_index;
   
   for (var i = 0, vertex_index = vertex_destination_index; i < parameters.length; i++)
   {   
        for (var j = 0, arc_index = parameters[i].start + arc_start; j < parameters[i].arc_count; j++, vertex_index+= parameters[i].vertex_count, arc_index += parameters[i].step)
        {
            vertex_arcs[arc_index] = parameters[i];              
        }    
    }
    
   longitude = 0;
    
   var arc; 
    
   for (var arc_index = arc_start, vertex_index = vertex_destination_index; arc_index < vertex_arcs.length; vertex_index += vertex_arcs[arc_index].vertex_count, vertex_arcs[arc_index] = arc, arc_index++)
   {
       longitudinal_angle =  vertex_arcs[arc_index].phase + (longitude*vertex_arcs[arc_index].differential);

        arc = create_vertex_arc(vertex_destination, normal_destination, texcoord_destination, vertex_index, Math.sin(longitudinal_angle) * radius, vertex_arcs[arc_index].left, vertex_arcs[arc_index].right, vertex_arcs[arc_index].vertex_count, 
                                                                                           mat4.multiply([], vertex_arcs[arc_index].transform, mat4.fromRotationTranslation([], quat.setAxisAngle([], [0, 1, 0], 0), [0.0, longitude, 0.0])));

        longitude += vertex_arcs[arc_index].separation;                                                                                   
   } 
    return vertex_arcs;
};

var create_vertex_line_with_coordinates = function(vertex_destination, normal_destination, texcoord_destination, destination_index, coordinate_series, vertex_count, transform,
                                                                              normal_mode = 0, normal_map)
{
    var z = 0;
    var normal = [0, 1, 0];
    var vertex = [0, 0, 0];
    
    var slope = 0;
    
    var vertex_indexes = [];                
                
    for (var i = 0; i < vertex_count; i++)
    {        
        vertex_indexes[i] = destination_index + i;
        var vertex_index = (vertex_indexes[i]) * 3;
        var y_delta = coordinate_series[i][1] - vertex[1];
        var sign = 1;
        if (coordinate_series[i][2] < 0) sign = -1;
      
        slope = y_delta / (y_delta  + (sign * coordinate_series[i][2]));
        z += coordinate_series[i][2];
         
        vertex[0] = coordinate_series[i][0];
        vertex[1] = coordinate_series[i][1];
        vertex[2] = z;  

        console.log(vertex_index);
        
        vec3.transformMat4(vertex, vertex, transform);
        
        vertex_destination[vertex_index] = vertex[0];
        vertex_destination[vertex_index+1] = vertex[1];
        vertex_destination[vertex_index+2] = vertex[2];
        
        vec3.transformMat4(normal, [0, slope * sign, (1 - slope) * sign], transform);
        
        vec3.normalize(normal, normal);
        
        normal_destination[vertex_index] = normal[0];
        normal_destination[vertex_index+1] = normal[1];
        normal_destination[vertex_index+2] = normal[2];

        texcoord_destination[(destination_index + i) * 2]  = 0;
        texcoord_destination[(destination_index + i) * 2 + 1]  = 0;                
    }
    
    return vertex_indexes;
}

create_vertex_line_with_coordinates.INTERPOLATED_NORMAL_MODE = 0;
create_vertex_line_with_coordinates.SPLIT_NORMAL_MODE = 1;
create_vertex_line_with_coordinates.DUMB_NORMAL_MODE = 2;
create_vertex_line_with_coordinates.MAPPED_NORMAL_MODE = 3;