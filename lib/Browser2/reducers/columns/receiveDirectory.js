import {createItem} from './utils/createItem'
import {STATUS_LOADED} from '../../constants/statuses';
import {TYPE_FILE,TYPE_DIRECTORY} from '../../constants/types';
import {objMap} from '../../utils';

function mapFilesToColumn(ownPath,action){
	return {
		status:STATUS_LOADED
	,	objectId:action.objectId
	,	items:objMap(action.response,(item,key,i)=>
			item.path == ownPath?
			false :
				(item.isDirectory) ? 
					createItem({type:TYPE_DIRECTORY,path:item.path,id:i-1,selected:(i==1)}) :
					createItem({type:TYPE_FILE,path:item.path,id:i-1,selected:(i==1)})
		).filter(Boolean)
	}
}

export function receiveDirectory(state,action){
	const {columnId,path} = action
	return state.map(column =>
		(column.path == path)?
			Object.assign({},column,mapFilesToColumn(path,action)) :
			column
	)
}