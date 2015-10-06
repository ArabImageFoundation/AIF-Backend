export const CREATE_GROUP = 'CREATE_GROUP';

export function createGroup(name,files,groups){
	return {
		type: CREATE_GROUP
	,	name
	,	files
	,	groups
	};
}