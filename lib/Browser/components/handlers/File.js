import React,{Component} from 'react';
import {TYPE_FILES,TYPE_INFO,TYPE_FILE} from '../../constants';
import {fetchFilesIfNeeded} from '../../actions/files';
import {LoadingMessage} from '../dumb/Message'
import Column from '../dumb/Column';
import Item from '../ItemController';
import {removeColumn,addColumn} from '../../actions/columns';

export default class File extends Component{
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
		return JSON.stringify(this.props);
		const Component = FileHandlers(this.props);
		if(!Component){return (<div>Error</div>);}
		return <Component {...this.props}/>
	}
	contents(){
		const {loaded} = this.props;
		if(loaded){
			return this.props.filename
			if(this.props.handlerName){
				return this.renderComponent();	
			}
			return this.renderSwitcher();
		}
		return (<LoadingMessage/>);
	}
	render(){
		const props = {
			header:this.header()
		,	body:this.contents()
		,	onClose:this.close
		,	id:this.props.id
		};
		return (<Column {...props}/>)
	}
}

