// JC: Sits at the head of the code, with handy little bits and pieces

'use strict'

const null_array = [];
const null_object = {};

var null_function = function(){};

var temp_heap = {phase: 0, radius: 0, last: undefined, next: undefined};
var allocate_temp_var = function()
{
};