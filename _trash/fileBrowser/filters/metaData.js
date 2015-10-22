import fs from 'fs';

export default function metaDataFilter(obj,{options,recursion},cb){
	let {filename,path,isDirectory} = obj;
	let metaDataFilePath;
	if(isDirectory){
		metaDataFilePath = `${path}/___.meta.json`;
	}else{
		metaDataFilePath = `${path}.meta.json`;
	}
	fs.stat(metaDataFilePath,function(err,stat){
		if(err){
			if(err.code == 'ENOENT'){
				return cb();
			}
			return cb(err);
		}
		fs.readFile(metaDataFilePath,{encoding:'utf8'},function(err,contents){
			if(err){return cb(err);}
			try{
				const meta = JSON.parse(contents);
				obj.meta = meta;
				return cb(null,obj);
			}catch(err){
				console.log('err')
				return cb(err);
			}
		});
	});
}