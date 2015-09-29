import FileInfo from './FileInfo';
import TextView from './TextView';
import ImageView from './ImageView';
import ErrorMessage from '../dumb/ErrorMessage';

const order = [TextView,ImageView,FileInfo]
const orderLength = order.length;
const names = (function(n){
	order.forEach(function(Component){
		n[Component.actionName] = Component;
	});
	return n;
})({});
const defaultHandlerList = [FileInfo];

function has(arr,text){
	return (arr && arr.length && arr.indexOf(text) >= 0);
}

function test(Component,types,mime,info){
	return Component.test(types,mime,info,has)
}

function getHandlersList(props){
	const {info} = props;
	const {types,mime} = info;
	if(!props){return Object.assign({},defaultHandlerList);}
	return order.filter(function(Component){
		return (test(Component,types,mime,info))
	});
}

function findFirstHandler(props){
	if(!props){return FileInfo;}
	const {info} = props;
	const {types,mime} = info;
	for(let i=0;i<orderLength;i++){
		let Component = order[i];
		if(test(Component,types,mime,info)){return Component;}
	}
	return FileInfo;	
}

function getHintedHandler(props){
	const {handlerName} = props;
	if(handlerName){
		if(names[handlerName]){
			return names[handlerName]
		}
		return ErrorMessage;
	}
}

function getHandler(props){
	if(!props){return FileInfo;}
	return getHintedHandler(props) || findFirstHandler(props);
}

getHandler.findFirst = findFirstHandler;
getHandler.getList = getHandlersList;
getHandler.handlers = names;

export default getHandler;