import createStore from '../../config/redux';
import rootReducer from './reducers';

export default function configureStore(initialState){
	return createStore(rootReducer,initialState);
}