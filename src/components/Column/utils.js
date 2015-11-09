import React from 'react';
import ColumnHeader from '../ColumnHeader';
import Item from '../Item';

export function renderHeader(headerHeight,onFilter,closeColumn,{id,filter,type,items,name}){
	const props = {
		height:headerHeight
	,	closeColumn:id!=0?closeColumn:null
	,	filter
	,	onChange:onFilter
	,	showFilter:(items && items.length)
	,	text:name+(filter?`/[${filter}]`:'')
	}
	return (<ColumnHeader {...props}/>);
}

export function makeItem(item,key,dispatch,columnId){
	const props = Object.assign(
		{}
	,	item
	,	{
			dispatch
		,	key
		,	columnId
		}
	);
	return <Item {...props}/>
}

export function renderItems(items,{dispatch,id}){
	return (items && items.map((item,key)=>makeItem(item,key,dispatch,id))) || false
}

export function getHeaderHeight(height){
	if(height<100){return 0;}
	if(height<200){return 20;}
	return 30;
}
