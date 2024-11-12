export const formatCurrency = (amount: number): string => {
	const formattedNumber = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount);

	return `${formattedNumber}$`;
};
