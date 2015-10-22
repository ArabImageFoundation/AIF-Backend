import getGroup from './getGroup';
import getFile from './getFile';
import add from './add';

function makeResponse(command,res){
	return function callback(err,result){
		if(err){
			return res.json({
				error:true
			,	command
			,	message:err.message
			,	stack:err.stack.split('\n')
			})
		}else{
			return res.json({
				success:true
			,	command
			,	result
			})
		}
	}
}


export default function middlewareFactory(rethink){
	return function middleware(req,res,next){
		let command = req.path.replace(/^\/|\/$/g,'').toLowerCase();
		let options = req.query;
		if(!command){return next();}
		switch(command){
			case 'get':
				{
					let {groups,files} = options;
					if(empty(groups) && empty(files)){
						return makeResponse(command,res)(new Error('you must specify either groups or files'))
					}
					if(!empty(groups)){
						return getGroup(rethink,makeResponse(command,res));
					}
				}
				break;
			case 'add':
				{
					let {id,name,groups,files} = options;
					if(
						!name || 
						(!(typeof name == 'string') && !name.name)
					){
						return makeResponse(command,res)(new Error('you must specify at least a name'))
					}
					return add(rethink,name,files,groups,makeResponse(command,res));
				}
			case 'remove':
				{

				}
				break;
			default:
				next();
				break;
		}
	}
}