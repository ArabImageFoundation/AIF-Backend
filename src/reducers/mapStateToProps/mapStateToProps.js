import mapItemOrColumnToFiles from './mapItemOrColumnToFiles';
import mapColumnItemsToFiles from './mapColumnItemsToFiles';
import collectMarkedOrSelectedItems from './collectMarkedOrSelectedItems';
import mapGroups from './mapGroups'

function mapColumnToPaths(column,files,indexes){
	return mapColumnItemsToFiles(mapItemOrColumnToFiles(column,files,indexes),files,indexes);
}



export function mapStateToProps({
	columns
,	api
,	info
,	groups
}){
	const {files,indexes} = api;
	const {groupsData,groupsIndexes} = groups;
	const _columns = columns.map(column=>mapColumnToPaths(column,files,indexes));
	const {marked,selected} = collectMarkedOrSelectedItems(_columns)
	return {
		columns:_columns
	,	info:{marked,selected}
	,	groups:mapGroups(groupsData,groupsIndexes,files,indexes)
	}
}