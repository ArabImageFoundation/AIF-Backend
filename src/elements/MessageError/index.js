import React,{Component,PropTypes} from 'react';
import styles from './styles';

module.exports = function MessageError({message}){
	return (<div className={styles.MessageError}>Error{message?': '+message:''}</div>)
}
