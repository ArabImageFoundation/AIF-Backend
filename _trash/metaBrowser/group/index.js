import get from './get';
import create from './create';
import {
	ACTION_GET
,	ACTION_COPY
,	ACTION_REMOVE
,	ACTION_CREATE
} from '../constants'

export default function setGroups(rethinkdb,rootAPI){
	return function group(props,cb){
		if(!props.action){return cb(new Error('no action provided'))}
		switch(props.action){
			case ACTION_GET:
				return get(rethinkdb,rootAPI,props,cb);
			case ACTION_CREATE:
				return create(rethinkdb,props,cb);
			default:
				cb(new Error(`unknown action type ${props.action}`));
		}
	}
}