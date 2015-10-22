import Promise from 'bluebird';
import r from 'rethinkdb';

const config = {
	host:'localhost'
,	port:28015
,	db:'test'
}

export default Promise.promisify(function connect(cb){
	r.connect({host: 'localhost', port:28015},(err,conn)=>{
		if(err){return cb(err);}
		return cb(null,{
			conn:conn
		,	r
		});
	});
})