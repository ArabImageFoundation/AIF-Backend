import getSelectedColumnIndex from './getSelectedColumnIndex';

export function toggleColumn(state,prop){
	if(id>=state.length || id<0){return state;}
	return state.map(column => 
		(column.id == id) ?
			Object.assign({},column,{[prop]:!!!column[prop]}) :
			column
	)
}