export default function getGroup(goupId,groups,indexes){
	const groupIndex = indexes[goupId];
	if(typeof groupIndex == 'undefined'){return false;}
	const group = groups[goupId];
	if(typeof group == 'undefined'){return false;}
	return group;
}