import {removeColumn} from './removeColumn';
import {createColumn} from './utils/createColumn';

const selectedFalse = {selected:false}

export function addColumn(state,action){
	const newColumnProps = {
		position:state.length
	,	path:action.path
	,	type:action.columnType
	,	handlerName:action.handlerName
	}
	const _state = removeColumn(state,action,1).map(column=>
		column.selected ? Object.assign({},column,selectedFalse) : column
	)
	_state.push(createColumn(newColumnProps));
	return _state;
}