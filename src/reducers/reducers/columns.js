import {STATUS_NONE,STATUS_LOADED,STATUS_ERROR,STATUS_LOADING,STATUS_PROCESSING} from '../../constants/statuses';
import {TYPE_UNKNOWN,TYPE_DIRECTORY,TYPE_FILE,TYPE_GROUP} from '../../constants/types';
import {
	changeObjectWhere
} from './utils'
import {
	createColumn
,	removeColumnFromIndex
,	getColumnIndexFromId
} from './columnsUtils'

export default {
	addColumn(state,{meta:{columnId,columnType,path}}){
		const index = getColumnIndexFromId(state,columnId,1);
		return removeColumnFromIndex(state, index).concat(createColumn({
			position:index+1
		,	path
		,	type:columnType
		}))
	}
,	removeColumn(columns,{meta:{columnId}}){
		const index = getColumnIndexFromId(columns,columnId,1);
		return removeColumnFromIndex(columns,index,true)
	}
,	fetchDirectoryStart(columns,{meta:{path}}){
		const status = STATUS_LOADING;
		const type = TYPE_DIRECTORY
		return changeObjectWhere(columns,{status,type},item=>item.path==path)
	}
,	fetchFileStart(columns,{meta:{path}}){
		const status = STATUS_LOADING;
		const type = TYPE_FILE
		return changeObjectWhere(columns,{status,type},item=>item.path==path)
	}
,	fetchFileSuccess(columns,{meta:{path}}){
		const status = STATUS_LOADED;
		const type = TYPE_FILE
		return changeObjectWhere(columns,{status,type},item=>item.path==path)
	}
,	fetchDirectoryProcessing(columns,{payload:{file,files},meta:{path}}){
		const status = STATUS_PROCESSING;
		return changeObjectWhere(columns,{status,file:file.path,files},item=>item.path==path)
	}
,	fetchDirectorySuccess(columns, {payload:{file,files},meta:{path}}){
		const status = STATUS_LOADED;
		return changeObjectWhere(columns,{status,file,files},item=>item.path==path)
	}
,	fetchDirectoryError(columns,{meta:{path}}){
		const status = STATUS_ERROR;
		return changeObjectWhere(columns,{status},item=>item.path==path)
	}
,	fetchGroupSuccess(columns,{meta:{path}}){
		const status = STATUS_LOADED;
		return changeObjectWhere(columns,{status},item=>item.path==path)
	}
,	fetchGroupError(columns,{meta:{path}}){
		const status = STATUS_ERROR;
		return changeObjectWhere(columns,{status},item=>item.path==path)
	}
,	fetchGroupStart(columns,{meta:{columnId,path}}){
		const status = STATUS_LOADING;
		const type = TYPE_FILE
		return changeObjectWhere(columns,{status,type},item=>item.columnId==columnId)
	}
}
