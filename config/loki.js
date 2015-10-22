import loki from 'lokijs';

const db = new loki('loki.json',{
	autosave:true
})

export default function setUpDb(cb){
	db.loadDatabase({},function(){
		cb(null,db);
	})
}