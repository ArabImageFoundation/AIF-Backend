import {STATUS_LOADING} from '../../constants/statuses';

export function requestDirectory(state,action){
	const {path} = action;
	return state.map(column =>
		column.path == path ?
			Object.assign({},column,{status:STATUS_LOADING,path:action.path}) :
			column
	)
}