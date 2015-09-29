export const ADD_COLUMN = 'ADD_COLUMN';
export const SELECT_COLUMN = 'SELECT_COLUMN';
export const REMOVE_COLUMN = 'REMOVE_COLUMN';
export const SELECT_ITEM = 'SELECT_ITEM';
export const SELECT_NEXT_COLUMN = 'SELECT_NEXT_COLUMN';
export const SELECT_PREVIOUS_COLUMN = 'SELECT_PREVIOUS_COLUMN';
export const SELECT_NEXT_ITEM = 'SELECT_NEXT_ITEM';
export const SELECT_PREVIOUS_ITEM = 'SELECT_PREVIOUS_ITEM';

export function selectNextColumn(columnId=0){
	return {
		type:SELECT_NEXT_COLUMN
	,	columnId:++columnId
	}
}

export function selectPreviousColumn(columnId=0){
	return {
		type:SELECT_PREVIOUS_COLUMN
	,	columnId:--columnId
	}
}

export function selectNextItem(){
	return {
		type: SELECT_NEXT_ITEM
	}
}

export function selectPreviousItem(){
	return {
		type: SELECT_PREVIOUS_ITEM
	}
}

export function selectColumn(columnId=0){
	return {
		type: SELECT_COLUMN
	,	columnId
	}
}

export function selectItem(columnId=0,itemId){
	return {
		type: SELECT_ITEM
	,	columnId
	,	itemId
	}
}

export function removeColumn(columnId=0){
	return {
		type: REMOVE_COLUMN
	,	columnId
	}
}

export function addColumn(directory,columnId,columnType,handlerName,fromItemId){
	return {
		type:ADD_COLUMN
	,	directory
	,	columnId
	,	columnType
	,	handlerName
	,	itemId:fromItemId
	}
}