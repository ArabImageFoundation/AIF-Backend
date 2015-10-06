import createStore from '../../../config/redux';
import {rootReducer} from './rootReducer';

export function configureStore(initialState){
	return createStore(rootReducer,initialState);
}