const returnChanges = {returnChanges:true}
export default function createGroup({r,conn},props,cb){
	const group = {
		name:props.name
	,	groups:props.groups||[]
	}
	r.table('groups').insert(group,returnChanges).run(conn)
		.then(res=>cb(null,{
			status:'ok'
		,	value:res.changes[0].new_val
		}))
		.error(err=>cb(err))
}