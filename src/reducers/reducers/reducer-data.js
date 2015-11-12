import {STATUS_NONE,STATUS_LOADED,STATUS_ERROR,STATUS_LOADING,STATUS_PROCESSING} from '../../constants/statuses';
import {TYPE_UNKNOWN,TYPE_DIRECTORY,TYPE_FILE,TYPE_GROUP} from '../../constants/types';
import {
	assign
,	arrDiff
,	processReceivedFile
,	processReceivedGroup
} from './utils';

export default {
	/******************************
				COLUMNS
	*******************************/
	addColumnStart({items,columns},{meta:{columnId,columnType:type,path}}){
		const index = columns.getIndex('columnId',columnId)+1;
		if(index>0){
			columns = columns.slice(0,index);
		}
		const position = index+1;
		return {
			items
		,	columns:columns.push({position,path,type})
		};
	}
,	selectColumn({items,columns},{meta:{columnId}}){
		return {
			items
		,	columns:columns.set(col=>col.selected,{selected:false}).set(['columnId',columnId],{filter})
		};
	}
,	filterColumn({items,columns},{meta:{columnId,filter}}){
		return {
			items
		,	columns:columns.set(['columnId',columnId],{filter})
		};
	}
,	columnFilterOn({items,columns},{meta:{columnId}}){
		return {
			items
		,	columns:columns.set(['columnId',columnId],{showFilter:true})
		};
	}
,	columnFilterOff({items,columns},{meta:{columnId}}){
		return {
			items
		,	columns:columns.set(['columnId',columnId],{showFilter:false})
		};
	}
,	removeColumn(state,{meta:{columnId}}){
		const {items,columns} = state;
		const index = columns.getIndex('columnId',columnId)-1;
		return (index<=0 ?
			state :
			{
				items
			,	columns:columns.slice(0,index).set(index-1,{selected:true})
			}
		);
	}
,	removeLastColumn(state){
		const {items,columns} = state;
		if(columns.length<=1){return state;}
		return {
			items
		,	columns:columns.pop()
		};
	}
	/******************************
			COLUMNS ROWS
	*******************************/
,	dragOverColumn({items,columns},{meta:{columnId,rowIndex}}){

	}
,	dragOutColumn({items,columns},{meta:{columnId,rowIndex}}){

	}
,	dragOverRow({items,columns},{meta:{columnId,rowIndex}}){

	}
,	dragOutRow({items,columns},{meta:{columnId,rowIndex}}){

	}
,	selectRowRange({items,columns},{meta:{columnId,selectedRowsStart,selectedRowsEnd}}){

	}
,	selectActiveRow({items,columns},{meta:{columnId,rowIndex}}){

	}
,	selectRow({items,columns},{meta:{columnId,rowIndex}}){

	}
,	deselectRow({items,columns},{meta:{columnId,rowIndex}}){

	}
,	selectNextRow({items,columns},{meta:{columnId,rowIndex}}){

	}
,	selectPreviousRow({items,columns},{meta:{columnId,rowIndex}}){

	}
	/******************************
				ITEMS
	*******************************/
,	markItem({items,columns},{meta:{itemId}}){
		return {
			items:items.set(['itemId',itemId],{marked:true})
		,	columns
		};
	}
,	unmarkItem({items,columns},{meta:{itemId}}){
		return {
			items:items.set(['itemId',itemId],{marked:true})
		,	columns
		};
	}
,	toggleItemMarking({items,columns},{meta:{itemId}}){
		const item = items.get('itemId',itemId);
		if(!item){
			return {
				items:items
			,	columns
			};
		};
		const marked = !!item.marked;
		return {
			items:items.set(['itemId',itemId],{marked})
		,	columns
		};
	}
	/******************************
				FILES
	*******************************/
,	fetchDirectoryStart({items,columns},{meta:{path}}){
		const status = STATUS_LOADING;
		const type = TYPE_DIRECTORY
		return processReceivedFile(status,type,columns,items,null,[path])
	}
,	fetchDirectoryProcessing({items,columns},{payload:{file,files},meta:{path}}){
		const status = STATUS_PROCESSING;
		const type = TYPE_DIRECTORY
		return processReceivedFile(status,type,columns,items,file,files,file.groups)
	}
,	fetchDirectorySuccess({items,columns},{payload:{file,files},meta:{path}}){
		const status = STATUS_LOADED;
		const type = TYPE_DIRECTORY
		return processReceivedFile(status,type,columns,items,file)
	}
,	fetchDirectoryError({items,columns},{meta:{path}}){
		const status = STATUS_ERROR
		return {
			items:items.set(['path',path],{status})
		,	columns:columns.set(['path',path],{status})
		};
	}
,	invalidateDirectory({items,columns},{meta:{path}}){
		const status = STATUS_NONE
		return {
			items:items.set(['path',path],{status})
		,	columns
		};
	}
,	fetchFileStart({items,columns},{meta:{path}}){
		const status = STATUS_LOADING;
		const type = TYPE_FILE
		return processReceivedFile(status,type,columns,items,null,[path])
	}
,	fetchFileSuccess({items,columns},{payload:{file},meta:{path}}){
		const status = STATUS_LOADED;
		const type = TYPE_FILE
		return processReceivedFile(status,type,columns,items,file)
	}
,	fetchFileError({items,columns},{payload:{file},meta:{path}}){
		const status = STATUS_ERROR
		return {
			items:items.set(['path',path],{status})
		,	columns:columns.set(['path',path],{status})
		};
	}
,	invalidateFile({indexes,items},{meta:{path}}){
		const status = STATUS_NONE
		return {
			items:items.set(['path',path],{status})
		,	columns
		};
	}
	/******************************
			GROUPS
	*******************************/
,	addFilesToGroupSuccess({items,columns},{meta:{group,files}}){
		const status = STATUS_LOADED;
		return processReceivedGroup(status,columns,items,null,[group],files)
	}
,	addGroupToGroupSuccess({items,columns},{meta:{group,child}}){
		const status = STATUS_LOADED;
		return processReceivedGroup(status,columns,items,{name:group},[child])
	}
,	fetchGroupStart({items,columns},{meta:{name,columnId}}){
		const status = STATUS_LOADING;
		return processReceivedGroup(status,columns,items,null,[name])
	}
,	fetchGroupProcessing({items,columns},{payload:{group},meta:{name}}){
		const status = STATUS_PROCESSING;
		return processReceivedGroup(status,columns,items,group,group.groups,group.files)
	}
,	fetchGroupSuccess({items,columns},{payload:{group},meta:{name}}){
		const status = STATUS_LOADED;
		return processReceivedGroup(status,columns,items,group,group.groups,group.files);
	}
,	fetchGroupError({items,columns},{meta:{name}}){
		const status = STATUS_ERROR
		return {
			items:items.set(['name',name],{status})
		,	columns:columns.set(['name',name],{status})
		};
	}
,	invalidateGroup({items,columns},{meta:{name}}){
		const status = STATUS_NONE;
		return {
			items:items.set(['name',name],{status})
		,	columns
		};
	}
}
