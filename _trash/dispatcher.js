import Dispatcher from './Dispatcher';

var dispatcher = Dispatcher({
	initialState:{
		'nested':{
		}
	}
,	onChange:function(newState){
		console.warn(newState);
	}
,	onError:function(err){
		console.error(err);
	}
,	stores:[
		{
			defaults:'b'
		,	path:['nested','a']
		,	actions:[
				{
					match:/update/
				,	run(obj,args,cb){
						console.log(obj)
						let value = args;
						cb(null,value);
					}
				}
			]
		}
	]
});

dispatcher.run('/update','c');