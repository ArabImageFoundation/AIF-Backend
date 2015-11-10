import {STATUS_NONE,STATUS_LOADED,STATUS_ERROR,STATUS_LOADING,STATUS_PROCESSING} from '../../constants/statuses';
import {TYPE_UNKNOWN,TYPE_DIRECTORY,TYPE_FILE,TYPE_GROUP} from '../../constants/types';
import {
	arrDiff
} from './utils'

function addItems(column,type,items){
	if(!items || !items.length){return column;}
	var newItems = column.items.removeMany(item=>item.type==type).concat(items.map(item=>{name:item,type}));
}

export default {
	addColumnStart(state,{meta:{columnId,columnType,path}}){
		const index = state.getIndex('columnId',columnId)+1;
		if(index>0){
			state = state.slice(0,index);
		}
		return state.push({
			position:index+1
		,	path
		,	type:columnType
		});
	}
,	selectColumn(state,{meta:{columnId}}){
		return state.set(col=>col.selected,{selected:false}).set(['columnId',columnId],{filter});
	}
,	filterColumn(state,{meta:{columnId,filter}}){
		return state.set(['columnId',columnId],{filter});
	}
,	columnFilterOn(state,{meta:{columnId}}){
		return state.set(['columnId',columnId],{showFilter:true})
	}
,	columnFilterOff(state,{meta:{columnId}}){
		return state.set(['columnId',columnId],{showFilter:false})
	}
,	removeColumn(state,{meta:{columnId}}){
		const index = state.getIndex('columnId',columnId)-1;
		return (index<=0 ?
			state :
			state.slice(0,index).set(index-1,{selected:true})
		);
	}
,	removeLastColumn(state){
		return state.length<=1? state : state.pop();
	}
,	fetchDirectoryStart(state,{meta:{path}}){
		const status = STATUS_LOADING;
		const type = TYPE_DIRECTORY
		return state.set(['path',path],{status,type})
	}
,	fetchFileStart(state,{meta:{path}}){
		const status = STATUS_LOADING;
		const type = TYPE_FILE
		return state.set(['path',path],{status,type})
	}
,	fetchFileSuccess(state,{meta:{path}}){
		const status = STATUS_LOADED;
		const type = TYPE_FILE
		return state.set(['path',path],{status,type})
	}
,	fetchDirectoryProcessing(state,{payload:{file,files},meta:{path}}){
		const status = STATUS_PROCESSING;
		return state.set(['path',path],{status,file:file.path,files})
	}
,	fetchDirectorySuccess(state, {payload:{file,files},meta:{path}}){
		const status = STATUS_LOADED;
		return state.set(['path',path],{status,file,files})
	}
,	fetchDirectoryError(state,{meta:{path}}){
		const status = STATUS_ERROR;
		return state.set(['path',path],{status})
	}
,	fetchGroupStart(state,{meta:{columnId,name}}){
		const status = STATUS_LOADING;
		const type = TYPE_GROUP;
		return state.set(['columnId',columnId],{status,type})
	}
,	fetchGroupProcessing(state,{meta:{name}}){
		const status = STATUS_PROCESSING;
		return state.set(['name',name],{status})
	}
,	fetchGroupSuccess(state,{payload:group,meta:{name}}){
		const status = STATUS_LOADED;
		return state.set(['name',name],{status},{files:group.files,items:group.items})
	}
,	fetchGroupError(state,{meta:{name}}){
		const status = STATUS_ERROR;
		return state.set(['name',name],{status})
	}
}
