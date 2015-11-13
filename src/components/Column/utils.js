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

export function renderItems(rows,selectedRows,activeRowIndex,items,{dispatch,columnId}){
	return rows && rows.map((row,rowId)=>{
		const selected = selectedRows.indexOf[rowId]>=0;
		const active = activeRowIndex == rowId;
		const {type,id} = row;
		const item = items.has(type) && items.get(type).get(row.id);
		if(!item){return null;}
		const props = Object.assign({},item,{dispatch,rowId,columnId,selected,active,key:id})
		return (<Item {...props}/>)
	})
}

export function getHeaderHeight(height){
	if(height<100){return 0;}
	if(height<200){return 20;}
	return 30;
}
