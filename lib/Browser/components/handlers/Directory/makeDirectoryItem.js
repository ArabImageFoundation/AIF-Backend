import makeItem from './makeItem';
import {TYPE_DIRECTORY} from '../../../constants';

export default function directory(item,key,props){
	return makeItem(item,key,props,TYPE_DIRECTORY);
}
