import {compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { devTools, persistState } from 'redux-devtools'

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = compose(
	applyMiddleware(
		thunkMiddleware
	//,	loggerMiddleware
	)
,	devTools()
//,	persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);


export default createStoreWithMiddleware;