shader.vertex_source =     
[
/*    "#version 300 es",

    // an attribute is an input (in) to a vertex shader.
    // It will receive data from a buffer
    "in vec4 a_position;",

    "out vec4 v_position;",
//    "out vec2 texcoord;",    
    
    "in vec2 a_texcoord;",    
    
     "uniform sampler2D u_texture;",
    
    // all shaders have a main function
    "void main()", 
    "{",
     // gl_Position is a special variable a vertex shader
     // is responsible for setting
//    "gl_Position = a_position;",
    
    "gl_Position = texelFetch(u_texture, ivec2(a_position.x,0), 0);",//vec4(1, 0, 0.5, 1);",
    
    "v_position = a_position;",
    "}"*/
    

    "#version 300 es",

    "#ifdef GL_FRAGMENT_PRECISION_HIGH",
        "precision highp float;",
    "#else",
        "precision mediump float;",
    "#endif",    

    "uniform mat4 u_perspective;",
    "uniform vec3 u_lightWorldPos;",
    "uniform mat4 u_modelView;",
    "uniform mat4 u_viewInverse;",
    "uniform mat4 u_worldInverseTranspose;",

    "uniform sampler2D u_transformAtlas[2];", 
       
//    "in vec4 a_position;",
            
//    "in vec3 a_normal;",
//    "in vec2 a_texcoord;",
    
    "in uvec2 a_transformIndex;",
    "in uvec2 a_modelIndex;",
    "in uvec2 a_textureIndex;",
    "in uvec2 a_paletteIndex;",

    
    "out vec4 v_position;",
    "out vec4 v_surfacePosition;",
    "out vec2 v_texCoord;",
    "flat out uvec2 v_paletteIndex;",    
    "out vec3 v_normal;",
    "out vec3 v_surfaceToLight;",
    "out vec3 v_surfaceToView;",
    
    "void main()", 
    "{",
        "int index = int(a_transformIndex.x*uint(4));",
    
          "mat4 transform = mat4",  //"(1.0f);",
          "(",
                "texelFetch(u_transformAtlas[0], ivec2(index, 0), 0),",
                "texelFetch(u_transformAtlas[0], ivec2(index+1, 0), 0),",
                "texelFetch(u_transformAtlas[0], ivec2(index+2, 0), 0),",
                "texelFetch(u_transformAtlas[0], ivec2(index+3, 0), 0)",
          ");",
          
         "index = int(a_modelIndex.x);",
          
         "vec4 vertex_data = texelFetch(u_transformAtlas[1], ivec2(index, 0), 0);",                    
         "vec4 scaled = vec4(vertex_data.xyz, 1.0f) * transform;",  
         "v_texCoord.x = ( vertex_data.w + float(a_textureIndex)) / " + 2 + ".0f;",

         "vertex_data = texelFetch(u_transformAtlas[1], ivec2(index, 1), 0);",          
         "v_normal = vertex_data.xyz;", 
         "v_texCoord.y = vertex_data.w / 2.0f;",
         
     //    "index = int(a_textureIndex.x);",
         
       //  "vertex_data = texelFetch(u_transformAtlas[1], ivec2(index, 2), 0);",
       //  "v_texIndex = vertex_data.zw;",
         
         "v_paletteIndex = a_paletteIndex;",
         
//         "v_normal = vertex_data.xyz;", 
//         "v_texCoord.y = vertex_data.w;",
         
          
//          "vec4 scaled =  a_position * transform;",
//          "vec4 scaled = u_modelScale * a_position;",
//			  "vec4 scaled = a_position;",			  
          "v_position = u_perspective * u_modelView * scaled;",
          
          "v_position.x -= 172.0f;",
          "v_position.y -= 164.0f;",
          
 //         "v_normal = a_normal;",//(u_worldInverseTranspose * vec4(a_normal, 0)).xyz;",
          
          "vec4 surfacePosition = (u_modelView * v_position);",          
          
 //         "vec4 surfacePosition = (u_modelView * a_position);",
 //         "v_surfacePosition = (u_modelView * a_position);",	
//         "v_surfacePosition = (u_modelView * a_position);",	


		  
//			  "vec4 surfacePosition = (a_position);",
      
//			  "vec4 surfacePosition = v_position * a_position;",
//			  "vec4 surfacePosition = u_perspective * a_position;",
          
          "v_surfaceToLight = u_lightWorldPos - surfacePosition.xyz;",// - (u_world * a_position).xyz;",
//			  "v_surfaceToLight = vec3(0.0, 0.0, 0.0) - surfacePosition.xyz;",// - (u_world * a_position).xyz;",
          
          // compute the vector of the surface to the view/camera
          // and pass it to the fragment shader
//			 "v_surfaceToView = (u_viewInverse[3] - surfacePosition).xyz;",
         "v_surfaceToView = (u_perspective[3] - surfacePosition).xyz;",
          
          //			  "v_surfaceToView = (u_viewInverse[3] - (u_world * a_position)).xyz;",
          "gl_Position = v_position;",
     "}"	

/*		"attribute vec2 a_position;",
    "void main()", 
    "{",
        "gl_Position = vec4(a_position, 0, 1);",
    "}"*/
].join("\n");