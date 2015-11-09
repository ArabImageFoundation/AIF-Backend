import {defaultState} from './defaults/state';
import {ROOT_GROUPS_FETCHED,RECEIVE_GROUP} from '../../actions';

export function groups(state=defaultState,action){
	switch(action.type){
		case ROOT_GROUPS_FETCHED:

			const indexes = Object.assign({},state.indexes);
			const groups = state.groups.slice();

			Object.keys(action.response).map((key,i)=>{
				const group = action.response[key];
				const index = groups.push(group) - 1;
				indexes[group.name] = index;
			})
			return {indexes,groups};
		default:
			return state;
	}
}