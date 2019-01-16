var Mechanisms = [];

// Uses a mapping to move elements from specific indexes in one array to specific indexes in another
// Mapping is of the for of an array of objects of form { source_index: /*source array index*/, destination_index: /*destination array index*/ }
var array_to_array_substitution = function(source, destination, mapping)
{		
	for (var parameter_index = 0; parameter_index < mapping.length; parameter_index++ )
	{
		destination[mapping[parameter_index].destination_index] = source[mapping[parameter_index].source_index];
	}
}		

// CAVEAT: clones the destination element array, then replaces the destination element array in the shallow parameter clone that is the destination. Feels icky doing it from here, but it seems the best way without thinking too much on it.
var array_to_subarray_fill = function(source, destination, mapping)
{
	var result = destination[mapping.destination_index].slice();
	
	for (var parameter_index = 0; parameter_index < mapping.source_indexes.length; parameter_index++ )
	{
		if (result[parameter_index] == undefined)
		{
			result[parameter_index] = (source[mapping.source_indexes[parameter_index]]);
		}
	}
	
	destination[mapping.destination_index] = result;
}				

const PARAMETERS = 0;
const COMPONENTS = 1;
const MACROS = 2;

var Mechanism = function(mechanism_index, parameters)
{	
	return new Mechanisms[mechanism_index](...parameters);
}

const GUI_MECHANISM = 0

const LEG_MECHANISM = 1;
const PELVIS_MECHANISM = 2;
const TORSO_MECHANISM = 3;
const PHOTONIC_POINT_RADIANCE_MECHANISM = 4;