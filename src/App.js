import React, { Component } from 'react';
import { Spin, BackTop, Icon } from 'antd';
import { LiquorForm, Results } from './components';

const fetchLiquor = async () => {
	let liquor;
	try {
		const res = await fetch(
			'https://raw.githubusercontent.com/drenther/liquor-prices-delhi/master/db.json'
		);
		liquor = res.json();
	} catch (e) {
		liquor = null;
		console.error('Error in fetching latest price listing.', e);
	}
	return liquor;
};

class App extends Component {
	state = {
		liquor: null,
		indian: false,
		foreign: false,
		cat: '',
		query: '',
		min: 30,
		max: 1200000,
		subset: [],
	};

	async componentWillMount() {
		const liquor = await fetchLiquor();
		this.setState({ liquor });
	}

	_checkIndian = () => {
		const indian = !this.state.indian;
		const subset = this._calculateSubset(
			Object.assign({}, this.state, { indian })
		);
		this.setState({ indian, subset });
	};

	_checkForeign = () => {
		const foreign = !this.state.foreign;
		const subset = this._calculateSubset(
			Object.assign({}, this.state, { foreign })
		);
		this.setState({ foreign, subset });
	};

	_selectCat = cat => {
		const subset = this._calculateSubset(
			Object.assign({}, this.state, { cat })
		);
		this.setState({ cat, subset });
	};

	_search = val => {
		const query = val.toUpperCase();
		const subset = this._calculateSubset(
			Object.assign({}, this.state, { query })
		);
		this.setState({ query, subset });
	};

	_changeMin = val => {
		const min = parseInt(Number(val), 10);
		if (min > 1 && min < this.state.max) {
			const subset = this._calculateSubset(
				Object.assign({}, this.state, { min })
			);
			this.setState({ min, subset });
		}
	};

	_changeMax = val => {
		const max = parseInt(Number(val), 10);
		if (max > this.state.min && max < 1200000) {
			const subset = this._calculateSubset(
				Object.assign({}, this.state, { max })
			);
			this.setState({ max, subset });
		}
	};

	_calculateSubset = state => {
		const { cat, foreign, indian, liquor, max, min, query } = state;
		let subset;
		if (cat === '' || (!foreign && !indian)) subset = [];
		else {
			let keys = Object.keys(liquor).filter(x => x.includes(cat));
			if (foreign && !indian) keys = keys.filter(x => x.includes('foreign'));
			if (!foreign && indian) keys = keys.filter(x => x.includes('indian'));
			subset = keys
				.reduce((a, x) => a.concat(liquor[x]), [])
				.filter(
					x => parseInt(x.price, 10) >= min && parseInt(x.price, 10) <= max
				)
				.filter(x => x.brandName.includes(query));
		}
		return subset;
	};

	render() {
		if (this.state.liquor) {
			return (
				<div className="app">
					<h1 className="title">Delhiquor</h1>
					<div className="divider" />
					<LiquorForm
						handleIndian={this._checkIndian}
						handleForeign={this._checkForeign}
						handleCatChange={this._selectCat}
						handleSearch={this._search}
						handleMin={this._changeMin}
						handleMax={this._changeMax}
						cat={this.state.cat}
						query={this.state.query}
						min={this.state.min}
						max={this.state.max}
						indian={this.state.indian}
						foreign={this.state.foreign}
						subset={this.state.subset}
					/>
					<div className="divider" />
					<div className="results">
						<Results subset={this.state.subset} />
					</div>
					<BackTop>
						<div className="ant-back-top-inner">
							<Icon type="up" />
						</div>
					</BackTop>
				</div>
			);
		} else {
			return (
				<div className="app">
					<Spin size="large" />
				</div>
			);
		}
	}
}

export default App;
