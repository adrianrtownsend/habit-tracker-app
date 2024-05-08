import { sortExample, sortPostExample } from '@/api';
import EditScreenInfo from '@/components/EditScreenInfo';
import {
	Heading,
	Center,
	Divider,
	Text,
	Button,
	ButtonText,
} from '@gluestack-ui/themed';

export default function Tab2() {
	const { isPending, error, data, isFetching } = sortExample();

	const mutation = sortPostExample();

	return (
		<Center flex={1}>
			<Heading
				bold
				size='2xl'
			>
				Expo V3 - Tab 1
			</Heading>
			<Divider
				marginVertical={30}
				width='80%'
			/>
			<Text p='$4'>Example below to use gluestack-ui components.</Text>
			<Text p='$4'>
				Sort Example{' '}
				{isFetching
					? 'fetching'
					: isPending
					? 'pending'
					: 'data'
					? 'hit'
					: 'error' + error}
			</Text>
			<Button onPress={() => mutation.mutate()}>
				<ButtonText>Click me</ButtonText>
			</Button>
			<Text p='$4'>
				{mutation.data ? JSON.stringify(mutation.data) : 'No data'}
			</Text>
			<Text p='$4'>{mutation.isSuccess && 'mutation added'}</Text>
			<EditScreenInfo path='app/(app)/(tabs)/tab1.tsx' />
		</Center>
	);
}
