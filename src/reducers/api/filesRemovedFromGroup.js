export function filesRemovedFromGroup(state,action){
	if(!action.files.length){return state;}
	const {indexes} = state;
	const {group} = action;
	const files = state.files.slice();

	action.files.forEach(({path})=>{
		const index = indexes[path];
		if(files[index] && files[index].groups.indexOf(group)>=0){
			const groupIndex = files[index].groups.indexOf(group);
			if(groupIndex>=0){
				const groups = files[index].groups.slice();
				groups.splice(groupIndex,1);
				files[index].groups = groups;
			}
		}
	});
	return {files,indexes};
}