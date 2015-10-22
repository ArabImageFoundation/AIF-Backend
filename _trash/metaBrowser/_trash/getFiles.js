import forEachAsync from './forEachAsync';
import getGroupsByPaths from './getGroupsByPaths'

import {
	readFile
} from '../fileBrowser/fs';

function getGroupsForFile(file,next){
	getGroupsByPaths(
		file.path
	,	(err,groups)=>err?next(err,file):next(null,Object.assign({},file,{groups}))
	);
}

function validFile(file){
	return !(file.isDirectory)
}

export default function getFiles(paths,cb){
	forEachAsync(
		paths
	,	(path,next)=>readFile(
			{src:path}
		,	(err,file)=>err? next(err) : validFile(file) ? getGroupsForFile(file,next) : next()
		)
	,	cb
	);
}