import Section from '../../dumb/Section';
import {LoadingMessage} from '../../dumb/Message'
import React,{Component} from 'react';
import Column from '../../dumb/Column';
import {fetchFilesIfNeeded} from '../../../actions/files';
import {TYPE_FILE,TYPE_DIRECTORY} from '../../../constants';
import {removeColumn} from '../../../actions/columns';
import makeItems from './makeItems';
import {ErrorMessage} from '../../dumb/Message';

export default class ColumnContentsDirectory extends Component{
	static type = TYPE_DIRECTORY
	getInfo(props){
		const {
			dispatch
		,	status
		,	directory
		,	id
		} = props;
		dispatch(fetchFilesIfNeeded(directory,id));
	}
	componentDidUpdate(){
		const {shouldLoad} = this.props;
		if(shouldLoad){
			this.getInfo(this.props);
		}
	}
	contents(){
		const {hasLoaded,hasError} = this.props;
		if(hasError){
			const message = `error retrieving directory`
			return (<ErrorMessage>{message}</ErrorMessage>)
		}
		if(hasLoaded){
			return makeItems(this.props.items,this.props);
		}
		return (<LoadingMessage/>);
	}
	header(){
		let {info} = this.props
		return info.filename;
	}
	render(){
		const props = {
			header:this.header()
		,	body:this.contents()
		,	onClose:this.props.onClose
		,	id:this.props.id
		}
		return (<Column {...props}>
			{this.contents()}
		</Column>)
	}
};