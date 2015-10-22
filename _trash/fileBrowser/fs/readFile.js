import stat from './stat';
import fs from 'fs';

const opts = {
	encoding:'utf8'
}

export default function readFile({src,options},cb){
	options = Object.assign({},opts,options);
	stat({src,options},function(err,obj){
		if(err){return cb(err);}
		fs.readFile(src,options,function(err,contents){
			if(err){return cb(err);}
			obj.contents = contents;
			return cb(null,obj);
		});
	});
}