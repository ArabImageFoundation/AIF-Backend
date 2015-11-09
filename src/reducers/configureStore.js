import createStore from '../../config/redux';
import rootReducer from './reducers';
import {isDev} from '../../config/global';

export function configureStore(initialState){
	const store = createStore(rootReducer,initialState);
	if(isDev){
		if (module.hot){
			module.hot.accept('./reducers', () => {
				const nextRootReducer = require('./reducers');
				store.replaceReducer(nextRootReducer);
			});
		}
	}

	return store;
}
