import React,{Component} from 'react';
import styles from './styles';
import {classNames} from '../../utils';
import {hideOverlay,showNextOverlayItem,showPreviousOverlayItem,showCurrentOverlayItem} from '../../actions'
import OverlayEditor from '../OverlayEditor';

const onDismiss = (dispatch) => (evt) =>{
	evt.preventDefault();
	dispatch(hideOverlay());
}
const showNext = (dispatch) => (evt) =>{
	evt.preventDefault();
	dispatch(showNextOverlayItem);
}
const showPrevious = (dispatch) => (evt)=>{
	evt.preventDefault();
	dispatch(showPreviousOverlayItem);
}

module.exports = class Overlay extends Component{
	constructor(props,context){
		super(props,context);
		const {dispatch} = props;
		this.onDismiss = onDismiss(dispatch);
		this.showNext = showNext(dispatch);
		this.showPrevious = showPrevious(dispatch);
	}
	renderImage(item){
		console.log('item to render',item);
		return 'ba3';
		var style = {};
		if(index>=0){
			const image = images[index];
			style = {
				backgroundImage:`url('${image.path}')`
			}
		}
		return (<div style={style} className={styles.OverlayImage}></div>)
	}
	renderCloseButton(){
		const props = {
			onClick:this.onDismiss
		,	className:styles.close
		}
		return <div {...props}/>
	}
	renderNext(){
		const {index,selectedItems} = this.props;
		if(index>=selectedItems.length-1){return false;}
		const props = {
			onClick:this.showNext
		,	className:styles.next
		}
		return <div {...props}/>
	}
	renderPrevious(){
		const {index,selectedItems} = this.props;
		if(index==0){return false;}
		const props = {
			onClick:this.showPrevious
		,	className:styles.previous
		}
		return <div {...props}/>
	}
	render(){
		const {
			showOverlay
		,	index
		,	selectedItems
		,	item
		,	items
		,	dispatch
		} = this.props;
		const props = {
			className:classNames(styles,'Overlay',{showOverlay})
		};
		return (<div {...props}>
			{this.renderImage(item)}
			{this.renderNext()}
			{this.renderPrevious()}
			{this.renderCloseButton()}
			<OverlayEditor {...{item,items,dispatch}}/>
		</div>)
	}
}
