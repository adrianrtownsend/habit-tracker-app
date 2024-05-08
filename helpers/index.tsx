export const isObjectEmpty = (obj: any) => Object.keys(obj).length === 0;

export const truncateString = (str: string, limit = 10) => {
	if (str.length <= limit) {
		return str;
	}
	// Return str truncated with '...' concatenated to the end of str.
	return str.slice(0, limit) + '...';
};
