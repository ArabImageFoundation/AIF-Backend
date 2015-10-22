import createGroup from './createGroup';

export default function create(rethinkdb,props,cb){
	createGroup(rethinkdb,props,cb);
}