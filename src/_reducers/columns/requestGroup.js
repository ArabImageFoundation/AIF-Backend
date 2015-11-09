import {STATUS_LOADING} from '../../constants/statuses';

export function requestGroup(state,action){
	const {group,columnId} = action;
	return state.map(column =>
		column.path == group && columnId == column.id ?
			Object.assign({},column,{status:STATUS_LOADING,path:group}) :
			column
	)
}