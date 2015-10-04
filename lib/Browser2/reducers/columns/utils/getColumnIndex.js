
export function getColumnIndex(state,action){
	let i = 0;
	const {length} = state.length;
	const {columnId} = action;
	return state.findIndex(column=>(column.id == columnId))
}