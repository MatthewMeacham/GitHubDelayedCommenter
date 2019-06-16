import React from 'react';
import './App.scss';
import GitHubLogin from './components/GitHubLogin/GitHubLogin';
import GitHubRepositoriesListViewer from './components/GitHubRepositoriesListViewer/GitHubRepositoriesListViewer';
import { IRepositoryReference } from './models/IRepositoryReference';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { GitHubGraphQueryer } from './services/GitHubGraphQueryer';
import { ICollaboratorReference } from './models/ICollaboratorReference';


interface IAppProps {

}

interface IAppState {
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

    private _onGitHubAuthenticationSuccess = async (): Promise<void> => {
        const repositories = await this._getGitHubRepositories();

        this.setState({
            ...this.state,
            gitHubAuthenticationStatus: GitHubAuthenticationStatus.Authenticated,
            repositories: repositories
        });
    }

    private async _getGitHubRepositories(): Promise<IRepositoryReference[]> {
        const query =  
        `{
            viewer {
                repositories(last: 15, affiliations: [OWNER, COLLABORATOR]) {
                    nodes {
                        name,
                        url,
                        collaborators(first: 10) {
                            nodes {
                                name,
                                login,
                                url
                            }
                        }
                    }
                }
            }
        }`;

        const json = await GitHubGraphQueryer.query(query);
        const repositories = json.data.viewer.repositories.nodes.map((repositoryNode: any) => ({
            name: repositoryNode.name,
            url: repositoryNode.url,
            collaborators: repositoryNode.collaborators.nodes.map((collaboratorNode: any) => ({
                name: collaboratorNode.name,
                username: collaboratorNode.username,
                url: collaboratorNode.url
            }) as ICollaboratorReference)
        }) as IRepositoryReference);

        return repositories;
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
        return (
            <div>
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

                    <GitHubRepositoriesListViewer
                        repositoriesToList={this.state.repositories}>
                    </GitHubRepositoriesListViewer>
                </div>
            </div>
        );
    }
      
    public About() {
        return <h2>About</h2>;
    }
    
    public Users() {
        return <h2>Users</h2>;
    }

    public LogInGitHub() {
        return <h2>Hit Log In GitHub</h2>;
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

                    <Route path="/" exact component={this.Index.bind(this)} />
                    <Route path="/about/" component={this.About} />
                    <Route path="/users/" component={this.Users} />
                    <Route path="/login/github" component={this.LogInGitHub} />
                </Router>

                
            </div>
        );
    }
}
