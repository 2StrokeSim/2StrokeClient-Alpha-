function Connection()
{	
	var products = [];
	var factors = [];
	var constraints = [0, GREATEST_POSSIBLE];

	var sublimits = [];
	
	var poles = [];
	
	var event;
	
	var velocity = 0;
	
	var phase = function(constraint, connections, op_set, domain)
	{	
		var polarity = 1;
	
		this.return_phase_functions_todo_bootstrap_hack_remove_pls = function()
		{
			return this.reflect;
		}.bind(this);
	
		if (constraint == undefined) constraint = [0, GREATEST_POSSIBLE];
		
		this.reflect = function()
		{
			return { next: op_set };
		}.bind(this)
		
		this.impulse = function()
		{
			if (op_set != undefined)
			{
				var reflection = op_set[0].op[0]();
				
				for (var i = 0; i < connections.length; i++)
				{
					op_set[0].op[1](connections[i]);					
				}

				op_set = reflection.next;

				schedule(0);
			}
		}.bind(this);	

		this.project = function(time)
		{
			return time;
		}.bind(this);
		
		domain.constrain(constraint, polarity)
	};
		
	this.constrain = function(position, polarity)
	{
		var index = (polarity + 1) / 2;
		if (constraints[index] * polarity < position * polarity) return; // TODO: phase needs to be linked after closer phase
		
		constraints[index] = position;
	}
			
	var projections = [];
	
	this.project = function(link)
	{
		link.propagate({ position: position, velocity: velocity }); 
		projections.push(link);
	}.bind(this);
	
	this.next = undefined;

	var interval = function(constraint)
	{
		return Math.abs(constraint[0] - position[0]);
	};
	
	this.inject = function(differential)
	{		
		factors.push(differential);
		
		velocity += differential.velocity();
		
		for (var i =0; i < projections.length; i++)
		{
			projections[i].update(velocity);
		}
		schedule();
	};
	
	var schedule = function()
	{
		if (velocity == 0) return;
		var time;
		
		if (velocity > 0)
		{ time = (constraints[1] - position[0]) / velocity; }
		else
		{ time = (constraints[0] - position[0]) / velocity; }
	
		event = Timer.schedule( time, this.impulse, event );
	}.bind(this);
	
	this.impulse = function()
	{
		state.impulse();
	}.bind(this);
	
//	var state = new phase(	phases[0].constraint, phases[0].connections, phases[0].op_set, this);

//	this.return_phase_functions_todo_bootstrap_hack_remove_pls = state.return_phase_functions_todo_bootstrap_hack_remove_pls;
	

	
	
//	this.reflect = state.reflect;
}