import {
	AlertCircleIcon,
	Box,
	Button,
	ButtonText,
	Center,
	Divider,
	FormControl,
	FormControlLabel,
	FormControlLabelText,
	FormControlHelper,
	FormControlHelperText,
	FormControlError,
	FormControlErrorIcon,
	FormControlErrorText,
	Heading,
	Icon,
	Input,
	InputField,
	InputSlot,
	InputIcon,
	Link,
	LinkText,
	Text,
	VStack,
	HStack,
	Pressable,
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { EyeIcon, EyeOffIcon, ChromeIcon } from 'lucide-react-native';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
	useFirebase,
	loginWithEmailAndPassword,
	loginWithGooglePopup,
} from '../auth/firebase';
import { isObjectEmpty } from '../helpers';
import { emailRule, passwordRule } from '../lib/validation/rules';

const Login = () => {
	const { loading } = useFirebase();
	const navigation = useNavigation();
	const [formError, setFormError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const togglePasswordShow = () => {
		setShowPassword((prev) => !prev);
	};

	const onSubmit = (data: { email: string; password: string }) => {
		const { email, password } = data;
		if (isObjectEmpty(errors)) {
			setIsLoading(true);
			loginWithEmailAndPassword(email, password)
				.catch((error: any) => {
					console.error('login error: ', error);
					setFormError('Invalid username and password combination');
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	};

	return (
		<Center flex={1}>
			<VStack
				width='$full'
				gap='$5'
			>
				<VStack>
					<Heading textAlign='center'>Log In</Heading>
					<Text textAlign='center'>Hi! Welcome back, you've been missed</Text>
					<Text textAlign='center'>{!loading ? 'works' : 'not'}</Text>
				</VStack>
				{formError && (
					<Box p='$3'>
						<Box
							borderRadius='$md'
							bg='$error100'
							p='$5'
						>
							<Text color='$error500'>{formError}</Text>
						</Box>
					</Box>
				)}
				<Box
					p='$3'
					gap='$5'
				>
					<Box gap='$3'>
						<FormControl
							isRequired
							isInvalid={!!errors.email}
						>
							<FormControlLabel>
								<FormControlLabelText>Email</FormControlLabelText>
							</FormControlLabel>
							<Controller
								control={control}
								rules={emailRule}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input>
										<InputField
											type='text'
											placeholder='example@gmail.com'
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
										/>
									</Input>
								)}
								name='email'
							/>
							<FormControlError>
								<FormControlErrorIcon as={AlertCircleIcon} />
								<FormControlErrorText>
									{errors.email?.message}
								</FormControlErrorText>
							</FormControlError>
						</FormControl>

						<FormControl
							isRequired
							isInvalid={!!errors.password}
						>
							<FormControlLabel mb='$1'>
								<FormControlLabelText>Password</FormControlLabelText>
							</FormControlLabel>
							<Controller
								control={control}
								rules={passwordRule}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input>
										<InputField
											type={showPassword ? 'text' : 'password'}
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
										/>
										<InputSlot
											pr='$3'
											onPress={togglePasswordShow}
										>
											{/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
											<InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
										</InputSlot>
									</Input>
								)}
								name='password'
							/>
							<FormControlError>
								<FormControlErrorIcon as={AlertCircleIcon} />
								<FormControlErrorText>
									{errors.password?.message}
								</FormControlErrorText>
							</FormControlError>
						</FormControl>
					</Box>
					<Box>
						<FormControl>
							<Button
								borderRadius='$full'
								onPress={handleSubmit(onSubmit)}
							>
								<ButtonText
									fontSize='$sm'
									fontWeight='$medium'
								>
									{isLoading ? 'Signing In...' : 'Sign In'}
								</ButtonText>
							</Button>
						</FormControl>
					</Box>
				</Box>
				<VStack
					p='$3'
					gap='$3'
				>
					<HStack
						justifyContent='center'
						space='md'
					>
						<Center width='$1/5'>
							<Divider />
						</Center>
						<Text textAlign='center'>Or sign in with</Text>
						<Center width='$1/5'>
							<Divider />
						</Center>
					</HStack>
					<HStack
						justifyContent='space-evenly'
						paddingHorizontal='$1/6'
					>
						<Pressable
							onPress={() => loginWithGooglePopup()}
							p='$3'
							borderWidth='$1'
							borderRadius='$full'
						>
							<Icon
								as={ChromeIcon}
								color='black'
							/>
						</Pressable>
					</HStack>
				</VStack>
				<HStack justifyContent='center'>
					<Text>Don't have an account?</Text>
				</HStack>
			</VStack>
		</Center>
	);
};

export default Login;
