import getGroupsForFile from './getGroupsForFile';

function validFile(file){
	return !(file.isDirectory)
}

export default function getFile(fs,rootAPI,props,cb){
	fs.readFile(
		props
	,	((err,file)=>
				err ? cb(err):
					validFile(file) ? 
						getGroupsForFile(fs,rootAPI,props,(err,groups)=>
							err ? cb(err) :
							cb(null,Object.assign({},file,{groups:groups}))
						) :
						cb()
		)
	);
}