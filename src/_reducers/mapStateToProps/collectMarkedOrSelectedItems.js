export default function collectMarkedOrSelectedItems(columns,files,indexes){
	let selected = false;
	let marked = [];
	columns.forEach(column=>{
		const columnItems = column.items && column.items.filter(item=>item.marked);
		if(columnItems){
			marked = marked.concat(columnItems)
		}
		if(!marked.length && column.selected && !selected){
			const selectedItem = column.items && column.items.find(item=>item.selected);
			if(selectedItem){
				selected = selectedItem;
			}else{
				selected = column;
			}
		}
	});
	if(!marked.length){marked = [selected]}
	const ret = {
		size:0
	,	groups:{}
	,	paths:[]
	,	selected:0
	,	images:[]
	}
	marked.forEach(item=>{
		if(!item.file){return;}
		ret.selected+=1;
		ret.size+=item.file.size
		item.file.groups.forEach(name=>ret.groups[name]=true)
		ret.paths.push(item.file.path);
		if(item.file.mime && item.file.mime[0] == 'image'){
			ret.images.push(item.file);
		}
	});
	ret.groups = Object.keys(ret.groups);
	ret.files = marked;
	return ret;
}