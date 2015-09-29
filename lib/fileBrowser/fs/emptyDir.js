import fs from 'fs-extra';

const opts = {
	createIfNotExists:false
}

/**
 * Ensures that a directory is empty. If the directory does not exist, it is created. The directory itself is not deleted.
 * options:
 *  - createIfNotEmpty:boolean
 * @param  {string}   dir [description]
 * @param  {Function} cb  [description]
 */
export default function emptyDir({src,options},cb){
	if(!src){return cb(new Error('no source provided'))}
	options = Object.assign({},opts,options);
	if(options.createIfNotExists){
		return fs.emptyDir(dir,function(err){
			if(err){return cb(err);}
			return cb(null,{status:'success'});
		});
	}
	return fs.exists(dir,function(exists){
		if(!exists){return cb();}
		fs.emptyDir(dir,function(err){
			if(err){return cb(err);}
			return cb(null,{status:'success'});
		});
	});
}