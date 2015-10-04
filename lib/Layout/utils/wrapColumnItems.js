import React,{Component,PropTypes,Children} from 'react'
import LayoutColumnItem from '../LayoutColumnItem'

export default function wrapColumnItems(children,props,reverse){
	const count = Children.count(children);
	return Children.map(children,(child,i)=><LayoutColumnItem ref={i} key={i}>{child}</LayoutColumnItem>)
}