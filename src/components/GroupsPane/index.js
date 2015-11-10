import React,{Component,PropTypes} from 'react';
import GroupItem from '../GroupItem';
import {addFilesToGroup} from '../../actions';
import FieldSubmit from '../../elements/FieldSubmit';

function renderGroups(dispatch, groups){
	return (groups && groups.length ? groups.map((group,key)=><GroupItem  {...{group,dispatch,key}}/>):false);
}

function addGroupHandler(files,dispatch){
	return function onAddGroup(group){
		const {files,dispatch} = this.props;
		dispatch(addFilesToGroup(group,files));
	}
}

function renderInputForm(files,dispatch){
	return (<div>Add:
		<FieldSubmit onSubmit={addGroupHandler(files,dispatch)}/>
	</div>)
}

module.exports = function GroupsPane({groups,dispatch,files}){
	return (<div>
		<div><hr/>Groups</div>
		<div style={{float:'left',clear:'both',width:'100%'}}>{renderGroups(dispatch,groups)}</div>
		{renderInputForm(files,dispatch)}
	</div>);
}
