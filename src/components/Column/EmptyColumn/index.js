import React,{Component,PropTypes} from 'react';
import styles from './styles';
import forms from 'newforms';
import actions from '../../../actions';
const {
	selectColumn
,	addGroup
} = actions

const PhotographerForm = forms.Form.extend({
	name:forms.CharField()
,	bio:forms.CharField({widget:forms.Textarea,required:false})
,	files:forms.MultipleFileField({required:false})
})

const onSubmit = (obj,dispatch,item,ref) => (evt) => {
	evt.preventDefault();
	const form = obj.refs[ref].getForm()
	const isValid = form.validate();
	if (isValid) {
		const {bio:text,name,files} = form.cleanedData;
		const links = [item.id]
		const type = 'photographer'
		const query = {name,text,type,links}
		dispatch(addGroup(query)).then(result=>{
			console.log('result',result)
		})
	}else{
		console.log('invalid');
	}
}

module.exports = class EmptyColumn extends Component{
	constructor(props,context){
		super(props,context);
		this.state = {show:false,form:null}
	}
	render(){
		const {show} = this.state;
		const {dispatch,item} = this.props;
		return (<div className={styles.EmptyColumn+(show?' '+styles.show:'')}>
			<div className={styles.bigButton} onClick={(evt)=>this.setState({show:!show})}/>
			<div className={styles.menu}>
				<h3>add...</h3>
				<a href="#">Image</a>
				<a href="#">Group</a>
				<a href="#">Artist</a>
			</div>
			<div>
				<form encType="multipart/form-data" onSubmit={onSubmit(this,dispatch,item,'form')}>
					<forms.RenderForm form={PhotographerForm} ref="form"/>
					<input type="submit" value="ok"/>
				</form>
			</div>
		</div>)
	}
}
