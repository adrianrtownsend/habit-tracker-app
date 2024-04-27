import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:8080',
	headers: {
		'Content-Type': 'application/json',
	},
});

// Queries
export const sortExample = () =>
	useQuery({
		queryKey: ['sort'],
		queryFn: () =>
			instance.get('/sort').then((res: any) => {
				console.log('res:', res.data);
				return res.data;
			}),
	});

// Mutations
export const sortPostExample = () =>
	useMutation({
		mutationFn: () => {
			let data = JSON.stringify({
				numbers: [1, 5, 9, 23, 85, 13, 676, 11, 55],
				order: 'desc',
			});

			// let config = {
			// 	method: 'post',
			// 	maxBodyLength: Infinity,
			// 	url: '/sort',
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	data: data,
			// };

			// axios
			// 	.request(config)
			// 	.then((response:) => {
			// 		console.log(JSON.stringify(response.data));
			// 	})
			// 	.catch((error) => {
			// 		console.log(error);
			// 	});

			return instance.post('/sort', data).then((res: any) => {
				return res.data;
			});
		},
		// onSuccess: () => {
		// 	// Invalidate and refetch
		// 	queryClient.invalidateQueries({ queryKey: ['sort'] });
		// },
	});
