const STANCE_COMPONENT = 0;
const STANCE_ORBIT_FRAME = 1;

var Mechanic = [];

// TODO: This is all crap. Fix all this crap. 
// TODO: Mostly, it's all this "phase/radius" binomial crap I was doing to (poorly) compromise with Javascript's lack of primitive data type pointers, 
// which is now unnecessary thanks to WASM

var cycle_count = 0;

var limb_segment = function(twines, orientation)
{
	this.ID = cycle_count;
	cycle_count++;
	
	this.orientation = orientation;
	this.twines = twines;
    this.projection = {phase:0, radius:0};
    this.momentum_interval = {phase:0, radius:0};
    this.projected_time = 0;
	this.elapsed_time = 0;
};