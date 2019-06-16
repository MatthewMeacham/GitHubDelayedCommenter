import React from 'react';
import './GitHubLogin.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Button from 'react-bootstrap/Button';
import { GitHubLoginService } from '../../services/GitHubLoginService';

interface IGitHubLoginProps {
	onAuthenticationSuccess: () => void,
	onAuthenticationFailure: () => void
}

interface IGitHubLoginState {

}

export default class GitHubLogin extends React.Component<IGitHubLoginProps, IGitHubLoginState> {
	constructor(props: IGitHubLoginProps) {
		super(props);
		this.state = {
			
		};
	}

	async componentDidMount() {
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.has('code')) {
			const code = urlParams.get('code') as string;

			try {
				const token = await GitHubLoginService.authenticateWithCode(code);
				this.props.onAuthenticationSuccess();
			} catch (error) {
				this.props.onAuthenticationFailure();
			}
		}
	}

	render() {
		return (
			<div className='component-github-login'>
				<Button variant="primary" href={GitHubLoginService.gitHubOAuthUrl}>
					<FontAwesomeIcon icon={faGithub} /> Log in with GitHub
				</Button>
			</div>
		);
	}
}