var acceptedCriterias = ['filename','size','types','extension','isFile','isDirectory']
var criteriaMap = {
	filesize:'size'
,	name:'filename'
,	type:'types'
,	ext:'extension'
,	file:'isFile'
,	dir:'isDirectory'
}

export default function makeSortFunction(key,desc){
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