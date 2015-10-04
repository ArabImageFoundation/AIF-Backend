import {requestDirectory} from './requestDirectory';
import {receiveDirectory} from './receiveDirectory';
import {errorFetching} from '../errorFetching';
import {httpStatus,httpJSON} from '../utils';

export function fetchDirectory(directory = '/',columnId=0){
	return (dispatch) => {
		directory = directory || '/';
		const url = `/browse/list?src=${directory}&recursion=1`;
		dispatch(requestDirectory(directory,columnId));
		return fetch(url)
			.then(httpStatus)
			.then(httpJSON)
			.then(json =>{
				dispatch(receiveDirectory(directory,json.files,columnId))
			})
			.catch(err=>{
				throw err;
				dispatch(errorFetching(directory,err,columnId))
			})
	}
}