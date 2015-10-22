import {
	TYPE_DIRECTORY
,	TYPE_FILE
} from '../constants';

import getDirectory from './getDirectory';
import getFile from './getFile';


export default function get(fs,rootAPI,props,cb){
	return props.type == TYPE_DIRECTORY ? 
		getDirectory(fs,rootAPI,props,cb) : 
		props.type == TYPE_FILE ?
			getFile(fs,rootAPI,props,cb) :
			cb(new Error(`unrecognized type ${props.type}`))
	;
}