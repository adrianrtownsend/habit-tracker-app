import React from 'react';
import { HStack } from '@/components/ui/hstack';
import {
	Avatar,
	AvatarFallbackText,
	AvatarImage,
} from '@/components/ui/avatar';
import { VStack } from '@/components/ui/vstack';
import { DownloadIcon } from 'lucide-react-native';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { Divider } from '@/components/ui/divider';

type CardProps = {
	props: {
		name: string;
		description: string;
		actions: (() => void)[];
		route: string;
		index: number;
		user: {
			name: string;
			username: string;
			avatar: string;
		};
	};
};

type CardSmallProps = CardProps;

export const CardSmall = ({ props }: CardSmallProps) => {
	const { user, name, description, actions, route, index } = props;

	return (
		<HStack
			className='p-4 items-center h-full border border-border-300 rounded-xl'
			space='lg'
			key={index}
		>
			<Avatar>
				<Avatar>
					<AvatarFallbackText>{user.name ?? 'U'}</AvatarFallbackText>
				</Avatar>
			</Avatar>
			<Button
				variant='outline'
				action='secondary'
				className='p-2'
			>
				<ButtonIcon as={DownloadIcon} />
			</Button>
			<VStack>
				<Text className='font-semibold text-typography-900'>{name}</Text>
				<Text className='line-clamp-1 text-sm'>{description}</Text>
			</VStack>
			<Button
				action='secondary'
				variant='outline'
			>
				<ButtonText>Follow</ButtonText>
			</Button>
		</HStack>
	);
};

type CardMediumProps = CardProps & {
	props: {
		date: string;
		image?: string;
	};
};

export const CardMedium = ({ props }: CardMediumProps) => {
	const { user, name, description, actions, route, index, date, image } = props;
	return (
		<Card className='p-5 rounded-lg max-w-[360px] m-3'>
			<Text className='text-sm font-normal mb-2 text-typography-700'>
				{date}
			</Text>
			<VStack className='mb-6'>
				<Image
					source={{
						uri: 'https://gluestack.github.io/public-blog-video-assets/yoga.png',
					}}
					className='mb-6 h-[240px] w-full rounded-md aspect-[263/240]'
					alt='image'
				/>
				<Heading
					size='md'
					className='mb-4'
				>
					{name}
				</Heading>
				<Text size='sm'>{description}</Text>
			</VStack>
			<Box className='flex-row'>
				<Avatar className='mr-3'>
					<AvatarFallbackText>RR</AvatarFallbackText>
					<AvatarImage
						source={{
							uri:
								user.avatar ||
								'https://gluestack.github.io/public-blog-video-assets/john.png',
						}}
						alt='image'
					/>
				</Avatar>
				<VStack>
					<Heading
						size='sm'
						className='mb-1'
					>
						{user.name}
					</Heading>
					<Text size='sm'>{user.username}</Text>
				</VStack>
			</Box>
		</Card>
	);
};

export const CardLarge = ({ props }: CardProps) => {
	const { user, name, description, actions, route, index } = props;
	return (
		<Card className='p-6 rounded-lg max-w-[360px] m-3'>
			<Box className='flex-row'>
				<Avatar className='mr-4'>
					<AvatarFallbackText>JD</AvatarFallbackText>
					<AvatarImage
						source={{
							uri:
								user.avatar ||
								'https://gluestack.github.io/public-blog-video-assets/camera.png',
						}}
					/>
				</Avatar>
				<VStack>
					<Heading
						size='md'
						className='mb-1'
					>
						{user.name}
					</Heading>
					<Text size='sm'>{user.username}</Text>
				</VStack>
			</Box>
			<Box className='my-5 flex-col sm:flex-row'>{/* header section */}</Box>
			<Box className='mb-5 flex-col sm:mb-6 sm:flex-row'>
				<Image
					source={{
						uri: 'https://gluestack.github.io/public-blog-video-assets/parrot.png',
					}}
					className='mb-3 rounded-md w-full h-[140px] sm:mb-0 sm:mr-3 sm:w-[150px] sm:h-[154px]'
					alt='image'
				/>
				<Image
					source={{
						uri: 'https://gluestack.github.io/public-blog-video-assets/dear.png',
					}}
					className='rounded-md w-full h-[140px] sm:w-[150px] sm:h-[154px]'
					alt='image'
				/>
			</Box>
			<Button className='py-2 px-4'>
				<ButtonText size='sm'>Follow</ButtonText>
			</Button>
		</Card>
	);
};
