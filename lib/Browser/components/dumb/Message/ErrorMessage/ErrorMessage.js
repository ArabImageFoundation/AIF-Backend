import React from 'react';
import Message from '../Message';

const ErrorMessage = ({title,children}) =>(
	(<Message title={title || 'Error'}>{children}</Message>)
)

export default ErrorMessage;