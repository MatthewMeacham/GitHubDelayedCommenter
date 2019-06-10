import React from 'react';
import './App.scss';
import GitHubLogin from './components/GitHubLogin/GitHubLogin';
import GitHubRepositoriesListViewer, { IRepositoryReference } from './components/GitHubRepositoriesListViewer/GitHubRepositoriesListViewer';

interface IAppProps {

}

interface IAppState {
    gitHubAccessToken?: string;
    gitHubAuthenticationStatus: GitHubAuthenticationStatus
    repositories: IRepositoryReference[];
}

enum GitHubAuthenticationStatus {
    NotAttempted,
    Authenticated,
    Failure,
}

export default class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            gitHubAuthenticationStatus: GitHubAuthenticationStatus.NotAttempted,
            repositories: []
        };
    }

    private  _onGitHubAuthenticationSuccess = (token: string): void => {
        const query =  
        { 
            query: 'query { ' +
            'viewer { ' +
              'repositories(first: 50) { ' +
                'edges { ' +
                  'node { ' +
                    'name' +
                  '}' +
               '}' +
              '}' +
            '}' +
          '}' 
        };

        fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(query)
        }).then((response) => response.json())
        .then((json) => json.data.viewer.repositories.edges.map((repository: any) => ({ name: repository.node.name } as IRepositoryReference)))
        .then((repositories) => this.setState({
            ...this.state,
            gitHubAuthenticationStatus: GitHubAuthenticationStatus.Authenticated,
            gitHubAccessToken: token,
            repositories: repositories
        })).catch((reason) => console.log(`Unable to fetch repos: ${reason}`));
    }

    private _onGitHubAuthenticationFailure = (): void => {
        this.setState({
            ...this.state,
            gitHubAuthenticationStatus: GitHubAuthenticationStatus.Failure
        });
    }

    private _isAuthenticatedWithGitHub(): boolean {
        return this.state.gitHubAuthenticationStatus === GitHubAuthenticationStatus.Authenticated;
    }

    render() {
        return (
            <div className="App">
                <div style={{ display: this._isAuthenticatedWithGitHub()  ? 'none' : 'inline' }}>
                    <GitHubLogin 
                        onAuthenticationSuccess={this._onGitHubAuthenticationSuccess}
                        onAuthenticationFailure={this._onGitHubAuthenticationFailure}/>
                </div>
                <div style={{ display: this.state.gitHubAuthenticationStatus === GitHubAuthenticationStatus.Failure ? 'inline' : 'none' }}>
                    <h1>Unable to authenticate with GitHub</h1>
                </div>
                <div style={{ display: this._isAuthenticatedWithGitHub() ? 'inline': 'none' }}>
                    <h1>Authenticated with GitHub</h1>

                    <GitHubRepositoriesListViewer gitHubAccessToken={this.state.gitHubAccessToken!} 
                        repositoriesToList={this.state.repositories}>
                    </GitHubRepositoriesListViewer>
                </div>
            </div>
        );
    }
}
