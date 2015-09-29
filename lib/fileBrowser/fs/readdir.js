import list from './list';

export default function readdir({src,options,recursion},cb){
	if(!recursion){recursion = 1;}
	return list({src,options,recursion},function(err,obj){
		if(err){return cb(err);}
		if(!obj.isDirectory){
			return cb(new Error(`${src} is not a directory`));
		}
		return cb(null,obj);
	})
}
