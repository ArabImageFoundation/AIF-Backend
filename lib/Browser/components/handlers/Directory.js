import Item from '../ItemController';
import Section from '../dumb/Section';
import {LoadingMessage} from '../dumb/Message'
import React,{Component} from 'react';
import Column from '../dumb/Column';
import {fetchFilesIfNeeded} from '../../actions/files';
import {TYPE_FILE,TYPE_DIRECTORY} from '../../constants';
import {removeColumn} from '../../actions/columns';

export default class ColumnContentsDirectory extends Component{
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
	item(item,key){
		const {dispatch,id,selectedItem} = this.props;
		const columnSelected = this.props.selected;
		const columnFocused = this.props.focus;
		const type = item.isDirectory ? TYPE_DIRECTORY : TYPE_FILE
		const label = item.isDirectory ? item.basename:`${item.basename}.${item.extension}`
		const selected = (key == selectedItem)
		const focused = selected && columnSelected && columnFocused
		const props = Object.assign({},item,{
			key
		,	columnId:id
		,	dispatch
		,	type
		,	label
		,	selected
		,	id:key
		,	focused
		,	ref:selected?'selected':null
		});
		return <Item {...props}/>
	}
	items(key,props,fn){
		if(!this.props.info){return false}
		const {items} = this.props;
		if(!items || !items.length){return false;}
		const files = items.map(fn).filter(Boolean);
		if(!files || !files.length){return false;}
		return (<Section {...props} key={key} ref={key}>
			{files}
		</Section>)
	}
	files(order){
		return this.items('files',null,(file,i)=>{
			return !file.isDirectory ? this.item(file,order.order++) : false
		});
	}
	directories(order){
		return this.items('directories',null,(file,i)=>{
			return file.isDirectory ? this.item(file,order.order++) : false
		});
	}
	contents(){
		const {loaded} = this.props;
		const order = {order:0}
		const directories = this.directories(order);
		const files = this.files(order)
		if(loaded){
			return [directories,files]
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
		,	onClose:this.close
		,	id:this.props.id
		}
		return (<Column {...props}>
			{this.contents()}
		</Column>)
	}
};