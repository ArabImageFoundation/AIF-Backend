import {
	selectNextColumn
,	selectPreviousColumn
,	markItem
,	markNextItem
,	markPreviousItem
,	selectItem
,	selectNextItem
,	selectPreviousItem
,	removeLastColumn
,	columnFilterOn
,	columnFilterOff
} from '../actions'
import {
	KEY_LEFT
,	KEY_RIGHT
,	KEY_UP
,	KEY_DOWN
,	KEY_CONFIRM
,	KEY_CANCEL
,	KEY_FORWARD
,	KEY_BACK
,	KEY_TOP
,	KEY_BOTTOM
,	KEY_FILTER
,	LETTERS
,	MODE_COLUMNS
,	MODE_COLUMN_FILTER
} from '../constants'

export default function keyHandlerFactory(dispatch,evt,mode){
	console.log(mode,evt.keyCode,LETTERS)
	switch(mode){
		case MODE_COLUMNS:
			if(LETTERS.indexOf(evt.keyCode)>=0){
				return dispatch(columnFilterOn())
			}
			switch(evt.keyCode){
				case KEY_LEFT: return   dispatch(selectPreviousColumn());
				case KEY_RIGHT: return  dispatch(selectNextColumn());
				case KEY_UP: return     dispatch(selectPreviousItem());
				case KEY_DOWN: return   dispatch(selectNextItem());
				case KEY_CANCEL: return dispatch(removeLastColumn());
			};
		break;
		case MODE_COLUMN_FILTER:
			switch(evt.keyCode){
				case KEY_CANCEL: return  dispatch(columnFilterOff());
			};
		break;
		default:
		break;
	}
}