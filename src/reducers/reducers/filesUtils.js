import {STATUS_NONE,STATUS_LOADED,STATUS_ERROR,STATUS_LOADING} from '../../constants/statuses';
import {TYPE_UNKNOWN,TYPE_DIRECTORY,TYPE_FILE,TYPE_GROUP} from '../../constants/types';
import {assign} from './utils';

const statusLoaded = {status:STATUS_LOADED}
const statusNone = {status:STATUS_NONE}

export const defaultItem = {
	itemId:0
,	status:STATUS_NONE
,	path:false
,	marked:false
,	type:TYPE_UNKNOWN
}

export function createItem(props){
	return assign(defaultItem,props);
}

export function changeItemByPath(state,path,props){
	const {indexes} = state;
	const index = getItemIndexByPath(path,indexes);
	if(index===false){return state;}
	const item = items[index];
	const items = state.items.slice();
	items[index] = assign(item,props);
	return assign(state,items);
}

export function changeItemById(state,index,props){
	const item = items[index];
	if(!item){return state;}
	const items = state.items.slice();
	items[index] = assign(item,props);
	return assign(state,items);
}

export function toggleItemPropertyById(state,index,props){
	const item = items[index];
	if(!item){return state;}
	const items = state.items.slice();
	items[index] = assign(item,{[propName]:!!!item[propName]});
	return assign(state,items);
}

export function toggleItemPropertyByPath(state,path,propName){
	const {indexes} = state;
	const index = getItemIndexByPath(path,indexes);
	if(index===false){return state;}
	const item = items[index];
	const items = state.items.slice();
	items[index] = assign(item,{[propName]:!!!item[propName]});
	return assign(state,items);
}

function addChildren(children,newChildren){
	var _children = children.slice();
	var changed = false;
	newChildren.forEach(child=>{
		if(typeof child !== 'string'){
			child = ('path' in child)? child.path : child.name;
		}
		if(_children.indexOf(child)<0){
			_children.push(child);
			changed = true;
		}
	})
	return changed? _children : children;
}

function updateParent(index,directoryPath,indexes,items){
	if(directoryPath in indexes){
		let directoryIndex = indexes[directoryPath];
		let directory = items[directoryIndex];
		let files = directory.files || [];
		items[directoryIndex] = assign(directory,{files:addChildren(files,[items[index]])})
	}
}
function updateMainItem(indexes,items,file,files){
	const {dirname,isDirectory,isFile} = file;
	const type = isDirectory ? TYPE_DIRECTORY : isFile ? TYPE_FILE : TYPE_UNKNOWN;
	const {itemId} = updateOrCreateLoadedFile(indexes,items,assign(file,{type}),files);
	dirname && updateParent(itemId,dirname,indexes,items);
}

function updateGroupItem(groups,items,group,files){
	const type = TYPE_GROUP;
	updateOrCreateLoadedGroup(groups,items,assign(group,{type}),files);
}

function updateOrCreateItem(identifiedProp,status,indexes,items,file,files){
	var path = file[identifiedProp];
	var index,item;
	if(path in indexes){
		index = indexes[path];
		item = assign(items[index],file,status);
		if(files && files.length){
			if(!item.files){item.files = files;}
			else{
				item.files =addChildren(item.files,files)
			}
		}
		items[index] = item;
	}else{
		item = createItem(files && files.length ? assign(file,status,{files}):assign(file,status));
		index = items.push(item) -1;
		item.itemId = index;
		indexes[path] = index;
	}
	return item;
}

function updateOrCreateGroup(status,indexes,items,file,files){
	return updateOrCreateItem('name',status,indexes,items,file,files)
}

function updateOrCreateUnloadedGroup(indexes,items,file,files){
	return updateOrCreateGroup(statusNone,indexes,items,file,files)
}

function updateOrCreateLoadedGroup(indexes,items,file,files){
	return updateOrCreateGroup(statusLoaded,indexes,items,file,files)
}

function updateOrCreateFile(status,indexes,items,file,files){
	return updateOrCreateItem('path',status,indexes,items,file,files)
}

function updateOrCreateUnloadedFile(indexes,items,file,files){
	return updateOrCreateFile(statusNone,indexes,items,file,files)
}

function updateOrCreateLoadedFile(indexes,items,file,files){
	return updateOrCreateFile(statusLoaded,indexes,items,file,files)
}

function updateOrCreateDirectoryItem(indexes,items,changed,file){
	changed.push(updateOrCreateUnloadedFile(indexes,items,file).path);
}

export function getItemByPath(path,indexes,items){
	if(path in index){
		return items[indexes[path]];
	}
	return false;
}

export function getItemIndexByPath(path,indexes){
	if(path in index){
		return indexes[path];
	}
	return false;
}

export function updateItems(state,file,files){
	const items = state.items.slice();
	const indexes = assign(state.indexes);
	const changed = [];
	files && files.forEach(path=>updateOrCreateDirectoryItem(indexes,items,changed,{path,dirname:file&&file.path||''}));
	if(file){updateMainItem(indexes,items,file,changed);}
	if(file || changed.length){
		return assign(state,{indexes,items})
	}
	return state;
}

export function updateGroup(state,group,files){
	const items = state.items.slice();
	const indexes = assign(state.indexes);
	const groups = assign(state.groups);
	const changed = [];
	files && files.forEach(path=>updateOrCreateDirectoryItem(indexes,items,changed,{path}));
	if(group){updateGroupItem(groups,items,group,changed);}
	if(group || changed.length){
		return assign(state,{groups,indexes,items})
	}
	return state;
}
