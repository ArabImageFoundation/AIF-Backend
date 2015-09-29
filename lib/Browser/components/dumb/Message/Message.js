import React,{Component} from 'react';
const cx = require('../../../utils/classes')({
	style:require('./style')
});

const props = {
	className:cx('Message')
}

function renderTitle(title){
	return (title && (<h2>{title}</h2>) || false);
}

const Message = ({title,children}) =>(
	(title || (children && children.length)) ?
		(<div {...props}>
			{renderTitle(title)}
			{children}
		</div>) :
		false
)


export default Message;