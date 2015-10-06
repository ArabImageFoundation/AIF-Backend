import getFile from './getFile';

export default function mapItemOrColumnToFiles(item,files,indexes){
	const itemPath = item.path;
	if(typeof itemPath == 'undefined'){return item;}
	const file = getFile(itemPath,files,indexes);
	if(!file){return item;}
	if(item.file && item.file == file){return item;}
	return Object.assign({},item,{file});
}