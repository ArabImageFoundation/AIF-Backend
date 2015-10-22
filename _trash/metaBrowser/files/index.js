import get from './get';

import {
	ACTION_GET
,	ACTION_COPY
,	ACTION_REMOVE
,	ACTION_CREATE
} from '../constants'

export default function setFiles(fs,rootAPI){
	return function files(props,cb){
		if(!props.action){return cb(new Error('no action provided'))}
		switch(props.action){
			case ACTION_GET:
				return get(fs,rootAPI,props,cb);
			default:
				return cb(new Error(`unrecognized action ${props.action}`))
		}
	}
}