export default function getGroupsByNames({r,conn},{names},cb){
	r.table('groups')
		.getAll(names,{index:'name'})
		.merge(group=>true && {
			groups:r.table('groups')
				.getAll(r.args(group('groups')))
				.coerceTo('array')
		,	files:r.table('files')
				.filter((file)=>file('groups').contains(id))
		})
		.run(conn)
		.then(res=>cb(null,res))
		.error(err=>cb(err))
	;
}