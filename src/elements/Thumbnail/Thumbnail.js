import React,{Component} from 'react'
import {showImage} from '../../actions';
import styles from './styles';

function handleShowImage(dispatch,index){
	return function(evt){
		evt.preventDefault();
		dispatch(showImage(index))
	}
}

export default function Thumbnail({image,dispatch}){
	return (<a
		href="#"
		style={{backgroundImage:`url('${image.path}')`}}
		className={styles.Thumbnail}
		onClick={handleShowImage(dispatch,index)}
	/>)
}
