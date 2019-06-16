import { CookiesService } from "./CookiesService";

export class GitHubLoginService {

	private static CLIENT_ID = '11568701cffaa9e8a711';
	private static REDIRECT_URI = 'http://localhost:3000/login/github';
	private static API_BASE_URL = 'http://localhost:62797/api'; // TODO: Pull out

	public static async authenticateWithCode(code: string): Promise<string> {
		const data = { 'code': code }; // TODO: Should specify an interface

		try {
			const response = await fetch(`${GitHubLoginService.API_BASE_URL}/authenticate/github`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data)
			});

			if (response.ok) {
				const json = await response.json();
				if (json && json.access_token) {
					CookiesService.set('gitHubToken', json.access_token);
					return json.access_token;
				} else {
					throw new Error('Response did not contain expected json');
				}
			} else {
				throw new Error('Response was not ok');
			}
		} catch (error) {
			throw error;
		}
	}

	static get gitHubOAuthUrl() {
		return `https://github.com/login/oauth/authorize?client_id=${GitHubLoginService.CLIENT_ID}&redirect_uri=${GitHubLoginService.REDIRECT_URI}&scope=repo,read:user`;
	}

}