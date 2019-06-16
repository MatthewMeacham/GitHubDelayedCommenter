import React from 'react';
import './GitHubLogin.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Button from 'react-bootstrap/Button';

interface IGitHubLoginProps {
	onAuthenticationSuccess: (token: string) => void,
	onAuthenticationFailure: () => void
}

interface IGitHubLoginState {

}

const API_BASE_URL = 'http://localhost:62797/api';

const CLIENT_ID = '11568701cffaa9e8a711';
const REDIRECT_URI = 'http://localhost:3000/';

export default class GitHubLogin extends React.Component<IGitHubLoginProps, IGitHubLoginState> {
	constructor(props: IGitHubLoginProps) {
		super(props);
		this.state = {
			
		};
	}

	async componentDidMount() {
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.has('code')) {
			const code = urlParams.get('code');
			const data = { 'code': code }; // TODO: Should specify an interface

			try {
				const response = await fetch(`${API_BASE_URL}/authenticate/github`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data)
				});

				if (response.ok) {
					const json = await response.json();
					if (json && json.access_token) {
						this.props.onAuthenticationSuccess(json.access_token);
					} else {
						throw new Error('Response did not contain expected json');
					}
				} else {
					throw new Error('Response was not ok');
				}
			} catch (error) {
				this.props.onAuthenticationFailure();
			}
		}
	}

	render() {
		return (
			<div className='component-github-login'>
				<Button variant="primary" href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo,read:user`}>
					<FontAwesomeIcon icon={faGithub} /> Log in with GitHub
				</Button>
			</div>
		);
	}
}