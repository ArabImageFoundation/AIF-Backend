export function filesAddedToGroup(state,action){
	if(!action.files.length){return state;}
	const {indexes} = state;
	const {group} = action;
	const files = state.files.slice();

	action.files.forEach(({path})=>{
		const index = indexes[path];
		if(files[index] && files[index].groups.indexOf(group)<0){
			files[index].groups = [...files[index].groups,group];
		}
	});
	return {files,indexes};
}