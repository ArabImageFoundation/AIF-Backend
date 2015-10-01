import React from 'react';
const cx = require('../../../utils/classes')({
	style:require('./style')
});

const Image = ({src,alt,isThumbnail})=>{
	const props = {
		className:cx('Image',{props:{isThumbnail}})
	}
	return (<div {...props}>
		<img src={src} alt={alt}/>
	</div>)
}

export default Image