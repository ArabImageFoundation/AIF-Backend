import React,{Component,PropTypes} from 'react';
import styles from './styles';

export default function MessageError({message}){
	return (<div className={styles.MessageError}>Error{message?': '+message:''}</div>)
}
