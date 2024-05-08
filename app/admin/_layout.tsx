export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(admin)',
};

import { Stack } from 'expo-router';

export default function AdminLayout() {
	return (
		<Stack>
			<Stack.Screen
				name='(admin)'
				options={{ headerShown: false }}
			/>
		</Stack>
	);
}
