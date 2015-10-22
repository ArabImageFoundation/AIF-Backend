export default function errToJson(err){
	return {
		error:true
	,	type:'error'
	,	message:err.message
	}
}