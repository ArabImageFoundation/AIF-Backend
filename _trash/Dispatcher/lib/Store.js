import C from './constants/commands';
import Action from './Action'
import Immutable from 'immutable';

function Store_format_options(opts){
	opts.path = opts.path || false;
	opts.actions = opts.actions || [];
	if(opts.defaults){
		if(!(opts.defaults instanceof Action)){
			opts.defaults = new Action({
				match:/__init__/
			,	run:opts.defaults
			,	operation:C.UPDATE
			});
		}
		opts.actions.push(opts.defaults);
	}
	opts.actions = opts.actions.map(function(action){
		if(!(action instanceof Action)){return new Action(action);}
		return action;
	});
	return opts;
}

function Store_set(store,{path,defaults,actions,name}){
	store.path = path;
	store.actions = actions;
	store.name = name;
}

function Store_run(store,command,args,_state,cb){
	let {actions,path} = store;
	let l = actions.length;
	let state = _state;
	if(!l){return cb();}
	let returned = false;
	function done(err){
		if(returned){return;}
		returned = true;
		if(err){return cb(err);}
		if(Immutable.is(state,_state)){return cb();}
		return cb(null,state);
	}
	(function next(i){
		if(i>=l){return done();}
		let action = actions[i++];
		if(!action.match(command)){return next(i);}
		let obj = path ? state.getIn(path) : state;
		action.run(args,obj,function(err,returnedState,operation,index){
			if(err){return done(err);}
			if(typeof operation == 'number'){
				index = operation;
				operation = C.UPDATE;
			}
			if(typeof returnedState === 'undefined' || operation == C.NONE){return next(i);}
			returnedState = Immutable.fromJS(returnedState);
			switch(operation){
				case C.REPLACE:
					state = state.setIn(path,returnedState);
					return next(i);
					break;
				case C.DELETE:
					state = state.deleteIn(path);
					return next(i);
					break;
				case C.PUSH:
					state = state.updateIn(path,list=>list.push(returnedState));
					return next(i);
					break;
				case C.UPDATE:
				default:
					let newState;
					if(typeof index !== 'undefined'){
						let _path = path.slice();
						_path.push(index);
						state = state.setIn(_path,returnedState);
					}else{
						newState = Immutable.Map({}).setIn(path,returnedState);
						state = state.mergeDeep(newState);
					}
					return next(i);
					break;
			}
		},command);
	})(0);
}

function Store(options){
	if(!(this instanceof Store)){return new Store(options);}
	options = Store_format_options(options);
	Store_set(this,options);
}
Store.prototype.run = function(command,args,state,cb){
	return Store_run(this,command,args,state,cb)
}
Store.prototype.defaults = function(state,cb){
	return Store_get_defaults(this,state,cb);
}
export default Store;