export interface IMarketsParams {
  vs_currency: string;
  order: string;
  price_change_percentage: string;
  per_page: number;
  page: number;
}

export interface ICoinDataParams {
  id: string;
}

export interface IMarketsResponse {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_1h: number;
  price_change_percentage_1h_in_currency: number;
  price_change_24h: number;
  price_change_percentage_24h_in_currency: number;
  price_change_7d: number;
  price_change_percentage_7d_in_currency: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  atl: number;
  atl_change_percentage: number;
}

export interface ICoinDataResponse {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank?: number;
  localization?: {
    ko: string;
  };
  image?: {
    small?: string;
  };
  description?: {
    ko?: string;
    en?: string;
  };
  links?: {
    homepage: string[];
  };
  market_data?: {
    current_price: {
      [currency: string]: number;
    };
    total_volume: {
      [currency: string]: number;
    };
    market_cap: {
      [currency: string]: number;
    };
    price_change_percentage_24h_in_currency: {
      [currency: string]: number;
    };
  };
}

/*
{id: "bitcoin", symbol: "btc", name: "Bitcoin", asset_platform_id: null, block_time_in_minutes: 10,…}
additional_notices: []
asset_platform_id: null
block_time_in_minutes: 10
categories: ["Cryptocurrency"]
coingecko_rank: 1
coingecko_score: 84.13
community_data: {facebook_likes: null, twitter_followers: 76119, reddit_average_posts_48h: 7.667,…}
community_score: 88.866
country_origin: ""
description: {,…}
developer_data: {forks: 27153, stars: 48063, subscribers: 3636, total_issues: 5925, closed_issues: 5355,…}
closed_issues: 5355
code_additions_deletions_4_weeks: {additions: 4438, deletions: -3014}
commit_count_4_weeks: 238
forks: 27153
last_4_weeks_commit_activity_series: [2, 5, 2, 4, 4, 2, 7, 1, 8, 2, 3, 12, 5, 2, 2, 0, 3, 0, 1, 4, 0, 0, 1, 0, 0, 0, 0, 0]
pull_request_contributors: 707
pull_requests_merged: 8233
stars: 48063
subscribers: 3636
total_issues: 5925
developer_score: 98.846
genesis_date: "2009-01-03"
hashing_algorithm: "SHA-256"
id: "bitcoin"
image: {thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",…}
last_updated: "2021-01-19T11:13:11.151Z"
links: {homepage: ["http://www.bitcoin.org", "", ""],…}
liquidity_score: 99.274
localization: {en: "Bitcoin", de: "Bitcoin", es: "Bitcoin", fr: "Bitcoin", it: "Bitcoin", pl: "Bitcoin",…}
market_cap_rank: 1
market_data: {,…}
name: "Bitcoin"
public_interest_score: 0.258
public_interest_stats: {alexa_rank: 9440, bing_matches: null}
public_notice: null
sentiment_votes_down_percentage: 22.79
sentiment_votes_up_percentage: 77.21
status_updates: []
symbol: "btc"
tickers: [{base: "BTC", target: "USD",…}, {base: "BTC", target: "USDT",…}, {base: "BTC", target: "USDT",…},…]
*/
