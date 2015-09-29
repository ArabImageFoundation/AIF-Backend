
import browse from '../lib/fileBrowser';
import path from 'path';

var acceptedCriterias = ['filename','size','types','extension','isFile','isDirectory']
var criteriaMap = {
	filesize:'size'
,	name:'filename'
,	type:'types'
,	ext:'extension'
,	file:'isFile'
,	dir:'isDirectory'
}

function makeSortFunction(key,desc){
	let asc = !!!desc;
	let sortOrder = asc? 1 : -1;
	key = key.split(',');
	let sortFunction = makeMultiSort(key,acceptedCriterias,criteriaMap)
	if(!sortFunction){
		return false;
	}
	return function sort(items,type,obj){
		return items.sort(sortFunction);		
	}
}

var multiSortCache = {};

function makeMultiSort(criterias,acceptedCriterias,criteriaMap){
	if(criterias.length==0){return false;}
	
	let cacheKey =  criterias.join();
	if(typeof multiSortCache[cacheKey] !== 'undefined'){return multiSortCache[cacheKey];}

	let passes = criterias.map(function(key){
		let order=1;
		if(key[0]==='-'){
			key = key[i].substr(1);
			order = -1;
		}
		if(criteriaMap && criteriaMap[key]){key = criteriaMap[key];}
		if(acceptedCriterias && acceptedCriterias.indexOf(key)<0){return false;}

		return function sort(a,b){
			let aa = a[key];
			let bb = b[key];

			if(typeof aa == 'string' || typeof aa == 'number'){			
				if (aa < bb){return -1 * order;}
				if (aa > bb){return 1 * order;}
			}
			else if(typeof aa == 'boolean'){
				if (!aa && bb){return -1 * order;}
				if (aa && !bb){return 1 * order;}
			}
			else if(Array.isArray(aa)){
				let largest = Math.max(aa.length,bb.length);
				for(let i=0;i<largest;i++){
					let aaa = aa[i];
					let bbb = bb[i];
					console.log(aaa,bbb)
					if(bbb>aaa){return -1 * order;}
					if(aaa>bbb){return 1 * order;}
				}
			}
			return 0
		}
	}).filter(Boolean);

	let length = passes.length;

	let compare = function(a,b){
		let i = 0;
		for(i,length;i<length;i++){
			let pass = passes[i];
			let result = pass(a,b);
			if(result == 1 || result == -1){return result;}
		}
		return 0;
	}

	multiSortCache[cacheKey] = compare;
	return compare;
}

let defaults = {
	root:path.resolve(__dirname+'/../public')
,	filters:[
		'type'
	,	'text'
	,	'filesize'
	,	'image'
	,	'exif'
	,	'id3'
	,	'data'
	,	'metaData'
	]
,	sort:makeSortFunction('filename')
}

const permittedProps = [
	'atime'
,	'basename'
,	'birthtime'
,	'extension'
,	'filename'
,	'size'
,	'isFile'
,	'isDirectory'
,	'isFile'
,	'mime'
,	'types'
,	'path'
,	'contents'
,	'meta'
]

function mapResponse(file,rootDir){
	let returned = {};
	permittedProps.forEach(function(prop){
		returned[prop] = file[prop];
	});
	if(file.files){
		returned.files = file.files.map(file=>mapResponse(file,rootDir));
	};
	if(rootDir){
		returned.path = file.path.replace(rootDir,'');
	}
	return returned;
}

export default function connect(options){
	options = {...defaults,...options};
	return function middleware(req,res,next){
		let rootDir = options.root;
		let url = req.path;
		let _path = rootDir+decodeURI(url);
		let query = req.query;
		let opts = {...options};
		if(query.sort){
			opts.sort = makeSortFunction(query.sort);
		}
		if(query.filters){
			opts.filters = query.filters.split(',');
		}
		browse(_path,opts,function(err,obj){
			if(err){return next(err);}
			res.json(mapResponse(obj,rootDir));
		});
	}
}