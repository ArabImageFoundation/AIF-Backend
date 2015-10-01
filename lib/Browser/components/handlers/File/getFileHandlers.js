import types from './types';
import objToArray from '../../../utils/objToArray';

const fileHandlers = objToArray(types);

export default function getFileHandlers(props){
	return fileHandlers.filter(handler=>handler.test(props))
}