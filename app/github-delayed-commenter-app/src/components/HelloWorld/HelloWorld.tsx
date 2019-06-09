import React from 'react';
import './HelloWorld.scss';

interface IHelloWorldProps {
	message: string;
}

interface IHelloWorldState {

}

export default class HelloWorld extends React.Component<IHelloWorldProps, IHelloWorldState> {
	constructor(props: IHelloWorldProps) {
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