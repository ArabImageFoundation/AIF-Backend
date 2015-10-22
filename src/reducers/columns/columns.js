import {
	ADD_COLUMN
,	FILTER_COLUMN
,	SELECT_COLUMN
,	SELECT_NEXT_COLUMN
,	SELECT_PREVIOUS_COLUMN
,	REMOVE_COLUMN
,	MARK_ITEM
,	MARK_NEXT_ITEM
,	MARK_PREVIOUS_ITEM
,	SELECT_ITEM
,	SELECT_NEXT_ITEM
,	SELECT_PREVIOUS_ITEM
,	RECEIVE_DIRECTORY
,	REQUEST_DIRECTORY
,	RECEIVE_FILE
,	RECEIVE_FILE_CONTENTS
,	REQUEST_FILE
,	REQUEST_FILE_CONTENTS
,	ERROR_FETCHING
} from '../../actions';

import {addColumn} from './addColumn';
import {errorFetching} from './errorFetching';
import {filterColumn} from './filterColumn';
import {markItem} from './markItem';
import {markPreviousItemInCurrentColumn} from './markPreviousItemInCurrentColumn';
import {markNextItemInCurrentColumn} from './markNextItemInCurrentColumn';
import {receiveDirectory} from './receiveDirectory';
import {receiveFile} from './receiveFile';
import {receiveFileContents} from './receiveFileContents';
import {removeColumn} from './removeColumn';
import {requestDirectory} from './requestDirectory';
import {requestFile} from './requestFile';
import {requestFileContents} from './requestFileContents';
import {selectColumn} from './selectColumn';
import {selectItem} from './selectItem';
import {selectNextColumn} from './selectNextColumn';
import {selectNextItemInCurrentColumn} from './selectNextItemInCurrentColumn';
import {selectPreviousColumn} from './selectPreviousColumn';
import {selectPreviousItemInCurrentColumn} from './selectPreviousItemInCurrentColumn';
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
			return selectNextItemInCurrentColumn(state,action);
		case SELECT_PREVIOUS_COLUMN:
			return selectPreviousColumn(state,action);
		case SELECT_PREVIOUS_ITEM:
			return selectPreviousItemInCurrentColumn(state,action);
		case FILTER_COLUMN:
			return filterColumn(state,action)
		default:
			return state;
	}
}