import {STATUS_NONE,STATUS_LOADED,STATUS_ERROR,STATUS_LOADING} from '../../constants/statuses';
import {TYPE_UNKNOWN,TYPE_DIRECTORY,TYPE_FILE,TYPE_GROUP} from '../../constants/types';
import {assign} from './utils';
import Indexed from 'indexed';
const {wrapArray} = Indexed;

var columnIds = 0;
const defaultColumn = {
	columnId:0
,	position:0
,	status:STATUS_NONE
,	path:false
,	objectId:false
,	info:false
,	type:TYPE_UNKNOWN
,	activeRowIndex:0
,	selectedRowsStart:0
,	selectedRowsEnd:0
,	selected:true
,	filter:''
,	sortBy:'type'
,	sortOrder:'descending'
,	showFilter:false
,	rows:new Set()
}
var itemIds = 0;
const defaultItem = {
	itemId:0
,	status:STATUS_NONE
,	path:false
,	marked:false
,	type:TYPE_UNKNOWN
}


const rowIndentifiers = new Map();

function getColumnId(){
	return ''+(columnIds++);
}
function getIdentifier(row){
	var identifier;
	if(typeof row == 'string'){identifier = row;}
	else if('path' in row){identifier = row.path || '/';}
	else if('name' in row){identifier = row.name};
	var finalIdentifier = identifier
	var n = 0;
	while(rowIndentifiers.has(finalIdentifier)){
		finalIdentifier = identifier+(n++);
	}
	rowIndentifiers.set(finalIdentifier,true);
	return [finalIdentifier,identifier];
}

function getItemId(){
	return ''+(itemIds++);
}

function createColumn(props){
	return assign(defaultColumn,props,(props && 'columnId' in props)?null:{columnId:getColumnId()});
}


export function createItem(props){
	const isString = (typeof props == 'string');
	const itemId = (props && !isString && ('itemId' in props))? props.itemId : getItemId();
	const identifier = (props && !isString && ('identifier' in props))? props.identifier : getIdentifier(props);
	const size = (props && !isString && ('size' in props))? props.size : 0;
	return assign(defaultItem,props,{itemId,identifier,size});
}

export default {
	data:{
		items:wrapArray([],['name','path','itemId','identifier'])
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
