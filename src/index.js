//import Browser from '../lib/Browser';
import domReady from 'domready';
import React from 'react';
import ReactDOM from 'react-dom';
import Browser from '../lib/Browser';

domReady(function ready(){
	let node = document.getElementById('Wrapper');
	ReactDOM.render(<Browser/>,node);
});

