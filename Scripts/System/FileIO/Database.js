function Database(){}

function Archive(){}


// Archive object. Essentially an interface object for a browser internal database object, built by Database functions TODO: get the standard name for this and put it here
// TODO: self-saving to database feature 
Archive.prototype = 
{
	get_member_via_refvector: function(ReferenceVector)
	{
		var member = this;
		
		for (var vector_index = 0; vector_index < ReferenceVector.length && member != undefined; vector_index++)
		{
			member = member[ReferenceVector[vector_index]];
		}
		
		return member;
	},

	set_member_via_refvector: function(ReferenceChain, Value)
	{
		var Object = this;
		
		for (var chain_index = 0; chain_index < (ReferenceChain.length - 1) && Object != undefined; chain_index++)
		{
			Object = Object[ReferenceChain[chain_index]];
		}
			
		Object[ReferenceChain[chain_index]] = Value;
	},
	
	create_contexts: function(Contexts)
	{
		
	},

	add_member_via_refvector: function(ContextChain, Context)
	{
		this.add_member_path_via_refvector(ContextChain, Context);
		var context = this.get_member_via_refvector(ContextChain.slice(0, ContextChain.length - 1));
		
		context[ContextChain[ContextChain.length - 1]] = Context
	},

	add_member_path_via_refvector: function(context_chain)
	{
		var context = this;
		
		for (var chain_index = 0; chain_index < context_chain.length; chain_index++)
		{
			if (context[context_chain[chain_index]] == undefined) context[context_chain[chain_index]] = {};
			
			context = context[context_chain[chain_index]];
		}
	},


	remove_context: function(reference_chain)
	{

	},

	remove_contexts: function(Contexts)
	{
		
	},

	get_sorted_members_via_refvector: function(ReferenceVector)
	{
	   var current_root = this.get_member_via_refvector(ReferenceVector);
   
	   var subarchive_set = [];
	   var item_set = [];
	   
	   for (var property in current_root) 
	   {
			if (current_root.hasOwnProperty(property)) 
			{
				if ( typeof current_root[property] != 'string' )
				{
					subarchive_set.push(property);
				}
				else
				{
					item_set.push(property);
				}
			}
		}
		
		return { not_strings: subarchive_set, strings: item_set };
    }
};

// Builds a database based on the structure of the object ("Frame"), with stores corresponding to first order members and records corresponding to second order members.
// Starts out by attempting to delete any existing database of the same name TODO: Overwrite option
Database.create_database_from_object = function(Name, Frame, Return)
{
	var store_list = [];	
	var store_index = 0;
	
	var record_list;
	var record_index;
	
	var store;
	
	var import_store = function()
	{
		if (store_index >= store_list.length) { Database.close_database(); Return(); }
		else
		{
			var transaction = Database.handle.transaction([store_list[store_index]],"readwrite");
			store = transaction.objectStore(store_list[store_index]);

			record_list = [];
		
			record_index = 0;

			for (var record in Frame[store_list[store_index]])
			{
				record_list.push(record);
			}
			
			console.log("Importing " + store_list[store_index]);
			
			import_record();
		}
	}.bind(this);

	import_record = function()
	{
		
		if (record_index >= record_list.length) { store_index++; import_store(); }
		else
		{	

			var request = store.put(Frame[store_list[store_index]][record_list[record_index]], record_list[record_index]);
			
			request.onerror = function(e) 
			{
				console.log("Error",e.target.error.name);
				//some type of error handler
			}
		 
			request.onsuccess = function() { record_index++; import_record(); }
		}
	}.bind(this);
	
	
	open = function()
	{
		Database.open_database
		(
			Name,
		
			import_store,
			
			undefined,
			
			function(event)
			{
				console.log("Upgrading");

				for (var store in Frame)
				{
					store_list.push(store);
					Database.handle.createObjectStore(store);
				}	
			}.bind(this)
		);
	}.bind(this);
	
	console.log("Importing " + Name);
	
	// try to delete existing database by this name, then call open()
	// TODO: make overwrite an option (with the default being not to just to be safe?)
	Database.delete_database(Name, open);		
};

Database.load_database_as_object = function(Name, Version, Frame, Return, Upgrade)
{
	var object = new Archive();
	var store_index;
	var store_names;
	var object_index;

	var prime_stores = function()
	{
		store_index = 0;
// TODO: Implement selective database loading
//		if (object == undefined) 
//		{ 
			store_names = Database.handle.objectStoreNames;
//		}
//		else { store_names = Object.keys(object); }
		load_stores();
	};
	
	var load_stores = function()
	{
		if (store_index >= store_names.length) { close(); return; }
		
		if (Database.handle.objectStoreNames.contains(store_names[store_index]))
		{
			Database.transaction_readonly
			(
				[store_names[store_index]],
				undefined,			// TODO: Error should be something abortive 
				function(StoreArray, StoreObject) 
				{
					object[store_names[store_index]] = StoreObject;
					store_index++;
					load_stores();
				}.bind(this)
			);
		}
		else
		{
			store_index++;
			load_stores();
		}
	};
	
	var close = function()
	{
		Database.close_database();
		Return(object);
	};
	
	Database.open_database
	(
		Name,
		prime_stores,
		undefined,
		Upgrade		
	);

};

Database.delete_database = function(Name, Success, Error)
{
	var DBDeleteRequest = window.indexedDB.deleteDatabase(Name);

	DBDeleteRequest.onerror = function(event) 
	{
		console.log("Error deleting database.");
	};
	 
	if (Success != undefined) { DBDeleteRequest.onsuccess = Success; }
	else 
	{
		DBDeleteRequest.onsuccess = function(event) 
		{
			console.log("Database deleted successfully");
		};
	}
};

Database.open_database = function(Name, Success, Error, Upgrade)
{	
	var request = window.indexedDB.open(Name, 1);
	
	if (Success != undefined) { request.onsuccess = function(event){Database.handle = event.target.result; Success(event);}; }
	else 
	{
		request.onsuccess  = function(event)
		{
			console.log("Success opening " + Name + ", now what?");
			Database.handle = event.target.result;
		};
	}
	
	if (Error != undefined) { request.onerror = Error; }
	else
	{
		request.onerror = function(event)
		{
			console.log("Error opening Database" + Name, event);
		};
	}
	
	if (Upgrade != undefined) { request.onupgradeneeded =  function(event){Database.handle = event.target.result; Upgrade(event);}; }
	else 
	{
		request.onupgradeneeded = function(event)
		{
			console.log("Database " + Name + " version older than requested version");
			Database.handle = event.target.result;
		};
	}	
};

Database.close_database = function(Next)
{
	Database.handle.close();
	console.log("Database " + Database.handle.name + " closed");
	if (typeof Next === "function") Next();
};

// TODO: Record level readwrite, where delete belongs
Database.transaction_readwrite = function(Stores, Actions) 
{
			Database.transaction = Database.handle.transaction(Stores,"readwrite");
			Database.store = Database.transaction.objectStore(Stores[0]);
			
			switch (Actions[0].type)
			{
				case "put":
					var request = Database.store.put(Actions[0].data, Actions[0].key);
					break;
				// TODO: Record level for this, or something....this is ugly
				case "delete":
				// TODO: All junk, try again later
/*					var index = Database.store.index("name");
					var request = index.openCursor(IDBKeyRange.only(Actions[0].record_key));
					if (Actions[0].onsuccess != undefined) 
					{ 
						Actions[0].onsuccess = function(event)
						{ 
							cursor = event.target.result; 
							if (cursor) { cursor.delete(); } 
							Actions[0].onsuccess(); 
						}
					}
					else { Actions[0].onsuccess = function(event){ cursor = event.target.result; if (cursor) { cursor.delete(); }}} */
					break;
				default:
					break;
			}		
			
			if (Actions[0].onerror != undefined) {request.onerror = Actions[0].onerror;} 
			else
			{	
				request.onerror = function(e) 
				{ 
					console.log("Error",e.target.error.name);
					// TODO: some type of error handler
				}
			}
			
			if (Actions[0].onsuccess != undefined) {request.onsuccess = Actions[0].onsuccess;}
			else {console.log("Action successful");}
};

Database.transaction_readonly = function(Stores, Success, OnComplete) 
{
		Database.transaction = Database.handle.transaction(Stores,"readonly");
		Database.store = Database.transaction.objectStore(Stores[0]);	
		var data = [];
		var object = {};
	
		if (OnComplete != undefined) { Database.transaction.oncomplete = function() { OnComplete(data, object); } }
		else { /*error?*/ }
	
		Database.store.openCursor().onsuccess = function(event) 
		{
			var cursor = event.target.result;
			if(cursor != undefined) 
			{
				console.log("Retrieving " + Stores[0] + " from " + Database.handle.name);
				data.push(cursor.value);
				object[cursor.primaryKey] = cursor.value;
				cursor.continue();
			} 
			else 
			{  }
		} 
};

Database.handle;
Database.transaction;
Database.store;

Database.stack;