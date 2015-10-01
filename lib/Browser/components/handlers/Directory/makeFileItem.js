import makeItem from './makeItem';
import {TYPE_FILE} from '../../../constants';

export default function file(item,key,props){
	return makeItem(item,key,props,TYPE_FILE);
}