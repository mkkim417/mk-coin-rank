import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {
  CoinTitle,
  CoinPrice,
  Loader,
  MarketInfoGrid,
  MarketInfoGridItem,
  Container,
  Table,
  Row,
  Cell,
  BookmarkSelector,
  MoneySign,
  Select,
  SelectOptionProps,
  Empty,
  Button,
} from 'components';
import CoinDescription from 'containers/CoinDescription';
import { useParams } from 'react-router-dom';
import { useBookmarks } from 'hooks';
import API from 'services/API';
import { ICoinDataResponse } from 'services/types/API.types';
import CoinExchangeRate from 'containers/CoinExchangeRate';
import { formatNumber } from 'utils';

interface ICryptocurrencyDetailParams {
  coin_id: string;
}

const CURRENCY_OPTIONS: SelectOptionProps[] = [
  {
    name: 'KRW 보기',
    value: 'krw',
  },
  {
    name: 'USD 보기',
    value: 'usd',
  },
];

export default function CryptocurrencyDetail() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [coinData, setCoinData] = useState<ICoinDataResponse>({
    id: '',
    name: '',
    symbol: '',
    image: {
      small: '',
    },
  });
  const [currency, setCurrency] = useState<string>('krw');
  const params: ICryptocurrencyDetailParams = useParams();
  const [bookmarks, toggleItem] = useBookmarks();

  const getCoinData = useCallback((coinId: string) => {
    setIsFetching(true);
    API.getCoinData({
      id: coinId,
    })
      .then(({ data }) => {
        setCoinData(data);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  const onChangeCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  const onBookmarkClick = () => {
    toggleItem(coinData.id, coinData.name);
  };

  useEffect(() => {
    getCoinData(params.coin_id);
  }, [getCoinData, params.coin_id]);

  return (
    <PageLayout>
      <Container>
        {isFetching ? (
          <Loader />
        ) : isError ? (
          <Empty
            description={
              <>
                <p>로딩 중 오류가 발생했습니다.</p>
                <Button onClick={() => getCoinData(params.coin_id)}>
                  다시 불러오기
                </Button>
              </>
            }
          />
        ) : (
          <>
            <OptionHeader>
              <BookmarkSelector
                size={40}
                active={bookmarks[coinData.id]}
                onClick={onBookmarkClick}
              />
              <Select
                name="currency"
                value={currency}
                onChange={onChangeCurrency}
                options={CURRENCY_OPTIONS}
              />
            </OptionHeader>
            <CoinHeader>
              <CoinTitle
                name={coinData.localization?.ko || coinData.name}
                subName={`${coinData.name} / ${coinData.symbol?.toUpperCase()}`}
                imageSrc={coinData.image?.small ? coinData.image?.small : ''}
              />
              <CoinPrice
                price={coinData.market_data?.current_price?.[currency] || 0}
                priceChange={
                  coinData.market_data
                    ?.price_change_percentage_24h_in_currency?.[currency] || 0
                }
                subPrice={coinData.market_data?.current_price?.btc || 0}
                subPriceChange={
                  coinData.market_data?.price_change_percentage_24h_in_currency
                    ?.btc || 0
                }
                currency={currency}
                subCurrency="BTC"
                subCurrencyDecimalPoint={8}
              />
            </CoinHeader>
            <MarketInfoRow>
              <Table dark>
                <tbody>
                  <Row>
                    <Cell>시가총액 Rank</Cell>
                    <Cell>{coinData.market_cap_rank}</Cell>
                  </Row>
                  {coinData.links?.homepage[0] && (
                    <Row>
                      <Cell>웹사이트</Cell>
                      <Cell>
                        <a
                          href={coinData.links?.homepage[0]}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {coinData.links?.homepage[0]}
                        </a>
                      </Cell>
                    </Row>
                  )}
                </tbody>
              </Table>
              <MarketInfoGrid>
                <MarketInfoGridItem
                  title="시가총액"
                  data={
                    <span>
                      <MoneySign currency={currency} />
                      {formatNumber(
                        coinData.market_data?.market_cap?.[currency] || '',
                        0,
                      )}
                    </span>
                  }
                />
                <MarketInfoGridItem
                  title="24시간 거래대금"
                  data={
                    <span>
                      <MoneySign currency={currency} />
                      {formatNumber(
                        coinData.market_data?.total_volume?.[currency] || '',
                        0,
                      )}
                    </span>
                  }
                />
              </MarketInfoGrid>
            </MarketInfoRow>

            <CoinExchangeRate
              exchangeRate={
                coinData.market_data?.current_price?.[currency] || 0
              }
              baseCurrency={coinData.symbol?.toUpperCase()}
              targetCurrency={currency.toUpperCase()}
              targetCurrencyDecimalLimit={2}
            />

            {coinData.description?.ko && coinData.description?.en && (
              <DescriptionContainer>
                <CoinDescription
                  description={
                    coinData.description?.ko
                      ? coinData.description?.ko
                      : coinData.description?.en
                  }
                />
              </DescriptionContainer>
            )}
          </>
        )}
      </Container>
    </PageLayout>
  );
}

const PageLayout = styled.div`
  display: flex;
  background-color: #252e3d;
  color: #fff;
  justify-content: space-between;
  padding: 15px;
`;
const OptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;
const CoinHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const MarketInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px 0;
  & > * {
    flex: 1 1 0;
  }
  & > table {
    width: auto;
  }
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;
const DescriptionContainer = styled.div`
  margin-top: 15px;
`;
