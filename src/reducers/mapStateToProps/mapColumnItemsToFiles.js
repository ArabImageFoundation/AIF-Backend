import mapItemOrColumnToFiles from './mapItemOrColumnToFiles';

export default function mapColumnItemsToFiles(column,files,indexes){
	const {items} = column;
	if(!items || !items.length){return column;}
	const _items = items.map(item=>mapItemOrColumnToFiles(item,files,indexes))
	return Object.assign({},column,{items:_items});
}