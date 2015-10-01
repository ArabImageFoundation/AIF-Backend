import React,{Component} from 'react';
import {TYPE_FILE} from '../../../constants';
import {fetchFilesIfNeeded} from '../../../actions/files';
import {LoadingMessage} from '../../dumb/Message'
import Column from '../../dumb/Column';
import Item from '../../ItemController';
import {removeColumn,addColumn} from '../../../actions/columns';
import {ErrorMessage} from '../../dumb/Message';
import getFileHandlers from './getFileHandlers';

export default class File extends Component{
	static type = TYPE_FILE
	getInfo(props){
		const {
			dispatch
		,	status
		,	directory
		,	id
		} = props;
		dispatch(fetchFilesIfNeeded(directory,id));
	}
	close = (evt) =>{
		const {
			dispatch
		,	id
		} = this.props;
		dispatch(removeColumn(id));
	}
	componentDidUpdate(){
		const {shouldLoad} = this.props;
		if(shouldLoad){
			this.getInfo(this.props);
		}
	}
	header(){
		let {info} = this.props
		return info.filename;
	}
	item(handler,key){
		const {actionName} = handler;
		const {dispatch,id,directory}  = this.props;
		const props = {
			dispatch
		,	columnId:id
		,	path:directory
		,	type:TYPE_FILE
		,	label:actionName
		,	actionName
		,	key
		};
		return (<Item {...props}/>);
	}
	renderSwitcher(){
		const handlers = FileHandlers.getList(this.props);
		return handlers.map((handler,key)=>this.item(handler,key));
	}
	renderComponent(){
		const handlers = getFileHandlers(this.props);
		return handlers.map((Handler,key)=>
			<Handler {...this.props} key={key}/>
		);
	}
	contents(){
		const {hasLoaded,hasError} = this.props;
		if(hasError){
			const message = `error retrieving file`
			return (<ErrorMessage>{message}</ErrorMessage>)
		}
		if(hasLoaded){
			return this.renderComponent();	
		}
		return (<LoadingMessage/>);
	}
	render(){
		const props = {
			header:this.header()
		,	body:this.contents()
		,	onClose:this.props.onClose
		,	id:this.props.id
		};
		return (<Column {...props}>
			{this.contents()}
		</Column>)
	}
}

