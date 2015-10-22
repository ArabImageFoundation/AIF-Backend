import C from './constants/commands';

function Action_format_options(options){
	if(typeof options == 'function'){
		options = {
			run:options
		}
	};
	if(!options.run || typeof options.run !== 'function'){throw new Error('must provide a process function to an Action');}
	if(options.match && !(options.match instanceof RegExp)){
		options.match = new RegExp(options.match);
	}
	if(!options.operation){options.operation = C.UPDATE;}
	return options;
}

function Action_set(action,{match,run,operation}){
	action.regex  = match;
	action.fn = run;
	action.operation = operation;
}

function Action_match(action,command){
	let {regex} = action;
	if(!regex || regex.test(command)){return true;}
	return false;
}

function Action_run(action,args,state,cb,command){
	let {fn,match,operation} = action;
	fn(state,args,function(err,returnedState,returnedOperation){
		let o = (typeof returnedOperation !== 'undefined') ? returnedOperation : operation || C.UPDATE;
		return cb(err,returnedState,o);
	},command);
}

function Action(options){
	if(!(this instanceof Action)){return new Action(options);}
	options = Action_format_options(options);
	return Action_set(this,options);
}
Action.prototype.run = function(args,state,cb,command){
	return Action_run(this,args,state,cb,command);
}
Action.prototype.match = function(command){
	return Action_match(this,command);
}

export default Action;