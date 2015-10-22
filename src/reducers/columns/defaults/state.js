import {createColumn} from '../utils/createColumn';
import {createItem} from '../utils/createItem';
import {TYPE_FIRST} from '../../../constants/types';
import {TYPE_DIRECTORY} from '../../../constants/types';

const defaultColumnProps = {
	position:0
,	path:'Root'
,	type:TYPE_FIRST
,	selected:true
}

export const defaultState = [
	Object.assign({},createColumn(defaultColumnProps),{
		items:[
			createItem({
				path:''
			,	name:'files'
			,	type:TYPE_DIRECTORY
			})
		]
	})
];