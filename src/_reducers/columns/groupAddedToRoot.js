import {createItem} from './utils/createItem'
import {TYPE_GROUP,TYPE_FILE,TYPE_DIRECTORY} from '../../constants/types';

export function groupAddedToRoot(state,action){
	const groupName = action.group;
	const column = state[0];
	const group = createItem({type:TYPE_GROUP,path:groupName,id:column.items.length,selected:false})
	const _state = state.slice();
	_state.splice(0,1,Object.assign({},column,{items:column.items.concat([group])}));
	return _state;
}