export default function classNames(styles,def,props){
	var classes = [styles[def]];
	for(var n in props){
		if(props[n] && styles[n]){classes.push(styles[n])}
	}
	return classes.filter(Boolean).join(' ');
}