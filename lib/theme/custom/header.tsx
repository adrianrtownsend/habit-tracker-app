import React from 'react';
import { HStack } from '@/components/ui/hstack';
import { ChevronLeftIcon, Icon, MenuIcon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { router } from 'expo-router';
import { HeartIcon } from 'lucide-react-native';
import { HeaderProps, MobileHeaderProps } from '@/types';

export const WebHeader = (props: HeaderProps) => {
	return (
		<HStack className='pt-4 pr-10 pb-3 bg-background-0 items-center justify-between border-b border-border-300'>
			<HStack className='items-center'>
				<Pressable
					onPress={() => {
						props.toggleSidebar();
					}}
				>
					<Icon
						as={MenuIcon}
						size='lg'
						className='mx-5'
					/>
				</Pressable>
				<Text className='text-2xl'>{props.title}</Text>
			</HStack>

			<Pressable
				onPress={() => {
					router.push('/profile');
				}}
			>
				<Avatar className='h-9 w-9'>
					<AvatarFallbackText className='font-light'>A</AvatarFallbackText>
				</Avatar>
			</Pressable>
		</HStack>
	);
};

export const MobileHeader = (props: MobileHeaderProps) => {
	return (
		<HStack
			className='py-6 px-4 border-b border-border-300 bg-background-0 items-center justify-between'
			space='md'
		>
			<HStack
				className='items-center'
				space='sm'
			>
				<Pressable
					onPress={() => {
						router.back();
					}}
				>
					<Icon as={ChevronLeftIcon} />
				</Pressable>
				<Text className='text-xl'>{props.title}</Text>
			</HStack>
			<Icon
				as={HeartIcon}
				className='h-8 w-20'
			/>
		</HStack>
	);
};
