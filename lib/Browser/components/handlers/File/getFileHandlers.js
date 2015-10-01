import types from './types';
import objToArray from '../../../utils/objToArray';

const fileHandlers = objToArray(types);

export default function getFileHandlers(props){
	const handlers = fileHandlers.filter(handler=>handler.test(props))
	console.log(handlers);
	return handlers;
}