var network = function( exports )
{
	var io;// = io(http);
	var port;// = process.env.PORT || 3000;
	
	exports.server_messages = ['state', 'delta'];
	
	exports.client_messages = ['chat message'];	
	
	var set_dispatch = function(socket, responses)
	{
		for (var i = 0; i < responses.length; i ++)
		{
			socket.on(responses[i].name, responses[i].dispatch);
		}
	}
	
	exports.set_dispatch = function(socket, messages, responses)
	{	
		for (var i = 0; i < messages.length; i ++)
		{
			socket.on(messages[i], responses[i]);
		}
	}
	
	return exports;
};


var NODE = false;    
if (typeof process === 'object') {
  if (typeof process.versions === 'object') {
    if (typeof process.versions.node !== 'undefined') {
      NODE = true;
    }
  }
}
// Create exports for Node.js
if (NODE)
{
	network( exports );
}
// create define() for Requirejs
else 
{
	define([], function () 
	{
		return network( {} ); 
	});
}
