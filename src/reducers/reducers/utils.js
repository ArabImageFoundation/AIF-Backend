import {camelCaseToConst} from '../../utils';
import {STATUS_NONE,STATUS_LOADED,STATUS_ERROR,STATUS_LOADING,STATUS_PROCESSING} from '../../constants/statuses';
import {TYPE_UNKNOWN,TYPE_DIRECTORY,TYPE_FILE,TYPE_GROUP} from '../../constants/types';
import {
	createItem
} from './initialState';

export function arrDiff(oldArr,newArr){
	if(!newArr.length){return oldArr;}
	var resultArr = [];
	newArr.forEach(item=>{
		if(oldArr.indexOf(item)<0){
			resultArr.push(item);
		}
	});
	return resultArr;
}

export function assign(obj,...props){
	return Object.assign({},obj,...props);
}

export function createReducer(initialState, handlers){
	const keys = {};
	Object.keys(handlers).forEach(name=>{
		keys[camelCaseToConst(name)] = name;
	});
	return function reducer(state = initialState,action){
		if(!Object.prototype.hasOwnProperty.call(keys,action.type)){return state;}
		const fnName = keys[action.type];
		const fn = handlers[keys[action.type]];
		return fn(state,action);
	}
}


function pathToFileObject(dirname,path){
	return createItem({
		path
	,	dirname
	,	status:STATUS_NONE
	})
}

function groupNameToGroupObject(name){
	return createItem({
		name
	,	status:STATUS_NONE
	,	type:TYPE_GROUP
	})
}

function addNewChildren(item,propName,newItems){
	const oldItems = item[propName];
	if(!newItems || !newItems.length){return oldItems;}
	const itemsDiff = arrDiff(oldItems,files);
	if(itemsDiff.length){
		const items = [...oldItems,itemsDiff];
		return {[propName]:items};
	}
	return oldItems;
}

function updateItem(oldItem,newItem){
	var item = {}, changed = false;
	Object.keys(newItem).forEach(key=>{
		var oldValue = oldItem[key], newValue, value;
		if(key=='files'){
			newValue = addNewChildren(oldItem,'files',item.files);
		}else if(key=='groups'){
			newValue = addNewChildren(oldItem,'groups',item.groups);
		}else{
			newValue = newItem[key];
		}
		if(oldValue!==newValue && (key in newItem)){
			changed = true;
			value = newValue;
		}else{value=oldValue;}
		item[key] = value;
	})
	return changed ? item : oldItem;
}

function addNewItem(items,item,newRows){
	item = createItem(item);
	items = items.push(item);
	newRows.push(items.lastIndexes()[0]);
	return items;
}

function updateExistingItem(items,item,oldItem,setPath,newRows){
	const updatedItem = updateItem(oldItem,item);
	if(updatedItem!==oldItem){
		items = items.set(setPath,updatedItem);
		newRows.push(items.lastIndexes()[0]);
	}
	return items;
}

function processLoadedFile(items,item,path,newRows){
	const oldItem = items.get('path',path);
	if(oldItem){
		const setPath = ['path',path];
		return updateExistingItem(items,item,oldItem,setPath,newRows)
	}else{
		return addNewItem(items,item,newRows);
	}
}

function processLoadedGroup(items,item,name,newRows){
	const oldItem = items.get('name',name);
	if(oldItem){
		const setPath = ['name',name];
		return updateExistingItem(items,item,oldItem,setPath,newRows)
	}else{
		return addNewItem(items,item,newRows);
	}
}

function addUnloadedItems(items,arr,get,transform,newRows){
	if(!arr || !arr.length){return items;}
	const newItems = arr.slice().filter(val=>{
			const item = get(val);
			if(!item){return val;}
			newRows.push(item);
			return false;
		})
		.map(transform);
	if(newItems.length){
		items = items.concat(newItems);
		items.lastIndexes().forEach(index=>newRows.push(items[index]))
	}
	return items;
}

function addUnloadedFiles(items,files,dirname,newRows){
	return addUnloadedItems(
		items
	,	files
	,	items.get('path')
	,	pathToFileObject.bind(null,dirname)
	,	newRows
	)
}

function addUnloadedGroups(items,groups,newRows){
	return addUnloadedItems(
		items
	,	groups
	,	items.get('name')
	,	groupNameToGroupObject
	,	newRows
	)
}

function addToColumn(columns,column,path,newRows){
	if(column){
		var rows = new Set(column.rows);
		newRows.forEach(index=>{
			rows.add(index);
		})
		return columns.set(['path',path],{rows});
	}
	return columns;
}

export function processReceivedFile(status,type,columns,items,file,files,groups){
	const newRows = [];
	const dirname = file && file.path || '';
	items = addUnloadedFiles(items,files,dirname,newRows);
	items = addUnloadedGroups(items,groups,newRows);
	if(file){
		const {path,isDirectory,isFile} = file;
		type = type || (isDirectory ? TYPE_DIRECTORY : isFile ? TYPE_FILE : TYPE_UNKNOWN);
		status = status || STATUS_LOADED;
		files = files || [];
		groups = groups || [];
		const item = assign(file,{type,status,files,groups});
		items = processLoadedFile(items,item,path,newRows)
		columns = addToColumn(columns,columns.get('path',path),dirname,newRows)
	}
	return {items,columns};
}

export function processReceivedGroup(status,columns,items,group,groups,files){
	const newRows = [];
	items = addUnloadedFiles(items,files,dirname,files,newRows);
	items = addUnloadedGroups(items,groups,newRows);
	if(group){
		const {name} = group;
		const type = TYPE_GROUP;
		const status = STATUS_LOADED;
		const item = assign(group,{type,status});
		items = processLoadedGroup(items,item,name,newRows)
		columns = addToColumn(columns,columns.get('name',name),'',newRows)
	}
	return {items,columns};
}
