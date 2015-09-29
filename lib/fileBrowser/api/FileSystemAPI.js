import fs from '../fs';
import makeSortFunction from './makeSortFunction';
import defaultFilters from '../filters';
import mapResponse from './mapResponse';
import errToJson from './errToJson';
import normalize from './normalize';

const opts = {
	clobber:false // alias for overwrite
,	overwrite:false
,	filter:false //used in copy to filter; regexp or function
,	createIfNotExists:false //used in emptyDir
,	filters:['types','exif','filesize','id3','image'] //middleware to put files through
,	recursion:0 //follow directories
,	keepIfNotEmpty:true //do not remove an non-empty directory
,	followSymLinks:true
,	root:''
,	mapResponse:mapResponse
,	normalize:true//normalize
,	permittedProps: [
		'basename'
	,	'extension'
	,	'filename'
	,	'dirname'
	,	'path'
	,	'size'
	,	'isFile'
	,	'isDirectory'
	,	'mime'
	,	'types'
	,	'atime'
	,	'birthtime'
	,	'data'
	,	'contents'
	,	'meta'
	]
}

const commands = {
	copy:fs.copy
,	createdir:fs.createDir
,	empty:fs.emptyDir
,	move:fs.move
,	list:fs.list
,	read:fs.list
,	open:fs.readFile
,	remove:fs.remove
,	delete:fs.remove
,	write:fs.writeFile
,	readdir:fs.readdir
}

const verbsMap = {
	get:'read'
,	post:'write'
,	put:'write'
,	delete:'delete'
}

function FileSystemAPI(options){
	if(!(this instanceof FileSystemAPI)){return new FileSystemAPI(options);}
	this.options = Object.assign({},opts,options);
	if(this.options.root){this.options.root = this.options.root.replace(/\/$/,'')}
}
FileSystemAPI.prototype.run = function(command,options,cb){
	if(!commands[command]){cb(new Error('command does not exist'));}
	let opts = Object.assign({},this.options,options);
	let rootDir = opts.root;
	if(rootDir){
		if(opts.src){opts.src = rootDir+opts.src;}
		if(opts.dest){opts.dest = rootDir+opts.dest;}
	}
	if(opts.sort && typeof opts.sort !=='function'){
		opts.sort = makeSortFunction(query.sort);
	}
	if(opts.filters){
		if(!Array.isArray(opts.filters)){
			opts.filters = opts.filters.split(',');
		}
		opts.filters = opts.filters.map(function(filter){
			if(typeof filter == 'string'){
				return defaultFilters[filter];
			}
			return filter;
		}).filter(Boolean);
	}
	let mainOptions = {
		src:opts.src && opts.src.replace(/\/$/,'')
	,	dest:opts.dest && opts.dest.replace(/\/$/,'')
	,	recursion:opts.recursion
	,	options:opts
	}
	commands[command](mainOptions,function(err,response){
		if(err){return cb(err);}
		if(mainOptions.options.mapResponse){
			response = mainOptions.options.mapResponse(response,mainOptions);
		}
		if(mainOptions.options.normalize){
			const normalizeFn = (typeof mainOptions.options.normalize === 'function') ? 
				mainOptions.options.normalize : 
				normalize;
			response = normalizeFn(response,mainOptions);
		}
		return cb(null,response);
	});
}
FileSystemAPI.prototype.middleware = function(req,res,next){
	let opts = Object.assign({},req.query)
	let _path = req.path.replace(/^\/|\/$/g,'').split('/');
	let command = _path[0];
	let path = _path.slice(1).join('/');
	opts.src = (opts.src && decodeURI(opts.src)) || (path && decodeURI(path));
	opts.dest = (opts.dest && decodeURI(opts.dest));
	this.run(command,opts,function(err,response){
		if(err){
			return res.json(errToJson(err));
		}
		return res.json(response);
	});
}

export default FileSystemAPI;