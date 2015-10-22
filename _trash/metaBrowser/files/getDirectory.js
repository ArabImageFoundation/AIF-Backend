import getGroupsForFile from './getGroupsForFile';

function validDirectory(directory){
	return (directory.isDirectory);
}

export default function getDirectory(fs,rootAPI,props,cb){
	fs.readdir(
		props
	,	((err,directory)=>
				err ? cb(err):
					validDirectory(directory) ? 
						getGroupsForFile(fs,rootAPI,props,(err,groups)=>
							err ? cb(err) :
							cb(null,Object.assign({},directory,{groups}))
						) :
						cb()
		)
	);
}