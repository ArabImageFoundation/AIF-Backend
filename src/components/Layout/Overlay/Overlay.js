import React,{Component} from 'react';
import styles from './style';
import {classNames} from '../../../utils';
import {hideOverlay,showImage} from '../../../actions'
import OverlayEditor from './OverlayEditor';

export default class Overlay extends Component{
	onDismiss = (evt) =>{
		evt.preventDefault();
		const {dispatch} = this.props;
		dispatch(hideOverlay());
	}
	showNext = (evt) =>{
		evt.preventDefault();
		const {dispatch,imageIndex,images} = this.props;
		const nextIndex = imageIndex+1;
		if(nextIndex<images.length){
			dispatch(showImage(nextIndex));
		}
	}
	showPrevious = (evt)=>{
		evt.preventDefault();
		const {dispatch,imageIndex,images} = this.props;
		const nextIndex = imageIndex-1;
		if(nextIndex>-1){
			dispatch(showImage(nextIndex));
		}
	}
	renderImage(index,images){
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
		const {imageIndex,images} = this.props;
		if(imageIndex==images.length-1){return false;}
		const props = {
			onClick:this.showNext
		,	className:styles.next
		}
		return <div {...props}/>
	}
	renderPrevious(){
		const {imageIndex,images} = this.props;
		if(imageIndex==0){return false;}
		const props = {
			onClick:this.showPrevious
		,	className:styles.previous
		}
		return <div {...props}/>
	}
	render(){
		const {
			showOverlay
		,	imageIndex
		,	images
		,	groups
		} = this.props;
		const props = {
			className:classNames(styles,'Overlay',{showOverlay})
		};
		return (<div {...props}>
			{this.renderImage(imageIndex,images)}
			{this.renderNext()}
			{this.renderPrevious()}
			{this.renderCloseButton()}
			<OverlayEditor groups={groups}/>
		</div>)
	}
}