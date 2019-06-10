import React from 'react';
import './GitHubRepositoriesListViewer.scss';
import ListGroup from 'react-bootstrap/ListGroup';

interface IGitHubRepositoriesListViewerProps {
	gitHubAccessToken: string;
	repositoriesToList: IRepositoryReference[];
}

interface IGitHubRepositoriesListViewerState {
	selectedIndex: number;
}

export interface IRepositoryReference {
	name: string;
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
						active={this.state.selectedIndex === index}
						onClick={() => this._onListGroupItemClick(index)}>
						{repository.name}
					</ListGroup.Item>
				})}
			</ListGroup>
		);
	}
}