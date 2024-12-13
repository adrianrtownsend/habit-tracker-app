import React, { useRef, useState } from 'react';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import {
	AlertCircleIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	CloseIcon,
	EditIcon,
	Icon,
	MenuIcon,
	PhoneIcon,
	SettingsIcon,
} from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Pressable } from '@/components/ui/pressable';
import { AlertCircle, type LucideIcon } from 'lucide-react-native';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import Image from '@unitools/image';
import { ScrollView } from '@/components/ui/scroll-view';
import {
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
} from '@/components/ui/modal';
import { Input, InputField } from '@/components/ui/input';
import {
	Avatar,
	AvatarBadge,
	AvatarFallbackText,
	AvatarImage,
} from '@/components/ui/avatar';
import useRouter from '@unitools/router';
import { ProfileIcon } from './assets/icons/profile';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Center } from '@/components/ui/center';
import { cn } from '@gluestack-ui/nativewind-utils/cn';
import { Keyboard, Platform } from 'react-native';
import { SubscriptionIcon } from './assets/icons/subscription';
import { DownloadIcon } from './assets/icons/download';
import { FaqIcon } from './assets/icons/faq';
import { NewsBlogIcon } from './assets/icons/news-blog';
import { HomeIcon } from './assets/icons/home';
import { GlobeIcon } from './assets/icons/globe';
import { InboxIcon } from './assets/icons/inbox';
import { HeartIcon } from './assets/icons/heart';
import { Divider } from '@/components/ui/divider';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
	FormControl,
	FormControlError,
	FormControlErrorIcon,
	FormControlErrorText,
	FormControlLabel,
	FormControlLabelText,
} from '@/components/ui/form-control';
import {
	Select,
	SelectBackdrop,
	SelectContent,
	SelectDragIndicator,
	SelectDragIndicatorWrapper,
	SelectIcon,
	SelectInput,
	SelectItem,
	SelectPortal,
	SelectTrigger,
} from '@/components/ui/select';
import { CameraSparklesIcon } from './assets/icons/camera-sparkles';
import { EditPhotoIcon } from './assets/icons/edit-photo';
import { isWeb } from '@gluestack-ui/nativewind-utils/IsWeb';
import { router } from 'expo-router';
import { MobileHeader, WebHeader } from '@/lib/theme/custom/header';
import { MobileFooter } from '@/lib/theme/custom/footer';

type userSchemaDetails = z.infer<typeof userSchema>;

// Define the Zod schema
const userSchema = z.object({
	firstName: z
		.string()
		.min(1, 'First name is required')
		.max(50, 'First name must be less than 50 characters'),
	lastName: z
		.string()
		.min(1, 'Last name is required')
		.max(50, 'Last name must be less than 50 characters'),
	gender: z.enum(['male', 'female', 'other']),
	phoneNumber: z
		.string()
		.regex(
			/^\+?[1-9]\d{1,14}$/,
			'Phone number must be a valid international phone number'
		),
	city: z
		.string()
		.min(1, 'City is required')
		.max(100, 'City must be less than 100 characters'),
	state: z
		.string()
		.min(1, 'State is required')
		.max(100, 'State must be less than 100 characters'),
	country: z
		.string()
		.min(1, 'Country is required')
		.max(100, 'Country must be less than 100 characters'),
	zipcode: z
		.string()
		.min(1, 'Zipcode is required')
		.max(20, 'Zipcode must be less than 20 characters'),
});

type UserFormProps = {
	props: {
		isEmailFocused: boolean;
		setIsEmailFocused: React.Dispatch<React.SetStateAction<boolean>>;
		isNameFocused: boolean;
		setIsNameFocused: React.Dispatch<React.SetStateAction<boolean>>;
		isPasswordFocused: boolean;
		setIsPasswordFocused: React.Dispatch<React.SetStateAction<boolean>>;
		isPhoneNumberFocused: boolean;
		setIsPhoneNumberFocused: React.Dispatch<React.SetStateAction<boolean>>;
		isCityFocused: boolean;
		setIsCityFocused: React.Dispatch<React.SetStateAction<boolean>>;
		isStateFocused: boolean;
		setIsStateFocused: React.Dispatch<React.SetStateAction<boolean>>;
		isCountryFocused: boolean;
		setIsCountryFocused: React.Dispatch<React.SetStateAction<boolean>>;
		isZipcodeFocused: boolean;
		setIsZipcodeFocused: React.Dispatch<React.SetStateAction<boolean>>;
	};
};

export const userForm = ({ props }: UserFormProps) => {
	const ref = useRef(null);
	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<userSchemaDetails>({
		resolver: zodResolver(userSchema),
	});
	const {
		isEmailFocused,
		setIsEmailFocused,
		isNameFocused,
		setIsNameFocused,
		isPasswordFocused,
		setIsPasswordFocused,
		isPhoneNumberFocused,
		setIsPhoneNumberFocused,
		isCityFocused,
		setIsCityFocused,
		isStateFocused,
		setIsStateFocused,
		isCountryFocused,
		setIsCountryFocused,
		isZipcodeFocused,
		setIsZipcodeFocused,
	} = props;

	const handleKeyPress = () => {
		Keyboard.dismiss();
	};

	const onSubmit = (_data: userSchemaDetails) => {
		reset();
	};

	return (
		<VStack space='2xl'>
			<HStack className='items-center justify-between'>
				<FormControl
					isInvalid={!!errors.firstName || isNameFocused}
					className='w-[47%]'
				>
					<FormControlLabel className='mb-2'>
						<FormControlLabelText>First Name</FormControlLabelText>
					</FormControlLabel>
					<Controller
						name='firstName'
						control={control}
						rules={{
							validate: async (value) => {
								try {
									await userSchema.parseAsync({
										firstName: value,
									});
									return true;
								} catch (error: any) {
									return error.message;
								}
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input>
								<InputField
									placeholder='First Name'
									type='text'
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									onSubmitEditing={handleKeyPress}
									returnKeyType='done'
								/>
							</Input>
						)}
					/>
					<FormControlError>
						<FormControlErrorIcon
							as={AlertCircleIcon}
							size='md'
						/>
						<FormControlErrorText>
							{errors?.firstName?.message}
						</FormControlErrorText>
					</FormControlError>
				</FormControl>
				<FormControl
					isInvalid={!!errors.lastName || isNameFocused}
					className='w-[47%]'
				>
					<FormControlLabel className='mb-2'>
						<FormControlLabelText>Last Name</FormControlLabelText>
					</FormControlLabel>
					<Controller
						name='lastName'
						control={control}
						rules={{
							validate: async (value) => {
								try {
									await userSchema.parseAsync({
										lastName: value,
									});
									return true;
								} catch (error: any) {
									return error.message;
								}
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input>
								<InputField
									placeholder='Last Name'
									type='text'
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									onSubmitEditing={handleKeyPress}
									returnKeyType='done'
								/>
							</Input>
						)}
					/>
					<FormControlError>
						<FormControlErrorIcon
							as={AlertCircleIcon}
							size='md'
						/>
						<FormControlErrorText>
							{errors?.lastName?.message}
						</FormControlErrorText>
					</FormControlError>
				</FormControl>
			</HStack>
			<HStack className='items-center justify-between'>
				<FormControl
					className='w-[47%]'
					isInvalid={!!errors.gender}
				>
					<FormControlLabel className='mb-2'>
						<FormControlLabelText>Gender</FormControlLabelText>
					</FormControlLabel>
					<Controller
						name='gender'
						control={control}
						rules={{
							validate: async (value) => {
								try {
									await userSchema.parseAsync({ city: value });
									return true;
								} catch (error: any) {
									return error.message;
								}
							},
						}}
						render={({ field: { onChange, value } }) => (
							<Select
								onValueChange={onChange}
								selectedValue={value}
							>
								<SelectTrigger
									variant='outline'
									size='md'
								>
									<SelectInput placeholder='Select' />
									<SelectIcon
										className='mr-3'
										as={ChevronDownIcon}
									/>
								</SelectTrigger>
								<SelectPortal>
									<SelectBackdrop />
									<SelectContent>
										<SelectDragIndicatorWrapper>
											<SelectDragIndicator />
										</SelectDragIndicatorWrapper>
										<SelectItem
											label='Male'
											value='male'
										/>
										<SelectItem
											label='Female'
											value='female'
										/>
										<SelectItem
											label='Others'
											value='others'
										/>
									</SelectContent>
								</SelectPortal>
							</Select>
						)}
					/>
					<FormControlError>
						<FormControlErrorIcon
							as={AlertCircle}
							size='md'
						/>
						<FormControlErrorText>
							{errors?.gender?.message}
						</FormControlErrorText>
					</FormControlError>
				</FormControl>

				<FormControl
					className='w-[47%]'
					isInvalid={!!errors.phoneNumber}
				>
					<FormControlLabel className='mb-2'>
						<FormControlLabelText>Phone number</FormControlLabelText>
					</FormControlLabel>
					<Controller
						name='phoneNumber'
						control={control}
						rules={{
							validate: async (value) => {
								try {
									await userSchema.parseAsync({ phoneNumber: value });
									return true;
								} catch (error: any) {
									return error.message;
								}
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<HStack className='gap-1'>
								<Select className='w-[28%]'>
									<SelectTrigger
										variant='outline'
										size='md'
									>
										<SelectInput placeholder='+91' />
										<SelectIcon
											className='mr-1'
											as={ChevronDownIcon}
										/>
									</SelectTrigger>
									<SelectPortal>
										<SelectBackdrop />
										<SelectContent>
											<SelectDragIndicatorWrapper>
												<SelectDragIndicator />
											</SelectDragIndicatorWrapper>
											<SelectItem
												label='93'
												value='93'
											/>
											<SelectItem
												label='155'
												value='155'
											/>
											<SelectItem
												label='1-684'
												value='-1684'
											/>
										</SelectContent>
									</SelectPortal>
								</Select>
								<Input className='flex-1'>
									<InputField
										placeholder='89867292632'
										type='text'
										value={value}
										onChangeText={onChange}
										keyboardType='number-pad'
										onBlur={onBlur}
										onSubmitEditing={handleKeyPress}
										returnKeyType='done'
									/>
								</Input>
							</HStack>
						)}
					/>
					<FormControlError>
						<FormControlErrorIcon
							as={AlertCircle}
							size='md'
						/>
						<FormControlErrorText>
							{errors?.phoneNumber?.message}
						</FormControlErrorText>
					</FormControlError>
				</FormControl>
			</HStack>
			<HStack className='items-center justify-between'>
				<FormControl
					className='w-[47%]'
					isInvalid={(!!errors.city || isEmailFocused) && !!errors.city}
				>
					<FormControlLabel className='mb-2'>
						<FormControlLabelText>City</FormControlLabelText>
					</FormControlLabel>
					<Controller
						name='city'
						control={control}
						rules={{
							validate: async (value) => {
								try {
									await userSchema.parseAsync({ city: value });
									return true;
								} catch (error: any) {
									return error.message;
								}
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								onValueChange={onChange}
								selectedValue={value}
							>
								<SelectTrigger
									variant='outline'
									size='md'
								>
									<SelectInput placeholder='Select' />
									<SelectIcon
										className='mr-3'
										as={ChevronDownIcon}
									/>
								</SelectTrigger>
								<SelectPortal>
									<SelectBackdrop />
									<SelectContent>
										<SelectDragIndicatorWrapper>
											<SelectDragIndicator />
										</SelectDragIndicatorWrapper>
										<SelectItem
											label='Bengaluru'
											value='Bengaluru'
										/>
										<SelectItem
											label='Udupi'
											value='Udupi'
										/>
										<SelectItem
											label='Others'
											value='Others'
										/>
									</SelectContent>
								</SelectPortal>
							</Select>
						)}
					/>
					<FormControlError>
						<FormControlErrorIcon
							as={AlertCircle}
							size='md'
						/>
						<FormControlErrorText>{errors?.city?.message}</FormControlErrorText>
					</FormControlError>
				</FormControl>

				<FormControl
					className='w-[47%]'
					isInvalid={(!!errors.state || isEmailFocused) && !!errors.state}
				>
					<FormControlLabel className='mb-2'>
						<FormControlLabelText>State</FormControlLabelText>
					</FormControlLabel>
					<Controller
						name='state'
						control={control}
						rules={{
							validate: async (value) => {
								try {
									await userSchema.parseAsync({ state: value });
									return true;
								} catch (error: any) {
									return error.message;
								}
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								onValueChange={onChange}
								selectedValue={value}
							>
								<SelectTrigger
									variant='outline'
									size='md'
								>
									<SelectInput placeholder='Select' />
									<SelectIcon
										className='mr-3'
										as={ChevronDownIcon}
									/>
								</SelectTrigger>
								<SelectPortal>
									<SelectBackdrop />
									<SelectContent>
										<SelectDragIndicatorWrapper>
											<SelectDragIndicator />
										</SelectDragIndicatorWrapper>
										<SelectItem
											label='Karnataka'
											value='Karnataka'
										/>
										<SelectItem
											label='Haryana'
											value='Haryana'
										/>
										<SelectItem
											label='Others'
											value='Others'
										/>
									</SelectContent>
								</SelectPortal>
							</Select>
						)}
					/>
					<FormControlError>
						<FormControlErrorIcon
							as={AlertCircle}
							size='md'
						/>
						<FormControlErrorText>
							{errors?.state?.message}
						</FormControlErrorText>
					</FormControlError>
				</FormControl>
			</HStack>
			<HStack className='items-center justify-between'>
				<FormControl
					className='w-[47%]'
					isInvalid={(!!errors.country || isEmailFocused) && !!errors.country}
				>
					<FormControlLabel className='mb-2'>
						<FormControlLabelText>Country</FormControlLabelText>
					</FormControlLabel>
					<Controller
						name='country'
						control={control}
						rules={{
							validate: async (value) => {
								try {
									await userSchema.parseAsync({ country: value });
									return true;
								} catch (error: any) {
									return error.message;
								}
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								onValueChange={onChange}
								selectedValue={value}
							>
								<SelectTrigger
									variant='outline'
									size='md'
								>
									<SelectInput placeholder='Select' />
									<SelectIcon
										className='mr-3'
										as={ChevronDownIcon}
									/>
								</SelectTrigger>
								<SelectPortal>
									<SelectBackdrop />
									<SelectContent>
										<SelectDragIndicatorWrapper>
											<SelectDragIndicator />
										</SelectDragIndicatorWrapper>
										<SelectItem
											label='India'
											value='India'
										/>
										<SelectItem
											label='Sri Lanka'
											value='Sri Lanka'
										/>
										<SelectItem
											label='Others'
											value='Others'
										/>
									</SelectContent>
								</SelectPortal>
							</Select>
						)}
					/>
					<FormControlError>
						<FormControlErrorIcon
							as={AlertCircle}
							size='md'
						/>
						<FormControlErrorText>
							{errors?.country?.message}
						</FormControlErrorText>
					</FormControlError>
				</FormControl>
				<FormControl
					className='w-[47%]'
					isInvalid={!!errors.zipcode || isEmailFocused}
				>
					<FormControlLabel className='mb-2'>
						<FormControlLabelText>Zipcode</FormControlLabelText>
					</FormControlLabel>
					<Controller
						name='zipcode'
						control={control}
						rules={{
							validate: async (value) => {
								try {
									await userSchema.parseAsync({
										zipCode: value,
									});
									return true;
								} catch (error: any) {
									return error.message;
								}
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input>
								<InputField
									placeholder='Enter 6 - digit zip code'
									type='text'
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									onSubmitEditing={handleKeyPress}
									returnKeyType='done'
								/>
							</Input>
						)}
					/>
					<FormControlError>
						<FormControlErrorIcon
							as={AlertCircle}
							size='md'
						/>
						<FormControlErrorText>
							{errors?.zipcode?.message}
						</FormControlErrorText>
					</FormControlError>
				</FormControl>
			</HStack>
			<Button
				onPress={() => {
					handleSubmit(onSubmit)();
				}}
				className='flex-1 p-2'
			>
				<ButtonText>Save Changes</ButtonText>
			</Button>
		</VStack>
	);
};
