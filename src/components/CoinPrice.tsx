import React, { memo } from 'react';
import styled from 'styled-components';
import { MoneySign, ColoredPrice } from 'components';
import { formatNumber } from 'utils';
interface Props {
  price: number;
  priceChange: number;
  subPrice: number;
  subPriceChange: number;
  currency: string;
  subCurrency: string;
  subCurrencyDecimalPoint: number;
}

export const CoinPrice: React.FC<Props> = memo(
  ({
    price = 0,
    priceChange = 0,
    subPrice = 0,
    subPriceChange = 0,
    currency,
    subCurrency,
    subCurrencyDecimalPoint = 8,
  }) => {
    return (
      <StyledDiv>
        <div>
          <MainPrice>
            <MoneySign currency={currency} />
            {formatNumber(price)}
          </MainPrice>
          <PricePercent>
            <ColoredPrice price={priceChange}>
              {priceChange.toFixed(1)}%
            </ColoredPrice>
          </PricePercent>
        </div>
        <div>
          <SubPrice>
            {subPrice.toFixed(subCurrencyDecimalPoint)} {subCurrency}
          </SubPrice>
          <PricePercent>
            <ColoredPrice price={subPriceChange}>
              {subPriceChange.toFixed(1)}%
            </ColoredPrice>
          </PricePercent>
        </div>
      </StyledDiv>
    );
  },
);

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;

const MainPrice = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
`;
const PricePercent = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  margin-left: 8px;
`;
const SubPrice = styled.span`
  font-size: 0.8rem;
  color: #848484;
`;
