import {STATUS_LOADED} from '../../constants/statuses';
import {TYPE_FILE,TYPE_DIRECTORY} from '../../constants/types';

function mapFileToColumn(action){
	return {
		status:STATUS_LOADED
	,	objectId:action.objectId
	,	file:action.response
	}
}

export function receiveFile(state,action){
	const {columnId,path} = action;
	return state.map(column =>
		(column.path == path)?
			Object.assign({},column,mapFileToColumn(action)) :
			column
	)
}