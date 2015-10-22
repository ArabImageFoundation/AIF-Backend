import {requestFile} from './requestFile';
import {receiveFile} from './receiveFile';
import {errorFetching} from './errorFetching';
import {httpStatus,httpText} from '../utils';

function fetchFileContents(file,columnId=0){
	return (dispatch) => {
		const url = file;
		dispatch(requestFileContents(file,columnId));
		return fetch(url)
			.then(httpStatus)
			.then(httpText)
			.then(contents =>dispatch(receiveFileContents(file,contents,columnId)))
			.catch(err=>dispatch(errorFetching(file,err,columnId)))
	}
}