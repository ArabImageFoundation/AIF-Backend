export default function eachNodeChild(node,fn){
	if(!node){return;}
	const {children} = node;
	if(!children){return;}
	const {length} = children;
	if(!length){return;}
	var i = 0;
	for(i;i<length;i++){
		let child = children[i];
		fn(child,i,children);
	}
}