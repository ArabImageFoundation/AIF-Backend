import fs from 'fs-extra';

const opts = {
	clobber:false
,	overwrite:false
,	filter:false
}

/**
Copy a file or directory. The directory can have contents. Like cp -r.

Options:
clobber (boolean): overwrite existing file or directory
preserveTimestamps (boolean): will set last modification and access times to the ones of the original source files, default is false.
filter: Function or RegExp to filter copied files. If function, return true to include, false to exclude. If RegExp, same as function, where filter is filter.test.

*/

export default function copy({src,dest,options},cb){
	if(!src){return cb(new Error('no source provided'))}
	if(!dest){return cb(new Error('no destination provided'))}
	options = Object.assign({},opts,options);
	if(options.overwrite){
		options.clobber = options.overwrite;
	}
	fs.copy(src,dest,options,function(err){
		if(err){return cb(err);}
		return cb(null,{status:'success'})
	});
}