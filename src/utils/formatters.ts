export const formatCurrency = (amount: number): string => {
  return '$' + parseFloat(amount.toString()).toFixed(2);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
