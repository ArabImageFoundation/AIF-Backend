import Section from '../../dumb/Section';
import {LoadingMessage} from '../../dumb/Message'
import React,{Component} from 'react';
import Column from '../../dumb/Column';
import {fetchDirectoryIfNeeded} from '../../../actions/files';
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
		,	path
		,	id
		} = props;
		dispatch(fetchDirectoryIfNeeded(path,id));
	}
	shouldRequireInfo(props){
		const {shouldLoad} = props;
		if(shouldLoad){
			this.getInfo(props);
		}
	}
	requireInfoIfNeeded(props){
		if(this.shouldRequireInfo(props)){
			this.getInfo(props);
		}
	}
	componentDidMount() {
		this.requireInfoIfNeeded(this.props);
	}
	componentDidUpdate(){
		this.requireInfoIfNeeded(this.props);
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
		let {filename} = info;
		return ((filename || '')+'/')
	}
	render(){
		const props = {
			header:this.header()
		,	body:this.contents()
		,	onClose:this.props.onClose
		,	id:this.props.id
		,	selected:this.props.selected
		}
		return (<Column {...props}>
			{this.contents()}
		</Column>)
	}
};