import React from 'react';
import './App.scss';
import GitHubLogin from './components/GitHubLogin/GitHubLogin';
import GitHubRepositoriesListViewer from './components/GitHubRepositoriesListViewer/GitHubRepositoriesListViewer';
import { IRepositoryReference } from './models/IRepositoryReference';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


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
                    'repositories(first: 50, affiliations:[OWNER, COLLABORATOR]) { ' +
                        'edges { ' +
                            'node { ' +
                                'name,' +
                                'url' +
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
        .then((json) => json.data.viewer.repositories.edges.map((repository: any) => ({ name: repository.node.name, url: repository.node.url } as IRepositoryReference)))
        .then((repositories) => {
            this.setState({
                ...this.state,
                gitHubAuthenticationStatus: GitHubAuthenticationStatus.Authenticated,
                gitHubAccessToken: token,
                repositories: repositories
            });
        }).catch((reason) => console.log(`Unable to fetch repos: ${reason}`));
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

    public Index() {
        return <h2>Home</h2>;
    }
      
    public About() {
        return <h2>About</h2>;
    }
    
    public Users() {
        return <h2>Users</h2>;
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about/">About</Link>
                            </li>
                            <li>
                                <Link to="/users/">Users</Link>
                            </li>
                        </ul>
                    </nav>

                    <Route path="/" exact component={this.Index} />
                    <Route path="/about/" component={this.About} />
                    <Route path="/users/" component={this.Users} />
                </Router>

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
