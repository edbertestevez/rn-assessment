export const getPercentageValue = ({
  percentage,
  value,
}: {
  percentage: number;
  value: number;
}) => {
  return parseFloat(((percentage / 100) * value).toFixed(2));
};

export const getMilliseconds = (seconds: number) => {
  return seconds * 1000;
};
