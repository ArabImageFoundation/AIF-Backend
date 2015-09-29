import React from 'react';
import Section from '../../dumb/Section';

export default function makeSection(key,props,items){
	if(!items || !items.length){return false;}
	const sectionProps = {
		className:key
	,	key:key
	,	ref:key
	}
	return (<Section {...sectionProps}>
		{items}
	</Section>)
}