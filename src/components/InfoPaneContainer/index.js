import React,{Component,PropTypes} from 'react';
import styles from './styles';
import Toggler from '../../elements/Toggler';

const props = {
	className:styles.InfoPaneContainer
}

module.exports = class InfoPaneContainer extends Component{
	render(){
		const {width,children,toggle,position} = this.props;
		const isShowing = position == 0;
		const buttonText = isShowing ? 'hide' : 'show';
		const style = {
			width
		,	right:position
		}
		return (<div {...props} style={style}>
			<Toggler isShowing={isShowing} toggle={toggle}/>
			<div className={styles.InfoPaneContainerInner}>
				{children}
			</div>
		</div>)
	}
}
