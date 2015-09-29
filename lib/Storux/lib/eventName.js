export default function eventName(name,event){
	return ((name ? name + '_' : '')+event);
}