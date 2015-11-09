import {createColumn} from './columnsUtils'
import {STATUS_NONE,STATUS_LOADED,STATUS_ERROR,STATUS_LOADING} from '../../constants/statuses';
import {TYPE_UNKNOWN,TYPE_DIRECTORY,TYPE_FILE,TYPE_GROUP} from '../../constants/types';
import Indexed from 'indexed';
const {wrapArray} = Indexed;

export default {
	items:wrapArray([],['name','path'],createItem)
,	columns:wrapArray([],'path',createColumn).push({
		position:0
	,	type:'TYPE_DIRECTORY'
	,	path:'/'
	})
,	mode:{}
}
