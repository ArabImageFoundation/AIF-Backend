import {STATUS_NONE} from '../../../constants/statuses';
import {TYPE_UNKNOWN} from '../../../constants/types';

export const defaultColumn = {
	id:0
,	position:0
,	status:STATUS_NONE
,	path:false
,	objectId:false
,	info:false
,	type:TYPE_UNKNOWN
,	handlerName:false
,	selectedItem:0
,	markedItems:[]
,	selected:true
,	focused:false
,	nextPath:false
,	filter:''
} 