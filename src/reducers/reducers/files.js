import {STATUS_NONE,STATUS_LOADED,STATUS_ERROR,STATUS_LOADING} from '../../constants/statuses';
import {TYPE_UNKNOWN,TYPE_DIRECTORY,TYPE_FILE,TYPE_GROUP} from '../../constants/types';
import {changeObjectWhere,invertObjectPropertyWhere} from './utils'
import {
	updateItems
,	changeItemByPath
,	toggleItemPropertyByPath
,	toggleItemPropertyById
,	changeItemById
,	updateGroup
} from './filesUtils';

export default {
	markItem(state,{meta:{itemId}}){
		return changeItemById(state,itemId,{marked:true})
	}
,	unmarkItem(state,{meta:{itemId}}){
		return changeItemById(state,itemId,{marked:false})
	}
,	toggleItemMarking(state,{meta:{itemId}}){
		return toggleItemPropertyById(state,itemId,'marked')
	}
,	fetchDirectoryStart(state,{meta:{path}}){
		return updateItems(state,null,[path]);
	}
,	fetchDirectoryProcessing(state,{payload:{file,files},meta:{path}}){
		return updateItems(state,file,files);
	}
,	fetchDirectorySuccess(state,{payload:{file,files},meta:{path}}){
		return updateItems(state,file,files);
	}
,	fetchDirectoryError(state,{meta:{path}}){
		const status = STATUS_ERROR
		changeItemByPath(state,path,{status})
	}
,	invalidateDirectory({indexes,items},{meta:{path}}){
		const status = STATUS_NONE
		changeItemByPath(state,path,{status})
	}
,	fetchFileStart(state,{meta:{path}}){
		return updateItems(state,null,[path]);
	}
,	fetchFileSuccess(state,{payload:{file},meta:{path}}){
		return updateItems(state,file);
	}
,	fetchFileError(state,{payload:{file},meta:{path}}){
		const status = STATUS_ERROR
		changeItemByPath(state,path,{status})
	}
,	invalidateFile({indexes,items},{meta:{path}}){
		const status = STATUS_NONE
		changeItemByPath(state,path,{status})
	}
,	fetchGroupStart(state,{meta:{name}}){
		return updateGroup(state,{name})
	}
,	fetchGroupProcessing(state,{payload:{group},meta:{name}}){
		return updateGroup(state,group,group.files)
	}
,	fetchGroupSuccess(state,{payload:{group},meta:{name}}){
		return updateGroup(state,group,group.files)
	}
}
