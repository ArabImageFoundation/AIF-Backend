import fs from 'fs-extra';

const opts = {
	overwrite:false
,	clobber:false
}

export default function writeFile({src,options,data},cb){
	if(!src){return cb(new Error('no source provided'))}
	if(!data){return cb(new Error('no data provided'))}
	options = Object.assign({},opts,options);	
	if(options.overwrite || options.clobber){
		return fs.outputFile(src,data,function(err){
			if(err){return cb(err);}
			return cb(null,{status:'success'})
		});
	}else{
		fs.exists(src,function(exists){
			if(exists){return cb(new Error(`file ${src} exists`));}
			return fs.outputFile(src,data,function(err){
				if(err){return cb(err);}
				return cb(null,{status:'success'})
			});
		})
	}
}