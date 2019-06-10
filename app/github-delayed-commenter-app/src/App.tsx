import React from 'react';
import './App.scss';
import GitHubLogin from './components/GitHubLogin/GitHubLogin';

interface IAppProps {

}

interface IAppState {
    gitHubToken?: string;
    gitHubAuthenticationStatus: GitHubAuthenticationStatus
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
            gitHubAuthenticationStatus: GitHubAuthenticationStatus.NotAttempted
        };
    }

    private _onGitHubAuthenticationSuccess = (token: string): void => {
        this.setState({
            ...this.state,
            gitHubAuthenticationStatus: GitHubAuthenticationStatus.Authenticated,
            gitHubToken: token
        });

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
                </div>
            </div>
        );
    }
}
