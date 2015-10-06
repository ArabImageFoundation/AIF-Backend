import {createColumn} from '../utils/createColumn';
import {TYPE_FIRST} from '../../../constants/types';

const defaultColumnProps = {
	position:0
,	path:'Root'
,	type:TYPE_FIRST
,	selected:true
}

export const defaultState = [
	createColumn(defaultColumnProps)
];