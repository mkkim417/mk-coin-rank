import BigNumber from 'bignumber.js';

export const formatNumber = (
  val: string | number,
  decimalLimit?: number,
): string => {
  const inputs = val.toString().split('.');
  const formattedNum = !Number.isNaN(
    new BigNumber(inputs[0].replace(/[^0-9.]/g, '')).toNumber(),
  )
    ? new BigNumber(inputs[0].replace(/[^0-9.]/g, ''))
        .toFixed()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
    : '';
  let formattedFloat =
    inputs[1] !== undefined && decimalLimit !== 0
      ? `.${inputs[1].replace(/[^0-9]/g, '')}`
      : '';
  if (decimalLimit)
    formattedFloat = formattedFloat.substring(0, decimalLimit + 1);
  return `${formattedNum}${formattedFloat}`;
};
