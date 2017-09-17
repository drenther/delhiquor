import React from 'react';
import {
	Checkbox,
	Select,
	Avatar,
	AutoComplete,
	Input,
	InputNumber,
} from 'antd';
const Option = Select.Option;
const InputGroup = Input.Group;

export const LiquorForm = props => {
	return (
		<div className="liquor-form">
			<div className="liquor-type">
				<Checkbox onChange={props.handleIndian} checked={props.indian}>
					Indian
				</Checkbox>
				<Checkbox onChange={props.handleForeign} checked={props.foreign}>
					Foreign
				</Checkbox>
			</div>
			<div className="divider secondary" />
			<div className="liquor-category">
				<Avatar src={`../assets/${props.cat ? props.cat : 'bar'}.svg`} />
				<Select
					showSearch
					style={{ width: 200 }}
					size="large"
					placeholder="Choose your poison"
					onChange={props.handleCatChange}
					optionFilterProp="children"
					filterOption={(input, option) =>
						option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
						0}
				>
					<Option value="beer">Beer</Option>
					<Option value="brandy">Brandy</Option>
					<Option value="gin">Gin</Option>
					<Option value="rum">Rum</Option>
					<Option value="vodka">Vodka</Option>
					<Option value="whisky">Whisky</Option>
					<Option value="wine">Wine</Option>
				</Select>
			</div>
			<div className="divider secondary" />
			<div className="liquor-price">
				<InputGroup compact>
					<InputNumber
						style={{ width: 100, textAlign: 'center' }}
						placeholder="Minimum"
						value={props.min}
						step={10}
						min={30}
						onChange={props.handleMin}
						formatter={val =>
							`₹ ${`${val}`.replace(/(\d)(?=(\d\d)+\d$)/g, '$1,')}`}
						parser={val => val.replace(/\₹\s?|(,*)/g, '')}
					/>
					<Input
						style={{
							width: 24,
							borderLeft: 0,
							pointerEvents: 'none',
							backgroundColor: '#fff',
						}}
						placeholder="~"
						disabled
					/>
					<InputNumber
						style={{ width: 100, textAlign: 'center', borderLeft: 0 }}
						placeholder="Maximum"
						value={props.max}
						step={10}
						max={1200000}
						onChange={props.handleMax}
						formatter={val =>
							`₹ ${`${val}`.replace(/(\d)(?=(\d\d)+\d$)/g, '$1,')}`}
						parser={val => val.replace(/\₹\s?|(,*)/g, '')}
					/>
				</InputGroup>
			</div>
			<div className="divider secondary" />
			<div className="liquor-search">
				<AutoComplete
					dataSource={[...new Set(props.subset.map(x => x.brandName))]}
					filterOption={(inputValue, option) =>
						option.props.children
							.toUpperCase()
							.indexOf(inputValue.toUpperCase()) !== -1}
					style={{ width: 220 }}
					placeholder="Got some brand in mind?"
					value={props.query}
					onChange={props.handleSearch}
					size="large"
				/>
			</div>
		</div>
	);
};
