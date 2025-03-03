import { useState, useEffect } from 'react';

type FetchHookProps<T> = {
	method: () => Promise<T>;
};

export function useFetch<T>({ method }: FetchHookProps<T>) {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await method();
				setData(result);
			} catch (err) {
				setError(err as Error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [method]);

	return { data, loading, error };
}
