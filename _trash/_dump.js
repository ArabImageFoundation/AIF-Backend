import { Reactor, Store, toImmutable } from 'nuclear-js'
import React from 'react'

const reactor = new Reactor({ debug: true });

reactor.registerStores({
	typeFilter: Store({
		getInitialState() {
			return null;
		}
	,	initialize() {
			this.on('FILTER_TYPE', (state, type) => type)
		}
	})

,	items: Store({
		getInitialState() {
			return toImmutable([
				{ type: 'food', name: 'banana', price: 1 }
			,	{ type: 'food', name: 'doritos', price: 4 }
			,	{ type: 'clothes', name: 'shirt', price: 15 }
			,	{ type: 'clothes', name: 'pants', price: 20 }
			])
		}
	,	initialize() {
			this.on('ADD_ITEM', (state, item) => state.push(item))
		}
	})
})

const filteredItemsGetter = [
	['typeFilter'], ['items']
,	(filter, items) => {
		return (filter)
			? items.filter(i => i.get('type') === filter)
			: items
	}
]

const filterGetter = [
	['typeFilter'],(filter)=>{return filter;}
]

const ItemViewer = React.createClass({
	mixins: [reactor.ReactMixin]
,	getDataBindings() {
		return {
			items: filteredItemsGetter
		,	typeFilter:filterGetter
		}
	}
,	onSelectTypeFilter(evt){
		let value = evt.target.value;
		actions.setFilter(value)
	}
,	onNew(evt){
		let node = React.findDOMNode(this.refs.input);
		let value = node.value;
		let filter = this.state.typeFilter 
		console.log(value,filter)
		actions.addItem(value,filter,200);
		node.value = '';
		evt.preventDefault();
	}
,	render() {
		return (
			<div>
				<select onChange={this.onSelectTypeFilter} value={this.state.typeFilter}>
					<option value=''>none</option>
					<option value='food'>food</option>
					<option value='clothes'>clothes</option>
					<option value='electronics'>electronics</option>
				</select>
				<form onSubmit={this.onNew}>
					<input defaultValue='' ref='input'/>
				</form>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Type</th>
							<th>Price</th>
						</tr>
					</thead>

					<tbody>
						{this.state.items.map((item,key) => {
							return <tr key={key}>
								<td>{item.get('name')}</td>
								<td>{item.get('type')}</td>
								<td>{item.get('price')}</td>
							</tr>
						})}
					</tbody>
				</table>
			</div>
		)
	}
})

const actions = {
	setFilter(type) {
		reactor.dispatch('FILTER_TYPE', type)
	}
,	addItem(name, type, price) {
		reactor.dispatch('ADD_ITEM', toImmutable({
			name
		,	type
		,	price
		}))
	}
}

actions.addItem('computer', 'electronics', 1999)
actions.setFilter('food')

export default ItemViewer;