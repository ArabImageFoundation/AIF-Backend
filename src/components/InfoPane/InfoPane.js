import React,{Component,PropTypes} from 'react';
import {objMap} from '../../utils';
import {LayoutInfoPane} from '../Layout';
import {addFilesToGroup,removeFilesFromGroup,showImage,addGroupToRoot} from '../../actions';

export default class InfoPane extends Component{
	onAddGroupToRoot = (group) =>{
		const {dispatch} = this.props;
		dispatch(addGroupToRoot(group));		
	}
	onAddGroup = (group)=>{
		const {files,dispatch} = this.props;
		dispatch(addFilesToGroup(group,files));
	}
	onRemoveGroup = (group)=>{
		const {files,dispatch} = this.props;
		dispatch(removeFilesFromGroup(group,files));
	}
	onShowImage = (image) =>{
		const {dispatch} = this.props;
		dispatch(showImage(image));
	}
	render(){

		const {
			size
		,	groups
		,	selected
		,	images
		} = this.props;

		const {
			onAddGroup
		,	onRemoveGroup
		,	onShowImage
		,	onAddGroupToRoot
		} = this;

		const props = {
			size
		,	groups
		,	selected
		,	images
		,	onAddGroup
		,	onRemoveGroup
		,	onShowImage
		,	onAddGroupToRoot
		}

		return (<LayoutInfoPane {...props}/>)
	}
}