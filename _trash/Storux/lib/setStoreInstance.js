export default function setStoreInstance(store,storeName){
	var meta = {
		name:storeName
	,	events:{}
	,	stores:[]
	,	state:null
	,	processing:false
	,	initialized:false
	,	isInitializing:false
	,	dirty:false
	}
	store.meta = meta;
}