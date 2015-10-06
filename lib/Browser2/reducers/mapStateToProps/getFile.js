export default function getFile(path,files,indexes){
	const fileIndex = indexes[path];
	if(typeof fileIndex == 'undefined'){return false;}
	const file = files[fileIndex];
	if(typeof file == 'undefined'){return false;}
	return file;
}