import domReady from 'domready';
import React from 'react';
import Dispatcher from '../';

var log = (function(){
	var _log = []
	return function log(title,...text){
		if(!arguments.length){return _log;}
		if(text instanceof Error){
			text = {type:'Error',message:text.message};
		}
		_log.unshift([title,text]);
	}
})();

let dispatcher = Dispatcher({
	initialState:{
		title:'whatever'
	}
	// onChange is ran everytime the state changes
	// completely optional
,	onChange:function(newState){
		log('New State:',newState);
	}
	// onError is ran when one of the state handling functions
	// returns an error
	// Also optional
,	onError:function(err){
		log('Error',err);
	}
	// stores are defined here.
,	stores:[
		{
			// name is completely useless, only there for humans
			name:'title'
			// path defines where in the state object the value
			// will be input
		,	path:['title']
			// returns the default value to set in the state
			// called only once per store
		,	defaults(originalVal,args,callback){
				setTimeout(function(){
					return callback(null,'Dispatcher Example')
				},500);
			}
		}
	,	{
			name:'values'
		// if the path doesn't exist, it will be created in the state object
		// (optional)
		,	path:['values','input']
		// that's the default value for the path provided
		// (optional)
		,	defaults(originalVal,args,callback){
				callback(null,'b');
			}
		// defining the actions:
		,	actions:[
				{
					// regex expression of paths to match
					match:/update/
				,	run(originalVal,args,callback,command){
						// the object received will be defined by the store's path.
						// In this case, it will receive the string in {values:{input:'b'}}
						// It's 'b' instead of nothing because the original state does
						// not specify a value.
						let newValue = args;
						callback(null,newValue);
					}
				}
				// if you prefer, you can drop the 'match' option and do the command
				// parsing in the function itself
				// this function does not specify a path to match, so it runs
				// on every command for every store (but still only receives the
				// chunk of state specified by the path)
			,	function runsOnEveryCommand(originalVal,args,callback,command){
					// Note that in this case, "originalVal" and "Args" are similar since
					//  actions run in sequence. the "originalVal" here is the result
					// of what was returned by the previous action
					if(command == 'reset'){
						log('Reset');
						return callback(null,'');
					}else{
						return callback();
					}
				}
			]
		}
	]
})

let Test = React.createClass({
	mixins:[Dispatcher.mixin]
,	onChange(evt){
		dispatcher.run('/update',evt.target.value);
	}
,	onClick(evt){
		dispatcher.run('reset');
		evt.preventDefault();
	}
,	render(){
		if(!dispatcher.started){
			return <div>loading...</div>
		}
		return (<div>
			<h1>{this.state.title}</h1>
			<form>
				<input onChange={this.onChange} value={this.state.values.input}/>
				<button onClick={this.onClick}>reset</button>
			</form>
			<hr/><br/>
			<div>
				{log().map((line,i)=>{
					let [title,text] = line;
					text = text.map((l,i)=>{
						if(typeof l !== 'string'){
							return  <pre key={i}>{JSON.stringify(l,true)}</pre>
						}
						return <span key={i}>{l}&nbsp;</span>
					});
					return <div key={i}><h3>{title}</h3>{text}<hr/></div>
				})}
			</div>
		</div>);
	}
})

var readyCalls = 0;

domReady(ready);
dispatcher.init(null,ready);

function ready(){
	readyCalls+=1;
	if(readyCalls>=2){
		let node = document.getElementById('Wrapper');
		let props = {
			dispatcher:dispatcher
		};
		React.render(React.createElement(Test,props),node);
	}
}