import React from 'react';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';

interface ActionButtonProps {
	label?: string;
	onPress?: () => void;
}

export const ActionButton = ({ label, onPress }: ActionButtonProps) => {
	return (
		<Button
			action='secondary'
			variant='outline'
			onPress={onPress}
			className='py-2 px-4'
		>
			<ButtonText>{label || ''}</ButtonText>
		</Button>
	);
};
