import mimes from './mimes';

const extensions = {};

for(var mime in mimes){
	const exts = mimes[mime];
	exts.forEach(ext=>extensions[ext]=mime.split('/'));
}

export default function lookup(extension){
	if(extension in extensions){
		return extensions[extension];
	}
	return ['application','octet-stream']
}
