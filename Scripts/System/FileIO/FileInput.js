// This is done asynchronously; so, naturally, don't expect synchronous things from it.
// Sends a JSON object parsed from the file to a specified handler function
// TODO: Error checking/handling for both file integrity and JSON parsing

function FileInput(){}

FileInput.load = function(File, Handler)
{
	this.handler = Handler;
	var reader = new FileReader();
	
	reader.onload = function(Event) 
	{ this.handler(JSON.parse(Event.target.result)); }.bind(this);
		
	reader.readAsText(File);
}