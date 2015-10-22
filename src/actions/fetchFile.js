import {requestFile} from './requestFile';
import {receiveFile} from './receiveFile';
import {errorFetching} from './errorFetching';
import {httpStatus,httpJSON} from '../utils';

export function fetchFile(file,columnId=0){
	return (dispatch) => {
		const url = `/browse/getMeta${file}`;
		dispatch(requestFile(file,columnId));
		return fetch(url)
			.then(httpStatus)
			.then(httpJSON)
			.then(json =>dispatch(receiveFile(file,json.result,columnId)))
			.catch(err=>dispatch(errorFetching(file,err,columnId)))
	}
}