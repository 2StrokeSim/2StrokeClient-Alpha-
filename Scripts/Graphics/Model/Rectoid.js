geometries[RECTOID_GEOMETRY_BLOB] = new (function()
{  
	this.normals = new Float32Array
	([	  
		  //  Z+ face
		  0, 0, 1, /**/ 0, 0, 1, /**/ 0, 0, 1, /**/ 0, 0, 1, 
		  // Z- face
		  0, 0, -1,
		  0, 0, -1,
		  0, 0, -1,
		  0, 0, -1,
		  // X+ face
		  1, 0, 0,
		  1, 0, 0,
		  1, 0, 0,
		  1, 0, 0,
		  // X- face
		  -1, 0, 0,
		  -1, 0, 0,
		  -1, 0, 0,
		  -1, 0, 0,	  
		  // Y+ face
		  0, 1, 0,
		  0, 1, 0,
		  0, 1, 0,
		  0, 1, 0,	
		  // Y- face
		  0, -1, 0,
		  0, -1, 0,
		  0, -1, 0,
		  0, -1, 0
	]);
	
/*
   this.obj =
   [
       "v -0.5 -0.5 0.5",
       "v 0.5 -0.5 0.5",
       "v -0.5 0.5 0.5",
       "v 0.5 0.5 0.5",
        
       "v 0.5 -0.5 -0.5",
       "v -0.5 -0.5 -0.5",
       "v 0.5 0.5 -0.5",
       "v -0.5 0.5 -0.5",
        
       "v 0.5 -0.5 0.5",
       "v 0.5 -0.5 -0.5",
       "v 0.5 0.5 0.5",
       "v 0.5 0.5 -0.5",
        
       "v -0.5 -0.5 -0.5",
       "v -0.5 -0.5 0.5",
       "v -0.5 0.5 -0.5",
       "v -0.5 0.5 0.5",
        
       "v -0.5 0.5 0.5",
       "v 0.5 0.5 0.5",
       "v -0.5 0.5 -0.5",
       "v 0.5 0.5 -0.5",
        
       "v -0.5 -0.5 -0.5",
       "v 0.5 -0.5 -0.5",
       "v -0.5 -0.5 0.5",
       "v 0.5 -0.5 0.5",
       
       "v 0.5 -0.5 0.5",
       
       "f 0/0/0 1/0/0 2/0/0",
       "f 2/0/0 1/0/0 3/0/0",
       "f 4/0/0 5/0/0 6/0/0",
       "f 6/0/0 5/0/0 7/0/0",
       "f 8/0/0 9/0/0 10/0/0",
       "f 10/0/0 9/0/0 11/0/0",
       "f 12/0/0 13/0/0 14/0/0",
       "f 14/0/0 13/0/0 15/0/0", 
       "f 16/0/0 17/0/0 18/0/0",
       "f 18/0/0 17/0/0 19/0/0",
       "f 20/0/0 21/0/0 22/0/0", 
       "f 22/0/0 21/0/0 23/0/0"

     /*   "v 0.361509 2.284954 0.066948",
        "v 0.153774 2.284954 0.066948",
        "v 0.361509 2.375038 0.066948",
        "v 0.153774 2.403177 0.066948",
        "v 0.361509 2.392004 -0.140787",
        "v 0.153774 2.403177 -0.140787",
        "v 0.361509 2.284954 -0.140787",
        "v 0.153774 2.284954 -0.140787",
        "v 0.586320 2.275024 -0.193059",
        "v 0.586320 2.396141 0.119220",
        "v 0.586320 2.396141 -0.193059",
        "v 0.732064 2.301134 -0.193059",
        "v 0.732064 2.301134 0.119220",
        "v 0.732064 2.404933 0.119220",
        "v 0.732064 2.404933 -0.193059",
        "v 0.732064 2.430748 0.014699",
        "v 0.732064 2.275319 0.014699",
        "v 0.586320 2.249210 -0.021340",
        "v 0.361509 2.262852 -0.026556",
        "v 0.153774 2.262852 -0.026556",
        "v 0.153774 2.425280 -0.026556",
        "v 0.361509 2.397141 -0.026556",
        "v 0.586320 2.421955 -0.021340",
        "v 1.015638 2.303131 -0.157240",
        "v 1.093323 2.287825 -0.003549",
        "v 1.093323 2.400307 -0.003549",
        "v 1.015638 2.385000 -0.157240",
        "v 1.069129 2.291430 0.022816",
        "v 1.017967 2.305754 0.099639",
        "v 1.017967 2.382378 0.099639",
        "v 1.069129 2.396702 0.022816",
        "v 0.690839 2.275024 0.119220",
        "v 0.489643 2.279295 0.096741",
        "v 0.679559 2.197078 0.119152",
        "v 0.720068 2.192497 0.223069",
        "v 0.738637 2.224201 0.168590",
        "v 0.667298 2.302962 0.200435",
        "v 0.661199 2.188466 0.162383",
        "v 0.581587 2.236692 0.150302",
        "v 0.632076 2.228168 0.081883",
        "v 0.692372 2.242178 0.148165",
        "v 0.615241 2.344688 0.178151",
        "v 0.916702 2.302891 0.018514",
        "v 0.916697 2.412016 0.018514",
        "v 0.892651 2.393523 0.110017",
        "v 0.892655 2.321383 0.110017",
        "v 0.910582 2.299395 0.007146",
        "v 0.878427 2.318838 -0.178233",
        "v 0.878422 2.396069 -0.178233",
        "v 0.910576 2.415513 0.007146",
        "v 0.532252 2.266035 0.044698",
        "v 0.704210 2.269546 0.007811",     
       
        "f 1/1/1 3/2/2 2/3/3",
        "f 2/3/3 3/2/2 4/4/4",
        "f 3/5/2 22/6/5 4/7/4",
        "f 4/7/4 22/6/5 21/8/6",
        "f 7/9/7 8/10/8 5/11/9",
        "f 5/11/9 8/10/8 6/12/10",
        "f 19/13/11 1/130/1 20/14/12",
        "f 20/14/12 1/130/1 2/15/3",
        "f 2/16/3 4/17/4 20/18/12",
        "f 20/18/12 4/17/4 21/19/6",
        "f 28/20/13 31/21/14 29/22/15",
        "f 29/22/15 31/21/14 30/23/16",
        "f 51/129/17 33/24/18 1/25/1",
        "f 1/1/1 33/26/18 3/2/2",
        "f 3/2/2 33/26/18 10/27/19",
        "f 10/28/19 23/29/20 3/5/2",
        "f 3/5/2 23/29/20 22/6/5",
        "f 5/11/9 11/30/21 7/9/7",
        "f 7/9/7 11/30/21 9/31/22",
        "f 18/32/23 52/33/24 32/34/25",
        "f 32/34/25 52/33/24 13/35/26",
        "f 13/36/26 14/37/27 32/38/25",
        "f 32/38/25 14/37/27 10/39/19",
        "f 14/40/27 16/41/28 10/28/19",
        "f 10/28/19 16/41/28 23/29/20",
        "f 15/42/29 12/43/30 11/30/21",
        "f 11/30/21 12/43/30 9/31/22",
        "f 24/44/31 27/45/32 25/46/33",
        "f 25/46/33 27/45/32 26/47/34",
        "f 9/48/22 12/49/30 18/32/23",
        "f 18/32/23 12/49/30 52/33/24",
        "f 7/50/7 18/51/23 19/13/11",
        "f 7/50/7 19/13/11 8/52/8",
        "f 8/52/8 19/13/11 20/14/12",
        "f 21/19/6 6/53/10 20/18/12",
        "f 20/18/12 6/53/10 8/54/8",
        "f 5/55/9 6/56/10 22/6/5",
        "f 22/6/5 6/56/10 21/8/6",
        "f 11/57/21 5/55/9 23/29/20",
        "f 23/29/20 5/55/9 22/6/5",
        "f 16/41/28 15/58/29 23/29/20",
        "f 23/29/20 15/58/29 11/57/21",
        "f 12/49/30 48/59/35 17/60/36",
        "f 17/60/36 48/59/35 47/61/37",
        "f 17/62/36 47/63/37 16/64/28",
        "f 16/64/28 47/63/37 50/65/38",
        "f 50/66/38 49/67/39 16/41/28",
        "f 16/41/28 49/67/39 15/58/29",
        "f 49/68/39 48/69/35 15/42/29",
        "f 15/42/29 48/69/35 12/43/30",
        "f 43/70/40 46/71/41 17/60/36",
        "f 17/60/36 46/71/41 13/35/26",
        "f 13/36/26 46/72/41 14/37/27",
        "f 14/37/27 46/72/41 45/73/42",
        "f 14/40/27 45/74/42 16/41/28",
        "f 16/41/28 45/74/42 44/75/43",
        "f 44/76/43 43/77/40 16/78/28",
        "f 16/78/28 43/77/40 17/79/36",
        "f 34/80/44 36/81/45 35/82/46",
        "f 35/83/46 36/84/45 37/85/47",
        "f 38/86/48 35/83/46 37/85/47",
        "f 34/87/44 35/88/46 38/89/48",
        "f 41/90/49 40/91/50 32/92/25",
        "f 32/92/25 40/91/50 18/51/23",
        "f 10/93/19 42/94/51 32/95/25",
        "f 32/95/25 42/94/51 41/96/49",
        "f 33/26/18 39/97/52 10/27/19",
        "f 10/27/19 39/97/52 42/98/51",
        "f 40/99/50 39/100/52 51/129/17",
        "f 51/129/17 39/100/52 33/24/18",
        "f 34/87/44 38/89/48 40/101/50",
        "f 40/101/50 38/89/48 39/102/52",
        "f 36/103/45 34/104/44 41/105/49",
        "f 41/105/49 34/104/44 40/106/50",
        "f 42/94/51 37/107/47 41/96/49",
        "f 41/96/49 37/107/47 36/108/45",
        "f 38/86/48 37/85/47 39/97/52",
        "f 39/97/52 37/85/47 42/98/51",
        "f 44/76/43 31/109/14 43/77/40",
        "f 43/77/40 31/109/14 28/110/13",
        "f 45/74/42 30/111/16 44/75/43",
        "f 44/75/43 30/111/16 31/112/14",
        "f 29/22/15 30/23/16 46/72/41",
        "f 46/72/41 30/23/16 45/73/42",
        "f 28/113/13 29/114/15 43/70/40",
        "f 43/70/40 29/114/15 46/71/41",
        "f 48/59/35 24/115/31 47/61/37",
        "f 47/61/37 24/115/31 25/116/33",
        "f 49/68/39 27/117/32 48/69/35",
        "f 48/69/35 27/117/32 24/118/31",
        "f 26/119/34 27/120/32 50/66/38",
        "f 50/66/38 27/120/32 49/67/39",
        "f 25/121/33 26/122/34 47/63/37",
        "f 47/63/37 26/122/34 50/65/38",
        "f 7/123/7 9/48/22 18/32/23",
        "f 18/51/23 40/91/50 51/124/17",
        "f 52/125/24 17/126/36 13/127/26",
        "f 12/128/30 17/126/36 52/125/24",
        "f 1/130/1 19/13/11 18/51/23 51/124/17"

	].join("\n");  */

    
	this.vertices = [ /*	  
	   
   -0.5, -0.5, 0.5,
	0.5, -0.5, 0.5,
   -0.5, 0.5, 0.5,
	0.5, 0.5, 0.5,
	
	0.5, -0.5, -0.5,
   -0.5, -0.5, -0.5,
	0.5, 0.5, -0.5,
   -0.5, 0.5, -0.5,
	
	0.5, -0.5, 0.5,
	0.5, -0.5, -0.5,
	0.5, 0.5, 0.5,
	0.5, 0.5, -0.5,
	
   -0.5, -0.5, -0.5,
   -0.5, -0.5, 0.5,
   -0.5, 0.5, -0.5,
   -0.5, 0.5, 0.5,
	
	-0.5, 0.5, 0.5,
	0.5, 0.5, 0.5,
	-0.5, 0.5, -0.5,
	0.5, 0.5, -0.5,
	
	-0.5, -0.5, -0.5,
	0.5, -0.5, -0.5,
	-0.5, -0.5, 0.5,
	0.5, -0.5, 0.5
	*/];    
    
    this.indexes = [ /*0,  1,  2,  2, 1,   3,   4,   5,   6,  6,
                                                    5, 7, 8, 9, 10, 10, 9, 11, 12, 13,
                                                    14, 14, 13, 15, 16, 17, 18, 18, 17, 19,
                                                                        20, 21, 22, 22, 21, 23*/ ];
                                                                        

    
    var vertices = this.vertices;
    var indexes = this.indexes;
    
    var clear_non_whitespace = function(parsing_text, char_index)
    {
        for (; char_index < parsing_text.length; )
        {
            if (parsing_text[char_index] != ' ' && parsing_text[char_index] != '\n')
            {
                char_index++; 
                continue;
            }
            else 
            {
                break;
            }
        }    
        return char_index;
    }    
    
    var clear_whitespace = function(parsing_text, char_index)
    {
        for (; char_index < parsing_text.length; )
        {
            if (parsing_text[char_index] == ' ' || parsing_text[char_index] == '\n')
            {
                char_index++; 
                continue;
            }
            else 
            {
                break;
            }
        }    
        return char_index;
    }
    
    var next_delimiter = function(parsing_text, char_index)
    {
        for (; char_index < parsing_text.length; )
        {
            if (parsing_text[char_index] != '/')
            {
                char_index++;
                continue;
            }
            else
            {
                break;
            }
        }
        return char_index;
    }    
    
    var obj_parse_v_switch = function(parsing_text, char_index)
    {
        char_index++;
        var readto = vertices;
        var next_char_index = char_index;
        var element_count = 3;
        
        
        for (var i = 0; i < element_count; i++)
        {
            char_index = clear_whitespace(parsing_text, char_index);            
            next_char_index = clear_non_whitespace(parsing_text, char_index);            
            

            readto[readto.length] = Number(parsing_text.substring(char_index, next_char_index));
            char_index = next_char_index;
        }
        
        console.log(readto[readto.length-3] + ' ' + readto[readto.length-2] + ' ' + readto[readto.length-1]);        
        
        return char_index;
    }

    var obj_face_parse = function(parsing_text, char_index)
    {
        char_index++;
        var readto = indexes;
        var next_char_index = char_index;
        var element_count = 3;
        
        for (var i = 0; i < 3; i++)
        {
            char_index = clear_whitespace(parsing_text, char_index);            
            

            next_char_index = next_delimiter(parsing_text, char_index);            
            
            indexes[indexes.length] = Number(parsing_text.substring(char_index, next_char_index));
            char_index = next_char_index;
            char_index++; // Skip the '/'
            
            next_char_index = next_delimiter(parsing_text, char_index);            
            
//            readto[readto.length] = Number(parsing_text.substring(char_index, next_char_index));
            char_index = next_char_index;
            char_index++; // Skip the '/' 
 
            next_char_index = clear_non_whitespace(parsing_text, char_index);            
            
//            readto[readto.length] = Number(parsing_text.substring(char_index, next_char_index));
            char_index = next_char_index;
            char_index++; // Skip the ' '

        }
        
        console.log(readto[readto.length-3] + ' ' + readto[readto.length-2] + ' ' + readto[readto.length-1]);        
        return char_index;
    }
    
    var obj_parse = function(parsing_text)
    {
        for (var char_index = 0; char_index < parsing_text.length; )
        {
            var next_index; 
            next_index = clear_whitespace(parsing_text, char_index);            
            console.log(parsing_text.substring(char_index, next_index));
            char_index = next_index;
            
/*            next_index = clear_non_whitespace(parsing_text, char_index);            
            console.log(parsing_text.substring(char_index, next_index));
            char_index = next_index;*/

            if (parsing_text[char_index] == 'v')
            {
                char_index = obj_parse_v_switch(parsing_text, char_index);
            }
            else if (parsing_text[char_index] == 'f')
            {
                char_index = obj_face_parse(parsing_text, char_index);
            }
            else
            {
                next_index = clear_non_whitespace(parsing_text, char_index);            
                console.log(parsing_text.substring(char_index, next_index));
                char_index = next_index;                
            }
                
        }
    }
    
    this.obj_parse = obj_parse;
//    obj_parse(this.obj);
 //   this.vertices = new Float32Array(this.vertices);
 //   this.indexes = new Uint16Array(this.indexes);

//    console.log(this.indexes);
	
	this.texcoords = new Float32Array([
	   // X+ face
	   0, 1, /**/ 1, 1, /**/ 0, 0, /**/ 1, 0,// /**/ 1, 1, /**/ 1, 0,
	   // X- face
	   0, 1, /**/ 1, 1, /**/ 0, 0, /**/ 1, 0, // /**/ 1, 1, /**/ 1, 0,
	   // Y+ face
	   0, 1, /**/ 1, 1, /**/ 0, 0, /**/ 1, 0, // /**/ 1, 1, /**/ 1, 0,
	   // Y- face
	   0, 1, /**/ 1, 1, /**/ 0, 0, /**/ 1, 0, // /**/ 1, 1, /**/ 1, 0,
	   // Z+ face
	   0, 1, /**/ 1, 1, /**/ 0, 0, /**/ 1, 0, // /**/ 1, 1, /**/ 1, 0,
	   // Z- face
	   0, 1, /**/ 1, 1, /**/ 0, 0, /**/ 1, 0 // /**/ 1, 1, /**/ 1, 0
	]);  
    
})();

Model.definitions[Model.RECTOID_DEFINITION] = function()
{
    geometries[RECTOID_GEOMETRY_BLOB].obj_parse(geometries[RECTOID_GEOMETRY_BLOB].obj);
    geometries[RECTOID_GEOMETRY_BLOB].vertices = new Float32Array(geometries[RECTOID_GEOMETRY_BLOB].vertices);
    geometries[RECTOID_GEOMETRY_BLOB].indexes = new Uint16Array(geometries[RECTOID_GEOMETRY_BLOB].indexes);

	var complete_vertex_indexes = [  0,  1,    2,   3,  4,   5,   6,   7,   8,  9,
													  10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
													  20, 21, 22, 23 ];

                                                      
                                                      
	var front_right_top_vertex_indexes = [2, 3, 23];
	
	var front_right_top_complement_vertex_indexes = [ 0,  1,  4,   5,   6,   7,   8,  9,
																				10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
																				20, 21, 22, 23 ];		
	
    this.geometries = [RECTOID_GEOMETRY_BLOB];
    
    console.log("Geometries? " + this.geometries);
    
    for (i = 24; i < geometries[RECTOID_GEOMETRY_BLOB].vertices.length/3; i++)
    {
        geometries[RECTOID_GEOMETRY_BLOB].normals[(3*i)] = geometries[RECTOID_GEOMETRY_BLOB].normals[0];
        geometries[RECTOID_GEOMETRY_BLOB].normals[(3*i)+1] = geometries[RECTOID_GEOMETRY_BLOB].normals[1];
        geometries[RECTOID_GEOMETRY_BLOB].normals[(3*i)+2] = geometries[RECTOID_GEOMETRY_BLOB].normals[2]; 

        geometries[RECTOID_GEOMETRY_BLOB].texcoords[(2*i)] = geometries[RECTOID_GEOMETRY_BLOB].texcoords[0];
        geometries[RECTOID_GEOMETRY_BLOB].texcoords[(2*i)+1] = geometries[RECTOID_GEOMETRY_BLOB].texcoords[1];                
    }
    
	this.normals = geometries[RECTOID_GEOMETRY_BLOB].normals; 

	this.geometry = geometries[RECTOID_GEOMETRY_BLOB].vertices;

	this.indexes = geometries[RECTOID_GEOMETRY_BLOB].indexes;
	
	this.texcoords = geometries[RECTOID_GEOMETRY_BLOB].texcoords;

	this.connection = [{index: 0}];
	
    for (i = 0; i < geometries[RECTOID_GEOMETRY_BLOB].vertices.length/3; i++)
    {
        complete_vertex_indexes[i] = i;
    }
    

    
	this.accents = [{filter:[0, 1, 0], base:[], indexes: complete_vertex_indexes}]
    
    this.serif = 
    {
        width: 100,
        height: 26, 
        back_color: [13, 13, 7, 255], 
        text: undefined
    };	
};