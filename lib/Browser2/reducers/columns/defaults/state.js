import {createColumn} from '../utils/createColumn';
import {TYPE_DIRECTORY} from '../../../constants/statuses';

const defaultColumnProps = {
	position:0
,	path:'/'
,	type:TYPE_DIRECTORY
,	selected:true
}

export const defaultState = [
	createColumn(defaultColumnProps)
];