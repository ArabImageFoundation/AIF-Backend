import empty from './empty';

/**
 * Creates or updates a group and attached files and sub-groups
 * @param  {Object}          rethink    object with {r,conn}
 * @param  {Object|String}   mainGroup  either a group name, or an object {id,name}
 * @param  {Array}           files      an array of files paths or an array of {id,path}
 * @param  {Array}           groups     an array of groups names or an array of {id,name}
 * @param  {Function}        callback   a nodeback with signature (err,results)
 *
 * This function creates or updates a group on the fly
 * Examples:
 * 
 * createGroup({r,conn},'groupA',['path/to/file'],['subGroupA','subGroupB'])
 * will: 
 *      - create the groups "groupA", "subGroupA", "subGroupB"
 *      - create the file "path/to/files"
 *      - establish relations between the files, groups, and the main group
 *
 * 
 * createGroup({r,conn},{id:1,name:'groupA'},['path/to/file'],['subGroupA',{id:3}])
 * will: 
 *      - create the group "subGroupA" (assuming the other two exist)
 *      - create the file "path/to/files"
 *      - establish relations between the files, groups, and the main group 
 */
export default function upsert({r,conn},mainGroup,files,groups,cb){

	if(typeof mainGroup == 'string'){mainGroup = {name:mainGroup};}

	groups = (!empty(groups) && groups.map(group=>(typeof group == 'string'?{name:group}:group)).filter(Boolean)) || false;
	files = (!empty(files) && files.map(file=>(typeof file === 'string'?{path:file}:file)).filter(Boolean)) || false;

	const groupsIds = (groups && groups.map(group=>(id in group)?group.id:false).filter(Boolean)) || [];
	const filesIds = (files && files.map(file=>(id in file)?file.id:false).filter(Boolean)) || [];

	const options = {returnChanges:true,conflict:'replace'};

	function insertGroups(mainGroup_id){
		return r.branch(
			groups
		,	r.table('group_groups').insert(
				r.args(
					r.table('groups')
					.insert(r.args(groups),options)('generated_keys')
					.add(groupsIds)
					.map(id=>true && {parent_id:mainGroup_id,child_id:id})
				)
			)
		,	0
		)
	}

	function insertFiles(mainGroup_id){
		return r.branch(
			groups
		,	r.table('group_files').insert(
				r.args(
					r.table('files')
					.insert(r.args(files),options)('generated_keys')
					.add(filesIds)
					.map(id=>true && {group_id:mainGroup_id,file_id:id})
				)
			)
		,	0
		)
	}

	function insertRelated(doc){
		return r
			.do(doc('id'),insertGroups)
			//.do(doc('id'),insertFiles)
	}

	r.table('groups')
		.insert(mainGroup,options)
		.do(insertRelated)
		.run(conn)
		.then(res=>cb(null,res))
		.error(cb)
		.catch(cb)
}