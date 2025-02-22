import { formatDistance } from 'date-fns';

export const getInitials = (name: string) => {
	return name
		.split(' ')
		.map((word) => word[0])
		.join('')
		.toUpperCase();
};

export const getTimeSpan = (start: string, end: string) => {
	return formatDistance(new Date(start), new Date(end), { addSuffix: true });
};
