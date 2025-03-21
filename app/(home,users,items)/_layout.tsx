import React, { useContext } from 'react';
import { FeathersClientContext } from '@/lib/feathers/contexts/FeathersClientContext';
import { Redirect, Slot } from 'expo-router';

import { Profile } from '@/screens/profile-screens/profile';
import { Dashboard } from '@/screens/dashboard/dashboard-layout';
import { NewsAndFeed } from '@/screens/news-feed/news-and-feed';
import { useColorScheme } from '@/hooks/useColorScheme';

export const unstable_settings = {
	initialRouteName: 'home',
	users: {
		initialRouteName: 'users',
	},
	items: {
		initialRouteName: 'items',
	},
};

export default function DynamicLayout() {
	const colorScheme = useColorScheme();

	const { user } = useContext(FeathersClientContext);
	if (!user) {
		return <Redirect href='/auth/signin' />;
	}

	return <Slot />;
}
