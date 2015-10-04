import {
	ADD_COLUMN
,	SELECT_COLUMN
,	SELECT_NEXT_COLUMN
,	SELECT_PREVIOUS_COLUMN
,	REMOVE_COLUMN
} from '../../actions/ui/columns/_constants';
import {
	MARK_ITEM
,	MARK_NEXT_ITEM
,	MARK_PREVIOUS_ITEM
,	SELECT_ITEM
,	SELECT_NEXT_ITEM
,	SELECT_PREVIOUS_ITEM
} from '../../actions/ui/items/_constants';
import {
	RECEIVE_DIRECTORY
,	REQUEST_DIRECTORY
} from '../../actions/api/directories/_constants';
import {
	RECEIVE_FILE
,	RECEIVE_FILE_CONTENTS
,	REQUEST_FILE
,	REQUEST_FILE_CONTENTS
} from '../../actions/api/files/_constants'
import {
	ERROR_FETCHING
} from '../../actions/api/errorFetching';
import {
	addColumn
,	errorFetching
,	markItem
,	markPreviousItemInCurrentColumn
,	markNextItemInCurrentColumn
,	receiveDirectory
,	receiveFile
,	receiveFileContents
,	removeColumn
,	requestDirectory
,	requestFile
,	requestFileContents
,	selectColumn
,	selectItem
,	selectNextColumn
,	selectNextItemInCurrentColumn
,	selectPreviousColumn
,	selectPreviousItemInCurrentColumn
} from './_actionsHandlers'
import {defaultState} from './defaults/state'

export function columns(state=defaultState,action){
	switch(action.type){
		case ADD_COLUMN:
			return addColumn(state,action)
		case ERROR_FETCHING:
			return errorFetching(state,action)
		case MARK_ITEM:
			return markItem(state,action)
		case MARK_NEXT_ITEM:
			return markNextItemInCurrentColumn(state,action);
		case MARK_PREVIOUS_ITEM:
			return markPreviousItemInCurrentColumn(state,action);
		case REMOVE_COLUMN:
			return removeColumn(state,action)
		case RECEIVE_DIRECTORY:
			return receiveDirectory(state,action)
		case RECEIVE_FILE:
			return receiveFile(state,action);
		case RECEIVE_FILE_CONTENTS:
			return receiveFileContents(state,action);
		case REQUEST_DIRECTORY:
			return requestDirectory(state,action)
		case REQUEST_FILE:
			return requestFile(state,action)
		case REQUEST_FILE_CONTENTS:
			return requestFileContents(state,action)
		case SELECT_COLUMN:
			return selectColumn(state,action)
		case SELECT_ITEM:
			return selectItem(state,action)
		case SELECT_NEXT_COLUMN:
			return selectNextColumn(state,action);
		case SELECT_NEXT_ITEM:
			return selectNextItemInCurrentColumn(state);
		case SELECT_PREVIOUS_COLUMN:
			return selectPreviousColumn(state,action);
		case SELECT_PREVIOUS_ITEM:
			return selectPreviousItemInCurrentColumn(state);
		default:
			return state;
	}
}