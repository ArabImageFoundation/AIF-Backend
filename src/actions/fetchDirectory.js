import {requestDirectory} from './requestDirectory';
import {receiveDirectory} from './receiveDirectory';
import {errorFetching} from './errorFetching';
import {httpStatus,httpJSON} from './utils';

export function fetchDirectory(directory = '/',columnId=0){
	return (dispatch) => {
		directory = directory ? directory.replace(/^\/|\/$/g,''): '';
		if(directory){directory='/'+directory;}
		const url = `/browse/getMetaRecursive${directory}?depth=1`;
		dispatch(requestDirectory(directory,columnId));
		return fetch(url)
			.then(httpStatus)
			.then(httpJSON)
			.then(json =>{
				(json.error)?
					dispatch(errorFetching(directory,json.error,columnId)) :
					dispatch(receiveDirectory(directory,json.result,columnId))
			})
			.catch(err=>{
				throw err;
				dispatch(errorFetching(directory,err,columnId))
			})
	}
}