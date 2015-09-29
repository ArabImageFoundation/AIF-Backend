export default function mapResponse(file,{options}){
	const permittedProps = options && options.permittedProps;
	if(!permittedProps || !permittedProps.length){return file;}
	const rootDir = options.root;
	let returned = {};
	permittedProps.forEach(function(prop){
		returned[prop] = file[prop];
	});
	if(file.files){
		returned.files = file.files.map(file=>mapResponse(file,{options}));
	};
	if(rootDir && returned.path){
		if(returned.path == rootDir){
			returned.basename = '';
			returned.dirname = '';
			returned.filename = '';
			returned.path = '/'
		}else{
			returned.path = file.path.replace(rootDir,'');
		}
	}
	if(rootDir && returned.dirname){
		returned.dirname = file.dirname.replace(rootDir,'');
	}
	return returned;
}