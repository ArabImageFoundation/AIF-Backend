import Immutable from 'immutable';
import Store from './Store';
import C from './constants/events';

function Dispatcher_format_options(opts){
	opts.stores = (opts.stores || []).map(function(store){
		if(!(store instanceof Store)){return new Store(store);}
		return store;
	});
	opts.state = Immutable.fromJS(opts.initialState||{});
	opts.events = opts.events || {};
	return opts;
}

function Dispatcher_initialize(dispatcher){
	dispatcher.stores = [];
	dispatcher.state = Immutable.fromJS({});
	dispatcher.events = {};
	return dispatcher;
}

function Dispatcher_get_state(dispatcher){
	return dispatcher.state.toJS();
}

function Dispatcher_build_state(dispatcher){
	let {stores} = dispatcher;
}

function Dispatcher_set(dispatcher,{stores,initialState,onChange,onError,onCommand,onInit}){
	if(stores){
		dispatcher.stores = dispatcher.stores.concat(stores);
	}
	if(initialState){
		dispatcher.state = dispatcher.state.mergeDeep(initialState)
	}
	if(onChange){
		Dispatcher_event_add(dispatcher,C.ON_CHANGE,onChange);
	}
	if(onError){
		Dispatcher_event_add(dispatcher,C.ON_ERROR,onError);
	}
	if(onCommand){
		Dispatcher_event_add(dispatcher,C.ON_COMMAND,onCommand);
	}
	if(onInit){
		Dispatcher_event_add(dispatcher,C.ON_INIT,onInit);	
	}
}

function Dispatcher_event_add(dispatcher,event,fn){
	dispatcher.events[event] = dispatcher.events[event] || [];
	if(Array.isArray(fn)){
		return fn.map(function(f){
			return dispatcher.events[event].push(f);
		});
	}
	return dispatcher.events[event].push(fn);
}

function Dispatcher_event_remove(dispatcher,event,fn){
	if(!dispatcher.events[event]){return;}
	let index = (typeof fn == 'function')? dispatcher.events[event].indexOf(fn) : fn;
	if(index<0){return;}
	dispatcher.events[event].splice(index,1);
}

function Dispatcher_event_trigger(dispatcher,event,args){
	if(!dispatcher.events[event]){return;}
	let evts = dispatcher.events[event];
	let length = evts.length;
	let i = 0;
	for(i,length;i<length;i++){
		evts[i](args);
	}
}

function Dispatcher_run_init(dispatcher,args,cb){
	return Dispatcher_run(dispatcher,'__init__',args,function(err,state){
		if(err && cb){return cb(err);}
		Dispatcher_event_trigger(dispatcher,C.ON_INIT);
		if(cb){return cb();}
	});
}

function Dispatcher_run(dispatcher,command,args,cb){
	let {stores,state,onChange,onError,onCommand} = dispatcher;
	let changed = false;
	let length = stores.length;
	let returned = false;
	Dispatcher_event_trigger(dispatcher,C.ON_COMMAND,command);
	function done(err){
		if(returned){return;}
		dispatcher.started = true;
		returned = true;
		if(err){
			Dispatcher_event_trigger(dispatcher,C.ON_ERROR,err);
		}
		if(changed){
			dispatcher.state = state;
			Dispatcher_event_trigger(dispatcher,C.ON_CHANGE,state.toJS());
		}
		if(cb){cb(err,state);}
	}
	(function next(i){
		if(i>=length){return done();}
		let store = stores[i++];
		store.run(command,args,state,function(err,newState){
			if(err){return done(err);}
			if(newState){
				changed = true;
				state = newState;
			}
			next(i)
		});
	})(0);
}


function Dispatcher(options){
	if(!(this instanceof Dispatcher)){return new Dispatcher(options);}
	Dispatcher_initialize(this);
	if(options){
		this.set(options);
	}
}
Dispatcher.prototype.set = function(options){
	Dispatcher_set(this,Dispatcher_format_options(options));
	return this;
}
Dispatcher.prototype.run = function(command,args){
	Dispatcher_run(this,command,args);
	return this;
}
Dispatcher.prototype.on = function(evt,fn){
	Dispatcher_event_add(this,evt,fn)
	return this;
}
Dispatcher.prototype.off = function(evt,fn){
	Dispatcher_event_remove(this,evt,fn)
	return this;
}
Dispatcher.prototype.onChange = function(fn){
	Dispatcher_event_add(this,C.ON_CHANGE,fn);
	return this;
}
Dispatcher.prototype.onError = function(fn){
	Dispatcher_event_add(this,C.ON_ERROR,fn);
	return this;
}
Dispatcher.prototype.onCommand = function(fn){
	Dispatcher_event_add(this,C.ON_COMMAND,fn);
	return this;
}
Dispatcher.prototype.onInit = function(fn){
	Dispatcher_event_add(this,C.ON_INIT,fn);
	return this;
}
Dispatcher.prototype.getState = function(){
	return Dispatcher_get_state(this);
}
Dispatcher.prototype.init = function(args,cb){
	if(this.started){return this;}
	Dispatcher_run_init(this,args,cb);
	return this;
}

const instance = new Dispatcher();

Dispatcher.instance = instance;

export default Dispatcher;
