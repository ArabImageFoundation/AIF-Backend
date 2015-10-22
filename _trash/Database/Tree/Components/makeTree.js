import Immutable from 'immutable';

function treeNode(arr){
	const label = arr[0];
	const rest = arr.slice(1);
	const children = (rest.length && rest.map(function(child){
		return treeNode(child)
	})) || [];
	return {label,children}
}

export default function makeTree(arr){
	const tree = treeNode([false].concat(arr));
	return Immutable.fromJS(tree)
}