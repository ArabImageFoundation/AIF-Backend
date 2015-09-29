import React,{Component} from 'react';

export default class TextView extends Component{
	static actionName = 'View Text'
	static test(types,mime,info,has){
		return (has(types,'text'));
	}
	render(){
		return (<pre>
			<code>
			{this.props.info.contents}
		</code></pre>)
	}
}