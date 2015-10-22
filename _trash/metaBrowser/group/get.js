import getGroupById from './getGroupById';
import getGroupByName from './getGroupByName';
import getRootGroup from './getRootGroup';
import getGroupsForFile from './getGroupsForFile';
import getGroupsByNames from './getGroupsByNames';

export default function get(rethinkdb,rootAPI,props,cb){
	if(props.name){
		if(Array.isArray(props.name)){
			return getGroupsByNames(rethinkdb,props,cb);	
		}
		return getGroupByName(rethinkdb,props,cb);
	}
	if(props.id){
		return getGroupById(rethinkdb,props,cb);
	}
	if(props.file){
		return getGroupsForFile(rethinkdb,props,cb)
	}
	if('root' in props){
		return getRootGroup(rethinkdb,props,cb);
	}
}