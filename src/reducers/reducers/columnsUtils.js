import {STATUS_NONE,STATUS_LOADED,STATUS_ERROR,STATUS_LOADING} from '../../constants/statuses';
import {TYPE_UNKNOWN,TYPE_DIRECTORY,TYPE_FILE,TYPE_GROUP} from '../../constants/types';

var ids = 0;

export const defaultColumn = {
	columnId:0
,	position:0
,	status:STATUS_NONE
,	path:false
,	objectId:false
,	info:false
,	type:TYPE_UNKNOWN
,	selectedItem:0
,	selected:true
,	filter:''
,	showFilter:false
,	items:[]
}

export function createColumn(props){
	return Object.assign({},defaultColumn,props,{columnId:ids++});
}
export function getColumnIndexFromId(state,columnId,modifier){
	modifier = modifier || 0;
	let index = state.findIndex(column=>(column.columnId == columnId));
	if(index<0){return false;}
	index+=modifier
	if(index < 0 || index >= state.length){return false;}
	return index;
}

export function removeColumnFromIndex(state,index,reselect){
	const {length} = state;
	if(reselect){
		let i = index
		,	wasSelected = false
		;
		while(i<length && !wasSelected){
			if(state[i++].selected){wasSelected = true;break;}
		}
		if(wasSelected){
			return changeObjectAtIndex(state.slice(0,index),index-1,{selected:true})
		}
	}
	return state.slice(0,index);
}
