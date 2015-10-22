import React from 'react';
import Item from '../Item';

export default function makeItem(item,key,thisProps){
	const {
		dispatch
	,	id
	} = thisProps
	const itemProps = Object.assign({},item,{
		dispatch
	,	key
	,	columnId:id
	});
	return <Item {...itemProps}/>
}