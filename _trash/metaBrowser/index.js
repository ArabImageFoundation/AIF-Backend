import {
	ACTION_CREATE
,	ACTION_REMOVE
,	ACTION_COPY
,	ACTION_GET
,	TYPE_FILE
,	TYPE_DIRECTORY
,	TYPE_GROUP
} from './constants'

import fs from '../fileBrowser/fs';
import setGroup from './group';
import setFiles from './files';


export default function configure(rethinkdb){
	
	const group = setGroup(rethinkdb,metaBrowser);
	const file = setFiles(fs,metaBrowser);
	
	function metaBrowser(props,cb){
		if(!props.type){return cb(new Error('no type provided'));}
		switch(props.type){
			case TYPE_DIRECTORY:
			case TYPE_FILE:
				return file(props,cb);
			case TYPE_GROUP:
				return group(props,cb);
			default:
				return cb(new Error(`${props.type} is not recognized`));
		}
	}

	return metaBrowser
}

