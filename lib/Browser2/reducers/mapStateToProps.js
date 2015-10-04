import arrForEach from '../utils';

function mapItemToPaths(item,files,indexes){
	const itemPath = item.path;
	if(typeof itemPath == 'undefined'){return item;}
	const fileIndex = indexes[itemPath];
	if(typeof fileIndex == 'undefined'){return item;}
	const file = files[fileIndex];
	if(typeof file == 'undefined'){return item;}
	if(item.file && item.file == file){return item;}
	return Object.assign({},item,{file});
}

function mapColumnItemsToPaths(column,files,indexes){
	const {items} = column;
	if(!items || !items.length){return column;}
	const _items = items.map(item=>mapItemToPaths(item,files,indexes))
	return Object.assign({},column,{items:_items});
}

function mapColumnToPaths(column,files,indexes){
	return mapColumnItemsToPaths(mapItemToPaths(column,files,indexes),files,indexes);
}

function findSelectedItem(columns,files,indexes){
	let items = [];
	columns.forEach(column=>{
		const columnItems = column.items && column.items.filter(item=>item.marked||item.selected);
		if(columnItems){
			items = items.concat(columnItems)
		}
	});
	return items;
}

export function mapStateToProps(state) {
	const {
		columns
	,	api
	,	info
	} = state;
	const {files,indexes} = api;
	const _columns = columns.map(column=>mapColumnToPaths(column,files,indexes));
	return {
		columns:_columns
	,	files
	,	indexes
	,	info:{
			items:findSelectedItem(_columns)
		}
	}
}