import {
	ADD_COLUMN,SELECT_COLUMN,SELECT_NEXT_COLUMN,SELECT_PREVIOUS_COLUMN,REMOVE_COLUMN,SELECT_ITEM
,	SELECT_NEXT_ITEM
,	SELECT_PREVIOUS_ITEM
} from '../actions/columns';
import {REQUEST_FILES,RECEIVE_FILES,SELECT_DIRECTORY,ERROR_FETCHING} from '../actions/files';
import {FOCUS_IN,FOCUS_OUT} from '../actions/ui';
import {STATUS_LOADING,TYPE_DIRECTORY,STATUS_LOADED,TYPE_FILE,TYPE_INFO,STATUS_ERROR} from '../constants';

let ids = 0;

function createColumn(position=0,directory='',type,handlerName){
	return {
		id:ids++
	,	position
	,	status:'loading'
	,	directory
	,	info:false
	,	type
	,	handlerName
	,	selectedItem:0
	,	selected:true
	,	focus:false
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
	_state.push(createColumn(state.length,action.directory,action.columnType,action.handlerName));
	return _state;
}

function selectItem(state,columnId,itemId){
	if(itemId<0){return state;}
	return state.map(column=>
		(column.id == columnId && column.items && itemId<column.items.length) ?
			Object.assign({},column,{selectedItem:itemId}) :
			column
	);
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
	if(id>=state.length){return state;}
	if(id<0){return state;}
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

function mapFilesForColumn(info){
	const {
		files
	,	atime
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
	const props = {
		info:{
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
	,	items:files
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
			return selectItem(addColumn(state,action),action)
		case REMOVE_COLUMN:
			return truncateState(state,action,0) || state
		case REQUEST_FILES:
			return state.map(column =>
				column.id == action.columnId ?
					Object.assign({},column,{status:STATUS_LOADING,directory:action.directory}) :
					column
			)
		case RECEIVE_FILES:
			return state.map(column =>
				(column.id == action.columnId) && (column.directory == action.directory)?
					Object.assign({},column,{status:STATUS_LOADED},mapFilesForColumn(action.response)) :
					column
			)
		case ERROR_FETCHING:
			return state.map(column=>
				(column.id == action.columnId) && (column.directory == action.directory)?
					Object.assign({},column,{status:STATUS_ERROR,error:action.error}) :
					column
			)
		case SELECT_ITEM:
			return selectItem(state,action.columnId,action.itemId)
		case SELECT_NEXT_ITEM:
			return selectNextItemInCurrentColumn(state);
		case SELECT_PREVIOUS_ITEM:
			return selectPreviousItemInCurrentColumn(state);
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