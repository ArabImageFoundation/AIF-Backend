import {STATUS_NONE,STATUS_LOADED,STATUS_ERROR,STATUS_LOADING,STATUS_PROCESSING} from '../../constants/statuses';
import {TYPE_UNKNOWN,TYPE_DIRECTORY,TYPE_FILE,TYPE_GROUP} from '../../constants/types';
import {assign,arrDiff} from './utils';

export default {
	/******************************
				COLUMNS
	*******************************/
	addColumnStart({items,columns},{meta:{columnId,columnType:type,path}}){
		const index = columns.getIndex('columnId',columnId)+1;
		if(index>0){
			columns = columns.slice(0,index);
		}
		const position = index+1;
		return {
			items
		,	columns:columns.push({position,path,type})
		};
	}
,	selectColumn({items,columns},{meta:{columnId}}){
		return {
			items
		,	columns:columns.set(col=>col.selected,{selected:false}).set(['columnId',columnId],{filter})
		};
	}
,	filterColumn({items,columns},{meta:{columnId,filter}}){
		return {
			items
		,	columns:columns.set(['columnId',columnId],{filter})
		};
	}
,	columnFilterOn({items,columns},{meta:{columnId}}){
		return {
			items
		,	columns:columns.set(['columnId',columnId],{showFilter:true})
		};
	}
,	columnFilterOff({items,columns},{meta:{columnId}}){
		return {
			items
		,	columns:columns.set(['columnId',columnId],{showFilter:false})
		};
	}
,	removeColumn(state,{meta:{columnId}}){
		const {items,columns} = state;
		const index = columns.getIndex('columnId',columnId)-1;
		return (index<=0 ?
			state :
			{
				items
			,	columns:columns.slice(0,index).set(index-1,{selected:true})
			}
		);
	}
,	removeLastColumn(state){
		const {items,columns} = state;
		if(columns.length<=1){return state;}
		return {
			items
		,	columns:columns.pop()
		};
	}
	/******************************
				ITEMS
	*******************************/
,	markItem({items,columns},{meta:{itemId}}){
		return {
			items:items.set(['itemId',itemId],{marked:true})
		,	columns
		};
	}
,	unmarkItem({items,columns},{meta:{itemId}}){
		return {
			items:items.set(['itemId',itemId],{marked:true})
		,	columns
		};
	}
,	toggleItemMarking({items,columns},{meta:{itemId}}){
		const item = items.get('itemId',itemId);
		if(!item){
			return {
				items:items
			,	columns
			};
		};
		const marked = !!item.marked;
		return {
			items:items.set(['itemId',itemId],{marked})
		,	columns
		};
	}
	/******************************
				FILES
	*******************************/
,	fetchDirectoryStart({items,columns},{meta:{path}}){
		const status = STATUS_LOADING;
		const type = TYPE_DIRECTORY
		return {
			items:updateItems(items,null,[path])
		,	columns:columns.set(['path',path],{status,type})
		}
	}
,	fetchDirectoryProcessing({items,columns},{payload:{file,files},meta:{path}}){
		const status = STATUS_PROCESSING;
		return {
			items:updateItems(items,file,files,file.groups)
		,	columns:columns.set(['path',path],{status,file:file.path,files})
		}
	}
,	fetchDirectorySuccess({items,columns},{payload:{file,files},meta:{path}}){
		const status = STATUS_LOADED;
		return {
			items:updateItems(items,file)
		,	columns:columns.set(['path',path],{status,file,files})
		}
	}
,	fetchDirectoryError({items,columns},{meta:{path}}){
		const status = STATUS_ERROR
		return {
			items:items.set(['path',path],{status})
		,	columns:columns.set(['path',path],{status})
		};
	}
,	invalidateDirectory({items,columns},{meta:{path}}){
		const status = STATUS_NONE
		return {
			items:items.set(['path',path],{status})
		,	columns
		};
	}
,	fetchFileStart({items,columns},{meta:{path}}){
		const status = STATUS_LOADING;
		const type = TYPE_FILE
		return {
			items:updateItems(items,null,[path])
		,	columns:columns.set(['path',path],{status,type})
		}
	}
,	fetchFileSuccess({items,columns},{payload:{file},meta:{path}}){
		const status = STATUS_LOADED;
		const type = TYPE_FILE
		return {
			items:updateItems(items,file)
		,	columns:columns.set(['path',path],{status,type})
		}
	}
,	fetchFileError({items,columns},{payload:{file},meta:{path}}){
		const status = STATUS_ERROR
		return {
			items:items.set(['path',path],{status})
		,	columns:columns.set(['path',path],{status})
		};
	}
,	invalidateFile({indexes,items},{meta:{path}}){
		const status = STATUS_NONE
		return {
			items:items.set(['path',path],{status})
		,	columns
		};
	}
	/******************************
			GROUPS
	*******************************/
,	addFilesToGroupSuccess({items,columns},{meta:{group,files}}){
		return {
			items:updateGroup(items,null,null,[group,files])
		,	columns
		}
	}
,	addGroupToGroupSuccess({items,columns},{meta:{group,child}}){
		return {
			items:updateGroup({items,columns},{name:group},[child])
		,	columns
		}
	}
,	fetchGroupStart({items,columns},{meta:{name,columnId}}){
		const status = STATUS_LOADING;
		const type = TYPE_GROUP;
		return {
			items:updateGroup(items,null,[name])
		,	columns:columns.set(['columnId',columnId],{status,type})
		}
	}
,	fetchGroupProcessing({items,columns},{payload:{group},meta:{name}}){
		const status = STATUS_PROCESSING;
		return {
			items:updateGroup(items,group,group.groups,group.files)
		,	columns:columns.set(['name',name],{status})
		}
	}
,	fetchGroupSuccess({items,columns},{payload:{group},meta:{name}}){
		const status = STATUS_LOADED;
		return {
			items:updateGroup(items,group,group.groups,group.files)
		,	columns:columns.set(['name',name],{status},{files:group.files,items:group.items})
		}
	}
,	fetchGroupError({items,columns},{meta:{name}}){
		const status = STATUS_ERROR
		return {
			items:items.set(['name',name],{status})
		,	columns:columns.set(['name',name],{status})
		};
	}
,	invalidateGroup({items,columns},{meta:{name}}){
		const status = STATUS_NONE;
		return {
			items:items.set(['name',name],{status})
		,	columns
		};
	}
}

function filterExistingPaths(has,dirname,files){
	return files.filter(
		path=>!has(path)
	).map(path=>({
		path
	,	dirname
	,	status:STATUS_NONE
	}))
}

function filterExistingNames(has,groups){
	return groups.filter(
		name=>!has(name)
	).map(name=>({
		name
	,	status:STATUS_NONE
	,	type:TYPE_GROUP
	}))
}

function updateItemChildrenType(item,propName,newItems){
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
			newValue = updateItemChildrenType(oldItem,'files',item.files);
		}else if(key=='groups'){
			newValue = updateItemChildrenType(oldItem,'groups',item.groups);
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

function updateItems(items,file,files,groups){
	const hasFiles = files && files.length;
	const hasGroups = groups && groups.length;
	const hasPath = items.has('path');
	const hasGroup = items.has('name');
	if(hasFiles){
		const newFiles = filterExistingPaths(hasPath,file && file.path || '',files);
		items = (newFiles.length && items.concat(newFiles)) || items;
	}
	if(hasGroups){
		const newGroups = filterExistingNames(hasGroup,groups)
		items = (newGroups.length && items.concat(newGroups)) || items;
	}
	if(file){
		const {path,dirname,isDirectory,isFile} = file;
		const type = isDirectory ? TYPE_DIRECTORY : isFile ? TYPE_FILE : TYPE_UNKNOWN;
		const status = status || STATUS_LOADED;
		const item = assign(file,{type,status},hasFiles?{files}:null);
		if(hasPath(path)){
			const oldItem = items.get('path',path);
			const updatedItem = updateItem(oldItem,item);
			if(updatedItem!==oldItem){
				items = items.set(['path',path],updatedItem);
			}
		}else{
			items = items.push(item);
		}
		const parent = dirname && items.get('path',dirname);
		if(parent && (!parent.files || parent.files.indexOf(path)<0)){
			const files = parent.files ? [...parent.files,path] : [path];
			items = items.set(['path',dirname],{files});
		}
	}
	return items;
}

function updateGroup(items,group,groups,files){
	const hasFiles = files && files.length;
	const hasGroups = groups && groups.length;
	const hasPath = items.has('path');
	const hasGroup = items.has('name');
	if(hasFiles){
		const newFiles = filterExistingPaths(hasPath,'',files)
		items = (newFiles.length && items.concat(newFiles)) || items
	}
	if(hasGroups){
		const newGroups = filterExistingNames(hasGroup,groups)
		items = (newGroups.length && items.concat(newGroups)) || items;
	}
	if(group){
		const {name} = group;
		const type = TYPE_GROUP;
		const status = STATUS_LOADED;
		const item = assign(group,{type,status});
		if(hasGroup(name)){
			const oldItem = items.get('name',name);
			const updatedItem = updateItem(oldItem,item);
			if(updatedItem!==oldItem){
				items = items.set(['name',name],updatedItem);
			}
		}else{
			items = items.push(item);
		}
	}
	return items;
}
