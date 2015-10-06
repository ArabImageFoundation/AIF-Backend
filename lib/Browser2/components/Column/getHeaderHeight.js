export default function getHeaderHeight(height){
	if(height<100){return 0;}
	if(height<200){return 20;}
	return 30;
}