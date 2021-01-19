import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Table,
  Button,
  ColoredPrice,
  Loader,
  Empty,
  Row,
  THCell,
  Cell,
  MoneySign,
  Select,
  SelectOptionProps,
  BookmarkSelector,
} from 'components';
import { useBookmarks } from 'hooks';
import API from 'services/API';
import { IMarketsResponse } from 'services/types/API.types';
import { formatNumber } from 'utils';

interface CryptocurrencyListProps {
  bookmarkPageMode?: boolean;
  isUseOptionControl?: boolean;
}

interface ICryptocurrencyListTableOptions {
  viewType: string;
  perPage: number;
  page: number;
  currency: string;
}

const VIEW_TYPE_OPTIONS: SelectOptionProps[] = [
  {
    name: '전체 보기',
    value: 'ALL',
  },
  {
    name: '북마크 보기',
    value: 'BOOKMARK',
  },
];

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

const PER_PAGE_OPTIONS: SelectOptionProps[] = [
  {
    name: '10개 보기',
    value: 10,
  },
  {
    name: '30개 보기',
    value: 30,
  },
  {
    name: '50개 보기',
    value: 50,
  },
];

export default function CryptocurrencyList({
  isUseOptionControl = true,
  bookmarkPageMode = false,
}: CryptocurrencyListProps) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [list, setList] = useState<IMarketsResponse[]>([]);
  const [
    tableOptions,
    setTableOptions,
  ] = useState<ICryptocurrencyListTableOptions>({
    viewType: bookmarkPageMode ? 'BOOKMARK' : 'ALL',
    perPage: 50,
    page: 0,
    currency: 'krw',
  });
  const [bookmarks, toggleItem] = useBookmarks();

  const getMarkets = useCallback(
    (currency: string, page: number, perPage: number) => {
      setIsFetching(true);
      API.getMarkets({
        vs_currency: currency,
        order: 'market_cap_desc',
        price_change_percentage: '1h,24h,7d',
        per_page: perPage,
        page: page,
      })
        .then(({ data }) => {
          setList((prevList) => (page === 1 ? data : [...prevList, ...data]));
          setTableOptions((prevOptions) => ({
            ...prevOptions,
            page,
            perPage,
            currency,
          }));
        })
        .catch(() => {})
        .finally(() => {
          setIsFetching(false);
        });
    },
    [],
  );

  const renderList = () => {
    let returnList = list;
    if (tableOptions.viewType === 'BOOKMARK')
      returnList = list.filter((n) => bookmarks[n.id]);

    return returnList;
  };

  const onChangeOptions = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'viewType') {
      setTableOptions((prevOptions) => ({
        ...prevOptions,
        [name]: value,
      }));
    } else {
      setTableOptions((prevOptions) => ({
        ...prevOptions,
        page: 0,
      }));
      setList([]);
      getMarkets(
        name === 'currency' ? value : tableOptions.currency,
        1,
        name === 'perPage' ? Number(value) : tableOptions.perPage,
      );
    }
  };

  const onLoadMore = () => {
    getMarkets(
      tableOptions.currency,
      tableOptions.page + 1,
      tableOptions.perPage,
    );
  };

  useEffect(() => {
    getMarkets('krw', 1, 50);
  }, [getMarkets]);

  return (
    <ListWrap>
      {isUseOptionControl ? (
        <OptionContainer>
          <Select
            name="viewType"
            value={tableOptions.viewType}
            onChange={onChangeOptions}
            disabled={isFetching}
            options={VIEW_TYPE_OPTIONS}
          />
          <Select
            name="currency"
            value={tableOptions.currency}
            onChange={onChangeOptions}
            disabled={isFetching}
            options={CURRENCY_OPTIONS}
          />
          <Select
            name="perPage"
            value={tableOptions.perPage}
            onChange={onChangeOptions}
            disabled={isFetching}
            options={PER_PAGE_OPTIONS}
          />
        </OptionContainer>
      ) : null}
      <Table dark>
        <thead>
          <Row>
            <THCell></THCell>
            <THCell>코인명</THCell>
            <THCell>심볼</THCell>
            <THCell align="right">가격</THCell>
            <THCell align="right">1시간 변화</THCell>
            <THCell align="right">24시간 변화</THCell>
            <THCell align="right">일주일 변화</THCell>
            <THCell align="right">24시간 거래대금</THCell>
          </Row>
        </thead>
        <tbody>
          {renderList().map((coin) => (
            <Row key={coin.id}>
              <Cell>
                <BookmarkSelector
                  size={18}
                  active={bookmarks[coin.id]}
                  onClick={() => toggleItem(coin.id, coin.name)}
                />
              </Cell>
              <Cell>
                <Link to={`/cryptocurrency/${coin.id}`}>{coin.name}</Link>
              </Cell>
              <Cell>{(coin.symbol || '').toUpperCase()}</Cell>
              <Cell align="right">
                <MoneySign currency={tableOptions.currency} />
                {formatNumber(coin.current_price, 2)}
              </Cell>
              <Cell align="right">
                <ColoredPrice
                  price={coin.price_change_percentage_1h_in_currency}
                >
                  {coin.price_change_percentage_1h_in_currency
                    ? coin.price_change_percentage_1h_in_currency.toFixed(1)
                    : '-'}
                  %
                </ColoredPrice>
              </Cell>
              <Cell align="right">
                <ColoredPrice
                  price={coin.price_change_percentage_24h_in_currency}
                >
                  {coin.price_change_percentage_24h_in_currency
                    ? coin.price_change_percentage_24h_in_currency.toFixed(1)
                    : '-'}
                  %
                </ColoredPrice>
              </Cell>
              <Cell align="right">
                <ColoredPrice
                  price={coin.price_change_percentage_7d_in_currency}
                >
                  {coin.price_change_percentage_7d_in_currency
                    ? coin.price_change_percentage_7d_in_currency.toFixed(1)
                    : '-'}
                  %
                </ColoredPrice>
              </Cell>
              <Cell align="right">
                <MoneySign currency={tableOptions.currency} />
                {formatNumber(coin.total_volume, 0)}
              </Cell>
            </Row>
          ))}
        </tbody>
      </Table>
      {!isFetching && renderList().length === 0 && <Empty />}
      {isFetching && <Loader />}
      {!bookmarkPageMode && (
        <Button onClick={onLoadMore} block disabled={isFetching}>
          더 보기
        </Button>
      )}
    </ListWrap>
  );
}

const ListWrap = styled.div`
  padding: 15px;
  box-sizing: border-box;
  overflow-x: auto;
`;
const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0.7rem 0.5rem;
  * + * {
    margin-left: 0.5rem;
  }
`;
