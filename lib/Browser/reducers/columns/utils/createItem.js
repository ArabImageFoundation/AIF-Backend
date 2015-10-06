import {defaultItem} from '../defaults/item';

var ids = 0;

export function createItem(props){
	return Object.assign({},defaultItem,props);
}