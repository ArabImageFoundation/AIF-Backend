import {STATUS_NONE,STATUS_LOADED,STATUS_ERROR,STATUS_LOADING} from '../../constants/statuses';
import {TYPE_UNKNOWN,TYPE_DIRECTORY,TYPE_FILE,TYPE_GROUP} from '../../constants/types';
import {assign,arrDiff} from './utils';

export default {
	markItem(state,{meta:{itemId}}){
		return state.set(['itemId',itemId],{marked:true})
	}
,	unmarkItem(state,{meta:{itemId}}){
		return state.set(['itemId',itemId],{marked:true})
	}
,	toggleItemMarking(state,{meta:{itemId}}){
		const item = state.get('itemId',itemId);
		if(!item){return state;}
		const marked = !!item.marked;
		return state.set(['itemId',itemId],{marked})
	}
,	fetchDirectoryStart(state,{meta:{path}}){
		return updateItems(state,null,[path]);
	}
,	fetchDirectoryProcessing(state,{payload:{file,files},meta:{path}}){
		return updateItems(state,file,files,file.groups);
	}
,	fetchDirectorySuccess(state,{payload:{file,files},meta:{path}}){
		return updateItems(state,file);
	}
,	fetchDirectoryError(state,{meta:{path}}){
		const status = STATUS_ERROR
		return state.set(['path',path],{status});
	}
,	invalidateDirectory(state,{meta:{path}}){
		const status = STATUS_NONE
		return state.set(['path',path],{status});
		/**
		const has = state.has('path');
		if(!has(path)){return state;}
		state = state.set(['path',path],{status});
		const files = state.get('path',path).files;
		if(!files || !files.length){return state;}
		state = state.setMany(['path',...files],{status});
		return state;
		**/
	}
,	fetchFileStart(state,{meta:{path}}){
		return updateItems(state,null,[path]);
	}
,	fetchFileSuccess(state,{payload:{file},meta:{path}}){
		return updateItems(state,file);
	}
,	fetchFileError(state,{payload:{file},meta:{path}}){
		const status = STATUS_ERROR
		return state.set(['path',path],{status});
	}
,	invalidateFile({indexes,items},{meta:{path}}){
		const status = STATUS_NONE
		return state.set(['path',path],{status});
	}
,	addFilesToGroupSuccess(state,{meta:{group,files}}){
		return updateGroup(state,null,null,[group,files]);
	}
,	addGroupToGroupSuccess(state,{meta:{group,child}}){
		return updateGroup(state,{name:group},[child])
	}
,	fetchGroupStart(state,{meta:{name}}){
		return updateGroup(state,null,[name])
	}
,	fetchGroupProcessing(state,{payload:{group},meta:{name}}){
		return updateGroup(state,group,group.groups,group.files)
	}
,	fetchGroupSuccess(state,{payload:{group},meta:{name}}){
		return updateGroup(state,group,group.groups,group.files)
	}
,	fetchGroupError(state,{meta:{name}}){
		const status = STATUS_ERROR
		return state.set(['name',name],{status});
	}
,	invalidateGroup(state,{meta:{name}}){
		const status = STATUS_NONE;
		return state.set(['name',name],{status});
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
		return items;
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

function updateItems(state,file,files,groups){
	const hasFiles = files && files.length;
	const hasGroups = groups && groups.length;
	const hasPath = state.has('path');
	const hasGroup = state.has('name');
	if(hasFiles){
		const newFiles = filterExistingPaths(hasPath,file && file.path || '',files);
		state = (newFiles.length && state.concat(newFiles)) || state;
	}
	if(hasGroups){
		const newGroups = filterExistingNames(hasGroup,groups)
		state = (newGroups.length && state.concat(newGroups)) || state;
	}
	if(file){
		const {path,dirname,isDirectory,isFile} = file;
		const type = isDirectory ? TYPE_DIRECTORY : isFile ? TYPE_FILE : TYPE_UNKNOWN;
		const status = status || STATUS_LOADED;
		const item = assign(file,{type,status},hasFiles?{files}:null);
		if(hasPath(path)){
			const oldItem = state.get('path',path);
			const updatedItem = updateItem(oldItem,item);
			if(updatedItem!==oldItem){
				state = state.set(['path',path],updatedItem);
			}
		}else{
			state = state.push(item);
		}
		const parent = dirname && state.get('path',dirname);
		if(parent && (!parent.files || parent.files.indexOf(path)<0)){
			const files = parent.files ? [...parent.files,path] : [path];
			state = state.set(['path',dirname],{files});
		}
	}
	return state;
}

function updateGroup(state,group,groups,files){
	const hasFiles = files && files.length;
	const hasGroups = groups && groups.length;
	const hasPath = state.has('path');
	const hasGroup = state.has('name');
	if(hasFiles){
		const newFiles = filterExistingPaths(hasPath,'',files)
		state = (newFiles.length && state.concat(newFiles)) || state
	}
	if(hasGroups){
		const newGroups = filterExistingNames(hasGroup,groups)
		state = (newGroups.length && state.concat(newGroups)) || state;
	}
	if(group){
		const {name} = group;
		const type = TYPE_GROUP;
		const status = STATUS_LOADED;
		const item = assign(group,{type,status});
		if(hasGroup(name)){
			const oldItem = state.get('name',name);
			const updatedItem = updateItem(oldItem,item);
			if(updatedItem!==oldItem){
				state = state.set(['name',name],updatedItem);
			}
		}else{
			state = state.push(item);
		}
	}
	return state;
}
