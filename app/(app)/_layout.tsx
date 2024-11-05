import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import auth from '@/lib/feathers/auth';
import { Redirect, Stack } from 'expo-router';
import feathersclient from '@/lib/feathers';
import { FeathersClientContext } from '@/lib/feathers/contexts/FeathersClientContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const { user } = useContext(FeathersClientContext);

	if (!user) {
		return <Redirect href='/auth/signin' />;
	}

	return <Stack />;
}
