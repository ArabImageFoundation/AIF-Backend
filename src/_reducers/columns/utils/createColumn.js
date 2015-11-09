import {defaultColumn} from '../defaults/column';

var ids = 0;



export function createColumn(props){
	return Object.assign({},defaultColumn,props,{id:ids++});
}