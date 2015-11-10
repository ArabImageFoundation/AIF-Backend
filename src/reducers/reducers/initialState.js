import {STATUS_NONE,STATUS_LOADED,STATUS_ERROR,STATUS_LOADING} from '../../constants/statuses';
import {TYPE_UNKNOWN,TYPE_DIRECTORY,TYPE_FILE,TYPE_GROUP} from '../../constants/types';
import {assign} from './utils';
import Indexed from 'indexed';
const {wrapArray} = Indexed;

var columnIds = 0;
export const defaultColumn = {
	columnId:0
,	position:0
,	status:STATUS_NONE
,	path:false
,	objectId:false
,	info:false
,	type:TYPE_UNKNOWN
,	selectedItemIndex:0
,	selectedItemType:null
,	selected:true
,	filter:''
,	showFilter:false
,	items:wrapArray([])
}
var itemIds = 0;
export const defaultItem = {
	itemId:0
,	status:STATUS_NONE
,	path:false
,	marked:false
,	type:TYPE_UNKNOWN
}

function getColumnId(){
	return ''+(columnIds++);
}

function getItemId(){
	return ''+(itemIds++);
}

function createColumn(props){
	return assign(defaultColumn,props,(props && 'columnId' in props)?null:{columnId:getColumnId()});
}

function createItem(props){
	return assign(defaultItem,props,(props && 'itemId' in props)?null:{itemId:getItemId()});
}

export default {
	data:{
		items:wrapArray([],['name','path','itemId'],createItem)
	,	columns:wrapArray([],['name','path','columnId'],createColumn).push({
			position:0
		,	type:TYPE_DIRECTORY
		,	path:'/'
		})
	}
,	mode:{
		showOverlay:false
	,	itemId:false
	}
,	selection:{
		files:[]
	,	groups:[]
	,	summary:{}
	,	columnId:0
	}
}
