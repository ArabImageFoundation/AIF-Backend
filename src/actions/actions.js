import {makeActionCreators,get,assign,pad,getMimeType,toType} from './utils'
import {STATUS_NONE,STATUS_LOADED,STATUS_ERROR,STATUS_LOADING,STATUS_PROCESSING} from '../constants/statuses';
import {TYPE_UNKNOWN,TYPE_DIRECTORY,TYPE_FILE,TYPE_GROUP} from '../constants/types';
import Promise from 'bluebird';
import PouchDB from 'pouchdb';
var db = new PouchDB('items');
var typesDb = new PouchDB('types');

function revToInt(rev){
	return parseInt(rev.split('-')[0]);
}

function isInvalidRowIndex(column,selectedRows,rowIndex){
	return (rowIndexExists(selectedRows,rowIndex) || rowIndex>=column.rows.length || rowIndex<0)
}

function rowIndexExists(selectedRows,rowIndex){
	return selectedRows.indexOf(rowIndex)>=0;
}

function selectRow(column,rowIndex){
	const {selectedRows} = column;
	if(Array.isArray(rowIndex)){
		const indexes = rowIndex.map(index=>{
			if(isInvalidRowIndex(column,selectedRows,index)){return false;}
			return index;
		}).filter(val=>val!==false);
		return assign(column,{selectedRows:[...selectedRows,...indexes]});
	}
	if(isInvalidRowIndex(column,selectedRows,rowIndex)){return column;}
	return assign(column,{selectedRows:[...selectedRows,rowIndex]})
}
function deselectRow(column,rowIndex){
	const {selectedRows} = column;
	if(Array.isArray(rowIndex)){
		return assign(column,{selectedRows:selectedRows.filter(index=>rowIndex.indexOf(index)<0)})
	}
	if(!rowIndexExists(selectedRows,rowIndex)){return column;}
	return assign(column,{selectedRows:selectedRows.filter(index=>index!==rowIndex)})
}

function calculateMarked(selection,selection_items,items,item){
	const summary = {};
	selection_items.forEach(id=>{
		const [type] = getTypeFromId(id);
		const {doc} = items.get(type).get(id);
		Object.keys(doc).forEach(key=>{
			const val = doc[key];
			const propType = toType(val);
			if(key == 'size'){
				summary.size = (summary.size || 0)+val;
				return;
			}
			if(key == '_attachments'){
				summary.thumbnails = (summary.thumbnails || []).concat({id,data:val.file.data});
				return;
			}
		})
	})
	return assign(selection,{summary,items:selection_items});
}

function setItemInItems(state,id,fn){
	const {items} = state;
	const [type] = getTypeFromId(id);
	const item = items.get(type).get(id);
	if(!item){return false;}
	const map = new Map([...items.get(type),[id,fn(item)]]);
	return {items:new Map([...state.items,[type,map]])};
}

function upsert(keys,include_docs,getDoc,getItem){
	var docs;
	return db.allDocs({
		keys
	,	include_docs
	}).then(results=>{
		docs = results.rows.map((row,i)=>{
			const {key,error,value} = row;
			const id = keys[i];
			const doc = getDoc(id,row,error)
			if(!doc){return false;}
			if(error){return doc;}
			const {rev} = value;
			return assign(doc,{_rev:rev});
		}).filter(Boolean);
		return db.bulkDocs(docs);
	}).then(results=>{
		return results.map((row,i)=>{
			const id = docs[i]._id;
			if(row instanceof Error){
				return {
					id
				,	error:row
				,	error_message:row.message
				,	ok:false
				,	status:STATUS_ERROR
				};
			}
			const {id:transaction_id,rev,ok} = row;
			return {
				id
			,	ok
			,	rev
			,	transaction_id
			,	revId:revToInt(rev)
			,	status:STATUS_LOADED
			}
		})
	}).then(results=>{
		const map = new Map();
		results.forEach((row,i)=>{
			const {id,ok,rev} = row;
			const item = getItem && getItem(id,ok) || row;
			const doc = (item.doc && (ok ? assign(item.doc,{_rev:rev}) : item.doc)) || docs[i];
			const {type} = doc;
			if(!map.has(type)){map.set(type,new Map());}
			map.get(type).set(id,assign(item,row,{doc}))
		});
		return {items:map};
	})
}

function fileToItem(file){
	const {name:filename,size} = file;
	const _filename = filename.split('.');
	const extension = _filename.pop().toLowerCase();
	const name = _filename.join('.');
	const [type,subType] = ((file.type && file.type.split('/')) || getMimeType(extension));
	const mime = `${type}/${subType}`
	const _id = makeId(type,name,pad(size),subType,extension);
	const _attachments = {
		file:{
			type:mime
		,	data:file
		}
	}
	return {
		_id
	,	name
	,	extension
	,	type
	,	filename
	,	size
	,	subType
	,	mime
	,	modified:(new Date()).toJSON()
	,	_attachments
	}
}

function appendNewItems(state,items){
	const newItems = new Map();
	items.forEach((map,name)=>{
		map = state.items.has(name) ? new Map([...state.items.get(name),...map]) : new Map([...map]);
		newItems.set(name,map);
	})
	return {items:new Map([...state.items,...newItems])}
}

function removeNewItems(state,items){
	const newItems = new Map();
	items.forEach((map,name)=>{
		const newMap = state[name] ? new Map([...state[name]]):null;
		if(newMap){
			map.forEach((item,key)=>{
				newMap.delete(key);
			})
			newItems.set(name,newMap);
		}
	})
	return {items:new Map([...state.items,...newItems])}
}

function makeId(...more){
	return more.map(str=>(str+'').toLowerCase().replace(/\s/g,'_')).join('_');
}

function getTypeFromId(id){
	return id.split('_');
}

const types = ['photographer','image','group'];

const [actionsCreators,reducers] = makeActionCreators({
	addTypes:{
		meta:{
			types:[]
		}
	,	async({types}){
			if(!types.length){return Promise.resolve({types:[]});}
			const typesDocs = types.map(name=>({name,_id:name}));
			return typesDb.bulkDocs(typesDocs).then(()=>{
				const map = new Map();
				typesDocs.forEach(doc=>map.set(doc.name,doc));
				return {types:map};
			})
		}
	,	reducer(state,meta,{types}){
			if(!types.length){return state;}
			types = new Map([...state.types,...types]);
			return assign(state,{types});
		}
	}
,	getTypes:{
		async(){
			return typesDb.allDocs({include_docs:true}).then((res)=>{
				const map = new Map();
				res.rows.forEach(({doc})=>map.set(doc.name,doc));
				return {types:map};
			})
		}
	,	reducer(state,meta,{types}){
			types = new Map([...state.types,...types]);
			console.log(types)
			return assign(state,{types});
		}
	}
,	clearMessages:{
		reducer(state){
			return assign(state,{messages:[]})
		}
	}
,	addFiles:{
		meta:{
			files:[]
		,	description:''
		,	type:['positive','negative']
		,	tone:['monochrome','colored']
		,	links:[]
		}
	,	async(meta,{disp}){
			const {files,links} = meta;
			delete meta.files;
			delete meta.groups;
			const {length} = files;
			if(!files){
				return Promise.reject(new Error('no files provided'));
			}
			const ids = [];
			const items = new Map();
			var i = 0;
			while(i<length){
				const file = fileToItem(files[i++]);
				const {_id} = file;
				const item = {
					id:_id
				,	status:STATUS_NONE
				,	doc:assign(meta,file)
				,	links
				}
				items.set(_id,item);
				ids.push(_id);
			}
			return upsert(
				ids
			,	false
			,	(id,row)=>{
					const item = items.get(id);
					const doc = item.doc;
					return doc;
				}
			,	(id,ok)=>items.get(id)
			)
		}
	,	reducer:{
			start(state,{files}){
				return state;
			}
		,	success(state,{files},{items}){
				return assign(state,appendNewItems(state,items));
			}
		}
	}
,	addGroup:{
		meta:{
			name:''
		,	type:types
		,	text:''
		,	children:[]
		}
	,	async({name,type,text,children,links}){
			const id = makeId(type,name);
			const mainId = id;
			const item = {
				id
			,	status:STATUS_NONE
			,	doc:{
					_id:id
				,	name
				,	type
				,	text
				,	links:links || []
				,	date:(new Date().toJSON())
				}
			}
			console.log('item',item)
			const items = new Map();
			items.set(id,item);
			children.forEach(id=>{
				var text = '';
				if(Array.isArray(id)){
					text = id[1];
					id = id[0];
				}
				const [type,name] = getTypeFromId(id)
				const item = {
					id
				,	status:STATUS_NONE
				,	doc:{
						_id:id
					,	name
					,	type
					,	text
					,	links:[mainId]
					,	date:(new Date()).toJSON()
					}
				}
				items.set(id,item);
			})
			const ids = [mainId,...children];
			return upsert(ids,false
			,	(id,row,error)=>{
					const item = items.get(id);
					const doc = item.doc;
					if(mainId == id){
						return doc;
					}
					if(error || !row.links || !row.links.length || row.links.indexOf(_id)>=0){
						return doc;
					}
					const links = [...row.links,mainId];
					return assign(doc,{links});
				}
			,	(id,ok)=>{
					const item = items.get(id)
					if(mainId != id){return item}
					return assign(item,{children});
				}
			)
		}
	,	reducer:{
			start(state,meta,payload){
				return state;
			}
		,	success(state,meta,{items}){
				return assign(state,appendNewItems(state,items));
			}
		,	error(state,meta,payload){
				console.log(meta,payload)
				return state;
			}
		}
	}
,	removeItems:{
		meta:{
			names:[]
		}
	,	async({names}){
			return upsert(names,false
			,	(id,row,error)=>{
					if(error){return false;}
					const [type] = getTypeFromId(id)
					const _deleted = true;
					return assign(row,{id,_id:id,_deleted,type})
				}
			).then(results=>{
				return results;
			})
		}
	,	reducer:{
			success(state,meta,{items}){
				return assign(state,removeNewItems(state,items));
			}
		}
	}
,	getItemsByType:{
		meta:{
			type:types.concat('all')
		,	attachments:false
		}
	,	async({type,attachments}){
			if(type == 'all'){type = null}
			const startkey = type ? type+'_':undefined;
			const endkey = type ? type+'_\uffff':undefined
			const include_docs = true;
			const options = (startkey ? {
					include_docs
				,	startkey
				,	endkey
				,	attachments
			} : {include_docs});
			return db.allDocs(options)
				.then(results=>{
					const map = new Map();
					results.rows.forEach(row=>{
						const {id,ok,doc} = row;
						const {type} = doc;
						const item = {
							id
						,	status:STATUS_LOADED
						,	doc
						}
						if(!map.has(type)){map.set(type,new Map());}
						map.get(type).set(id,assign(item,row,{doc}))
					});
					return {items:map};
				})
			;
		}
	,	reducer:{
			success(state,meta,{items}){
				return assign(state,appendNewItems(state,items));
			}
		}
	}
,	getItem:{
		meta:{
			name:''
		,	type:types
		,	id:''
		,	linked:false
		,	attachments:false
		}
	,	async({name,type,linked,attachments,columnId,id},{disp}){
			const _id = id || makeId(type,name);
			if(!_id){return Promise.reject(new Error('no id provided'))}
			return db.get(_id,{attachments}).then(doc=>{
				const item = {
					id:_id
				,	status:STATUS_LOADED
				,	doc:doc
				,	children:[]
				}
				const map = new Map(
					[[doc.type,new Map([[_id,item]])]]
				);
				disp('PROCESSING',{meta:{name,type,columnId}})
				if(!linked){
					return {items:map};
				}
				return db.query(
					(doc,emit)=>{
						if(doc.links){
							doc.links.forEach(link=>{
								emit(link)
							})
						}
					}
				,	{
						key:_id
					,	include_docs:true
					}
				).then(results=>{
					const children = [];
					results.rows.forEach(row=>{
						const {id,ok,doc} = row;
						const {type} = doc;
						const item = {
							id
						,	status:STATUS_LOADED
						,	doc
						}
						if(!map.has(type)){map.set(type,new Map());}
						map.get(type).set(id,assign(item,row,{doc}))
						children.push(id);
					});
					item.children = children;
					return {items:map};
				})
			})
		}
	,	reducer:{
			processing(state,{columnId}){
				console.log('process',columnId);
				if(typeof columnId == 'undefined'){return state;}
				const columns = state.columns.map((column,id)=>
					id == columnId ? assign(column,{status:STATUS_PROCESSING}) : column
				)
				return assign(state,{columns});
			}
		,	success(state,meta,{items}){
				return assign(state,appendNewItems(state,items));
			}
		}
	}
,	addColumn:{
		meta:{
			columnId:0
		,	id:''
		}
	,	async({columnId,id},{dispatch,getState,disp}){
			var newColumnId = getState().columns.length
			disp('PROCESSING',{meta:{fromColumnId:columnId,newColumnId}})
			return dispatch(actionsCreators.getColumn({columnId:newColumnId,id}));
		}
	,	reducers:{
			processing(state,{fromColumnId,newColumnId,id}){
				const [type,name] = getTypeFromId(id);
				const columnProps = {
					columnId:newColumnId
				,	type
				,	name
				,	id
				,	status:STATUS_NONE
				}
				const columns = state.columns.slice(0,fromColumnId+1).concat(columnProps);
			}
		}
	}
,	getColumn:{
		meta:{
			columnId:0
		,	id:''
		}
	,	async({columnId,id},{dispatch}){
			const [type,name] = getTypeFromId(id);
			return dispatch(
				actionsCreators.getItem({
					id
				,	columnId
				,	linked:true
				,	attachments:true
				})
			).then(({payload:{items}})=>{
				return {item:items.get(type).get(id)};
			})
		}
	,	reducer:{
			start(state,{columnId,type,name},payload){
				const id = makeId(type,name)
				const columns = state.columns.map((column,id)=>
					id == columnId ? assign(column,{status:STATUS_PROCESSING}) : column
				)
				return assign(state,{columns})
			}
		,	success(state,{columnId},{item}){
				const selected = false;
				const {doc} = item;
				const selectedRows = []
				const rows = item.children ? item.children.map(id=>{
					const [type] = getTypeFromId(id)
					return {type,id,selected}
				}) : [];
				const columnProps = {
					item:{type:doc.type,id:doc._id,selected}
				,	rows
				,	selected:true
				,	selectedRows
				,	status:STATUS_LOADED
				};
				const columns = state.columns.map((column,id)=>
					id==columnId ? assign(column,columnProps) :
					column.selected ? assign(column,{selected:false}) :
					column
				)
				return assign(state,{columns});
			}
		}
	}
,	removeColumn:{
		meta:{
			columnId:0
		}
	,	reducer(state,{columnId}){
			var index = columnId;
			const selectedIndex = columnId-1;
			if(index<=0){index=1;}
			if(index>state.columns.length){return state;}
			const {selected} = state.columns[columnId];
			const columns = selected ? state.columns.slice(0,index).map((column,id)=>
				id==selectedIndex ? assign(column,{selected:true}) : column
			):state.columns.slice(0,index);
			return assign(state,{columns});
		}
	}
,	removeLastColumn:{
		async(meta,{getState,dispatch}){
			const {columns} = getState();
			const columnId = columns.length-1;
			if(columnId<=0){return Promise.resolve(false);}
			dispatch(actionsCreators.removeColumn({columnId}))
			return Promise.resolve(true);
		}
	}
,	selectColumn:{
		meta:{
			columnId:0
		}
	,	reducer(state,{columnId}){
			const columns = state.columns.map((column,id)=>
				id==columnId && !column.selected ? assign(column,{selected:true}) :
				id!=columnId && column.selected ? assign(column,{selected:false}) :
				column
			)
			return assign(state,{columns});
		}
	}
,	dragOverColumn:{
		meta:{
			columnId:0
		}
	,	reducer(state,{columnId}){
			const columns = state.columns.map((column,id)=>
				id==columnId && !column.draggedOver ? assign(column,{draggedOver:true}) :
				id!=columnId && column.draggedOver ? assign(column,{draggedOver:false}) :
				column
			)
			return assign(state,{columns});
		}
	}
,	dragOutColumn:{
		meta:{
			columnId:0
		}
	,	reducer(state,{columnId}){
			const columns = state.columns.map((column,id)=>
				id==columnId && column.draggedOver ? assign(column,{draggedOver:false}) :
				column
			)
			return assign(state,{columns});
		}
	}
,	dragOverRow:{
		meta:{
			columnId:0
		,	rowIndex:0
		}
	}
,	dragOutRow:{
		meta:{
			columnId:0
		,	rowIndex:0
		}
	}
,	setActiveRow:{
		meta:{
			columnId:0
		,	activeRowIndex:0
		}
	,	reducer(state,{columnId,activeRowIndex}){
			const columns = state.columns.map((column,id)=>
				id==columnId ? assign(column,{activeRowIndex:activeRowIndex}) : column
			)
			return assign(state,{columns});
		}
	}
,	selectRow:{
		meta:{
			columnId:0
		,	rowIndex:0
		}
	}
,	deselectRow:{
		meta:{
			columnId:0
		,	rowIndex:0
		}
	}
,	sortColumnRows:{
		meta:{
			sortBy:['type','size','name','extension']
		,	sortOrder:['ascending','descending']
		}
	}
,	selectCurrentRow:{
		meta:{
			columnId:0
		}
	,	reducer(state,{columnId}){
			const columns = state.columns.map((column,id)=>
				id==columnId ? selectRow(column,column.activeRowIndex) : column
			)
			return assign(state,{columns});
		}
	}
,	deselectCurrentRow:{
		meta:{
			columnId:0
		}
	,	reducer(state,{columnId}){
			const columns = state.columns.map((column,id)=>
				id==columnId ? deselectRow(column,column.activeRowIndex) : column
			)
			return assign(state,{columns});
		}
	}
,	selectRowRange:{
		meta:{
			columnId:0
		,	start:0
		,	end:0
		}
	,	reducer(state,{columnId,start,end}){
			const columns = state.columns.map((column,id)=>
				id == columnId ? selectRow(column,column.rows.slice(start,end).map(({id})=>id)) : column
			)
			return assign(state,{columns})
		}
	}
,	deselectRowRange:{
		meta:{
			columnId:0
		,	start:0
		,	end:0
		}
	,	reducer(state,{columnId,start,end}){
			const columns = state.columns.map((column,id)=>
				id == columnId ? deselectRow(column,column.rows.slice(start,end).map(({id})=>id)) : column
			)
			return assign(state,{columns})
		}
	}
,	selectNextRow:{
		meta:{
			columnId:0
		}
	}
,	selectPreviousRow:{
		meta:{
			columnId:0
		}
	}
,	markItem:{
		meta:{
			id:''
		}
	,	reducer(state,{id}){
			var {selection} = state;
			console.log('a')
			const items = setItemInItems(state,id,(item=>{
				if(selection.selectedItems.indexOf(id)<0){
					const selection_items = [...selection.selectedItems,id];
					selection = calculateMarked(selection,selection_items,state.items,item);
				}
				return assign(item,{marked:true});
			}));
			console.log('b')
			return items ? assign(state,items,{selection}) : state;
		}
	}
,	unmarkItem:{
		meta:{
			id:''
		}
	,	reducer(state,{id}){
			var {selection} = state;
			const items = setItemInItems(state,id,(item=>{
				if(selection.selectedItems.indexOf(id)<0){
					const selection_items = selection.selectedItems.filter(sId=>sId!==id)
					selection = calculateMarked(selection,selection_items,state.items,item);
				}
				return assign(item,{marked:false});
			}));
			return items ? assign(state,items,{selection}) : state;
		}
	}
,	toggleItemMarking:{
		meta:{
			id:''
		}
	,	async({id},{dispatch,getState}){
			var [type] = getTypeFromId(id);
			var state = getState();
			var item = state.items.get(type) && state.items.get(type).get(id);
			if(!item){return Promise.reject(new Error(`item ${id} does not exist`));}
			const marked = item.marked;
			if(marked){
				return dispatch(actionsCreators.unmarkItem({id}));
			}
			return dispatch(actionsCreators.markItem({id}));

		}
	}
,	columnFilterOff:{
		meta:{
			columnId:0
		}
	,	reducer(state,{columnId}){
			const columns = state.columns.map((column,id)=>
				id==columnId ? assign(column,{showFilter:true}) : column
			)
		}
	}
,	columnFilterOn:{
		meta:{
			columnId:0
		}
	,	reducer(state,{columnId}){
			const columns = state.columns.map((column,id)=>
				id==columnId ? assign(column,{showFilter:false}) : column
			)
		}
	}
,	filterColumn:{
		meta:{
			columnId:0
		,	filter:''
		}
	,	reducer(state,{columnId,filter}){
			const columns = state.columns.map((column,id)=>
				id==columnId ? assign(column,{filter}) : column
			)
		}
	}
,	showOverlayItem:{
		meta:{
			index:0
		}
	,	reducer(state,{index}){
			const id = state.selection.selectedItems[index];
			if(typeof id == 'undefined'){return state;}
			const [type] = getTypeFromId(id);
			const item = state.items.get(type).get(id);
			const selection = assign(state.selection,{item,index});
			return assign(state,{selection});
		}
	}
,	showCurrentOverlayItem:{
		async(none,{dispatch,getState}){
			const index = state.selection.index;
			return dispatch(actionsCreators.showNextOverlayItem({index}));
		}
	}
,	showNextOverlayItem:{
		async(none,{dispatch,getState}){
			const currentId = state.selection.index;
			const index = currentId+1;
			const {length} = state.selection.selectedItems.length;
			if(index>=length){return Promise.reject(new Error(`index ${index} out of bounds`))}
			return dispatch(actionsCreators.showOverlayItem({index}));
		}
	}
,	showPreviousOverlayItem:{
		async(none,{dispatch,getState}){
			const currentId = state.selection.index;
			const index = currentId-1;
			if(index<0){return Promise.reject(new Error(`index ${index} out of bounds`))}
			return dispatch(actionsCreators.showOverlayItem({index}));
		}
	}
,	hideOverlay:{
		reducer(state){
			const mode = assign(state.mode,{showOverlay:false});
			return assign(state,{mode});
		}
	}
,	showOverlay:{
		reducer(state){
			const mode = assign(state.mode,{showOverlay:true});
			return assign(state,{mode});
		}
	}
});

export default {
	actionsCreators
,	reducers
}
