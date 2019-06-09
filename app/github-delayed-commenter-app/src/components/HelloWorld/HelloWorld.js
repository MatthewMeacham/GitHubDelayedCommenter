import React from 'react';
import './HelloWorld.scss';

export default class HelloWorld extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}

	render() {
		return (
			<div className='component-hello-world'>
				<h1>Hello World Component</h1>
				<h5>{this.props.message}</h5>
			</div>
		);
	}
}