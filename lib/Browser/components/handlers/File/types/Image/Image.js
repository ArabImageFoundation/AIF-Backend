import React,{Component} from 'react';
import {fetchFileContentsIfNeeded} from '../../../../../actions/files';
import Image from '../../../../dumb/Image';
import Section from '../../../../dumb/Section';

const extensions = /jpe?g|bmp|tiff|png|ico/i;

export default class ImageHandler extends Component{
	static test = function test(props){
		const {info} = props;
		const {extension} = info;
		return extension && extensions.test(extension)
	}
	render(){
		const {path,filename} = this.props.info;
		return (<div>
			<Section>
				<Image src={path} alt={filename} isThumbnail={true}/>
			</Section>
			<Section>
				<textarea value=""/>
			</Section>
			<Section>
				<input type="text" value=""/>
			</Section>
		</div>)
	}
}