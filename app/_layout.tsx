import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useContext, useEffect } from 'react';
import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';
import { useColorScheme } from '@/components/useColorScheme';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '../global.css';
import {
	FeathersClientContext,
	FeathersClientProvider,
} from '@/lib/feathers/contexts/FeathersClientContext';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(auth)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	return (
		<FeathersClientProvider>
			<GluestackUIProvider mode={(colorScheme ?? 'light') as 'light' | 'dark'}>
				{/* <ThemeProvider
					value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
				> */}
				<Stack>
					<Stack.Screen
						name='(app)'
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='auth'
						options={{ headerShown: false }}
					/>
					<Stack.Screen name='+not-found' />
				</Stack>
				{/* </ThemeProvider> */}
			</GluestackUIProvider>
		</FeathersClientProvider>
	);
}
