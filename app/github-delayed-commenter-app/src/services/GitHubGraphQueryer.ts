import { CookiesService } from "./CookiesService";

export class GitHubGraphQueryer {

	private static gitHubGraphUrl = 'https://api.github.com/graphql';

	public static async query(queryString: string): Promise<any> {
		const token = CookiesService.get('gitHubToken');
		if (!token) {
			// TODO: Get new token
		}

		return GitHubGraphQueryer.queryWithToken(queryString, token);
	}

	private static async queryWithToken(queryString: string, token: string): Promise<any> {
		const query = { query: queryString };
		return await fetch(GitHubGraphQueryer.gitHubGraphUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(query)
		}).then((response) => response.json())
		.catch((reason) => console.log(`Unable to query GitHub graph: ${reason}`));
	}
}