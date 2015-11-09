import React,{Component,PropTypes} from 'react';
import {objMap} from '../../utils';
import {addFilesToGroup,removeFilesFromGroup,showThumbnail,addGroupToRoot} from '../../actions';
import GroupsPane from '../GroupsPane'
import ThumbnailsPane from '../ThumbnailsPane'

function renderProp(name,prop){
	return (prop && <div>{name}:{prop}</div>);
}

export default class InfoPane extends Component{
	render(){
		const {
			size
		,	groups
		,	selected
		,	images
		,	files
		,	dispatch
		} = this.props;
		return (<div>
			{images && images.length ? <ThumbnailsPane {...{images,dispatch}}/> :false}
			<hr/>
			{renderProp('selected',selected)}
			{renderProp('size',size)}
			{selected? <GroupsPane {...{groups,files,dispatch}}/>:false}
		</div>)

	}
}
