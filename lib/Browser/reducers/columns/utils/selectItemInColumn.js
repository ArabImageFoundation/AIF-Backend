
const selectedTrue = {selected:true}
const selectedFalse = {selected:false}

export function selectItemInColumn(column,itemId){
	const items = column.items.map((item,i)=>
		(item.id==itemId) ? 
			Object.assign({},item,selectedTrue) :
			item.selected ? 
				Object.assign({},item,selectedFalse) :
				item
	)
	return Object.assign({},column,{items});
}