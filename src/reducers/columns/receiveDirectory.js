import {createItem} from './utils/createItem'
import {STATUS_LOADED} from '../../constants/statuses';
import {TYPE_FILE,TYPE_DIRECTORY} from '../../constants/types';
import {objMap} from '../../utils';

export function mapFilesToColumn(files){
	return files.map((item,i)=>{
		return (item.isDirectory) ? 
			createItem({type:TYPE_DIRECTORY,path:item.path,id:i,selected:(i==0)}) :
			createItem({type:TYPE_FILE,path:item.path,id:i,selected:(i==0)})
	});
}

export function receiveDirectory(state,action){
	const {columnId,path,response} = action;
	const {indexes,files} = response;
	const directory = files[indexes[path]];
	const directoryFiles = directory.files.map(index=>files[index]);
	return state.map(column =>
		(column.path == path)?
			Object.assign(
				{}
			,	column
			,	{
					status:STATUS_LOADED
				,	objectId:action.objectId
				}
			,	{
					items:column.items ? column.items.concat(mapFilesToColumn(directoryFiles)) : mapFilesToColumn(directoryFiles)
				}
			) :
			column
	)
}