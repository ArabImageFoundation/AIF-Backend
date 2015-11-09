import {STATUS_ERROR} from '../../constants/statuses';

export function errorFetching(state,action){
	const {path} = action;
	return state.map(column=>
		(column.path == path)?
			Object.assign({},column,{status:STATUS_ERROR,error:action.error}) :
			column
	)
}