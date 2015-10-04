const selectedTrue = {selected:true}
const selectedFalse = {selected:false}

export function selectColumnAndDeselectOthers(state,id){
	if(id>=state.length || id<0){return state;}
	return state.map(column => 
		(column.id == id) ?
			Object.assign({},column,selectedTrue) :
			(column.selected)?
				Object.assign({},column,selectedFalse) :
				column
	)
}