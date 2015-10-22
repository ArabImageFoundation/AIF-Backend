import createStore from '../../config/redux';
import {rootReducer} from './rootReducer';

export function configureStore(initialState){
	const store = createStore(rootReducer,initialState);
	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./', () => {
			const nextRootReducer = require('./rootReducer');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}