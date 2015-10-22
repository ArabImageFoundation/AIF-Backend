export function getFile({r,conn},file,cb){
	r.table('files')
		.getAll(file,{index:'path'})
		.limit(1)
		.merge(file=>true && {
			groups:r.table('groups')
				.getAll(r.args(file('groups')))
				.coerceTo('array')
		})
		.run(conn)
		.then(res=>res.toArray())
		.then(res=>cb(null,res))
		.error(cb).catch(cb)
	;
}