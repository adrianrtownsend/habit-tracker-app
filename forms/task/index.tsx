import {
	FormControl,
	FormControlError,
	FormControlErrorIcon,
	FormControlErrorText,
	FormControlHelperText,
	FormControlLabel,
	FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Button, ButtonText, ButtonIcon } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { createTask } from '@/lib/feathers/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle } from 'lucide-react-native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Keyboard } from 'react-native';
import feathersClient from '@/lib/feathers';

const taskFormSchema = z.object({
	text: z.string().optional(),
});

type TaskFormSchemaType = z.infer<typeof taskFormSchema>;

export const TaskForm = () => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TaskFormSchemaType>({
		resolver: zodResolver(taskFormSchema),
	});

	const [formData, setFormData] = useState({
		text: '',
	});

	const [validated, setValidated] = useState({
		textValid: true,
	});

	const handleState = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = async (e: React.SyntheticEvent) => {
		const res = await createTask(formData);
		console.log('res: ', res);
	};

	const handleKeyPress = () => {
		Keyboard.dismiss();
		handleSubmit(onSubmit)();
	};

	return (
		<VStack className='w-full'>
			<VStack
				space='2xl'
				className='w-full border-border-100'
			>
				<FormControl
					isInvalid={!!errors?.text}
					className='w-full'
				>
					<Controller
						defaultValue=''
						name='text'
						control={control}
						rules={{
							validate: async (value) => {
								try {
									await taskFormSchema.parseAsync({ text: value });
									return true;
								} catch (error: any) {
									return error.message;
								}
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input>
								<InputField
									placeholder='Enter text'
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
						<FormControlErrorIcon as={AlertTriangle} />
						<FormControlErrorText>
							{errors?.text?.message ||
								(!validated.textValid && 'text ID not found')}
						</FormControlErrorText>
					</FormControlError>
				</FormControl>
			</VStack>
			<VStack
				className='w-full my-7 '
				space='lg'
			>
				<Button
					className='w-full'
					onPress={handleSubmit(onSubmit)}
				>
					<ButtonText className='font-medium'>Submit</ButtonText>
				</Button>
			</VStack>
		</VStack>
	);
};
