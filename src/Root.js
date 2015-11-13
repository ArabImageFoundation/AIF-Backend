import React, {Component} from 'react'
import {Provider} from 'react-redux';
import configureStore from './actions/configureStore';
import Browser from './components';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import {isDev} from '../config/global';

const store = configureStore(window.__INITIAL_STATE__);

class Root extends Component{
	render(){
		return (<div style={{width:'100%',height:'100%'}}>
			<Provider store={store}>
				<Browser />
			</Provider>
			{isDev ? <DebugPanel top right bottom>
				<DevTools store={store} monitor={LogMonitor}/>
			</DebugPanel> : false}
		</div>);
	}
};

export default Root;
