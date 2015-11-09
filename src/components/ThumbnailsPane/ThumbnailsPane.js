import React,{Component,PropTypes} from 'react';
import styles from './styles';
import {Thumbnail} from '../../elements';

function renderThumbnails(images,dispatch){
	return (images && images.map((image,index)=><Thumbnail {...{image,index,dispatch}}/>))
}

export default class ThumbnailsPane extends Component{
	render(){
		const {dispatch,images} = this.props;

		return (<div className={styles.ThumbnailsContainer}>
			{renderThumbnails(images,dispatch)}
		</div>)
	}
}
