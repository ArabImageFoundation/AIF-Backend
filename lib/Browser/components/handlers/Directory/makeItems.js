import makeSection from './makeSection';
import makeFileItem from './makeFileItem';
import makeDirectoryItem from './makeDirectoryItem';

export default function makeItems(items,props){
	if(!items || !items.length){return false;}
	const files = [];
	const directories = [];
	items.forEach(function(item,i){
		if(item.isDirectory){
			directories.push(makeDirectoryItem(item,i,props));
		}else{
			files.push(makeFileItem(item,i,props));
		}
	});
	const ret = [];
	if(directories.length){
		ret.push(makeSection('directories',props,directories.filter(Boolean)))
	}
	if(files.length){
		ret.push(makeSection('files',props,files.filter(Boolean)))
	}
	return ret;
}