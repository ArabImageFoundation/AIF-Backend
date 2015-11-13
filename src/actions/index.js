import mapStateToProps from './mapStateToProps';
import configureStore from './configureStore';

import actionsReducers from './actions';
const {actionsCreators,reducers} = actionsReducers;

const actions = {
	mapStateToProps
,	configureStore
,	reducers
}

Object.keys(actionsCreators).forEach(name=>{
	actions[name] = actionsCreators[name]
})

export default actions;
