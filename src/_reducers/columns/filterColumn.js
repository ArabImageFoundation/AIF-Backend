import minimatch from 'minimatch';
import escapeRegExp from '../../utils/escapeRegExp';

const minimatchOpts = {
	nocase:true
,	matchBase:false
,	noComment:true
}

function filterItems(items,str){
	var regex = (str[0]=='/') ? minimatch.makeRe(str,minimatchOpts) : new RegExp(escapeRegExp(str),'i');
	if(!regex){return items;}
	return items.map(item=>{
		let hidden = !(!('path' in item) || regex.test(item.path));
		return (item.hidden!==hidden) ? Object.assign({},item,{hidden}) : item;
	})	
}

export function filterColumn(state,action){
	const {columnId,filter} = action;
	return state.map(column=>
		(column.id == columnId) ?
			Object.assign({},column,{items:filterItems(column.items,filter)},{filter}) :
			column
	);
}