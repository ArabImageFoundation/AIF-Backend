import {
	TYPE_DIRECTORY
,	TYPE_FILE
,	TYPE_GROUP
} from './constants'

import createGroup from './createGroup';

export default function create(type,payload,db,cb){
	switch(type){
		case TYPE_GROUP:
			createGroup(payload,db,cb)
		default:
			return cb(new Error(`${type} is not a recognized type`));
	}
}