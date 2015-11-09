import{
	MODE_COLUMNS
,	MODE_COLUMN_FILTER
,	MODE_OVERLAY
} from '../../constants'
import {
	COLUMN_FILTER_ON
,	COLUMN_FILTER_OFF
,	SHOW_IMAGE
,	HIDE_OVERLAY
} from '../../actions';

const defaultState = {
	mode:MODE_COLUMNS
,	imageIndex:-1
,	showOverlay:false
}

export function mode(state=defaultState,action){
	switch(action.type){
		case COLUMN_FILTER_ON:
			return Object.assign({},state,{mode:MODE_COLUMN_FILTER,showOverlay:false});
		case HIDE_OVERLAY:
		case COLUMN_FILTER_OFF:
			return Object.assign({},state,{mode:MODE_COLUMNS,showOverlay:false});
		case SHOW_IMAGE:
			return Object.assign({},state,{mode:MODE_OVERLAY,imageIndex:action.image,showOverlay:true});
		default:
			return state;
	}
}