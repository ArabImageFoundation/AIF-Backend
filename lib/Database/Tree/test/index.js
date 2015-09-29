//import Browser from '../lib/Browser';
import domReady from 'domready';
import React from 'react';
import Tree,{makeTree} from '../Components';


const tree = makeTree([
	['a note A']
,	['another note B']
,	['a note C with...',
		['...a nested note, C1']
	,	['...and another nested note, C2',['...and a nested nested note, C3']]
	]
,	['easy!']
]);

domReady(function ready(){
	let node = document.getElementById('Wrapper');
	React.render(<Tree tree={tree}/>,node);
});

