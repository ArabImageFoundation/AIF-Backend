import getFile from './getFile';
import getGroup from './getGroup';

export default function mapGroups(mainGroups,groupsIndexes,files,indexes){
	return mainGroups.map(({files,groups,id,name})=>{
		return {
			name
		,	id
		,	files:(files && files.length && files.map(filename=>getFile(filename,files,indexes))) || false
		,	groups:(groups && groups.length && groups.map(groupId=>getGroup(groupId,mainGroups,groupsIndexes))) || false
		}
	})
}