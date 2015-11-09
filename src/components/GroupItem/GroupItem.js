import React,{Component,PropTypes} from 'react';
import {removeFilesFromGroup,addGroupToRoot} from '../../actions';
import styles from './styles';

function handleAddGroupToRoot(dispatch,group){
	return function onAddGroupToRoot(evt){
		evt.preventDefault();
		dispatch(addGroupToRoot(group));
	}
}

function handleRemoveGroup(dispatch,group,files){
	return function RemoveGroup(evt){
		evt.preventDefault();
		dispatch(removeFilesFromGroup(group,files));
	}
}

export default class GroupItem extends Component{
	render(){
		const {
			group
		,	files
		,	dispatch
		} = this.props;
		return (<div className={styles.GroupItem}>
			<span>{group}</span>
			<a href="#" onClick={handleRemoveGroup(dispatch,group,files)}>-</a>
			<a href="#" onClick={handleAddGroupToRoot(dispatch,group)}>+</a>
		</div>);
	}
}
