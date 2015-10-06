export default function collectMarkedOrSelectedItems(columns,files,indexes){
	let selected = false;
	let marked = [];
	columns.forEach(column=>{
		const columnItems = column.items && column.items.filter(item=>item.marked);
		if(columnItems){
			marked = marked.concat(columnItems)
		}
		if(column.selected && !selected){
			const selectedItem = column.items && column.items.find(item=>item.selected);
			if(selectedItem){
				selected = selectedItem;
			}else{
				selected = column;
			}
		}
	});
	return {selected,marked}
}