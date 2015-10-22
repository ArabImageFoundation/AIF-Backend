export default function addFilesToGroup({r,conn},props,cb){
	r.table('files')
		.getAll(file,{index:'path'})
		.limit(1)
		.merge(file=>true && {
			groups:r.table('groups')
				.getAll(r.args(file('groups')))
				.coerceTo('array')
		})
		.run(conn)
		.then(res=>cb(null,res))
		.error(err=>cb(err))
	;
}