export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(app)',
};

import { Stack, Redirect } from 'expo-router';
import { useFirebase } from '@/auth/firebase';
import { Text } from '@gluestack-ui/themed';

export default function AppLayout() {
	const { user, loading } = useFirebase();

	// if (loading) return <Text>loading...</Text>;

	// if (!user) {
	// 	return <Redirect href='/login' />;
	// }

	return (
		<Stack>
			<Stack.Screen
				name='(app)'
				options={{ headerShown: false }}
			/>
		</Stack>
	);
}
