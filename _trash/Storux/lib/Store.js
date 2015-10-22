import setStoreInstance from './setStoreInstance';
import addEventListener from './addEventListener';
import removeEventListener from './removeEventListener';
import getStoreState from './getStoreState';

function Store(storeName,fns,cb){
	if(!(this instanceof Store)){return new Store(storeName,fns,cb);}
	setStoreInstance(this,storeName);
}

Store.prototype.on = function on(evt,fn){
	addEventListener(this.meta,evt,fn);
	return this;
}
Store.prototype.off = function off(evt,fn){
	removeEventListener(this.meta,evt,fn);
	return this;
}
Store.prototype.getState = function getState(raw){
	return getStoreState(this.meta,this,raw)
}
Store.prototype.isDirty = function isDirty(){
	return this.meta.dirty;
}

export default Store;