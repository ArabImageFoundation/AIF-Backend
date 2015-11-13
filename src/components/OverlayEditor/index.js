import React,{Component} from 'react';
import styles from './styles';
import {classNames} from '../../utils';
import {hideOverlay,showImage} from '../../actions'
import GroupsPane from '../GroupsPane';
import Toggler from '../../elements/Toggler';

function Field({name}){
	return (<div className={styles.field}>
		<label htmlFor={name}>{name}</label><input defaultValue="[multiple values]" name={name}/>
	</div>)
}

module.exports = class OverlayEditor extends Component{
	constructor(props,context){
		super(props,context);
		this.state = {'show':false}
	}
	toggleEditor = (evt) =>{
		evt.preventDefault()
		this.setState({'show':!this.state.show})
	}
	render(){

		const {show} = this.state;

		const {
			item
		,	items
		,	dispatch
		} = this.props;

		return (<div className={classNames(styles,'OverlayEditor',{show})}>
			<div className={styles.OverlayEditorInner}>
				<a href="#" className={styles.OverlayEditorTitle} onClick={this.toggleEditor}>
					Properties
					<Toggler isShowing={this.state.show} vertical={true} toggle={this.toggleEditor}/>
				</a>
				<div>
					<Field name="Author"/>
					<Field name="Tags"/>
					<Field name="Shelve"/>
				</div>
				<div style={{clear:'both'}}/>
			</div>
		</div>)
	}
}
				//<GroupsPane {...{groups,files,dispatch}}/>
