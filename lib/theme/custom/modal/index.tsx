import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import {
	Modal as GSModal,
	ModalBackdrop,
	ModalContent,
	ModalCloseButton,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from '@/components/ui/modal';
import { Icon, CloseIcon } from '@/components/ui/icon';
import React from 'react';

export const Modal = ({
	head,
	body,
}: {
	head: React.ReactNode;
	body: React.ReactNode;
}) => {
	const [showModal, setShowModal] = React.useState(false);

	return (
		<Center className='h-[300px]'>
			<Button onPress={() => setShowModal(true)}>
				<ButtonText>Show Modal</ButtonText>
			</Button>
			<GSModal
				isOpen={showModal}
				onClose={() => {
					setShowModal(false);
				}}
				size='md'
			>
				<ModalBackdrop />
				<ModalContent>
					<ModalHeader>
						<Heading
							size='md'
							className='text-typography-950'
						>
							{head}
						</Heading>
						<ModalCloseButton>
							<Icon
								as={CloseIcon}
								size='md'
								className='stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900'
							/>
						</ModalCloseButton>
					</ModalHeader>
					<ModalBody>{body}</ModalBody>
					<ModalFooter>
						<Button
							variant='outline'
							action='secondary'
							onPress={() => {
								setShowModal(false);
							}}
						>
							<ButtonText>Cancel</ButtonText>
						</Button>
						<Button
							onPress={() => {
								setShowModal(false);
							}}
						>
							<ButtonText>Explore</ButtonText>
						</Button>
					</ModalFooter>
				</ModalContent>
			</GSModal>
		</Center>
	);
};
