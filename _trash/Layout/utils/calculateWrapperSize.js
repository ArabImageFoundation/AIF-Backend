import {Children} from 'react';
import eachNodeChild from './eachNodeChild';

function eachRef(refs,count,fn){
	var i = 0;
	var max = count-1
	while(i++<max){
		var component = refs[i];
		fn(component,i);
	}
}

function calculateRowSize(node,state,props,refs){
	const oldWidth = state.width;
	const count = Children.count(props.children);
	var width = 0;
	eachRef(refs,count,child=>{
		width+=child.getWidth();
	});
	if(width!=oldWidth){return {width};}
	return false;
}

function calculateColumnSize(node,state,props,refs){
	const oldHeight = state.height;
	const count = Children.count(props.children);
	var height = 0;
	eachRef(refs,count,child=>{
		height+=child.getHeight();
	});
	if(height!=oldHeight){return {height};}
	return false;
}

export default function calculateWrapperSize(node,state,props,refs){
	const {direction} = props;
	if(direction=='row'){
		return calculateRowSize(node,state,props,refs);
	}else if(direction=='column'){
		return calculateColumnSize(node,state,props,refs);
	}
	return false;
}