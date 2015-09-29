import storeMaker from './storeMaker'
import Immutable from 'immutable';

function makeImmutable(obj){
	return Immutable.fromJS(obj);
}

export default function Root(stores,cb){
	return storeMaker('root',stores,cb);
}

Root.toImmutable = makeImmutable;