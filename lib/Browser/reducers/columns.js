import {
	ADD_COLUMN
,	SELECT_COLUMN
,	SELECT_NEXT_COLUMN
,	SELECT_PREVIOUS_COLUMN
,	REMOVE_COLUMN
,	SELECT_ITEM
,	SELECT_NEXT_ITEM
,	SELECT_PREVIOUS_ITEM
} from '../actions/columns';
import {
	REQUEST_DIRECTORY
,	RECEIVE_DIRECTORY
,	REQUEST_FILE
,	REQUEST_FILE_CONTENTS
,	RECEIVE_FILE
,	RECEIVE_FILE_CONTENTS
,	ERROR_FETCHING
} from '../actions/files';
import {
	FOCUS_IN
,	FOCUS_OUT
} from '../actions/ui';
import {
	STATUS_LOADING
,	STATUS_ERROR
,	STATUS_LOADED
,	STATUS_NONE
,	TYPE_DIRECTORY
,	TYPE_FILE
,	TYPE_INFO
} from '../constants';

let ids = 0;

function createColumn(position=0,path='',type,handlerName){
	return {
		id:ids++
	,	position
	,	status:STATUS_NONE
	,	path
	,	info:false
	,	type
	,	handlerName
	,	selectedItem:0
	,	markedItems:[]
	,	selected:true
	,	focused:false
	,	nextPath:false
	}
}

function getColumnPosition(state,id){
	let i = 0, length = state.length;
	for(i;i<length;i++){
		if(state[i].id == id){return i;}
	}
	return -1;
}

function truncateState(state,action,pos=0){
	let _pos = getColumnPosition(state,action.columnId);
	if(_pos<0){return false;}
	return state.slice(0,_pos+pos);
}

function addColumn(state,action){
	let _state = truncateState(state,action,1);
	if(!_state){return state;}
	_state = _state.map(column=>
		column.selected ? Object.assign({},column,{selected:false}) : column
	);
	_state.push(createColumn(state.length,action.path,action.columnType,action.handlerName));
	return _state;
}

function selectNextItem(state,columnId){
	return state.map(column=>
		(column.id == columnId && column.items && column.selectedItem+1<column.items.length) ?
			Object.assign({},column,{selectedItem:column.selectedItem+1}) :
			column
	);
}

function selectPreviousItem(state,columnId){
	return state.map(column=>
		(column.id == columnId && column.items && column.selectedItem-1>=0) ?
			Object.assign({},column,{selectedItem:column.selectedItem-1}) :
			column
	);
}

function markColumnItem(column,itemId){
	const index = column.markedItems.indexOf(itemId);
	if(index>=0){
		return Object.assign({},column,{markedItems:markedItems.splice(index,1)})
	}
	const markedItems = column.markedItems.slice();
	markedItems.push(itemId);
	return Object.assign({},column,{markedItems:markedItems});
}

function unmarkColumnItems(column){
	const markedItems = column.markedItems;
	if(markedItems.length){
		return Object.assign({},column,{markedItems:[]});
	}
	return column
}

function markItem(state,columnId,itemId){
	if(itemId<0){return state;}
	return state.map(column=>
		(column.id == columnId && column.items && itemId<column.items.length) ?
			markColumnItem(column,itemId):
			unmarkColumnItems(column)
	);
}

function selectItem(state,columnId,itemId){
	if(itemId<0){return state;}
	return state.map(column=>
		(column.id == columnId && column.items && itemId<column.items.length) ?
			Object.assign({},column,{selectedItem:itemId}) :
			column
	);
}

function selectNextItemInCurrentColumn(state){
	return state.map(column=>
		(column.selected && column.items && column.selectedItem+1<column.items.length) ?
			Object.assign({},column,{selectedItem:column.selectedItem+1}) :
			column
	);
}

function selectPreviousItemInCurrentColumn(state){
	return state.map(column=>
		(column.selected && column.items && column.selectedItem-1>=0) ?
			Object.assign({},column,{selectedItem:column.selectedItem-1}) :
			column
	);
}

function selectColumn(state,id){
	if(id>=state.length || id<0){return state;}
	return state.map(column => 
		(column.id == id) ?
			Object.assign({},column,{selected:true}) :
			(column.selected)?
				Object.assign({},column,{selected:false}) :
				column
	)
}

function findSelectedColumnIndex(state){
	return state.findIndex(column=>column.selected)
}

function mapInfoForColumn(info){
	const {
		atime
	,	basename
	,	birthtime
	,	dirname
	,	extension
	,	filename
	,	isDirectory
	,	isFile
	,	mime
	,	path
	,	size
	,	types
	} = info;
	return {
		atime
	,	basename
	,	birthtime
	,	dirname
	,	extension
	,	filename
	,	isDirectory
	,	isFile
	,	mime
	,	path
	,	size
	,	types
	}
}

function mapDirectoryForColumn(info){
	const {files} = info;
	const props = {
		info:mapInfoForColumn(info)
	,	items:files
	}
	return props;
}

function mapFileForColumn(info){
	const {
		contents
	,	data
	} = info;
	const props = {
		info:mapInfoForColumn(info)
	,	contents:contents
	,	data:data
	}
	return props;
}

let defaultState = [createColumn(0,'',TYPE_DIRECTORY)]

export function columns(state=defaultState,action){
	switch(action.type){
		case FOCUS_IN:
			return state.map(column => 
				(!column.focus)? Object.assign({},column,{focus:true}) :
				column
			)
		case FOCUS_OUT:
			return state.map(column => 
				(column.focus)? Object.assign({},column,{focus:false}) :
				column
			)
		case ADD_COLUMN:
			return selectItem(addColumn(state,action),action.columnId,action.itemId)
		case REMOVE_COLUMN:
			return truncateState(state,action,0) || state
		case REQUEST_DIRECTORY:
			return state.map(column =>
				column.id == action.columnId ?
					Object.assign({},column,{status:STATUS_LOADING,path:action.path}) :
					column
			)
		case REQUEST_FILE:
		case REQUEST_FILE_CONTENTS:
			return state.map(column =>
				column.id == action.columnId ?
					Object.assign({},column,{status:STATUS_LOADING,path:action.path}) :
					column
			)
		case RECEIVE_DIRECTORY:
			return state.map(column =>
				(column.id == action.columnId) && (column.path == action.path)?
					Object.assign({},column,{status:STATUS_LOADED},mapDirectoryForColumn(action.response)) :
					column
			)
		case RECEIVE_FILE:
			return state.map(column =>
				(column.id == action.columnId) && (column.path == action.path)?
					Object.assign({},column,{status:STATUS_LOADED},mapFileForColumn(action.response)) :
					column
			)
		case RECEIVE_FILE_CONTENTS:
			return state.map(column =>
				(column.id == action.columnId) && (column.path == action.path)?
					Object.assign({},column,{status:STATUS_LOADED,contents:action.response}) :
					column
			)
		case ERROR_FETCHING:
			return state.map(column=>
				(column.id == action.columnId) && (column.path == action.path)?
					Object.assign({},column,{status:STATUS_ERROR,error:action.error}) :
					column
			)
		case SELECT_ITEM:
			return selectItem(state,action.columnId,action.itemId)
		case SELECT_NEXT_ITEM:
			return selectNextItemInCurrentColumn(state);
		case SELECT_PREVIOUS_ITEM:
			return selectPreviousItemInCurrentColumn(state);
		case MARK_ITEM:
			return markItem(state,action.columnId,action.itemId)
		case MARK_NEXT_ITEM:
			return markNextItemInCurrentColumn(state);
		case MARK_PREVIOUS_ITEM:
			return markPreviousItemInCurrentColumn(state);
		case SELECT_COLUMN:
			return selectColumn(state,action.columnId)
		case SELECT_NEXT_COLUMN:
			const nextColumnIndex = findSelectedColumnIndex(state)+1;
			return selectColumn(state,nextColumnIndex);
		case SELECT_PREVIOUS_COLUMN:
			const previousColumnIndex = findSelectedColumnIndex(state)-1;
			return selectColumn(state,previousColumnIndex);
		default:
			return state;
	}
}