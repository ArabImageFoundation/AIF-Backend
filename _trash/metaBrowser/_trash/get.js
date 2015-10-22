import getDirectories from './getDirectories';
import getFiles from './getFiles';
import getGroups from './getGroups';

import {
	TYPE_DIRECTORY
,	TYPE_FILE
,	TYPE_GROUP
} from './constants'


export default function get(type,paths,db,cb){
	if(!type){
		return cb(new Error('no type provided'));
	}
	if(!Array.isArray(paths)){paths = [paths];}
	switch(type){
		case TYPE_DIRECTORY:
			return getDirectories(paths,cb);
		case TYPE_FILE:
			return getFiles(paths,cb);
		case TYPE_GROUP:
			return getGroups(paths,db,cb);
		default:
			return cb(new Error(`${type} is not a recognized type`));
	}	
}