import createStore from '../../config/redux';
import rootReducer from './rootReducer';
import {isDev} from '../../config/global';

export function configureStore(initialState){
	const store = createStore(rootReducer,initialState);
	if(isDev){
		if (module.hot){
			module.hot.accept('./rootReducer', () => {
				const nextRootReducer = require('./rootReducer');
				store.replaceReducer(nextRootReducer);
			});
		}
	}

	return store;
}