import React from 'react';
import { Stack } from 'expo-router';
const StackLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name='index'
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='signin'
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='signup'
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='forgot-password'
				options={{ headerShown: false }}
			/>
		</Stack>
	);
};

export default StackLayout;
