// the Graphics enclosure. A function executed on definition that contains/hides all the basic graphics engine code and returns the Graphics constructor.

	var canvas = document.createElement('canvas');
	
	var gl = canvas.getContext("webgl2", {alpha:true, antialias: true});

Graphics = new (function()
{

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
		
	canvas.style.position = 'absolute';
	canvas.style.left = '0px';
	canvas.style.top = '0px';
	
	document.body.appendChild(canvas);

	var pointSizeRange = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE);
	
	var context = canvas.getContext('2d');
	
//	gl.Enable(GL_PROGRAM_POINT_SIZE_EXT);
	
	// this function is executed on each animation frame
	var render = function(Elapsed)
	{	
		
//		interpolations = [];
		
		// on update
//		renderer.clear();

		gl.clearColor(0.1, 0.1, 0.1, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//		gl.clearDepth(0.0);

    // Turn on culling. By default backfacing triangles
    // will be culled.
    gl.enable(gl.CULL_FACE);

    // Enable the depth buffer
    gl.enable(gl.DEPTH_TEST);
	
	//	gl.depthFunc(gl.LEQUAL);
		
        
 		for (var i = 0; i < linkages.length; i++)
		{
			linkages[i].differentiate(Elapsed);
		}		       	
		
 		for (var i = 0; i < views.length; i++)
		{
			views[i].integrate(Elapsed);
		}		       
        
		for (var i = 0; i < views.length; i++)
		{
			views[i].render(Elapsed);
		}
	};
	
	this.insert = function(View)
	{
		views.push(View);
	};
    
     this.link = function(linkage)
	{
		linkages.push(linkage);
	};
	
	var views = [];
    // TODO: Physics/kinematic/animation object, needs to link in/initialize elsewhere
    var linkages = [];

	// TODO: Should be a camera/view function
	screen_position = function(world_coordinates)
	{
		return new THREE.Vector3(world_coordinates.x + renderer_width, world_coordinates.y + renderer_height, world_coordinates.z)
	};
	
		
	var PIXEL_RATIO = (function () 
	{
		var ctx = document.createElement("canvas").getContext("2d"),
			dpr = window.devicePixelRatio || 1,
			bsr = ctx.webkitBackingStorePixelRatio ||
				  ctx.mozBackingStorePixelRatio ||
				  ctx.msBackingStorePixelRatio ||
				  ctx.oBackingStorePixelRatio ||
				  ctx.backingStorePixelRatio || 1;

		return dpr / bsr;
	})();


	var converttoHiPPICanvas = function(w, h, can, ratio) {
		if (!ratio) { ratio = PIXEL_RATIO; }
		can.width = w * ratio;
		can.height = h * ratio;
		can.style.width = w + "px";
		can.style.height = h + "px";
		can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
		return can;
	};

	var createHiPPICanvas = function(w, h, ratio) {
		if (!ratio) { ratio = PIXEL_RATIO; }
		var can = document.createElement("canvas");
		can.width = w * ratio;
		can.height = h * ratio;
		can.style.width = w + "px";
		can.style.height = h + "px";
		can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
		return can;
	};	
		
	this.handles = function()
	{
		return {
			WebGLDevice: gl,
			Canvas: canvas
		}
	}
			
		/*	    window.addEventListener('resize', function() {
		  var WIDTH = window.innerWidth,
			  HEIGHT = window.innerHeight;
		  renderer.setSize(WIDTH, HEIGHT);
		  camera.aspect = WIDTH / HEIGHT;
		  camera.updateProjectionMatrix();
		});*/
	
		
	Timer.set_renderer( render );	
})();


//Create canvas with the device resolution.
//var myCanvas = createHiDPICanvas(500, 250);

//Create canvas with a custom resolution.
//var myCustomCanvas = createHiDPICanvas(500, 200, 4);