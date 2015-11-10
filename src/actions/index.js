import {makeActionCreators,get} from './utils'
import {STATUS_NONE,STATUS_LOADED,STATUS_ERROR,STATUS_LOADING} from '../constants/statuses';
import {TYPE_UNKNOWN,TYPE_DIRECTORY,TYPE_FILE,TYPE_GROUP} from '../constants/types';
import Promise from 'bluebird';

function getLoadedFile({data:{items}},path){
	const item = items.get('path',path||'/');
	const shouldLoad = (!item || item.status===STATUS_NONE || item.status===STATUS_ERROR)
	return (shouldLoad ? false : item);
}

function fetchFilesArray(dispatch,arr){
	function fetch(path){
		return dispatch(actions.fetchFile({path}));
	}
	return Promise.each(arr,fetch)
}

function itemsToPaths(items){
	return items.map(item=>
		(typeof item === 'string')?item:
		item.file && item.file.path?item.file.path:
		item.path ? item.path :
		false
	).filter(Boolean)
}

const actions = makeActionCreators({

	fetchDirectory:{
		path:'/'
	,	async: function fetchDirectory({path},dispatch,getState,disp){
			path = path ? path.replace(/^\/|\/$/g,''): '';
			path='/'+path;
			const fileLoaded = getLoadedFile(getState(),path);
			if(fileLoaded){return Promise.resolve(fileLoaded);}
			const url = `/browse/getMeta${path=='/'?'':path}?depth=0&lstat=0`;
			const url2 = `/browse/readdir${path=='/'?'':path}`;
			var file;
			return get(url).then(result=>{
				file = result;
				if(!file.path){
					file.path='/'+file.path
				}
				return get(url2);
			}).then(result=>{
				const files = result.map(file=>`${path=='/'?'':path}/${file}`);
				disp('PROCESSING',{payload:{file,files},meta:{path}})
				return fetchFilesArray(dispatch,files).then(()=>{
					return {file};
				})
			})
		}
	}
,	fetchFile:{
		path:'/'
	,	async: function fetchFile({path},dispatch,getState){
			const fileLoaded = getLoadedFile(getState(),path);
			if(fileLoaded){return Promise.resolve(fileLoaded);}
			const url = `/browse/getMeta${path}`;
			return get(url).then(file=>{
				if(!file.dirname){file.dirname = '/'}
				return {file};
			})
		}
	}
,	fetchGroup:{
		name:''
	,	async: function fetchGroup({name},dispatch,getState,disp){
			const url = `/browse/selection/get/group?items[]=${name}`;
			return get(url)
				.then(result=>{
					const group = result.groups[name];
					if(!group.files || !group.files.length){
						return {group};
					}
					disp('PROCESSING',{payload:{group},meta:{name}})
					const promises = group.files.map(path=>dispatch(actions.fetchFile({path})))
					return Promise.all(promises).then(()=>{
						return {group};
					})
				})
		}
	}
,	fetchRootGroups:{
		async: function fetchRootGroups(nothing,dispatch){
				return dispatch(actions.fetchGroup({name:'root'}))
			}
	}
,	addFilesToGroup:{
		group:''
	,	files:[]
	,	async: function addFilesToGroup({group,files}){
			const url = `/browse/selection/add/${group}?files[]=`+files.join('&files[]=');
			return get(url);
		}
	}
,	removeFilesFromGroup:{
		group:''
	,	files:[]
	,	async: function removeFilesFromGroup(group,files){
			const url = `/browse/selection/remove/${group}?files[]=`+files.join('&files[]=');
			return get(url);
		}
	}
,	addGroupToGroup:{
		group:''
	,	async: function addGroupToGroup({group,child}){
			const url = `/browse/selection/${group}?group[]=${child}`;
			return get(url);
		}
	}
,	addGroupToRoot:{
		group:''
	,	async: function addGroupToRoot({group}){
			return dispatch(actions.addGroupToGroup({group:'root',group}));
		}
	}
,	addColumn:{
		path:'/'
	,	columnId:0
	,	columnType:[TYPE_DIRECTORY,TYPE_FILE,TYPE_GROUP]
	,	itemId:0
	,	async: function addColumn({path,columnId,columnType,itemId},dispatch){
			switch(columnType){
				case TYPE_DIRECTORY:
					return dispatch(actions.fetchDirectory({path}))
				case TYPE_FILE:
					return dispatch(actions.fetchFile({path}))
				case TYPE_GROUP:
					return dispatch(actions.fetchGroup({name:path}))
				default:
					return Promise.reject(new Error(`column type \`${columnType}\` is not a recognized type`))
			}
		}
	}
,	runItem:{
		path:'/'
	,	columnId:0
	,	columnType:[TYPE_DIRECTORY,TYPE_FILE,TYPE_GROUP]
	,	itemId:0
	,	async: function runItem({path,columnId,columnType,itemId},dispatch){
			switch(columnType){
				case TYPE_DIRECTORY:
				case TYPE_FILE:
				case TYPE_GROUP:
					return dispatch(actions.addColumn({path,columnId,columnType,itemId}))
				default:
					return Promise.reject(new Error(`column type \`${columnType}\` is not a recognized type`))
			}
		}
	}
,	invalidateDirectory:{
		columnId:0
	,	path:'/'
	}
,	invalidateFile:{
		columnId:0
	,	path:'/'
	}
,	invalidateGroup:{
		columnId:0
	,	group:''
	}
,	removeColumn:{
		columnId:0
	}
,	removeLastColumn:{}
,	selectColumn:{
		columnId:0
	}
,	selectItem:{
		itemId:0
	,	columnId:0
	}
,	sortColumnItems:{
		by:['type','size','name','extension']
	}
,	selectCurrentItem:{
		async:function selectCurrentItem(_,dispatch,getState,disp){
			const {data:{columns}} = getState();
			const column = columns.find(col=>col.selected);
			if(!column){return}
			const {selectedItemIndex,selectedItemType} = column;
			const arr = column[selectedItemType];
		}
	}
,	selectNextItem:{}
,	selectPreviousItem:{}
,	markItem:{
		itemId:0
	}
,	unmarkItem:{
		itemId:0
	}
,	toggleItemMarking:{
		itemId:0
	}
,	columnFilterOff:{
		columnId:0
	}
,	columnFilterOn:{
		columnId:0
	}
,	filterColumn:{
		columnId:0
	,	filter:''
	}
,	showOverlayItem:{
		itemId:0
	}
,	hideOverlay:{}
,	showOverlay:{}
});

export default actions;
