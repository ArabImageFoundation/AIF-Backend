

export function markItemInColumn(column,itemId){
	const items = column.items.map((item,i)=>
		item.id==itemId ? Object.assign({},item,{marked:!item.marked}) :
		item
	)
	return Object.assign({},column,{items});
}