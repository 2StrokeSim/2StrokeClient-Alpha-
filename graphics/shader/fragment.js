shader.fragment_source =   
/*[
    "uniform mat4 u_perspective;",
    "uniform vec3 u_lightWorldPos;",
    "uniform mat4 u_modelView;",		
    "uniform mat4 u_world;",
    "uniform mat4 u_viewInverse;",
    "uniform mat4 u_worldInverseTranspose;",
    "uniform vec4 u_modelScale;",

    "uniform mat4 u_velocity;",
    "uniform mat4 u_acceleration;",
    
    "uniform float u_stop;",
    "uniform float u_elapsed;",		
    
    "in vec4 a_position;",
            
    "in vec3 a_normal;",
    "attribute vec2 a_texcoord;",
     
    "varying vec4 v_position;",
    "varying vec4 v_surfacePosition;",
    "varying vec2 v_texCoord;",
    "varying vec3 v_normal;",
    "varying vec3 v_surfaceToLight;",
    "varying vec3 v_surfaceToView;",

//		"subroutine vec4 colorRedBlue();",
    
    "void main()", 
    "{",
          "v_texCoord = a_texcoord;",
          "vec4 scaled = u_modelScale * a_position;",
//			  "vec4 scaled = a_position;",			  
          "v_position = u_perspective * u_modelView * scaled;",
          "v_normal = a_normal;",//(u_worldInverseTranspose * vec4(a_normal, 0)).xyz;",
          
          "vec4 surfacePosition = (u_modelView * a_position);",
          "v_surfacePosition = (u_modelView * a_position);",			  
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
//].join("\n");

	[
        "#version 300 es",
    
		"#ifdef GL_FRAGMENT_PRECISION_HIGH",
			"precision highp float;",
		"#else",
			"precision mediump float;",
		"#endif",
	
		"in vec4 v_position;",
		"in vec4 v_surfacePosition;",
		"in vec2 v_texCoord;",
        "flat in uvec2 v_paletteIndex;",        
		"in vec3 v_normal;",
		"in vec3 v_surfaceToLight;",
		"in vec3 v_surfaceToView;",
		 
//		"uniform vec3 u_lightColor;",
		"uniform vec4 u_ambient;",
		"uniform sampler2D u_diffuse;",        
        "uniform sampler2D u_textureAtlas[3];", 
//		"uniform vec4 u_specular;",
		"uniform float u_shininess;",
//		"uniform float u_specularFactor;",	
		"uniform float u_luminescence;",	
        
        // we need to declare an output for the fragment shader
        "out vec4 outColor;",
	
		"void main()", 
		"{",
		
			"float PI = 3.14159265;",
			"float arc_length = 1.0;",
			
			"float arc_length_inverse = arc_length / (PI / 2.0);",
			
			"float test = sqrt(1.0 - (v_texCoord.x * v_texCoord.x));",
            
            
			
//			"vec4 diffuseColor = texture2D(u_diffuse, vec2(asin(v_texCoord.x) * arc_length_inverse, v_texCoord.y));",
//			"vec4 diffuseColor = texture2D(u_diffuse, vec2(v_texCoord.x, v_texCoord.y));",

//			"vec4 diffuseColor = vec4(0.05, 0.05, 0.025, 1);",
		

            "vec4 textureIndex = texelFetch(u_textureAtlas[1], ivec2((v_texCoord.x) * 256.0, v_texCoord.y * 256.0), 0);",
        
//            "vec4 textureIndex = texelFetch(u_textureAtlas[1], ivec2(v_texIndex.x * uint(256), v_texIndex.y * uint(256)), 0);",
//            "vec4 diffuseColor = texture(u_textureAtlas[1], v_texCoord);",

       //     "vec4 diffuseColor = texture(u_textureAtlas[0], vec2(min(textureIndex.x, 256.0), textureIndex.y));",

 //           "ivec2 index = ivec2(textureIndex.x, textureIndex.y);",
            "ivec2 index = ivec2(textureIndex.x * 256.0, textureIndex.y * 256.0);",

            "ivec2 subtexture_origin;",
            "subtexture_origin.y = int(textureIndex.z*256.0);",
            "subtexture_origin.x = int(textureIndex.z*256.0) - subtexture_origin.y;",
            "index.x += int(v_paletteIndex.x * uint(256));",
//            "index.x += subtexture_origin.x;",
//            "index.y += subtexture_origin.y;",            
//            "index.x += 256 + (int(textureIndex.z*256.0)<<8);",
//            "index.x += (int(textureIndex.z*256.0)<<8);",            
//            "index.y += int(textureIndex.w*256.0)<<8;",
            
//            "vec4 diffuseColor = texelFetch(u_textureAtlas[0], index, 0);",                    

//            "vec4 diffuseColor = texelFetch(u_textureAtlas[0], ivec2(v_texCoord.x * 256.0, v_texCoord.y * 256.0), 0);",
            "vec4 diffuseColor = texelFetch(u_textureAtlas[0], index, 0);",

            
			"vec2 planar = vec2(1.0 - (2.0 * (v_texCoord.x)), 1.0 - (2.0 * (v_texCoord.y)));",			
			"float planarLength = length(planar);",
			
//			"if (planarLength > 1.0) { discard; }",
						
			"float opposite = sqrt(abs(1.0 - ( planarLength * planarLength)));",
						
//			"vec3 a_normal = normalize(vec3((v_normal.x * cos(angle)) - (v_normal.y * sin(angle)), (v_normal.x * sin(angle)) + (v_normal.y * cos(angle)), v_normal.z));",
//			"vec3 a_normal = (normalize(v_normal) * opposite) + vec3(-planar.x, planar.y, 0.0);",

//			"a_normal = vec3(a_normal.x * opposite, a_normal.y * opposite, a_normal.z * opposite);",
			
			"vec3 a_normal = normalize(v_normal);",
						
//			"if (dot(a_normal,  normalize(v_surfaceToView)) >= 0.0) discard;",
			
//			"vec3 a_normal = normalize(v_normal);",
			"vec3 surfaceToLight = normalize(v_surfaceToLight);",
			"vec3 surfaceToView = normalize(v_surfaceToView);",
			"vec3 halfVector = normalize(surfaceToLight + surfaceToView);",
//			"vec4 litR = lit(dot(a_normal, surfaceToLight),",
//							"dot(a_normal, halfVector), u_shininess);",
		 
		   "float light = dot(a_normal, v_surfaceToLight) + u_luminescence;",
//		   "float specular = dot(a_normal, halfVector);",
		   "float specular = 0.0;",
//		   "if (light > 0.0) { specular = pow(dot(a_normal, halfVector), 100.0); }",
//		   "if (light > 0.0) { specular = pow(dot(a_normal, halfVector), u_shininess); }",
		   // Lets multiply just the color portion (not the alpha)
		   // by the light

/*		    "float r = 0.0, delta = 0.0, alpha = 1.0;",
			"vec2 cxy = 2.0 * v_texCoord - 1.0;",
			"r = dot(cxy, cxy);",
			"if (r > 1.1) {",
			"discard;",
				"}",*/
		   
			"outColor = vec4(gl_FragCoord.x / 640.0, gl_FragCoord.y / 480.0, 0, 1);", //vec4((",
//			"u_lightColor * (diffuseColor * litR.y + diffuseColor * u_ambient +",
//								  "u_specular * litR.z * u_specularFactor)).rgb,",
//								  "diffuseColor.a);",
//			"gl_FragColor = outColor;",
//			"gl_FragColor = outColor;",
			

//			"gl_FragColor.rgb *= light * u_lightColor * diffuseColor.rgb;",
		//	"outColor.rgb = light * u_lightColor * diffuseColor.rgb;",


			"outColor = u_ambient * diffuseColor;",
            
//            "outColor.rgb = diffuseColor.rgb;",

		
			  // Just add in the specular
//			"gl_FragColor.rgb += specular * u_lightColor;",
			
		 "}"	
	].join("\n");  
  
  
  
//[
  /*  "#version 300 es",

    // fragment shaders don't have a default precision so we need
    // to pick one. mediump is a good default. It means "medium precision"
    "precision mediump float;",

//    "in vec2 texcoord;",

    "in vec4 v_position;",
    
//    "uniform sampler2D u_texture;",
    
    // we need to declare an output for the fragment shader
    "out vec4 outColor;",

    "void main()", 
    "{",
      // Just set the output to a constant redish-purple
//        "outColor = texelFetch(u_texture, ivec2(v_position.x,0), 0);",//vec4(1, 0, 0.5, 1);",
        "outColor = vec4(1, 0, 0.5, 1);",        
    "}"*/
    
/*    
"#version 300 es",
"#ifdef GL_FRAGMENT_PRECISION_HIGH",
    "precision highp float;",
"#else",
    "precision mediump float;",
"#endif",
 
"uniform vec3 u_lightColor;",
"uniform vec4 u_ambient;",
"uniform sampler2D u_diffuse;",
"uniform vec4 u_specular;",
"uniform float u_shininess;",
"uniform float u_specularFactor;",	
"uniform float u_luminescence;",	

"in vec4 v_position;",
"in vec4 v_surfacePosition;",
"in vec2 v_texCoord;",
"in vec3 v_normal;",
"in vec3 v_surfaceToLight;",
"in vec3 v_surfaceToView;",

// we need to declare an output for the fragment shader
"out vec4 outColor;",

"void main()", 
"{",

    "float PI = 3.14159265;",
    "float arc_length = 1.0;",
    
    "float arc_length_inverse = arc_length / (PI / 2.0);",
    
    "float test = sqrt(1.0 - (v_texCoord.x * v_texCoord.x));",
    
//	"vec4 diffuseColor = texture2D(u_diffuse, vec2(asin(v_texCoord.x) * arc_length_inverse, v_texCoord.y));",
//	"vec4 diffuseColor = texture2D(u_diffuse, vec2(v_texCoord.x, v_texCoord.y));",

//	"vec4 diffuseColor = vec4(0.05, 0.05, 0.025, 1);",
    "vec4 diffuseColor = texture(u_diffuse, v_texCoord);",

    "vec2 planar = vec2(1.0 - (2.0 * (v_texCoord.x)), 1.0 - (2.0 * (v_texCoord.y)));",			
    "float planarLength = length(planar);",
    
//			"if (planarLength > 1.0) { discard; }",
                
    "float opposite = sqrt(abs(1.0 - ( planarLength * planarLength)));",
                
//			"vec3 a_normal = normalize(vec3((v_normal.x * cos(angle)) - (v_normal.y * sin(angle)), (v_normal.x * sin(angle)) + (v_normal.y * cos(angle)), v_normal.z));",
//			"vec3 a_normal = (normalize(v_normal) * opposite) + vec3(-planar.x, planar.y, 0.0);",

//			"a_normal = vec3(a_normal.x * opposite, a_normal.y * opposite, a_normal.z * opposite);",
    
    "vec3 a_normal = normalize(v_normal);",
                
//			"if (dot(a_normal,  normalize(v_surfaceToView)) >= 0.0) discard;",
    
//			"vec3 a_normal = normalize(v_normal);",
    "vec3 surfaceToLight = normalize(v_surfaceToLight);",
    "vec3 surfaceToView = normalize(v_surfaceToView);",
    "vec3 halfVector = normalize(surfaceToLight + surfaceToView);",
//			"vec4 litR = lit(dot(a_normal, surfaceToLight),",
//							"dot(a_normal, halfVector), u_shininess);",
 
   "float light = dot(a_normal, v_surfaceToLight) + u_luminescence;",
//		   "float specular = dot(a_normal, halfVector);",
   "float specular = 0.0;",
//		   "if (light > 0.0) { specular = pow(dot(a_normal, halfVector), 100.0); }",
//		   "if (light > 0.0) { specular = pow(dot(a_normal, halfVector), u_shininess); }",
   // Lets multiply just the color portion (not the alpha)
   // by the light

/*		    "float r = 0.0, delta = 0.0, alpha = 1.0;",
    "vec2 cxy = 2.0 * v_texCoord - 1.0;",
    "r = dot(cxy, cxy);",
    "if (r > 1.1) {",
    "discard;",
        "}",*/
   
/*    "outColor = vec4(gl_FragCoord.x / 640.0, gl_FragCoord.y / 480.0, 0, 1);", //vec4((",
//			"u_lightColor * (diffuseColor * litR.y + diffuseColor * u_ambient +",
//								  "u_specular * litR.z * u_specularFactor)).rgb,",
//								  "diffuseColor.a);",
//			"gl_FragColor = outColor;",
//    "gl_FragColor = outColor;",
    

//			"gl_FragColor.rgb *= light * u_lightColor * diffuseColor.rgb;",
    "outColor.rgb = light * u_lightColor * diffuseColor.rgb;",


    "outColor += u_ambient * diffuseColor;",

      // Just add in the specular
//			"gl_FragColor.rgb += specular * u_lightColor;",
   
"}"	    */
    
//].join("\n");