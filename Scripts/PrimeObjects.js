var menu_library =
{
	name: "AlphaMenu",

	executable: 
	{
		initialize: ""							
	},
	
	references:
	{	
		functions:
		{
			visual:
			{
				new_visual_menu:
				{
					generate_new_visual_parameters: "function ()" 
					+"{"
					+"return { geometry: Visual, include: true, origin: [0, 0, 0], position: [0, 0, 0], elements: [{ geometry: Graphics, include: true, model: Graphics.template_index.LABEL, size: [50, 50, 0], position: [0, 0, 0], materials: [{type: \"Text\", text: \"Text\", font_size: 16}], activate: [] }], activate: [] };"
					+"}"
				}
			}
		},
		
		macros:
		{
			parameters:
			{
				visual:
				{														
					new_default: "{ geometry: Visual, origin: [this.position.x, this.position.y, this.position.z], position: [0, 0, 0], elements: [{ geometry: Graphics, include: true, model: Graphics.template_index.LABEL, size: [360, 40, 0], position: [340, 0, 0], materials: [{type: \"Text\", text: \"New Visual\", font_size: 16}], activate: [function(){this.conceal();}] }], activate: [] }",
					
					
					
					new_visual_menu: "{"
										   +"geometry: Visual, include: true, origin: [0, 0, 0], position: [0, 0, 0], elements:"
										   +"["
										   +"this.get_visual_parameters(),"						   												   
//												   +"/*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"macros\", \"parameters\", \"visual\", \"root_menu\"] } }*/"												   												   												   
										   +"],"
										   +"structure:"
										   +"["
										   +"{ name: \"param_size\", value: /*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"config\", \"new_visual_initial_properties\", \"size\"] }*/ },"
										   +"{ name: \"param_position\", value: /*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"config\", \"new_visual_initial_properties\", \"position\"] }*/ },"
										   +"{ name: \"param_materials\", value: /*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"config\", \"new_visual_initial_properties\", \"materials\"] }*/ },"
										   +"{ name: \"generate_new_visual_parameters\", value: /*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"functions\", \"visual\", \"new_visual_menu\", \"generate_new_visual_parameters\"] }*/ }"
										   +"],"
										   +"activate: []"
										   +"}",

					root_menu:  
					{
						root:				"{"
										   +"geometry: Visual, include: true, origin: [0, 0, 0], position: [0, 0, 0], elements:"
										   +"["											   
										   +"/*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"macros\", \"parameters\", \"visual\", \"root_menu\", \"new_button\"] }*/,"
										   +"/*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"macros\", \"parameters\", \"visual\", \"root_menu\", \"load_button\"] }*/"
//												   +"/*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"macros\", \"parameters\", \"visual\", \"new_visual_menu_texture_button\"] }*/,"	
//												   +"/*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"macros\", \"parameters\", \"visual\", \"new_visual_menu_save_button\"] }*/"												   												   
										   +"],"
										   +"activate: [function(){this.conceal();}]"
										   +"}",

						new_button: "{ geometry: Visual, include: true, origin: [0, 0, 0], position: [0, 0, 0], elements: [{ geometry: Graphics, include: true, model: Graphics.template_index.LABEL, size: [160, 30, 0], position: [0, 0, 0], materials: [{type: \"Text\", text: \"New Visual\", font_size: 16}]," 
															   +"activate:" 
															   +"["
															   +"function()"
															   +"{"
																   +"this.parent.parent.conceal();"
																   +"/*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"AlphaMenu\", \"instances\", \"BindMenu\"] }*/.elements[2].reveal();"
															   +"}"
															   +"]}]," 
															   +"activate: [] }",	
															   
						load_button: "{ geometry: Visual, include: true, origin: [0, 0, 0], position: [0, -40, 0], elements: [{ geometry: Graphics, include: true, model: Graphics.template_index.LABEL, size: [160, 30, 0], position: [0, 0, 0], materials: [{type: \"Text\", text: \"Load Visual\", font_size: 16}]," 
															   +"activate:" 
															   +"["
															   +"function()"
															   +"{"
																   +"this.parent.parent.conceal();"
																   +"/*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"AlphaMenu\", \"instances\", \"BindMenu\"] }*/.elements[2].reveal();"
															   +"}"
															   +"]}]," 
															   +"activate: [function(){this.conceal();}] }"										   
					},
					
					visual_load_menu:
					{
						root:				 "{"
										   +"geometry: Visual, include: true, origin: [0, 0, 0], position: [0, 0, 0], elements:"
										   +"["											   
										   +"/*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"macros\", \"parameters\", \"visual\", \"visual_load_menu\", \"subarchive_list\", \"root\"] }*/,"
										   +"/*{ \"type\" : \"set\", \"value\" : \"{ document: 'poop' }\", \"address\" : [\"Params\"] }*/"
										   +"/*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"macros\", \"parameters\", \"visual\", \"edit_screen\", \"root\"] }*/"
																					   
										   +"],"
										   +"activate: []"
										   +"}",

						subarchive_list:
						{
							root:			"{"
											   +"geometry: Visual, include: true, origin: [0, 0, 0], position: [0, 0, 0], elements:"
											   +"(function () {"
											   +"var list = [];"													   
											   +"for (var i = 0; i <  5; i++)"
											   +"{"													   													   
											   +"/*{ \"type\" : \"set\", \"value\" : \"'Archive ' + i\", \"address\" : [\"label\"] }*/"
											   +"/*{ \"type\" : \"set\", \"value\" : \"i\", \"address\" : [\"index\"] }*/"														   
											   +"/*{ \"type\" : \"set\", \"value\" : \"[-100, 80 - (40 * i), 0]\", \"address\" : [\"position\"] }*/"													   
											   +"list[i] =  /*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"macros\", \"parameters\", \"visual\", \"visual_load_menu\", \"subarchive_list\", \"archive_button\"] }*/;"
											   +"/*{ \"type\" : \"set\", \"value\" : \"'Value ' + i\", \"address\" : [\"label\"] }*/"
											   +"/*{ \"type\" : \"set\", \"value\" : \"(i + 5)\", \"address\" : [\"index\"] }*/"													   
											   +"/*{ \"type\" : \"set\", \"value\" : \"[100, 80 - (40 * i), 0]\", \"address\" : [\"position\"] }*/"												   
											   +"list[i+5] = /*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"macros\", \"parameters\", \"visual\", \"visual_load_menu\", \"subarchive_list\", \"archive_button\"] }*/;"
//														+"Core.ext_code_debug_probe(i + 5);"													   
											   +"}"
											   
//														+"Core.ext_code_debug_probe(list);"													   
//													   +"/*{ \"type\" : \"set\", \"value\" : \"30\", \"address\" : [\"index\"] }*/"													   
//													   +"/*{ \"type\" : \"set\", \"value\" : \"[0, 190, 0]\", \"address\" : [\"position\"] }*/"														   
											   +"list[10] = /*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"macros\", \"parameters\", \"visual\", \"visual_load_menu\", \"subarchive_list\", \"parent_button\"] }*/;"

											   +"/*{ \"type\" : \"set\", \"value\" : \"11\", \"address\" : [\"index\"] }*/"														   
											   +"/*{ \"type\" : \"set\", \"value\" : \"[-210, 80, 0]\", \"address\" : [\"position\"] }*/"	
//														+"Core.ext_code_debug_probe(/*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"macros\", \"parameters\", \"visual\", \"visual_load_menu\", \"subarchive_list\", \"cycle_up_button\"] }*/);"														   
											   +"list[11] =  /*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"macros\", \"parameters\", \"visual\", \"visual_load_menu\", \"subarchive_list\", \"cycle_up_button\"] }*/;"													   													   
											   +"/*{ \"type\" : \"set\", \"value\" : \"12\", \"address\" : [\"index\"] }*/"														   
											   +"/*{ \"type\" : \"set\", \"value\" : \"[210, -80, 0]\", \"address\" : [\"position\"] }*/"													   
											   +"list[12] =  /*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"macros\", \"parameters\", \"visual\", \"visual_load_menu\", \"subarchive_list\", \"cycle_down_button\"] }*/;"													   													   

											   

											   +"/*{ \"type\" : \"set\", \"value\" : \"13\", \"address\" : [\"index\"] }*/"														   
											   +"/*{ \"type\" : \"set\", \"value\" : \"[210, 80, 0]\", \"address\" : [\"position\"] }*/"														   
											   +"list[13] =  /*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"macros\", \"parameters\", \"visual\", \"visual_load_menu\", \"subarchive_list\", \"cycle_up_button\"] }*/;"													   													   
											   +"/*{ \"type\" : \"set\", \"value\" : \"14\", \"address\" : [\"index\"] }*/"														   
											   +"/*{ \"type\" : \"set\", \"value\" : \"[210, -80, 0]\", \"address\" : [\"position\"] }*/"													   
											   +"list[14] =  /*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"macros\", \"parameters\", \"visual\", \"visual_load_menu\", \"subarchive_list\", \"cycle_down_button\"] }*/;"													   													   

											   +"/*{ \"type\" : \"set\", \"value\" : \"'New Object'\", \"address\" : [\"label\"] }*/"
											   +"/*{ \"type\" : \"set\", \"value\" : \"15\", \"address\" : [\"index\"] }*/"														   
											   +"/*{ \"type\" : \"set\", \"value\" : \"[-100, -120, 0]\", \"address\" : [\"position\"] }*/"														   
											   +"list[15] =  /*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"macros\", \"parameters\", \"visual\", \"visual_load_menu\", \"subarchive_list\", \"new_button\"] }*/;"													   													   
											   
											   +"/*{ \"type\" : \"set\", \"value\" : \"'New Item'\", \"address\" : [\"label\"] }*/"
											   +"/*{ \"type\" : \"set\", \"value\" : \"16\", \"address\" : [\"index\"] }*/"														   
											   +"/*{ \"type\" : \"set\", \"value\" : \"[100, -120, 0]\", \"address\" : [\"position\"] }*/"													   
											   +"list[16] =  /*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"macros\", \"parameters\", \"visual\", \"visual_load_menu\", \"subarchive_list\", \"new_button\"] }*/;"													   													   

											   
//													   +"list[10] = /*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"macros\", \"parameters\", \"visual\", \"visual_load_menu\", \"subarchive_list\", \"parent_button\"] }*/;"

//													+"Core.ext_code_debug_probe(list);"													   
		
		
											   +"return list;"
											   +"}()),"
											   +"initialize:"
											   +"["
												+"{"
													+"initializer:"
													
													   +"function()"
													   +"{"
													   
													   
														   +"this.populate_subarchive_list = function()"
														   +"{"

															   +"var i = 0;"
															   +"for (; i <  5 && (i + this.archive_index) < this.subarchive_set.length; i++)"
															   +"{"
																   
																   +"this.elements[i].elements[0].set_texture({type: \"Text\", text: this.subarchive_set[i + this.archive_index] });"
																   +"if (this.visible == true) { this.elements[i].include(); }"

															   +"}"
															   
															   +"for (; i <  5; i++)"
															   +"{"
																   +"this.elements[i].exclude();"
															   +"}"

																+"if (this.archive_index + 5 >= this.subarchive_set.length)"
																+"{"
																	+"this.elements[12].exclude();"
																+"}"
															   +"else"
															   +"{"
																	+"this.elements[12].include();"
															   +"}"
															   
																+"if (this.archive_index == 0)"
																+"{"
																	+"this.elements[11].exclude();"
																+"}"
															   +"else"
															   +"{"
																	+"this.elements[11].include();"
															   +"}"														   
															   
															   +"i = 0;"
															   
															   +"for (; i <  5 && (i + this.item_index) < this.item_set.length; i++)"
															   +"{"
																   
																   +"this.elements[i + 5].elements[0].set_texture({type: \"Text\", text: this.item_set[i + this.item_index] });"
																   +"if (this.visible == true) { this.elements[i + 5].include(); }"
															   +"}"
															   
															   +"for (; i < 5; i++)"
															   +"{"
																   
																   +"this.elements[i + 5].exclude();"

															   +"}"
															   
																+"if (this.item_index + 5 >= this.item_set.length)"
																+"{"
																	+"this.elements[14].exclude();"
																+"}"
															   +"else"
															   +"{"
																	+"this.elements[14].include();"
															   +"}"
															   
																+"if (this.item_index == 0)"
																+"{"
																	+"this.elements[13].exclude();"
																+"}"
															   +"else"
															   +"{"
																	+"this.elements[13].include();"
															   +"}"														   

															   +"if (this.current_root_reference_chain.length > 0)"
															   +"{"
																	+"this.elements[10].elements[0].set_texture({type: \"Text\", text: this.current_root_reference_chain[this.current_root_reference_chain.length - 1] });"
															   +"}"
															   +"else"
															   +"{"
																	+"this.elements[10].elements[0].set_texture({type: \"Text\", text: 'TestMenu' });"
															   +"}"
																
															   
														   +"};"
														   
														   +"this.populate_subarchive_set = function()"
														   +"{"
															   +"this.archive_index = 0;"
															   +"this.item_index = 0;"	
														   
															   +"var sorted = this.archive.get_sorted_members_via_refvector(this.current_root_reference_chain);"
														   
															   +"this.subarchive_set = sorted.not_strings;"
															   +"this.item_set = sorted.strings;"
																												
														   +"};"
														   
														   +"this.get_archive = function()"
														   +"{"
														   
																+"Database.load_database_as_object(\"TestMenu\","
																												   +"1," 
																												   +"undefined,"
																												   +"function(DBObject)" 
																												   +"{"
																													   +"console.log('Reference loading complete.');"
																													   +"this.archive = DBObject;"																											   
																													   +"this.populate_subarchive_set();"
																													   +"this.item_index = 0;"
																													   +"this.archive_index = 0;"
																													   +"this.populate_subarchive_list();"
																												   +"}.bind(this)," 
																												   +"undefined);"								   
														   +"};"
														   

														   
														   +"this.reveal = function()"
														   +"{" 
															   +"for (var index = 0; index < this.elements.length; index++)"
															   +"{"
																   +"this.elements[index].reveal();"
																+"}" 
																+"this.visible = true;"
																+"this.populate_subarchive_list();"
														   +"};"
														   
														   +"this.archive = new Archive();"
														   +"this.subarchive_set = [];"
														   +"this.item_set = [];"
														   +"this.current_root_reference_chain = [];"
														   +"this.archive_index = 0;"
														   +"this.item_index = 0;"

														   +"this.get_archive();"
													   +"}"
												   +"}"
											   +"],"
																					   
											   +"activate:" 
											   +"["
		
											   +"function(button_index)" 
											   +"{" 
												   +"if (button_index < 5)"
												   +"{"
												   +"this.current_root_reference_chain.push(this.subarchive_set[button_index + this.archive_index]);" 
												   +"this.populate_subarchive_set();"
												   +"this.populate_subarchive_list();"
												   +"}"
												   +"else if (button_index < 10)"
												   +"{"
												   +"this.exclude();"
												   +"var selected_record = this.archive.get_member_via_refvector(this.current_root_reference_chain)[this.item_set[button_index - 5 + this.item_index]];"
													
													+"/*{ \"type\" : \"set\", \"value\" : \"{ document: selected_record }\", \"address\" : [\"Params\"] }*/"
													
												   +"this.parent.elements[1] = new /*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"macros\", \"parameters\", \"visual\", \"edit_screen\", \"root\"] }*/.geometry(/*{ \"type\" : \"refer\", \"address\" : [ \"database\", \"AlphaMenu\", \"references\", \"macros\", \"parameters\", \"visual\", \"edit_screen\", \"root\"] }*/, this.parent);"																	

												   +"this.parent.elements[1].reveal();"
												   +"this.parent.elements[1].include();"

												   +"}"
												   +"else if (button_index < 11)"
												   +"{"
													   +"this.current_root_reference_chain.pop();" 
													   +"this.populate_subarchive_set();"
													   +"this.populate_subarchive_list();"																
												   +"}"
												   +"else if (button_index < 12)"
												   +"{"
														+"if (this.archive_index > 0)"
														+"{"
															+"this.archive_index--;"
															+"this.populate_subarchive_list();"
														+"}"
												   +"}"
												   +"else if (button_index < 13)"
												   +"{"
														+"if (this.archive_index + 5 < this.subarchive_set.length)"
														+"{"
															+"this.archive_index++;"
															+"this.populate_subarchive_list();"
														+"}"
												   +"}"														   
												   +"else if (button_index < 14)"
												   +"{"
														+"if (this.item_index > 0)"
														+"{"
															+"this.item_index--;"
															+"this.populate_subarchive_list();"
														+"}"
												   +"}"
												   +"else if (button_index < 15)"
												   +"{"
														+"if (this.item_index + 5 < this.item_set.length)"
														+"{"
															+"this.item_index++;"
															+"this.populate_subarchive_list();"
														+"}"
												   +"}"			

												   +"else if (button_index < 16)"
												   +"{"
														   +"this.archive.add_member_path_via_refvector(this.current_root_reference_chain.concat(['new_object']));"
														   +"this.populate_subarchive_set();"
														   +"this.populate_subarchive_list();"
												   +"}"																	   
												   
												   +"else if (button_index < 17)"
												   +"{"
														   +"this.archive.add_member_via_refvector(this.current_root_reference_chain.concat(['new_text']), 'new text');"
														   +"this.populate_subarchive_set();"
														   +"this.populate_subarchive_list();"
												   +"}"			

												   
											   +"}"

											   +"]"
											   +"}",
							
							archive_button: "{ geometry: Visual, include: true, origin: [0, 0, 0], position: /*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"position\"] }*/, elements: [{ geometry: Graphics, include: true, model: Graphics.template_index.LABEL, size: [160, 30, 0], position: [0, 0, 0], materials: [{type: \"Text\", text: /*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"label\"] }*/, font_size: 16}]," 
											  +"activate:" 
											  +"["
											  +"new Function"
											  +"("
											  +"\"this.parent.parent.activate[0](\" + /*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"index\"] }*/ + \");\""
											  +")"
											  +"]}]," 
											  +"activate: [] }",

							parent_button: "{ geometry: Visual, include: true, origin: [0, 0, 0], position: [0, 380, 0], elements: [{ geometry: Graphics, include: true, model: Graphics.template_index.LABEL, size: [320, 60, 0], position: [0, 0, 0], materials: [{type: \"Text\", text: 'Archive', font_size: 16}]," 
											  +"activate:" 
											  +"["
											  +"function()"
											  +"{"
											  +"this.parent.parent.activate[0](10);"
											  +"}"
											  +"]}]," 
											  +"activate: [] }",
											  
							cycle_up_button: "{ geometry: Visual, include: true, origin: [0, 0, 0], position: /*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"position\"] }*/, elements: [{ geometry: Graphics, include: true, model: Graphics.template_index.LABEL, size: [40, 30, 0], position: [0, 0, 0], materials: [{type: \"Text\", text: '^', font_size: 16}]," 
											  +"activate:" 
											  +"["
											  +"new Function"
											  +"("
											  +"\"this.parent.parent.activate[0](\" + /*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"index\"] }*/ + \");\""
											  +")"
											  +"]}]," 
											  +"activate: [] }",

							cycle_down_button: "{ geometry: Visual, include: true, origin: [0, 0, 0], position: /*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"position\"] }*/, elements: [{ geometry: Graphics, include: true, model: Graphics.template_index.LABEL, size: [40, 30, 0], position: [0, 0, 0], materials: [{type: \"Text\", text: 'v', font_size: 16}]," 
											  +"activate:" 
											  +"["
											  +"new Function"
											  +"("
											  +"\"this.parent.parent.activate[0](\" + /*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"index\"] }*/ + \");\""
											  +")"
											  +"]}]," 
											  +"activate: [] }",
			
							new_button: "{ geometry: Visual, include: true, origin: [0, 0, 0], position: /*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"position\"] }*/, elements: [{ geometry: Graphics, include: true, model: Graphics.template_index.LABEL, size: [160, 30, 0], position: [0, 0, 0], materials: [{type: \"Text\", text: /*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"label\"] }*/, font_size: 16}]," 
											  +"activate:" 
											  +"["
											  +"new Function"
											  +"("
											  +"\"this.parent.parent.activate[0](\" + /*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"index\"] }*/ + \");\""
											  +")"
											  +"]}]," 
											  +"activate: [] }"
			
						},
						
						items_list:
						{
						}
					},
					
					edit_screen:
					{
						root: "{" 
									+"geometry: Visual, include: false, origin: [0, 0, 0], position: 0," 
									+"elements:" 
									+"["
										+"{"
										
											  // THE ACTUAL SCREEN
											  +"geometry: Graphics, include: true, model: Graphics.template_index.LABEL, size: [640, 380, 0], position: [0, -15, 0], materials: [{type: \"Text\", text: \"Wut?\", font_size: 16}]," 													   
											  +"activate:" 
											  +"["
											  +"function()"
											  +"{"
												  +"var coords = this.localize_global_coordinates(/*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"AlphaMenu\", \"instances\", \"BindMenu\"] }*/.elements[0].position);"

//													+"var node = doc.byCoordinate(0, 0);"


//														+"this.parent.cursorDragStart(1.5 * (coords.x + this.bbox.Xmax), 1.5 * (-coords.y + this.bbox.Ymax));"

												+"this.parent.elements[4].cursorDragStart(coords.x + this.bbox.Xmax, -coords.y + this.bbox.Ymax);"
											+"},"

											+"function()"
											+"{"	
//														+"this.parent.cursorDragEnd();"
												+"this.parent.elements[4].cursorDragEnd();"
											+"},"
											
											+"function()"
											+"{"
//														+"/*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"AlphaMouse\", \"instances\", \"mouse\"] }*/.bind_mousemove(this.parent.mousemove_response);"		
												+"Mouse.bind_mousemove(this.parent.elements[4].mousemove_response);"																											
											+"},"
											
											+"function()"
											+"{"
//														+"/*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"AlphaMouse\", \"instances\", \"mouse\"] }*/.unbind_mousemove(this.parent.mousemove_response);"
												+"Mouse.unbind_mousemove(this.parent.elements[4].mousemove_response);"														
											+"}"											
											
											+"]"
										+"},"
										
										
										// TITLE FIELD
										+"{"
											  +"geometry: Graphics, include: true, model: Graphics.template_index.LABEL, size: [80, 20, 0], position: [0, 190, 0], materials: [{type: \"Text\", text: \"Title\", font_size: 10}]," 													   
											  
											  +"activate:" 
											  +"["
											  +"function()"
											  +"{"

											  +"},"

											+"function()"
											+"{"	
												
											+"},"
											
											+"function()"
											+"{"
//														+"/*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"AlphaMouse\", \"instances\", \"mouse\"] }*/.bind_mousemove(this.parent.mousemove_response);"													
											+"},"
											
											+"function()"
											+"{"
//														+"/*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"AlphaMouse\", \"instances\", \"mouse\"] }*/.unbind_mousemove(this.parent.mousemove_response);"	
											+"}"											
											
											+"]"
										+"},"		

										
										// SAVE BUTTON
										+"{"
											  +"geometry: Graphics, include: true, model: Graphics.template_index.LABEL, size: [40, 10, 0], position: [-320, 190, 0], materials: [{type: \"Text\", text: \"Save\", font_size: 10}]," 													   
											  
											  +"activate:" 
											  +"["
											  +"function()"
											  +"{"
												 +"this.parent.save_archive();"
											+"},"

											+"function()"
											+"{"	

											+"},"
											
											+"function()"
											+"{"
//														+"/*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"AlphaMouse\", \"instances\", \"mouse\"] }*/.bind_mousemove(this.parent.mousemove_response);"													
											+"},"
											
											+"function()"
											+"{"
//														+"/*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"AlphaMouse\", \"instances\", \"mouse\"] }*/.unbind_mousemove(this.parent.mousemove_response);"	
											+"}"											
											
											+"]"
										+"},"
										
										
										// CLOSE BUTTON
										+"{"
											  +"geometry: Graphics, include: true, model: Graphics.template_index.LABEL, size: [40, 10, 0], position: [320, 190, 0], materials: [{type: \"Text\", text: \"Close\", font_size: 10}]," 													   
											  
											  +"activate:" 
											  +"["
											  +"function()"
											  +"{"
												+"this.parent.exclude();"
												+"this.parent.parent.elements[0].include();"
											+"},"

											+"function()"
											+"{"	

											+"},"
											
											+"function()"
											+"{"
//													+"/*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"AlphaMouse\", \"instances\", \"mouse\"] }*/.bind_mousemove(this.parent.mousemove_response);"													
											+"},"
											
											+"function()"
											+"{"
//													+"/*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"AlphaMouse\", \"instances\", \"mouse\"] }*/.unbind_mousemove(this.parent.mousemove_response);"	
											+"}"											
											
											+"]"
										+"},"
										
										// CARET
										+"{"
											  +"geometry: Visual, include: true, origin: [0, 0, 0], position: 0," 													   
											  
												+"elements: [],"
												+"activate:" 
												+"["


							
												
												+"],"
												
												+"initialize:"
												+"["
													+"{"
														  +"initializer:"
															  +"function()"
															  +"{"
																	
																	+"var element = Keyboard.TextArea;"
																	+"textAreaDiv = element.querySelector('.carotaTextArea'),"
																	+"textArea = element.querySelector('textarea'),"
																	+"doc = carotaDoc(),"
																	+"keyboardSelect = 0,"
																	+"keyboardX = null, nextKeyboardX = null,"
																	+"selectDragStart = null,"
																	+"focusChar = null,"
																	+"textAreaContent = '',"
																	+"richClipboard = null,"
																	+"plainClipboard = null;"
																
																	+"var verticalAlignment = 'top';"

																
																	+"var nextCaretToggle = new Date().getTime(),"
																	+"focused = false,"
																	+"cachedWidth = element.clientWidth,"
																	+"cachedHeight = element.clientHeight;"
																
																	+"var selecting = false;"
																
																	+"var require_paint = true;"
																
																	+"var ctrlKey = false;"
													
	//																+"this.elements.push(this.parent.elements[0]);"
																	+"this.update = function(Elapsed)"
																	+"{"

																	+"};"
																	
																	+"this.paint = function(selectDragStart, document, textArea)"
																	+"{"
																		+"var ctx = this.parent.elements[0].canvas.getContext('2d');"
																		+"var hasFocus = selectDragStart || (document.activeElement === textArea);"

																		+"if (doc.selection.end === doc.selection.start)" 
																		+"{"
																			+"if (doc.selectionJustChanged || hasFocus && doc.caretVisible) {"
																				+"var caret = doc.getCaretCoords(doc.selection.start);"
																				+"if (caret) {"
																					+"ctx.save();"
																					+"ctx.fillStyle = 'silver';"
																					+"caret.fill(ctx);"
																					+"ctx.restore();"
																				+"}"
																			+"}"
																		+"}"
																		+"else" 
																		+"{"
																			+"ctx.save();"
																			+"ctx.fillStyle = hasFocus ? 'rgba(0, 100, 200, 0.3)' : 'rgba(160, 160, 160, 0.3)';"
																			+"doc.selectedRange().parts(function(part) {"
																				+"part.bounds(true).fill(ctx);"
																			+"});"
																			+"ctx.restore();"
																		+"}"
																	+"};"
																	
																	// TODO: This is only necessary because we can't set an arbitrary order of element creation/initialization functions
																	// TODO: Make element creation at startup an initialization function
																	+"this.set_document = function(Document)"
																	+"{"
																	+"doc = Document;"
																	+"};"
																	
																	+"this.cursorDragStart = function(X, Y)"
																	+"{"
//																		+"this.parent.cursorDragStart(X, Y);"
																	
																		+"var node = doc.byCoordinate(X, Y);"
																		+"selectDragStart = node.ordinal;"
																		+"doc.select(node.ordinal, node.ordinal);"
	
																		+"keyboardX = null;"
																	+"};"	

																	+"this.cursorDragEnd = function()"
																	+"{"
//																		+"this.parent.cursorDragEnd();"
																	
																		+"selectDragStart = null;"
																		+"keyboardX = null;"
																		+"this.updateTextArea();"
																		+"textArea.focus();"
																	+"};"		
																	
																	+"this.changeLine = function(ordinal, direction)" 
																	+"{"

																		+"var originalCaret = doc.getCaretCoords(ordinal), newCaret;"
																		+"nextKeyboardX = (keyboardX !== null) ? keyboardX : originalCaret.l;"

																		+"while (!exhausted(ordinal, direction)) {"
																			+"ordinal += direction;"
																			+"newCaret = doc.getCaretCoords(ordinal);"
																			+"if (differentLine(newCaret, originalCaret)) {"
																				+"break;"
																			+"}"
																		+"}"

																		+"originalCaret = newCaret;"
																		+"while (!exhausted(ordinal, direction)) {"
																			+"if ((direction > 0 && newCaret.l >= nextKeyboardX) ||"
																				+"(direction < 0 && newCaret.l <= nextKeyboardX)) {"
																				+"break;"
																			+"}"

																			+"ordinal += direction;"
																			+"newCaret = doc.getCaretCoords(ordinal);"
																			+"if (differentLine(newCaret, originalCaret)) {"
																				+"ordinal -= direction;"
																				+"break;"
																			+"}"
																		+"}"

																		+"return ordinal;"
																	+"};"
																	
																	+"this.mousemove_response = function(X, Y)"
																	+"{"
																		
						
																		+"if (selectDragStart !== null) {"
					
																		
																			+"var coords = this.parent.localize_global_coordinates(/*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"AlphaMenu\", \"instances\", \"BindMenu\"] }*/.elements[0].position);"													  
																			
																			+"var node = doc.byCoordinate(1.5 * (coords.x + this.parent.elements[0].bbox.Xmax), 1.5 * (-coords.y + this.parent.elements[0].bbox.Ymax));"														
																		
																			+"if (node) {"
																				+"focusChar = node.ordinal;"
																				+"if (selectDragStart > node.ordinal)" 
																				+"{"
																					+"doc.select(node.ordinal, selectDragStart);"
																				+"}"
																				+"else"
																				+"{"
																					+"doc.select(selectDragStart, node.ordinal);"
																				+"}"
																			+"}"
																		+"}"												
																	+"}.bind(this);"

																	+"this.updateTextArea = function()" 
																	+"{"
																		+"focusChar = focusChar === null ? doc.selection.end : focusChar;"
																		+"var endChar = doc.subspaceXofOrderN(focusChar);"
																		+"focusChar = null;"
																		+"if (endChar)" 
																		+"{"
																			+"var bounds = endChar.bounds();"
																			+"textAreaDiv.style.left = bounds.l + 'px';"
																			+"textAreaDiv.style.top = bounds.t + 'px';"
																			+"textArea.focus();"
																			+"var scrollDownBy = Math.max(0, bounds.t + bounds.h -"
																					+"(element.scrollTop + element.clientHeight));"
																			+"if (scrollDownBy)" 
																			+"{"
																				+"element.scrollTop += scrollDownBy;"
																			+"}"
																			+"var scrollUpBy = Math.max(0, element.scrollTop - bounds.t);"
																			+"if (scrollUpBy)" 
																			+"{"
																				+"element.scrollTop -= scrollUpBy;"
																			+"}"
																			+"var scrollRightBy = Math.max(0, bounds.l - (element.scrollLeft + element.clientWidth));"
																			+"if (scrollRightBy)" 
																			+"{"
																				+"element.scrollLeft += scrollRightBy;"
																			+"}"
																			+"var scrollLeftBy = Math.max(0, element.scrollLeft - bounds.l);"
																			+"if (scrollLeftBy)" 
																			+"{"
																				+"element.scrollLeft -= scrollLeftBy;"
																			+"}"
																		+"}"
																		
																		+"textAreaContent = doc.selectedRange().plainText();"
																		+"textArea.value = textAreaContent;"
																		+"textArea.select();"

																		+"setTimeout(function()" 
																		+"{"
																			+"textArea.focus();"
																		+"}, 10);"
																	+"};"																		
																														   // Key handling variables
																   // TODO: Get toggles working again
																	+"var toggles =" 
																	+"{"
																		+"66: 'bold',"
																		+"73: 'italic',"
																		+"85: 'underline',"
																		+"83: 'strikeout'"
																	+"};"
																	
																	// Functions used in key-handling
																	+"var differentLine = function(caret1, caret2)" 
																	+"{"
																		+"return (caret1.b <= caret2.t) ||"
																			   +"(caret2.b <= caret1.t);"
																	+"};"														
																	
																	+"var changeLine = function(ordinal, direction)" 
																	+"{"

																		+"var originalCaret = doc.getCaretCoords(ordinal), newCaret;"
																		+"nextKeyboardX = (keyboardX !== null) ? keyboardX : originalCaret.l;"

																		+"while (!exhausted(ordinal, direction)) {"
																			+"ordinal += direction;"
																			+"newCaret = doc.getCaretCoords(ordinal);"
																			+"if (differentLine(newCaret, originalCaret)) {"
																				+"break;"
																			+"}"
																		+"}"

																		+"originalCaret = newCaret;"
																		+"while (!exhausted(ordinal, direction)) {"
																			+"if ((direction > 0 && newCaret.l >= nextKeyboardX) ||"
																				+"(direction < 0 && newCaret.l <= nextKeyboardX)) {"
																				+"break;"
																			+"}"

																			+"ordinal += direction;"
																			+"newCaret = doc.getCaretCoords(ordinal);"
																			+"if (differentLine(newCaret, originalCaret)) {"
																				+"ordinal -= direction;"
																				+"break;"
																			+"}"
																		+"}"

																		+"return ordinal;"
																	+"};"
																	
																	+"var endOfline = function(ordinal, direction)" 
																	+"{"
																		+"var originalCaret = doc.getCaretCoords(ordinal), newCaret;"
																		+"while (!exhausted(ordinal, direction)) {"
																			+"ordinal += direction;"
																			+"newCaret = doc.getCaretCoords(ordinal);"
																			+"if (differentLine(newCaret, originalCaret)) {"
																				+"ordinal -= direction;"
																				+"break;"
																			+"}"
																		+"}"
																		+"return ordinal;"
																	+"};"
																	
																	+"var exhausted = function(ordinal, direction)" 
																	+"{"
																		+"return direction < 0 ? ordinal <= 0 : ordinal >= doc.frame.length - 1;"
																	+"};"
																	
																	+"var differentLine = function(caret1, caret2)"
																	+"{"
																	+"return (caret1.b <= caret2.t) ||"
																	+"(caret2.b <= caret1.t);"
																	+"};"
														
																	+"var left_response =  function(){ var start = doc.selection.start, end = doc.selection.end, length = doc.frame.length - 1; if (selecting && !keyboardSelect) {keyboardSelect = -1; } var ordinal = keyboardSelect === 1 ? end : start;"
																													+"nextKeyboardX = null;"
																													+"if (!selecting && start != end) {"
																														+"ordinal = start;"
																													+"} else {"
																														+"if (ordinal > 0) {"
																															+"if (ctrlKey) {"
																																+"var wordInfo = doc.wordContainingOrdinal(ordinal);"
																																+"if (wordInfo.ordinal === ordinal) {"
																																	+"ordinal = wordInfo.index > 0 ? doc.wordOrdinal(wordInfo.index - 1) : 0;"
																																+"} else {"
																																	+"ordinal = wordInfo.ordinal;"
																																+"}"
																															+"} else {"
																																+"ordinal--;"
																															+"}"
																														+"}"
																													+"}"
																													
																													+"switch (keyboardSelect) {"
																														+"case 0:"
																															+"start = end = ordinal;"
																															+"break;"
																														+"case -1:"
																															+"start = ordinal;"
																															+"break;"
																														+"case 1:"
																															+"end = ordinal;"
																															+"break;"
																													+"}"

																													+"if (start === end) {"
																														+"keyboardSelect = 0;"
																													+"} else {"
																														+"if (start > end) {"
																															+"keyboardSelect = -keyboardSelect;"
																															+"var t = end;"
																															+"end = start;"
																															+"start = t;"
																														+"}"
																													+"}"
																													+"focusChar = ordinal;"
																													+"doc.select(start, end);"
																												+"};"
																	
																	+"var up_response =	function(){ var start = doc.selection.start, end = doc.selection.end, length = doc.frame.length - 1; if (selecting && !keyboardSelect) {keyboardSelect = -1; } var ordinal = keyboardSelect === 1 ? end : start;"
																												+"nextKeyboardX = null;"
																												+"ordinal = changeLine(ordinal, -1);"
																												+"switch (keyboardSelect) {"
																													+"case 0:"
																														+"start = end = ordinal;"
																														+"break;"
																													+"case -1:"
																														+"start = ordinal;"
																														+"break;"
																													+"case 1:"
																														+"end = ordinal;"
																														+"break;"
																												+"}"

																												+"if (start === end) {"
																													+"keyboardSelect = 0;"
																												+"} else {"
																													+"if (start > end) {"
																														+"keyboardSelect = -keyboardSelect;"
																														+"var t = end;"
																														+"end = start;"
																														+"start = t;"
																													+"}"
																												+"}"
																												+"focusChar = ordinal;"
																												+"doc.select(start, end);"
																											+"};"

																	+"var home_response = function(){ var start = doc.selection.start, end = doc.selection.end, length = doc.frame.length - 1; if (selecting && !keyboardSelect) {keyboardSelect = -1; } var ordinal = keyboardSelect === 1 ? end : start;"
																													+"nextKeyboardX = null;"
																													+"ordinal = endOfline(ordinal, -1);"
																													+"switch (keyboardSelect) {"
																														+"case 0:"
																															+"start = end = ordinal;"
																															+"break;"
																														+"case -1:"
																															+"start = ordinal;"
																															+"break;"
																														+"case 1:"
																															+"end = ordinal;"
																															+"break;"
																													+"}"

																													+"if (start === end) {"
																														+"keyboardSelect = 0;"
																													+"} else {"
																														+"if (start > end) {"
																															+"keyboardSelect = -keyboardSelect;"
																															+"var t = end;"
																															+"end = start;"
																															+"start = t;"
																														+"}"
																													+"}"
																													+"focusChar = ordinal;"
																													+"doc.select(start, end);"
																												+"}.bind(this);"
																												
																	+"var pageup_response = function(){ var start = doc.selection.start, end = doc.selection.end, length = doc.frame.length - 1; if (selecting && !keyboardSelect) {keyboardSelect = -1; } var ordinal = keyboardSelect === 1 ? end : start;"
																														+"nextKeyboardX = null;"
																														+"ordinal = 0;"
																														+"switch (keyboardSelect) {"
																															+"case 0:"
																																+"start = end = ordinal;"
																																+"break;"
																															+"case -1:"
																																+"start = ordinal;"
																																+"break;"
																															+"case 1:"
																																+"end = ordinal;"
																																+"break;"
																														+"}"

																														+"if (start === end) {"
																															+"keyboardSelect = 0;"
																														+"} else {"
																															+"if (start > end) {"
																																+"keyboardSelect = -keyboardSelect;"
																																+"var t = end;"
																																+"end = start;"
																																+"start = t;"
																															+"}"
																														+"}"
																														+"focusChar = ordinal;"
																														+"doc.select(start, end);"
																													+"};"
																													
																	+"var right_response = function(){ var start = doc.selection.start, end = doc.selection.end, length = doc.frame.length - 1; if (selecting && !keyboardSelect) {keyboardSelect = 1; } var ordinal = keyboardSelect === 1 ? end : start;"
																													+"nextKeyboardX = null;"
																													+"if (!selecting && start != end) {"
																														+"ordinal = end;"
																													+"} else {"
																														+"if (ordinal < length) {"
																															+"if (ctrlKey) {"
																																+"var wordInfo = doc.wordContainingOrdinal(ordinal);"
																																+"ordinal = wordInfo.ordinal + wordInfo.word.length;"
																															+"} else {"
																																+"ordinal++;"
																															+"}"
																														+"}"
																													+"}"
																													+"switch (keyboardSelect) {"
																														+"case 0:"
																															+"start = end = ordinal;"
																															+"break;"
																														+"case -1:"
																															+"start = ordinal;"
																															+"break;"
																														+"case 1:"
																															+"end = ordinal;"
																															+"break;"
																													+"}"

																													+"if (start === end) {"
																														+"keyboardSelect = 0;"
																													+"} else {"
																														+"if (start > end) {"
																															+"keyboardSelect = -keyboardSelect;"
																															+"var t = end;"
																															+"end = start;"
																															+"start = t;"
																														+"}"
																													+"}"
																													+"focusChar = ordinal;"
																													+"doc.select(start, end);"
																												+"};"
																	
																	+"var down_response = function(){ var start = doc.selection.start, end = doc.selection.end, length = doc.frame.length - 1; if (selecting && !keyboardSelect) {keyboardSelect = 1; } var ordinal = keyboardSelect === 1 ? end : start;"
																													+"Core.ext_code_debug_probe();"
																													+"nextKeyboardX = null;"
																													+"ordinal = changeLine(ordinal, 1);"
																													+"switch (keyboardSelect) {"
																														+"case 0:"
																															+"start = end = ordinal;"
																															+"break;"
																														+"case -1:"
																															+"start = ordinal;"
																															+"break;"
																														+"case 1:"
																															+"end = ordinal;"
																															+"break;"
																													+"}"

																													+"if (start === end) {"
																														+"keyboardSelect = 0;"
																													+"} else {"
																														+"if (start > end) {"
																															+"keyboardSelect = -keyboardSelect;"
																															+"var t = end;"
																															+"end = start;"
																															+"start = t;"
																														+"}"
																													+"}"
																													+"focusChar = ordinal;"
																													+"doc.select(start, end);"
																												+"};"
																	
																	+"var end_response = function(){ var start = doc.selection.start, end = doc.selection.end, length = doc.frame.length - 1; if (selecting && !keyboardSelect) {keyboardSelect = 1; } var ordinal = keyboardSelect === 1 ? end : start;"
																													+"nextKeyboardX = null;"														
																													+"ordinal = endOfline(ordinal, 1);"
																													+"switch (keyboardSelect) {"
																														+"case 0:"
																															+"start = end = ordinal;"
																															+"break;"
																														+"case -1:"
																															+"start = ordinal;"
																															+"break;"
																														+"case 1:"
																															+"end = ordinal;"
																															+"break;"
																													+"}"

																													+"if (start === end) {"
																														+"keyboardSelect = 0;"
																													+"} else {"
																														+"if (start > end) {"
																															+"keyboardSelect = -keyboardSelect;"
																															+"var t = end;"
																															+"end = start;"
																															+"start = t;"
																														+"}"
																													+"}"
																													+"focusChar = ordinal;"
																													+"doc.select(start, end);"
																											+"};"
																											
																	+"var pagedown_response = function(){ var start = doc.selection.start, end = doc.selection.end, length = doc.frame.length - 1; if (selecting && !keyboardSelect) {keyboardSelect = 1; } var ordinal = keyboardSelect === 1 ? end : start;"
																															+"nextKeyboardX = null;"
																															+"ordinal = length;"
																															+"switch (keyboardSelect) {"
																																+"case 0:"
																																	+"start = end = ordinal;"
																																	+"break;"
																																+"case -1:"
																																	+"start = ordinal;"
																																	+"break;"
																																+"case 1:"
																																	+"end = ordinal;"
																																	+"break;"
																															+"}"

																															+"if (start === end) {"
																																+"keyboardSelect = 0;"
																															+"} else {"
																																+"if (start > end) {"
																																	+"keyboardSelect = -keyboardSelect;"
																																	+"var t = end;"
																																	+"end = start;"
																																	+"start = t;"
																																+"}"
																															+"}"
																															+"focusChar = ordinal;"
																															+"doc.select(start, end);"
																														+"};"
																	
																	+"var backspace_response =  function()"
																											+"{" 
																												+"nextKeyboardX = null;"
																												+"var start = doc.selection.start, end = doc.selection.end, length = doc.frame.length - 1;"
																												+"if (start === end && start > 0) {"
																													+"doc.range(start - 1, start).clear();"
																													+"focusChar = start - 1;"
																													+"doc.select(focusChar, focusChar);"
																												+"}"
																											+"};"
																									
																	+"var delete_response = function(){ var start = doc.selection.start, end = doc.selection.end, length = doc.frame.length - 1;"
																													+"nextKeyboardX = null;"
																													+"if (start === end && start < length) {"
																														+"doc.range(start, start + 1).clear();"
																													+"}"
																												+"};"																									
													
															
																	+"dom.handleEvent(element, 'scroll', function(){require_paint = true;}.bind(this));"
																	
																	+"dom.handleEvent(textArea, 'input', function()" 
																	+"{"
																		+"var newText = textArea.value;"
																		+"if (textAreaContent != newText) {"
																			+"textAreaContent = '';"
																			+"textArea.value = '';"
																			+"if (newText === plainClipboard) {"
																				+"newText = richClipboard;"
																			+"}"
																			+"doc.insert(newText);"
																		+"}"
																	+"});"
																	
																	// We don't update the JSON view until half a second after the last change
																	// to avoid slowing things down too much
																	+"var updateTimer = null;"
																	+"var manuallyChangingJson = 0;"

																	/*exampleEditor.load([
																		{ text: 'A' },
																		{ text: { $: 'listStart' }, color: 'blue' },
																		{ text: 'B' },
																		{ text: { $: 'listNext' }, color: 'red' },
																		{ text: 'C' },
																		{ text: { $: 'listEnd' } },
																		{ text: 'D' }
																	]);
																	  */
																													
																			+"var deactivate_ctrl_map =" 
																			+"["
																				+"{ key: 'z', up_response: undefined, down_response: [Core.true_function] },"
																				+"{ key: 'y', up_response: undefined, down_response: [Core.true_function] },"
																				+"{ key: 'a', up_response: undefined, down_response: [Core.true_function] },"
																				+"{ key: 'c', up_response: undefined, down_response: [Core.true_function] },"																																		
																				+"{ key: 'x', up_response: undefined, down_response: [Core.true_function] }"																																		
																			+"];"														
																	
																	
																	/*															+"var toggle = toggles[key];"
																		+"if (ctrlKey && toggle) {"
																			+"var selRange = doc.selectedRange();"
																			+"selRange.setFormatting(toggle, selRange.getFormatting()[toggle] !== true);"
																			+"require_paint = true;"
																			+"handled = true;"
																		+"}"*/
																			+"var activate_ctrl_map =" 
																			+"["
																				+"{ key: 'z', up_response: undefined, down_response: [function () { doc.performUndo(); }] },"
																				+"{ key: 'y', up_response: undefined, down_response: [function () { doc.performUndo(true); }] },"
																				+"{ key: 'a', up_response: undefined, down_response: [function () { doc.select(0, doc.frame.length - 1); return false; }] },"
																				+"{ key: 'c', up_response: undefined, down_response: [function () { richClipboard = doc.selectedRange().save(); plainClipboard = doc.selectedRange().plainText(); return true; }] },"																																		
																				+"{ key: 'x', up_response: undefined, down_response: [function () { richClipboard = doc.selectedRange().save(); plainClipboard = doc.selectedRange().plainText(); return true; }] }"																																		
																			+"];"												
																	
																   +"var activate_ctrl_mode = function()"
																   +"{"
																			+"Keyboard.unbind_response_set(deactivate_ctrl_map);" 															
																			
																			+"Keyboard.bind_response_set(activate_ctrl_map);" 
																		
																			+"ctrlKey = true;"
																   +"}.bind(this);"
																   
																   +"var deactivate_ctrl_mode = function()"
																   +"{"			
																			+"Keyboard.unbind_response_set(activate_ctrl_map);" 
																			
																			+"Keyboard.bind_response_set(deactivate_ctrl_map);" 
																   
																			+"ctrlKey = false;"
																   +"}.bind(this);"	


	/*													   			+"var deactivate_shift_map =" 
																	+"["
																		+"{ key: 'left', up_response: undefined, down_response: [Core.true_function] },"
																		+"{ key: 'right, up_response: undefined, down_response: [Core.true_function] },"
																		+"{ key: 'up', up_response: undefined, down_response: [Core.true_function] },"
																		+"{ key: 'down', up_response: undefined, down_response: [Core.true_function] }"																																																																				
																	+"];"														
															
																	+"var activate_shift_map =" 
																	+"["
																		+"{ key: 'z', up_response: undefined, down_response: [function () { doc.performUndo(); }] },"
																		+"{ key: 'y', up_response: undefined, down_response: [function () { doc.performUndo(true); }] },"
																		+"{ key: 'a', up_response: undefined, down_response: [function () { doc.select(0, doc.frame.length - 1); return false; }] },"
																		+"{ key: 'c', up_response: undefined, down_response: [function () { richClipboard = doc.selectedRange().save(); plainClipboard = doc.selectedRange().plainText(); return true; }] }"																																																																		
																	+"];"	*/											
													
																	
																   +"var activate_shift_mode = function()"
																   +"{"
																			+"Keyboard.unbind_response_set(deactivate_shift_map);" 															
																			
																			+"Keyboard.bind_response_set(activate_shift_map);" 
																   
																   +"}.bind(this);"
																   
																   +"var deactivate_shift_mode = function()"
																   +"{"			
																			+"Keyboard.unbind_response_set(activate_ctrl_map);" 
																			
																			+"Keyboard.bind_response_set(deactivate_ctrl_map);" 
																   
																   +"}.bind(this);"			
																													
																			+"var base_key_map =" 	
																				+"["
																					+"{ key: 'a', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: 'b', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: 'c', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: 'd', up_response: undefined, down_response: [Core.true_function] },"																																		
																					+"{ key: 'e', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: 'f', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: 'g', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: 'h', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: 'i', up_response: undefined, down_response: [Core.true_function] },"																																		
																					+"{ key: 'j', up_response: undefined, down_response: [Core.true_function] },"																																		
																					+"{ key: 'k', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: 'l', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: 'm', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: 'n', up_response: undefined, down_response: [Core.true_function] },"																																		
																					+"{ key: 'o', up_response: undefined, down_response: [Core.true_function] },"																																		
																					+"{ key: 'p', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: 'q', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: 'r', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: 's', up_response: undefined, down_response: [Core.true_function] },"																																		
																					+"{ key: 't', up_response: undefined, down_response: [Core.true_function] },"																																		
																					+"{ key: 'u', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: 'v', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: 'w', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: 'x', up_response: undefined, down_response: [Core.true_function] },"																																		
																					+"{ key: 'y', up_response: undefined, down_response: [Core.true_function] },"																																		
																					+"{ key: 'z', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: '0', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: '1', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: '2', up_response: undefined, down_response: [Core.true_function] },"																																		
																					+"{ key: '3', up_response: undefined, down_response: [Core.true_function] },"																																		
																					+"{ key: '4', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: '5', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: '6', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: '7', up_response: undefined, down_response: [Core.true_function] },"																																		
																					+"{ key: '8', up_response: undefined, down_response: [Core.true_function] },"																																		
																					+"{ key: '9', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: '-', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: '=', up_response: undefined, down_response: [Core.true_function] },"

																					+"{ key: 'ctrl', up_response: [deactivate_ctrl_mode], down_response: [activate_ctrl_mode] },"															
																					+"{ key: 'shift', up_response: [function(){selecting = false; keyboardSelect = 0;}.bind(this)], down_response: [function(){selecting = true;}.bind(this)] },"

																					+"{ key: 'home', up_response: undefined, down_response: [home_response] },"															
																					+"{ key: 'end', up_response: undefined, down_response: [end_response] },"
																					+"{ key: 'pagedown', up_response: undefined, down_response: [pagedown_response] },"															
																					+"{ key: 'pageup', up_response: undefined, down_response: [pageup_response] },"

																					
																					+"{ key: 'insert', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: 'space', up_response: undefined, down_response: [Core.true_function] },"																																		
																					+"{ key: 'tab', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: 'enter', up_response: undefined, down_response: [Core.true_function] },"
																					
																					+"{ key: 'delete', up_response: undefined, down_response: [delete_response] },"
																					+"{ key: 'backspace', up_response: undefined, down_response: [backspace_response] },"																		
																					
																					
																					+"{ key: '[', up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: ']', up_response: undefined, down_response: [Core.true_function] },"
																					
																					
																					
																					+"{ key: 'left', up_response: undefined, down_response: [left_response] },"
																					+"{ key: 'right', up_response: undefined, down_response: [right_response] },"
																					+"{ key: 'up', up_response: undefined, down_response: [up_response] },"
																					+"{ key: 'down', up_response: undefined, down_response: [down_response] },"																		
																					
																					+"{ key: \"\\\\\", up_response: undefined, down_response: [Core.true_function] },"
																					+"{ key: \"\\\'\", up_response: undefined, down_response: [Core.true_function] },"																			
																				+"];"	
																			
																	+"Keyboard.bind_response_set(base_key_map);" 
																	
															  +"}"
													+"}"
													  
												+"]"
										+"}"												
										
									+"]," 
											  
									+"initialize:"
									+"["
										+"{"	
											+"parameters: /*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"Params\"] }*/,"
											+"initializer:"
												+"function(Params)"
												+"{"													
												
													+"var element = Keyboard.TextArea;"
													+"var canvas = this.elements[0].canvas,"
													+"textAreaDiv = element.querySelector('.carotaTextArea'),"
													+"textArea = element.querySelector('textarea'),"
													+"doc = carotaDoc(),"
													+"keyboardSelect = 0,"
													+"keyboardX = null, nextKeyboardX = null,"
													+"selectDragStart = null,"
													+"focusChar = null,"
													+"textAreaContent = '',"
													+"richClipboard = null,"
													+"plainClipboard = null;"
												
													+"var verticalAlignment = 'top';"

												
													+"var nextCaretToggle = new Date().getTime(),"
													+"focused = false,"
													+"cachedWidth = element.clientWidth,"
													+"cachedHeight = element.clientHeight;"
												
													+"var selecting = false;"
												
													+"var require_paint = true;"
												
													+"var ctrlKey = false;"
												
													+"var notify_paint = function(){require_paint = true;}.bind(this);"

													+"this.archives = [];"
													
													
															+"doc = Object.create(carotaDoc());"
															+"doc._width = 0;"
															+"doc.selection = { start: 0, end: 0 };"
															+"doc.caretVisible = true;"
															+"doc.customCodes = function(code, data, allCodes) {};"
															+"doc.codes = function(code, data) {"
																+"var instance = codes(code, data, doc.codes);"
																+"return instance || doc.customCodes(code, data, doc.codes);"
															+"};"
															
															
															+"var poop = function()" 
															+"{"
																+"var handlers = [];"

																+"var subscribe = function(handler)" 
																+"{"
																	+"handlers.push(handler);"
																+"};"

																+"subscribe.fire = function()" 
																+"{"
																	+"var args = Array.prototype.slice.call(arguments, 0);"
																	+"handlers.forEach(function(handler) { handler.apply(null, args); });"
																+"};"

																+"return subscribe;"
															+"};"
															
															+"doc.selectionChanged = poop();"
														
															+"doc.editFilters = [codes.editFilter];"
															+"doc.load([]);"															
															
															+"doc.load([{color:'silver', text:Params.document}]);"
															
															+"doc.setVerticalAlignment = function(va)" 
															+"{"
																+"verticalAlignment = va;"
																+"require_paint = true;"
															+"};"		
															
															+"doc.selectionChanged"
															+"("
																+"function(getformatting, takeFocus)"
																+"{"
																	+"require_paint = true;"
																	+"if (!selectDragStart) {"
																		+"if (takeFocus !== false) {"
																			+"this.updateTextArea();"
																		+"}"
																	+"}"
																+"}.bind(this)"
															+");"
													
													+"this.elements[4].set_document(doc);"
													
													

													
													+"this.open_archive = function(name, body, path)"
													+"{"
														+"this.archives.push({ name: name, data: body, path: path });"
														+"this.elements[1].set_texture({ type: \"Text\", text: name, font_size: 10 });"
														+"return this.open_doc(body);"
													+"};"
													
													+"this.save_archive = function()"
													+"{"		

														+"this.parent.elements[0].archive.set_member_via_refvector(this.archives[0].path, this.save_doc());"
										
														+"Database.create_database_from_object('TestMenu', this.parent.elements[0].archive, undefined);"
													+"};"
															
													   
												+"var getVerticalOffset = function()" 
												+"{"
													+"var docHeight = doc.frame.bounds().h;"
													+"if (docHeight < element.clientHeight)" 
													+"{" 
														+"switch (verticalAlignment)" 
														+"{"
															+"case 'middle':"
																+"return (element.clientHeight - docHeight) / 2;"
															+"case 'bottom':"
																+"return element.clientHeight - docHeight;"
														+"}"
													+"}"
													+"return 0;"
												+"};"
												
												+"this.paint = function()" 
												+"{"

													+"var availableWidth = element.clientWidth * 1;" // adjust to 0.5 to see if we draw in the wrong places!
													+"if (doc.width() !== availableWidth) {"
														+"doc.width(availableWidth);"
													+"}"

													+"var docHeight = doc.frame.bounds().h;"

													+"var dpr = Math.max(1, window.devicePixelRatio || 1);"
													
//													+"var logicalWidth = Math.max(doc.frame.actualWidth(), element.clientWidth),"
//														+"logicalHeight = element.clientHeight;"

													+"var logicalWidth = 1280,"
														+"logicalHeight = 760;"

														
													+"canvas.width = dpr * logicalWidth;"
													+"canvas.height = dpr * logicalHeight;"
													+"canvas.style.width = logicalWidth + 'px';"
													+"canvas.style.height = logicalHeight + 'px';"
													
													+"canvas.style.top = element.scrollTop + 'px';"

//													+"Core.ext_code_debug_probe(canvas.width, canvas.height, logicalWidth, logicalHeight);"
													
													+"if (docHeight < (element.clientHeight - 50) &&"
														+"doc.frame.actualWidth() <= availableWidth) {"
														+"element.style.overflow = 'hidden';"
													+"} else {"
														+"element.style.overflow = 'auto';"
													+"}"

													+"var ctx = canvas.getContext('2d');"

													+"ctx.scale(dpr, dpr);"

													+"ctx.clearRect(0, 0, logicalWidth, logicalHeight);"
													+"ctx.translate(0, getVerticalOffset() - element.scrollTop);"
		

// RIGHT HERE!		
													+"doc.draw(ctx, rect(0, element.scrollTop, logicalWidth, logicalHeight));"
													+"this.elements[4].paint(selectDragStart, document, textArea);"
//													+"doc.drawSelection(ctx, selectDragStart || (document.activeElement === textArea));"
													
													 +"var texture = new THREE.Texture(canvas);"													   
													 +"texture.needsUpdate = true;"
													 +"this.elements[0].material.uniforms.tSec = { type: \"t\", value: texture };"

												+"};"		

												+"this.updateTextArea = function()" 
												+"{"
													+"focusChar = focusChar === null ? doc.selection.end : focusChar;"
													+"var endChar = doc.subspaceXofOrderN(focusChar);"
													+"focusChar = null;"
													+"if (endChar)" 
													+"{"
														+"var bounds = endChar.bounds();"
														+"textAreaDiv.style.left = bounds.l + 'px';"
														+"textAreaDiv.style.top = bounds.t + 'px';"
														+"textArea.focus();"
														+"var scrollDownBy = Math.max(0, bounds.t + bounds.h -"
																+"(element.scrollTop + element.clientHeight));"
														+"if (scrollDownBy)" 
														+"{"
															+"element.scrollTop += scrollDownBy;"
														+"}"
														+"var scrollUpBy = Math.max(0, element.scrollTop - bounds.t);"
														+"if (scrollUpBy)" 
														+"{"
															+"element.scrollTop -= scrollUpBy;"
														+"}"
														+"var scrollRightBy = Math.max(0, bounds.l - (element.scrollLeft + element.clientWidth));"
														+"if (scrollRightBy)"
														+"{"
															+"element.scrollLeft += scrollRightBy;"
														+"}"
														+"var scrollLeftBy = Math.max(0, element.scrollLeft - bounds.l);"
														+"if (scrollLeftBy)" 
														+"{"
															+"element.scrollLeft -= scrollLeftBy;"
														+"}"
													+"}"
													
													+"textAreaContent = doc.selectedRange().plainText();"
													+"textArea.value = textAreaContent;"
													+"textArea.select();"

													+"setTimeout(function()" 
													+"{"
														+"textArea.focus();"
													+"}, 10);"
												+"};"												
												
													   +"this.update = function(Elapsed)"
													   +"{"

														   +"this.update_timer -= Elapsed;"
														   +"if (this.update_timer < 0)"
														   +"{"
														   +"this.update_timer += 0.5;"
	//													   +"update();"
														   +"}"
														   
//															+"var requirePaint = false;
															+"var newFocused = document.activeElement === textArea;"
															+"if (focused !== newFocused) {"
																+"focused = newFocused;"
																+"require_paint = true;"
															+"}"

															+"var now = new Date().getTime();"
															+"if (now > nextCaretToggle) {"
																+"nextCaretToggle = now + 500;"
																+"if (doc.toggleCaret()) {"
																	+"require_paint = true;"
																+"}"
															+"}"

															+"if (element.clientWidth !== cachedWidth ||"
																+"element.clientHeight !== cachedHeight) {"
																+"require_paint = true;"
																+"cachedWidth = element.clientWidth;"
																+"cachedHeight = element.clientHeight;"
															+"}"
	//													   +"update();"
														   +""
														   
															+"if (require_paint == true) { this.paint(); require_paint = false; this.elements[0].material.needsUpdate = true;}"														
													   +"}.bind(this);"												
														
													   +"var htmlcore = new html();"
														
														// We don't update the JSON view until half a second after the last change
														// to avoid slowing things down too much
														+"var updateTimer = null;"
														+"var manuallyChangingJson = 0;"

														/*exampleEditor.load([
															{ text: 'A' },
															{ text: { $: 'listStart' }, color: 'blue' },
															{ text: 'B' },
															{ text: { $: 'listNext' }, color: 'red' },
															{ text: 'C' },
															{ text: { $: 'listEnd' } },
															{ text: 'D' }
														]);
														  */
																									
												+"}"
										+"}"
									+"],"

								+"activate: [] }"														  							
					},
					
					new_visual_menu_resize_button: "{ geometry: Visual, include: true, origin: [0, 0, 0], position: [-80, 80, 0], elements: [{ geometry: Graphics, include: true, model: Graphics.template_index.LABEL, size: [20, 20, 0], position: [0, 0, 0], materials: [{type: \"Text\", text: \"X\", font_size: 16}]," 
															   +"activate:" 
															   +"["
															   +"function()"
															   +"{"
															   +"arguments[0].activate[0]();"
															   +"Mouse.bind_mousemove(function(X, Y)"
															   +"{"

															   +"var x = X * 0.1;"
															   +"var y = Y * -0.1;"
															   
															   +"if (50 + x <= Math.MIN_DISTANCE) { x = Math.MIN_DISTANCE - 50; }"
															   +"if (50 + y <= Math.MIN_DISTANCE) { y = Math.MIN_DISTANCE - 50; }"
															   
															   +"50 += x;"
															   +"50 += y;"																	   
															   
															   +"/*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"AlphaMenu\", \"instances\", \"BindMenu\"] }*/.elements[2].elements[0].elements[0].set_scale(/*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"AlphaMenu\", \"instances\", \"BindMenu\"] }*/.visual_parameters.size[0], /*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"AlphaMenu\", \"instances\", \"BindMenu\"] }*/.visual_parameters.size[1], 1);" 
															   +"this.parent.parent.inflate(new THREE.Vector3(x, y, 0));" 

															   +"}.bind(this));"
															   +"}"
															   +"]}]," 
															   +"activate: [] }",
															   
					new_visual_menu_texture_button: "{ geometry: Visual, include: true, origin: [0, 0, 0], text:\"\", position: [80, -80, 0],  elements: [{ geometry: Graphics, include: true, model: Graphics.template_index.LABEL, size: [80, 15, 0], position: [0, 0, 0], materials: [{type: \"Text\", text: \"Texture\", font_size: 16}]," 
															   +"activate:" 
															   +"["
															   +"function()"
															   +"{"

														   
															   +"}"
															   +"]}]," 
															   +"activate:" 
															   +"["
															   +"function()"
															   +"{"
															   +"var text = 'New Visual';"
															   +"if (arguments[0] == \"backspace\")"
															   +"{"
															   +"if (text.length > 0)" 
															   +"{" 
															   +"text = text.slice(0, text.length -1);"
															   +"}"
															   +"}"
															   +"else"
															   +"{"
															   +"text += arguments[0];"
															   +"}"
															   +"/*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"AlphaMenu\", \"instances\", \"BindMenu\"] }*/.elements[2].elements[0].elements[0].set_texture({ type: \"Text\", text: 'New Visual' });"
															   +"}"
															   +"]" 
															   +"}",

					new_visual_menu_save_button: "{ geometry: Visual, include: true, origin: [0, 0, 0], position: [-80, -80, 0], elements: [{ geometry: Graphics, include: true, model: Graphics.template_index.LABEL, size: [80, 15, 0], position: [0, 0, 0], materials: [{type: \"Text\", text: \"Save\", font_size: 16}]," 
															   +"activate:" 
															   +"["
															   +"function()"
															   +"{"
																   +"menu_test.references.macros.parameters.visual.new_visual = JSON.stringify(/*{ \"type\" : \"refer\", \"address\" : [ \"local\", \"AlphaMenu\", \"instances\", \"BindMenu\"] }*/.get_visual_parameters());"
//																	   +"menu_library.references.macros.parameters.visual.new_visual_menu_save_button = menu_library.references.macros.parameters.visual.new_visual_menu_texture_button;"
//																	   +"menu_library.name = \"TestMenu\";"
																   +"Importer(menu_test, undefined);"
															   +"}"
															   +"]}]," 
															   +"activate: [] }",	

															   
															   

					new_visual: "{ geometry: Visual, include: true, origin: [0, 0, 0], position: [0, 0, 0], elements: [{ geometry: Graphics, include: true, model: Graphics.template_index.LABEL, size: [50, 50, 0], position: [0, 0, 0], materials: [{type: \"Text\", text: \"Text\", font_size: 16}], activate: [] }], activate: [] }",

					
					new_Graphics_button: ""

					
//							Graphics.canvas.width
				},
				
				Graphics:
				{	
					new_default: "{ geometry: Graphics, include: true, model: Graphics.template_index.LABEL, size: [180, 20, 0], position: [340, 0, 0], materials: [{type: \"Text\", text: \"New Graphics\", font_size: 16}], activate: [function(){this.conceal();}] }"
				}
			}
		}
	}
};	
