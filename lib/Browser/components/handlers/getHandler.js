import Handlers,{ColumnError} from './index';
import objForEach from '../../utils/objForEach';

const handlers = {};
objForEach(Handlers,function(Handler){
	const type = Handler.type;
	handlers[type] = Handler;
});


export default function getHandler(handlerName){
	return (handlers[handlerName] || ColumnError);
}