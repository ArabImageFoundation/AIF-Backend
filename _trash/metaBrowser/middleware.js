import configureMetaBrowser from './index';
import {
	ACTION_CREATE
,	ACTION_REMOVE
,	ACTION_COPY
,	ACTION_GET
,	ACTION_UPDATE
,	TYPE_FILE
,	TYPE_DIRECTORY
,	TYPE_GROUP
} from './constants'
const verbs = {
	'checkout':null
,	'connect':null
,	'copy':ACTION_COPY
,	'delete':ACTION_REMOVE
,	'get':ACTION_GET
,	'head':null
,	'lock':null
,	'merge':ACTION_UPDATE
,	'mkactivity':null
,	'mkcol':null
,	'move':null
,	'm-search':null
,	'notify':null
,	'options':null
,	'patch':null
,	'propfind':null
,	'proppatch':null
,	'purge':null
,	'put':ACTION_UPDATE
,	'post':ACTION_CREATE
,	'report':null
,	'search':null
,	'subscribe':null
,	'trace':null
,	'unlock':null
,	'unsubscribe':null
};
const validMethods = [
	ACTION_CREATE
,	ACTION_REMOVE
,	ACTION_COPY
,	ACTION_GET
,	ACTION_UPDATE
];

function getActionFromMethod(method){
	return verbs[method];
}

function isMethod(str){
	return (validMethods.indexOf(str)>=0)
}

export default function configure(rethinkdb){

	var metaBrowser = configureMetaBrowser(rethinkdb);

	return function metaBrowserMiddleware(req,res,next){
		var args = req.path.replace(/^\/|\/$/,'').split('/');
		const method = req.method.toLowerCase();
		const data = method == 'get' ? 
			req.query : 
			req.body
		;
		const type = args.shift();
		var action = method !== 'get' ? 
			getActionFromMethod(method) : 
			isMethod(args[0]) ? 
				args.shift() : 
				ACTION_GET
		;
		var src;
		var id;
		var name;
		if(args.length){		
			if(type == TYPE_FILE || type == TYPE_DIRECTORY){
				src = args.join('/');
			}
			else{
				if(!isNaN(parseInt(args[0]))){
					if(args.length>1){
						id = args.map(parseInt);
					}else{
						id = args[0];
					}
				}else{
					if(args.length>1){
						name = args;
					}else{
						name = args[0];
					}
				}
			}
		}
		const props = Object.assign({},{type,action,name,src,id},data);
		if(props.src){
			props.src = '/home/xananax/projects/react-browser/public/'+props.src;
		}
		function callback(err,response){
			if(err){
				return res.json({
					type:'error'
				,	message:err.message.split('\n')
				,	query:props
				,	stack:err.stack.split('\n')
				})
			}
			//console.log(response);
			res.send(response);
		}
		return metaBrowser(props,callback);
	}

}