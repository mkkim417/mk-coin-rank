import React, { memo, useCallback } from 'react';

interface MoneySignProps {
  currency: string;
}

export const MoneySign: React.FC<MoneySignProps> = memo(({ currency }) => {
  const chooseCurrencyIcon = useCallback(() => {
    switch (currency.toLowerCase()) {
      case 'usd':
        return '$';
      case 'krw':
        return '₩';
      default:
        return '';
    }
  }, [currency]);
  return <>{chooseCurrencyIcon()}</>;
});
