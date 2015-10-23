import {TYPE_DIRECTORY,TYPE_FILE,TYPE_GROUP} from '../constants'
import {addColumn} from './addColumn'
export const RUN_ITEM = 'RUN_ITEM';

export function runItem(path,columnId,type,handlerName,fromItemId){
	switch(type){
		case TYPE_DIRECTORY:
		case TYPE_FILE:
		case TYPE_GROUP:
			return addColumn(path,columnId,type,handlerName,fromItemId)
		default:
			return {
				type:'NO_OP'
			}
	}
}