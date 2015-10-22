import {TYPE_DIRECTORY} from '../constants'
import {addColumn} from './addColumn'
export const RUN_ITEM = 'RUN_ITEM';

export function runItem(path,columnId,type,handlerName,fromItemId){
	switch(type){
		case TYPE_DIRECTORY:
			return addColumn(path,columnId,type,handlerName,fromItemId)
		default:
			return {
				type:'NO_OP'
			}
	}
}