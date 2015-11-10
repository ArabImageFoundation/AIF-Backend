import createStore from '../../config/redux';
import rootReducer from './reducers/reducer';
import {isDev} from '../../config/global';

export function configureStore(initialState){
	const store = createStore(rootReducer,initialState);
	if(isDev){
		if (module.hot){
			module.hot.accept('./reducers/reducer', () => {
				const nextRootReducer = require('./reducers/reducer');
				store.replaceReducer(nextRootReducer);
			});
		}
	}

	return store;
}
