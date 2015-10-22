import React,{Component,PropTypes} from 'react';
import styles from './style';
import LayoutInfoPaneToggler from './LayoutInfoPaneToggler';

const props = {
	className:styles.LayoutInfoPane
}

export default class LayoutInfoPane extends Component{
	render(){
		const {width,children,toggle,position} = this.props;
		const isShowing = position == 0;
		const buttonText = isShowing ? 'hide' : 'show';
		const style = {
			width
		,	right:position
		}
		return (<div {...props} style={style}>
			<LayoutInfoPaneToggler isShowing={isShowing} toggle={toggle}/>
			{children}
		</div>)
	}
}