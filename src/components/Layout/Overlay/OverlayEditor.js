import React,{Component} from 'react';
import styles from './style';
import groupStyles from '../LayoutInfoPane/style'
import {classNames} from '../../../utils';
import {hideOverlay,showImage} from '../../../actions'

function Field({name}){
	return (<div className={styles.field}>
		<label htmlFor={name}>{name}</label><input defaultValue="[multiple values]" name={name}/>
	</div>)
}

function group(name){
	return (<div className={groupStyles.group}>{name}</div>)
}

export default class OverlayEditor extends Component{
	constructor(props,context){
		super(props,context);
		this.state = {'show':false}
	}
	onClick = (evt) =>{
		evt.preventDefault()
		this.setState({'show':!this.state.show})
	}
	render(){
		const {groups} = this.props;
		const {show} = this.state;
		return (<div className={classNames(styles,'OverlayEditor',{show})}>
			<div className={styles.OverlayEditorInner}>
				<a href="#" className={styles.OverlayEditorTitle} onClick={this.onClick}>Properties</a>
				<div>
					<Field name="Author"/>
					<Field name="Tags"/>
					<Field name="Shelve"/>
				</div>
				<hr/>
				<div>
					<br/><div>Groups:</div><br/>
					{groups && groups.map(group)}
				</div>
				<div style={{clear:'both'}}/>
			</div>
		</div>)
	}
}