import React,{Component,PropTypes} from 'react';
import styles from './styles';
import Thumbnail from '../../elements/Thumbnail';

function renderThumbnails(images,dispatch){
	return (images && images.map((image,index)=><Thumbnail {...{image,index,dispatch}}/>))
}

module.exports = class ThumbnailsPane extends Component{
	render(){
		const {dispatch,images} = this.props;

		return (<div className={styles.ThumbnailsContainer}>
			{renderThumbnails(images,dispatch)}
		</div>)
	}
}
