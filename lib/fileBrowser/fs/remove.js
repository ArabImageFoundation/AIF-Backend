import fs from 'fs-extra'

const opts = {
	keepIfNotEmpty:true
}

export default function remove({src,options},cb){
	if(!src){return cb(new Error('no source provided'))}
	options = Object.assign({},opts,options);
	function done(err){
		if(err){return cb(err);}
		return cb(null,{status:'success'});
	}
	if(options.keepIfNotEmpty){
		return fs.stat(src,function(err,stat){
			if(err){return cb(err);}
			if(stat.isDirectory()){
				return fs.readdir(src,function(err,files){
					if(err){return cb(err);}
					if(files.length>0){
						cb(new Error(`directory ${src} is not empty`));
					}
					fs.remove(src,done);
				})
			}
			fs.remove(src,done);
		})
	}
	fs.remove(src,done);
}