import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
//import createLogger from 'redux-logger';

//const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware
//,	loggerMiddleware
)(createStore);


export default createStoreWithMiddleware;