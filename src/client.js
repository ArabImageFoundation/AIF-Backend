//import Browser from '../lib/Browser';
import domReady from 'domready';
import React from 'react';
import ReactDOM from 'react-dom';
import Browser from './Root';

domReady(function ready(){
	let node = document.getElementById('Wrapper');
	ReactDOM.render(<Browser debug={false}/>,node);
});

