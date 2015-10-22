export default function getGroup({r,conn},name,cb){
	r.table('groups')
		.getAll(name,{index:'name'})
		.limit(1)
		.merge(group=>true && {
			groups:r.table('groups')
				.getAll(r.args(group('groups')))
		,	files:r.table('files')
				.filter(file=>file('groups').contains(group('id')))
		})
		.run(conn)
		.then(res=>res.toArray())
		.then(res=>cb(null,res))
		.error(cb).catch(cb)
	;
}