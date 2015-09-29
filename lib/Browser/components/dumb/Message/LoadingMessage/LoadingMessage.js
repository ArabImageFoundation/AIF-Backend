import React from 'react';
import Message from '../Message';

const LoadingMessage = ({title,children}) =>(
	(<Message title={title || 'Loading'}>{children}</Message>)
)

export default LoadingMessage;