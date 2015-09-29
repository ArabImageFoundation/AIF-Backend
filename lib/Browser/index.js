import React, {Component} from 'react'
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import Browser from './components';

const store = configureStore(window.__INITIAL_STATE__);

export default class Root extends Component{
	render(){
		return (<Provider store={store}>
			<Browser />
		</Provider>);
	}
};