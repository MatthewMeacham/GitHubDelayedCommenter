import React from 'react';
import './GitHubRepositoriesListViewer.scss';
import ListGroup from 'react-bootstrap/ListGroup';
import { IRepositoryReference } from '../../models/IRepositoryReference';

interface IGitHubRepositoriesListViewerProps {
	repositoriesToList: IRepositoryReference[];
}

interface IGitHubRepositoriesListViewerState {
	selectedIndex: number;
}

export default class GitHubRepositoriesListViewer extends React.Component<IGitHubRepositoriesListViewerProps, IGitHubRepositoriesListViewerState> {
	constructor(props: IGitHubRepositoriesListViewerProps) {
		super(props);
		this.state = {
			selectedIndex: 0
		};
	}

	private _onListGroupItemClick(index: number): void {
		this.setState({
			...this.state,
			selectedIndex: index
		});
	}

	render() {
		return (
			<ListGroup as="ul">
				{this.props.repositoriesToList.map((repository, index) => {
					return <ListGroup.Item as="li"
						key={repository.url}
						active={this.state.selectedIndex === index}
						onClick={() => this._onListGroupItemClick(index)}>
						<a href={repository.url}>{repository.name}</a>
					</ListGroup.Item>
				})}
			</ListGroup>
		);
	}
}