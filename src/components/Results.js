import React from 'react';
import { Collapse } from 'antd';

const Panel = Collapse.Panel;

const customPanelStyle = {
	background: '#ffffff',
	borderBottom: 1,
	color: '#7C442B',
};

export const Results = props => {
	if (props.subset.length) {
		return (
			<Collapse bordered={false}>
				{props.subset.map((x, i) => (
					<Panel
						style={customPanelStyle}
						header={`${x.brandName} - ₹ ${x.price}`}
						key={i}
					>
						<p>
							Size - {x.size} | Pack - {x.pack}
						</p>
						<p> Warehouse - {x.warehouse}</p>
					</Panel>
				))}
			</Collapse>
		);
	} else {
		return <h4 className="no-results">Running Dry?!</h4>;
	}
};
