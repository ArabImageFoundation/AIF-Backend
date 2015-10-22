import fs from 'fs-extra';
import mkdirp from 'mkdirp';

export default function createDir({src},cb){
	if(!src){return new Error('no srcination provided')}
	return fs.mkdirs(src,function(err){
		if(err){return cb(err);}
		return cb(null,{status:'success'})
	});
}