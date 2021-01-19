import React, { useState, useRef, useEffect } from 'react';
import { Input } from 'components';
import styled from 'styled-components';
import { BsArrowLeftRight } from 'react-icons/bs';
import BigNumber from 'bignumber.js';
import { formatNumber } from 'utils';

interface CoinExchangeRateProps {
  exchangeRate: number;
  baseCurrency: string;
  targetCurrency: string;
  targetCurrencyDecimalLimit?: number;
}

const CoinExchangeRate: React.FC<CoinExchangeRateProps> = ({
  exchangeRate,
  baseCurrency,
  targetCurrency,
  targetCurrencyDecimalLimit = 0,
}) => {
  const [cryptoValue, setCryptoValue] = useState<string>('1');
  const [currencyValue, setCurrencyValue] = useState<string>('');
  const cryptoInputRef = useRef<HTMLInputElement>(null);
  const currencyInputRef = useRef<HTMLInputElement>(null);

  const onChangeCryptoValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart } = e.target;
    let nextSelectionStart = selectionStart!;
    const nextCryptoValue = formatNumber(value, 8);

    setCryptoValue(nextCryptoValue);
    setCurrencyValue(
      formatNumber(
        new BigNumber(nextCryptoValue.replace(/[^0-9.]/g, ''))
          .multipliedBy(exchangeRate)
          .toFixed(),
        targetCurrencyDecimalLimit,
      ),
    );

    const prevCommaNum = (
      cryptoValue
        .substring(
          0,
          cryptoValue.length < nextCryptoValue.length
            ? selectionStart! - 1
            : undefined,
        )
        .match(/,/g) || []
    ).length;
    const newCommaNum = (
      nextCryptoValue
        .substring(
          0,
          cryptoValue.length < nextCryptoValue.length
            ? selectionStart!
            : undefined,
        )
        .match(/,/g) || []
    ).length;
    nextSelectionStart += newCommaNum - prevCommaNum;

    setTimeout(() => {
      cryptoInputRef.current!.setSelectionRange(
        nextSelectionStart,
        nextSelectionStart,
      );
    }, 0);
  };

  const onChangeCurrencyValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart } = e.target;
    let nextSelectionStart = selectionStart!;
    const nextCurrencyValue = formatNumber(value, targetCurrencyDecimalLimit);

    setCurrencyValue(nextCurrencyValue);
    setCryptoValue(
      formatNumber(
        new BigNumber(nextCurrencyValue.replace(/[^0-9.]/g, ''))
          .dividedBy(exchangeRate)
          .toFixed(),
        8,
      ),
    );

    const prevCommaNum = (
      currencyValue
        .substring(
          0,
          currencyValue.length < nextCurrencyValue.length
            ? selectionStart! - 1
            : undefined,
        )
        .match(/,/g) || []
    ).length;
    const newCommaNum = (
      nextCurrencyValue
        .substring(
          0,
          currencyValue.length < nextCurrencyValue.length
            ? selectionStart!
            : undefined,
        )
        .match(/,/g) || []
    ).length;
    nextSelectionStart += newCommaNum - prevCommaNum;

    setTimeout(() => {
      currencyInputRef.current!.setSelectionRange(
        nextSelectionStart,
        nextSelectionStart,
      );
    }, 0);
  };

  useEffect(() => {
    setCurrencyValue(
      formatNumber(
        new BigNumber(cryptoValue.replace(/[^0-9.]/g, ''))
          .multipliedBy(exchangeRate)
          .toFixed(),
        targetCurrencyDecimalLimit,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeRate, targetCurrencyDecimalLimit]);

  return (
    <CoinExchangeRateContainer>
      <Title>가격계산</Title>
      <CoinExchangeRateInnerContainer>
        <Input
          inputRef={cryptoInputRef}
          prefix={baseCurrency}
          value={cryptoValue}
          onChange={onChangeCryptoValue}
        />
        <IconWrapper>
          <BsArrowLeftRight size={30} color="#fff" />
        </IconWrapper>
        <Input
          inputRef={currencyInputRef}
          prefix={targetCurrency}
          value={currencyValue}
          onChange={onChangeCurrencyValue}
        />
      </CoinExchangeRateInnerContainer>
    </CoinExchangeRateContainer>
  );
};

const CoinExchangeRateContainer = styled.div`
  width: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
  background-color: #444e61;
`;
const Title = styled.h4`
  color: #fff;
  margin: 0 0 10px;
`;
const IconWrapper = styled.div`
  padding: 10px;
  text-align: center;
  svg {
    transform: rotate(0deg);
  }

  @media (max-width: 576px) {
    svg {
      transform: rotate(90deg);
    }
  }
`;
const CoinExchangeRateInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  & > div:nth-child(2n-1) {
    flex: 1;
  }

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export default CoinExchangeRate;
