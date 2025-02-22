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
import { string } from 'zod';
import { getInitials } from '../utils';
import { ActionButton } from '../button';

type CardProps = {
	name: string;
	description: string;
	button:
		| { text: string; action: () => void }
		| { text: string; action: () => void }[];
	action: (() => void)[] | { text: string; action: () => void }[];
	route: string;
	index: number;
	user: {
		name: string;
		username: string;
		avatar: string;
	};
};

type CardSmallProps = CardProps;

export const CardSmall = ({
	user,
	name,
	description,
	action,
	route,
	index,
}: CardSmallProps) => {
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
			<VStack>
				<Text className='font-semibold text-typography-900'>{name}</Text>
			</VStack>
			<Button
				variant='outline'
				action='secondary'
				className='p-2'
			>
				<ButtonIcon as={DownloadIcon} />
			</Button>
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
	date: string;
	image?: string;
};

export const CardMedium = ({
	user,
	name,
	description,
	action,
	route,
	index,
	date,
	image,
}: CardMediumProps) => {
	return (
		<Card className='p-5 rounded-lg max-w-[360px] m-3'>
			<Text className='text-sm font-normal mb-2 text-typography-700'>
				{date}
			</Text>
			<VStack className='mb-6'>
				<Image
					source={{
						uri:
							image ||
							'https://gluestack.github.io/public-blog-video-assets/yoga.png',
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
					<AvatarFallbackText>{getInitials(user.name)}</AvatarFallbackText>
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

export const CardLarge = ({
	user,
	name,
	description,
	button,
	route,
	index,
}: CardProps) => {
	return (
		<Card className='p-6 rounded-lg max-w-[360px] m-3'>
			<Box className='flex-row'>
				<Avatar className='mr-4'>
					<AvatarFallbackText>{getInitials(user.name)}</AvatarFallbackText>
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
			<Box className='my-5 flex-col sm:flex-row'>
				{<Text className='line-clamp-1 text-sm'>{description}</Text>}
			</Box>
			<ActionButton label={'Follow'} />
		</Card>
	);
};

export const CardNews = ({ item }: { item: any }) => {
	return (
		<VStack className='rounded-xl border border-border-300 p-5'>
			<Box className='w-full h-64 rounded'>
				<Image
					height={'100%'}
					width={'100%'}
					source={item.bannerUri}
					alt={item.bannerUri}
					contentFit='cover'
				/>
			</Box>
			<VStack
				className='mt-4'
				space='md'
			>
				<Text className='text-sm'>{item.publishedDate}</Text>
				<Heading size='md'>{item.title}</Heading>
				<Text className='line-clamp-2'>{item.description}</Text>
			</VStack>
		</VStack>
	);
};
