import fs from 'fs';

const opts = {
	overwrite:false
,	clobber:false
}
export default function move({src,dest,options},cb){
	if(!src){return cb(new Error('no source provided'))}
	if(!dest){return cb(new Error('no destination provided'))}
	options = Object.assign({},opts,options)
	if(options.overwrite){
		options.clobber = options.overwrite;
	}
	return fs.move(src,dest,options,function(err){
		if(err){return cb(err);}
		return cb(null,{status:'success'});
	});
}