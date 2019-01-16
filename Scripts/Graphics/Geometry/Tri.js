var create_tri_strip_on_sphere = function( index_destination, vertex_destination, normal_destination, texcoord_destination, vertex_destination_index, destination_index, radius, transform, 
                                                                    bottom, top, left, right, tri_count)
{
    var upper_ring_indexes = [];
    var lower_ring_indexes = [];
    
    var upper_ring = [];
    var lower_ring = [];
        
    var even_vertex_count = ((tri_count + (tri_count % 2)) / 2) + 1;   
    var odd_vertex_count = ((tri_count - (tri_count % 2)) / 2) + 1;
    
    var span = right - left;
    
    var tri_width = span / ((tri_count + 1) * 0.5);
    
    var offset = tri_width * 0.5;
    
    var even = mat4.multiply([], transform, mat4.fromYRotation( [], -left ));
    var odd = mat4.multiply([], transform, mat4.fromYRotation( [], -left -offset ));  
    
    var even = mat4.multiply([], transform, mat4.fromYRotation( [], -left ));
    var odd = mat4.multiply([], transform, mat4.fromYRotation( [], -left -offset ));  
    
    
    upper_arc_indexes = create_inner_radius_vertex_arc(vertex_destination, normal_destination, texcoord_destination, vertex_destination_index, radius, span-offset,  even_vertex_count, 
                                                                                    mat4.multiply([], even, mat4.fromRotationTranslation([], quat.setAxisAngle([], [0, 1, 0], 0), [0.0, radius*Math.sin(top - Math.PI), 0.0]))); 
                                                                                    
    lower_arc_indexes = create_inner_radius_vertex_arc(vertex_destination, normal_destination, texcoord_destination, vertex_destination_index+even_vertex_count, radius, span-offset, odd_vertex_count, 
                                                                                   mat4.multiply([], odd, mat4.fromRotationTranslation([], quat.setAxisAngle([], [0, 1, 0], 0), [0.0, -radius*Math.sin(Math.PI - bottom), 0.0])));
    
    var weld = flat_tri_weld_linearly_indexed_one_to_one_simply_ordered(upper_arc_indexes, lower_arc_indexes, index_destination, 0, 0, destination_index, tri_count);
    
    return {index: index_destination, upper_arc: weld.side_one, lower_arc: weld.side_two}
}

var create_tri_cylindrical_section = function( index_destination, vertex_destination, normal_destination, texcoord_destination, vertex_destination_index, destination_index, radius, transform, 
                                                                    bottom, top, left, right, horizontal_tri_count, vertical_tri_count, parity = 0, metric_index = 1, first_arc, last_arc, right_edge, left_edge)
{
    var vertex_arcs = create_successive_alternating_vertex_arcs( index_destination, vertex_destination, normal_destination, texcoord_destination, vertex_destination_index, destination_index, radius, transform, 
                                                                                                                bottom, top, left, right, horizontal_tri_count+1, vertical_tri_count+1, parity/*, vertex_arcs, arc_start, vertex_start*/);
                                                                              
    weld = composite_tri_weld( vertex_arcs, index_destination, vertex_destination, normal_destination, texcoord_destination, vertex_destination_index, destination_index, 
                                             horizontal_tri_count, vertex_arcs.length, parity)
   
    return {index: index_destination};
}

var create_cylindrical_section = function( index_destination, vertex_destination, normal_destination, texcoord_destination, vertex_destination_index, destination_index, radius, transform, 
                                                                    bottom, top, left, right, horizontal_tri_count, vertical_tri_count, parity = 0, metric_index = 1, first_arc, last_arc, right_edge, left_edge)
{
    var band_parameters = [];
    
   var horizontal_vertex_count = horizontal_tri_count +1;

    even_vertex_count = (((horizontal_vertex_count-1) + ((horizontal_vertex_count-1) % 2)) / 2) + 1;   
    odd_vertex_count = (((horizontal_vertex_count-1) - ((horizontal_vertex_count-1) % 2)) / 2) + 1;
   
    parameters[0] = { vertex_count: odd_vertex_count, start: 0, arc_count: 2, separation: 1.0, transform: mat4.fromRotationTranslation([], quat.setAxisAngle([], [0, 0, 1], 0), [0.0, 0, -0.0]), left: Math.PI * 0.5, right: Math.PI * 1.5, step: 2 }  
    parameters[1] = { vertex_count: even_vertex_count, start: 1, arc_count: 1, separation: 1.0, transform: mat4.fromRotationTranslation([], quat.setAxisAngle([], [0, 0, 1], 0), [0.0, 0, -0.0]), left: Math.PI * 0.5, right: Math.PI * 1.5, step: 2 }  
   
    var vertex_arcs = create_successive_vertex_arcs( vertex_destination, normal_destination, texcoord_destination, vertex_destination_index, radius, transform, 
                                                                                                                bottom, top, left, right, parameters, 5, 2, 0);
 
 //   parameters[0] = { vertex_count: odd_vertex_count, start: 0, arc_count: 2, separation: 0.5, transform: mat4.fromRotationTranslation([], quat.setAxisAngle([], [0, 0, 1], 0), [0.0, 0, -0.0]), left: Math.PI * 0.5, right: Math.PI * 1.5, step: 2 }  
 //   parameters[1] = { vertex_count: even_vertex_count, start: 1, arc_count: 1, separation: 0.5, transform: mat4.fromRotationTranslation([], quat.setAxisAngle([], [0, 0, 1], 0), [0.0, 0, -0.0]), left: Math.PI * 0.5, right: Math.PI * 1.5, step: 2 }  

 
//   create_successive_alternating_vertex_arcs( vertex_destination, normal_destination, texcoord_destination, vertex_destination_index, radius, transform, 
//                                                                                                                bottom, top, left, right, parameters, 5, 2, 1, 1, vertex_arcs, 3);

    parameters[0] = {winding: 0, order: 1, start: 0, step: 2, count: 4, successions: 1};
    parameters[1] = {winding: 1, order: 1, start: 1, step: 2, count: 4, successions: 1};    
                                                                                                
   var weld = composite_tri_weld( vertex_arcs, index_destination, vertex_destination, normal_destination, texcoord_destination, vertex_destination_index, destination_index, parameters,
                                                    4, 1, 0)
}

var successive_tri_weld = function( vertex_arcs, index_destination, vertex_destination, normal_destination, texcoord_destination, vertex_destination_index, destination_index, 
                                                        tri_count, succession_count=1, start = 0, order = 0, winding = 1, step = 1)                                                        
{
   var weld;
   
    if (order == 0)
    {
        even = 0;
        odd = 1;
    }
    else
    {
        even = 1;
        odd = 0;
    }
   
   if (winding == 1)
    {
        winding = even;
    }
    else
    {
        winding = odd;
    }
    
    for (var i = 0, arc_index = start, index = destination_index; i < succession_count; i++, arc_index += step, index += tri_count * 6 * step)
    {             
        weld = flat_tri_weld_linearly_indexed_one_to_one_simply_ordered(vertex_arcs[arc_index+odd], vertex_arcs[arc_index+even], index_destination, 0, 0, index, tri_count, winding);
    }      
    
    return weld;
};

var composite_tri_weld = function( vertex_arcs, index_destination, vertex_destination, normal_destination, texcoord_destination, vertex_destination_index, destination_index, 
                                                       parameters)
{
    var welds = []; 
 
//    var parameters = [];
    
 //   parameters[0] = {winding: 0, order: 1, start: 0, step: 2, count: tri_count, successions: 1};
//    parameters[1] = {winding: 1, order: 1, start: 1, step: 2, count: tri_count, successions: 1};    
    
   for (var i = 0; i < parameters.length; i++)
   {
        welds[i] = successive_tri_weld( vertex_arcs, index_destination, vertex_destination, normal_destination, texcoord_destination, vertex_destination_index, destination_index, 
                                                      parameters[i].count, parameters[i].successions, parameters[i].start, parameters[i].order, parameters[i].winding, parameters[i].step)    
   }                              
/*
    for (var i = 2, index = destination_index + tri_count * 6; i < arc_count; i+=2, index += tri_count * 12)
    {             
         weld = flat_tri_weld_linearly_indexed_one_to_one_simply_ordered(vertex_arcs[i-even], vertex_arcs[i-odd], index_destination, 0, 0, index, tri_count, odd);
    }                  */       
 
 /*   for (var i = 1, index = destination_index; i < arc_count; i++, index += tri_count * 6)
    {             
        weld = flat_tri_weld_linearly_indexed_one_to_one_simply_ordered(vertex_arcs[i-odd], vertex_arcs[i-even], index_destination, 0, 0, index, tri_count, even);
    }*/                                                                               

   /* for (var i = 2, index = destination_index + tri_count * 6; i < arc_count; i+=2, index += tri_count * 12)
    {             
         weld = flat_tri_weld_linearly_indexed_one_to_one_simply_ordered(vertex_arcs[i-even], vertex_arcs[i-odd], index_destination, 0, 0, index, tri_count, odd);
    }*/       
    
//    return {index: index_destination, upper_arc: weld.side_one, lower_arc: weld.side_two}
}


create_tri_cylindrical_section.identity = function(angle) { return angle; };

create_tri_cylindrical_section.metrics = [];

// TODO: Global metric list!
create_tri_cylindrical_section.metrics[0] = create_tri_cylindrical_section.identity;
create_tri_cylindrical_section.metrics[1] = Math.sin;


// Sources are index arrays, 
// destination: resultant tri index array
var flat_tri_weld_meta_indexed_one_to_one_simply_ordered = function(source_one, source_two, destination, source_indexes_one, source_indexes_two, destination_index, count)
{        
    var side_one = [];
    var side_two = [];
    
    for (var i = 0; i*2 < count; i++)
    {
        side_two[i*3] = i*6 + destination_index;        
        side_one[i*3] = i*6 + destination_index + 1;
        side_one[i*3+1] = i*6 + destination_index + 2;       

        destination[i*6 + destination_index] = source_two[source_indexes_two[i]];
        destination[i*6 + destination_index + 1] = source_one[source_indexes_one[i]];
        destination[i*6 + destination_index + 2] = source_one[source_indexes_one[i+1]];

        if ((2 * i) + 1 >= count) break;
        
        side_one[i*3+2] = i*6 + destination_index;        
        side_two[i*3+1] = i*6 + destination_index + 1;
        side_two[i*3+2] = i*6 + destination_index + 2;        
        
        destination[i*6 + destination_index + 3] = source_one[source_indexes_one[i+1]];
        destination[i*6 + destination_index + 4] = source_two[source_indexes_two[i+1]];
        destination[i*6 + destination_index + 5] = source_two[source_indexes_two[i]];   
    }
    
    return { side_one: side_one, side_two: side_two };
};    

// Sources are index arrays, 
// destination: resultant tri index array
var flat_tri_weld_linearly_indexed_one_to_one_simply_ordered = function(source_one, source_two, destination, source_index_one, source_index_two, destination_index, count, winding = 0)
{        
    var side_one = [];
    var side_two = [];
    
    var offset1 = 1;
    var offset2 = 2;
    
    var offset4 = 4;
    var offset5 = 5;
    
    if (winding == 1)
    { 
        offset1 = 2; 
        offset2 = 1; 
        offset4 = 5;
        offset5 = 4;
    }
    
    for (var i = 0; i*2 < count; i++)
    {
        side_two[i*3] = i*6 + destination_index;        
        side_one[i*3] = i*6 + destination_index + offset1;
        side_one[i*3+1] = i*6 + destination_index + offset2;       

        destination[i*6 + destination_index] = source_two[source_index_two+i];
        destination[i*6 + destination_index + offset1] = source_one[source_index_one+i];
        destination[i*6 + destination_index + offset2] = source_one[source_index_one+i+1];

        if ((2 * i) + 1 >= count) break;
        
        side_one[i*3+2] = i*6 + destination_index + 3;        
        side_two[i*3+1] = i*6 + destination_index + offset4;
        side_two[i*3+2] = i*6 + destination_index + offset5;        
        
        destination[i*6 + destination_index + 3] = source_one[source_index_one+i+1];
        destination[i*6 + destination_index + offset4] = source_two[source_index_two+i+1];
        destination[i*6 + destination_index + offset5] = source_two[source_index_two+i];   
    }
    
    return { side_one: side_one, side_two: side_two };
};    



var orient_tri_face_in_general_direction = function(vertex_source, texcoord_destination, normal_destination, index_destination, index, destination_index, general_direction)
{
    var normal = get_tri_plane_normal_indexed(vertex_source, index_destination, destination_index);

    if (vec3.dot(normal, general_direction) < 0.0)
    {
        flip_vertex_index_winding(index_destination, normal_destination, texcoord_destination, index_destination, normal_destination, texcooord_destination, vertex_destination_index, destination_index, destination_index);
    }    
    
    return normal;
};