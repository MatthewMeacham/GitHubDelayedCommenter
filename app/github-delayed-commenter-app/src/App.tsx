import React from 'react';
import './App.scss';
import GitHubLogin from './components/GitHubLogin/GitHubLogin';

interface IAppProps {

}

interface IAppState {
    gitHubToken?: string;
}

export default class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
        this.state = {};
    }

    private _onGitHubAuthenticationSuccess = (token: string): void => {
        this.setState({
            ...this.state,
            gitHubToken: token
        });
        console.log(`SUCCESSFULLY AUTHENTICATED: ${token}`);

    }

    private _onGitHubAuthenticationFailure = (): void => {
        console.log('FAILED TO AUTHENTICATE');
    }

    private _isAuthenticatedWithGitHub(): boolean {
        return this.state.gitHubToken !== undefined;
    }

    render() {
        return (
            <div className="App">
                <div style={{ display: this._isAuthenticatedWithGitHub() ? 'none' : 'inline' }}>
                    <GitHubLogin 
                        onAuthenticationSuccess={this._onGitHubAuthenticationSuccess}
                        onAuthenticationFailure={this._onGitHubAuthenticationFailure}/>
                </div>
                <div style={{ display: this._isAuthenticatedWithGitHub() ? 'inline': 'none' }}>
                    <h1>Authenticated with GitHub</h1>
                </div>
            </div>
        );
    }
}
