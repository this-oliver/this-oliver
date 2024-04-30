interface FetchError {
  status: number;
  statusText: string;
  content: any;
}

export function useRequest () {
	const router = useRouter();
	const { notify } = useNotification();
	const runtimeConfig = useRuntimeConfig();
	const BASE_URL = runtimeConfig.public.api + '/api';

	function handleError (error: any) {
		const errObj: FetchError = {
			status: error.status,
			statusText: error.statusText,
			content: undefined
		};

		if (error.status >= 400 && error.status < 500) {
			errObj.content = error.json();
		} else {
			errObj.content = error;
		}

		return errObj;
	}

	/**
 * wrapper for fetch API with base url and default headers
 */
	async function request (url: string, options?: RequestInit) {
		const defaultOptions: RequestInit = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		};

		const config: RequestInit = {
			...defaultOptions,
			...options,
			headers: {
				...defaultOptions.headers,
				...(options?.headers || {}) // merge headers with default and options headers
			}
		};

		try {
			const res = await fetch(`${BASE_URL}${url}`, { ...config });

			if (!res.ok) {
				throw res;
			}

			return res.json();
		} catch (error) {
			const err = handleError(error);

			if (err.status === 401) {
				notify('Request Error', 'Failed to authenticate request', 'error');
				router.push('/auth/login');
			}

			throw err;
		}
	}

	return { request };
}
