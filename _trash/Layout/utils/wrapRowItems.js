import React,{Component,PropTypes,Children} from 'react'
import LayoutRowItem from '../LayoutRowItem'

export default function wrapRowItems(children,props,reverse){
	const count = Children.count(children);
	const style = {
		float:reverse?'right':'left'
	,	display:'inline'
	}
	return Children.map(children,(child,i)=><LayoutRowItem key={i} ref={i}>{child}</LayoutRowItem>)
}