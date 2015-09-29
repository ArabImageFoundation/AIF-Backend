import FileSystemAPI from './FileSystemAPI'

export default function connect(options){
	let api = new FileSystemAPI(options);
	return function FSAPImiddleware(req,res,next){
		return api.middleware(req,res,next);
	}
}