export const getPercentageValue = ({
  percentage,
  value,
}: {
  percentage: number;
  value: number;
}) => {
  return (percentage / 100) * value;
};
