import { formatDistance } from 'date-fns';

export const getFormattedDate = (date: Date) => {
	return formatDistance(date, new Date(), { addSuffix: true });
};
