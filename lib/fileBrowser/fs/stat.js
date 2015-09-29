import fs from 'fs';
import statToObj from './statToObj';
import applyFilters from './applyFilters';

const opts = {
	followSymLinks:true
}

function symbolicLinkStat(obj,{src,options,recursion},cb){
	const link = obj;
	return fs.realpath(src,function(err,realPath){
		if(err){return cb(err);}
		const src = realpath;
		stat({src,options,recursion},function(err,obj){
			if(err){return cb(err);}
			obj.link = link;
			return cb(null,obj);
		});
	})
}

function processStat({src,options,recursion},cb){
	return function statCB(err,stat){
		if(err){return cb(err);}
		const obj = statToObj(src,stat);
		if(options && obj.isSymbolicLink && options.followSymLinks){
			return symbolicLinkStat(obj,{src,options,recursion},cb);
		}
		applyFilters(obj,{options,recursion},cb);
	}
}

export default function stat({src,options,recursion},cb){
	if(!src){return cb(new Error('no source provided'))}
	options = Object.assign({},opts,options);
	src = src.replace(/\/+$/,'');
	const statCallback = processStat({src,options,recursion},cb);
	fs.lstat(src,statCallback);
}