import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function AdminBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return (
		<FontAwesome
			size={18}
			style={{ marginBottom: -3 }}
			{...props}
		/>
	);
}

export default function AdminLayout() {
	return (
		<Tabs
			screenOptions={{
				// Disable the static render of the header on web
				// to prevent a hydration error in React Navigation v6.
				headerShown: useClientOnlyValue(false, true),
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Expo V3',
					tabBarIcon: ({ color }) => (
						<AdminBarIcon
							name='home'
							color={color}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name='publicRoute'
				options={{
					title: 'Public Route',
					tabBarIcon: ({ color }) => (
						<AdminBarIcon
							name='star-o'
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='protectedRoute'
				options={{
					title: 'Protected Route',
					tabBarIcon: ({ color }) => (
						<AdminBarIcon
							name='star-o'
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
