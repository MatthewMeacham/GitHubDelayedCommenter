import Cookies from 'universal-cookie';

export class CookiesService {

	private static cookies = new Cookies();

	public static set(key: string, value: any) {
		CookiesService.cookies.set(key, value, { path: '/' });
	}

	public static get(key: string) {
		return CookiesService.cookies.get(key);
	}
}