function StringParse(){}

StringParse.match_opening_bracket = function(String, Start)
{
	var start = String.indexOf("{", Start);
	if (start == -1) return -1;
	var depth;
	var index;
	for (index = start+1, depth = 1; index < String.length; index++)
	{
		if (String[index] == '}') depth--;
		else if (String[index] == '{') depth++;
		
		if (depth == 0) return index;
	}
	
	return -1;
}

StringParse.indexOfWithinScope = function(Char, String, StartIndex)
{
	var depth = 0;
	var next = 0; 
	var start_index = 0;
	if (StartIndex != undefined){var next = StartIndex; var start_index = StartIndex;}
	var current_index;
	
	for(;;)
	{
		next = String.indexOf(Char, next+1);
		if (next == -1) return -1;
		
		start_index = String.indexOf("{", start_index);
		current_index;
		
		for (current_index = start_index;;depth++)
		{
			current_index = String.indexOf("{", current_index+1);
			if (current_index > next || current_index == -1) break;
		}
		
		if (depth==0) return next;
		
		for (current_index = start_index;;depth--)
		{
			current_index = String.indexOf("}", current_index+1);
			if (current_index > next || current_index == -1) break;
		}
		
		if (depth==0) return next;
	}
}


