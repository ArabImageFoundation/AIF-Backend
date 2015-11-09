import {createItem} from './utils/createItem'
//import {mapFilesToColumn} from './receiveDirectory'
import {STATUS_LOADED} from '../../constants/statuses';
import {TYPE_GROUP,TYPE_FILE,TYPE_DIRECTORY} from '../../constants/types';
import {objMap} from '../../utils';

function mapGroupsToColumn(path,groups){
	const ret = []
	Object.keys(groups).forEach((key,i)=>{
		if(key==path){return}
		const item = groups[key];
		ret.push(createItem({type:TYPE_GROUP,path:item.name,id:i,selected:false}))
	});
	return ret;
}

function mapFilesToColumn(files){
	return files.map((item,i)=>{
		return (item.isDirectory) ? 
			createItem({type:TYPE_DIRECTORY,path:item.path,id:i,selected:(i==0)}) :
			createItem({type:TYPE_FILE,path:item,id:i,selected:false})
	});
}

function mapActionToColumn(path,action,column){
	const {groups} = action.response;
	const group = groups[path];
	const {files} = group;
	const items = column.items?
		column.items.concat(mapGroupsToColumn(path,groups)).concat(mapFilesToColumn(files)) :
		mapGroupsToColumn(path,groups).concat(mapFilesToColumn(files))
	;
	return items
}

export function receiveGroups(state,action){
	const {columnId,response,group} = action;
	return state.map(column =>
		(column.id == columnId)?
			Object.assign(
				{}
			,	column
			,	{status:STATUS_LOADED}
			,	{
					items:mapActionToColumn(group,action,column) 
				}
			) :
			column
	)
}
