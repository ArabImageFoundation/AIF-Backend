function dedupe(file,obj){
	const id = file.path;
	const extension = file.isDirectory ? false : file.extension;
	const key = file.isDirectory ? 'directories' : file.isSymLink ? 'links' : 'files';
	const node = {}
	obj.result.nodes.push(id);
	obj.files[id] = node;
	obj.result[key].push(id);
	if(extension!==false){
		obj.result.extensions[extension] = obj.result.extensions[extension] || [];
		obj.result.extensions[extension].push(id)
	}
	for(let key in file){
		if(!Object.hasOwnProperty.call(file,key)){continue;}
		if(key=='files'){
			node.files = file.files.map(file=>{
				dedupe(file,obj)
				return file.path;
			});
			continue;
		}
		if(key=='link'){
			dedupe(file.link,obj);
			continue;
		}
		node[key] = file[key];
	}
	return obj;
}

export default function normalize(file,{options}){
	const obj = dedupe(file,{
		result:{
			files:[]
		,	directories:[]
		,	links:[]
		,	nodes:[]
		,	extensions:{}
		}
	,	files:{}
	,	nested:file
	});
	return obj;
}