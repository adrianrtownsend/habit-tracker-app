import React, { useContext } from 'react';
import { Redirect, Stack } from 'expo-router';
import { FeathersClientContext } from '@/lib/feathers/contexts/FeathersClientContext';
const StackLayout = () => {
	const { user } = useContext(FeathersClientContext);
	if (user) {
		return <Redirect href='/' />;
	}

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
