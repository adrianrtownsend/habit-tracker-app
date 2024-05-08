import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Queries
export const sortExample = (token: string) =>
	useQuery({
		queryKey: ['sort'],
		queryFn: () =>
			instance
				.get('/tasks', {
					headers: {
						Authorization: token,
					},
				})
				.then((res: any) => {
					console.log('res:', res.data);
					return res.data;
				}),
	});

// Mutations
export const sortPostExample = (token: string) =>
	useMutation({
		mutationFn: () => {
			let data = {
				name: 'test',
				description: 'a description',
				is_completed: false,
			};

			return instance
				.post('/tasks', {
					data,
					headers: {
						Authorization: token,
					},
				})
				.then((res: any) => {
					return res.data;
				});
		},
		// onSuccess: () => {
		// 	// Invalidate and refetch
		// 	queryClient.invalidateQueries({ queryKey: ['sort'] });
		// },
	});
