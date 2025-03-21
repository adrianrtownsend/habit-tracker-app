import React, { useEffect, useState } from 'react';
import { getTasks } from '@/lib/feathers/api/task';
import { CardMedium } from '@/lib/theme/custom/card';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export const TaskList = () => {
	const { query } = useLocalSearchParams<{
		query?: any;
	}>();
	const [tasks, setTasks] = useState<any[]>([]);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const result = await getTasks({});
				setTasks(result.data);
			} catch (error) {
				console.error('Error fetching tasks:', error);
			}
		};
		fetchTasks();
	}, [params]);

	return (
		<ScrollView>
			{tasks.map((task) => (
				<CardMedium
					user={task.user}
					key={task._id}
					index={task._id}
					name={task.text}
					description={task.description}
				/>
			))}
		</ScrollView>
	);
};
