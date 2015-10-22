
const markedTrue = {marked:true}

export function markItem(state,itemId){
	return state.map(item=>
		item.id == itemId?
			Object.assign({},item,markedTrue) :
			item
	)
}