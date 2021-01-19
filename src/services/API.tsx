import axios from 'axios';
import { IMarketsParams, ICoinDataParams } from 'services/types/API.types';

const API_HOST = 'https://api.coingecko.com/api/v3';

const getMarkets = (params: IMarketsParams) => {
  const GET_MARKET_ENDPOINT = `${API_HOST}/coins/markets`;
  return axios.get(GET_MARKET_ENDPOINT, { params });
};
const getCoinData = (params: ICoinDataParams) => {
  const GET_COIN_DATA_ENDPOINT = `${API_HOST}/coins/${params.id}`;
  return axios.get(GET_COIN_DATA_ENDPOINT);
};

const API = {
  getMarkets,
  getCoinData,
};

export default API;
