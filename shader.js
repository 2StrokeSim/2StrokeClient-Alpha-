var shader = {};

var transformVertexShaderSource;
var transformFragmentShaderSource;


function createShader(gl, type, source) 
{
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    console.log(gl.getShaderInfoLog(shader));
    if (success) { return shader; }

    console.log(gl.getShaderInfoLog(shader));  // eslint-disable-line
    gl.deleteShader(shader);
    return undefined;
}

function createProgram(gl, vertexShader, fragmentShader) 
{
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    console.log(gl.getProgramInfoLog(program));
    if (success) { return program; }

    console.log(gl.getProgramInfoLog(program));  // eslint-disable-line
    gl.deleteProgram(program);
    return undefined;
}

shader.buildGeometryRender = function(gl)
{
    // create GLSL shaders, upload the GLSL source, compile the shaders
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, shader.vertex_source);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, shader.fragment_source);

    // Link the two shaders into a program
    var program = createProgram(gl, vertexShader, fragmentShader);  

    return program;
}; 
        
shader.buildTransformRender = function(gl)
{
    // create GLSL shaders, upload the GLSL source, compile the shaders
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, transformVertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, transformFragmentShaderSource);

    // Link the two shaders into a program
    var program = createProgram(gl, vertexShader, fragmentShader);  

    return program;
};  
    
    
  