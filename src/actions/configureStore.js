import createStore from '../../config/redux';
import actions from './actions';
import {isDev} from '../../config/global';

const {reducers} = actions;

export default function configureStore(initialState){
	const store = createStore(reducers,initialState);
	if(isDev){
		if (module.hot){
			module.hot.accept('./actions', () => {
				const action = require('./actions');
				const {reducers} = action;
				store.replaceReducer(reducers);
			});
		}
	}

	return store;
}
