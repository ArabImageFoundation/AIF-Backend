import fs from 'fs';
import stat from './stat';

export default function list({src,options,recursion},cb){
	stat({src,options,recursion},function(err,obj){
		if(err){return cb(err);}
		if(
			(!obj.isDirectory) ||
			((typeof recursion !== 'undefined') && recursion<=0)
		){
			return cb(null,obj);
		}
		fs.readdir(src,function(err,files){
			if(err){return cb(err);}
			if(recursion){recursion--;}
			let length = files.length;
			let returned = false;
			let _files = [];
			function done(){
				if(returned){return;}
				returned = true;
				_files = _files.filter(Boolean);
				let size = _files.reduce(function(prev,curr){
					return prev+curr.size;
				},0);
				obj.size = size;
				obj.files = _files;
				if(options && options.sort){
					options.sort(obj.files,obj);
				}
				return cb(null,obj);
			}
			if(!length){return cb(null,obj);}
			(function next(i){
				if(i>=length){return done();}
				let filename = files[i];
				let _src = src+'/'+filename;
				let opts = {
					src:_src
				,	options
				,	recursion
				};
				list(opts,function(err,file){
					let f = err ? {isError:true,error:err} : file;
					_files.push(f);
					next(i+1);
				});
			})(0)
		});
	})
}