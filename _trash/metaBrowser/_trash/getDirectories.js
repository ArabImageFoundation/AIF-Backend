import forEachAsync from './forEachAsync';
import getGroupsByPaths from './getGroupsByPaths'
import {
	copy
,	createDir
,	emptyDir
,	list
,	move
,	readdir
,	readFile
,	remove
,	stat
,	read
,	writeFile
} from '../fileBrowser/fs';

function getGroupsForDirectory(directory,next){
	getGroupsByPaths(
		directory.path
	,	(err,groups)=>err?next(err) : assignGroupsForFile(
			directory
		,	groups
		,	(err,directory) => getGroupsForDirectoryFiles(directory,next)
		)
	)
}

function getGroupsForDirectoryFiles(directory,next){
	if(!directory.files){return next(null,directory);}
	forEachAsync(
		directory.files
	,	(file,nextFile)=>getGroupsByPaths(
			file.path
		,	(err,groups)=>err?next(err) : assignGroupsForFile(
				file
			,	groups
			,	nextFile
			)
		)
	,	(errs,files) => next(null,Object.assign({},directory,{files}))
	);
}

function assignGroupsForFile(file,groups,next){
	if(groups && groups.length){
		return next(null,Object.assign({},file,{groups}));
	}
	return next(null,file);
}

function validDirectory(directory){
	return directory.isDirectory;
}

export default function getDirectories(paths,cb){
	forEachAsync(
		paths
	,	(path,next)=>readdir(
			{src:path,recursion:1}
		,	(err,directory)=>err?next(err): validDirectory(directory) ? getGroupsForDirectory(directory,next) : next()
		)
	,	cb
	);
}