import { Redirect, router, Stack } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import feathersClient from '@/lib/feathers';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { FeathersClientContext } from '@/lib/feathers/contexts/FeathersClientContext';

const StackLayout = () => {
	const { user } = useContext(FeathersClientContext);

	// if (!user) {
	// 	return <Redirect href='/auth/signin' />;
	// }

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
				name='news-feed'
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='profile'
				options={{ headerShown: false }}
			/>
		</Stack>
	);
};

export default StackLayout;
