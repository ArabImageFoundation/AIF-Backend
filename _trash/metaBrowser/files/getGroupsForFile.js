export default function getGroupsForFile(fs,rootAPI,props,cb){
	rootAPI({
		type:'group'
	,	action:'get'
	,	file:props.src
	},(err,groups)=>err?cb(err):cb(null,groups))
}