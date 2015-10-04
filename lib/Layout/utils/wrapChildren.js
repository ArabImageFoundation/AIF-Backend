import wrapRowItems from './wrapRowItems';
import wrapColumnItems from './wrapColumnItems';

export default function wrapChildren(props){
	const {direction,children} = props;
	if(!children){return false;}
	if(direction=='row'){
		return wrapRowItems(children,props)
	}
	else if(direction=='column'){
		return wrapColumnItems(children,props)
	}
	return children;
}