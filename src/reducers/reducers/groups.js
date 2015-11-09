import {STATUS_NONE,STATUS_LOADED,STATUS_ERROR,STATUS_LOADING} from '../../constants/statuses';
import {TYPE_UNKNOWN,TYPE_DIRECTORY,TYPE_FILE,TYPE_GROUP} from '../../constants/types';
import {
	changeObjectWhere
,	assign
} from './utils'

const statusLoaded = {status:STATUS_LOADED}
const statusNone = {status:STATUS_NONE}

export default {
	fetchGroupStart(state,{meta:{name}}){
		return state;
	}
,	fetchGroupLoaded(state,{payload:{group},meta:{name}}){
		return state;
	}
,	fetchGroupSuccess(state,action){
		return state;
	}
,	fetchGroupError(state,action){
		return state;
	}
,	fetchRootGroupsStart(state,action){
		return state
	}
,	fetchRootGroupsSuccess(state,action){
		return state
	}
,	fetchRootGroupsError(state,action){
		return state
	}
,	addFilesToGroupStart(state,action){
		return state
	}
,	addFilesToGroupSuccess(state,action){
		return state
	}
,	addFilesToGroupError(state,action){
		return state
	}
,	removeFilesFromGroupStart(state,action){
		return state
	}
,	removeFilesFromGroupSuccess(state,action){
		return state
	}
,	addGroupToRootStart(state,action){
		return state
	}
,	addGroupToRootSuccess(state,action){
		return state
	}
}
