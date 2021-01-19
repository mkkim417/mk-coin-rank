# mk-coin-rank
* 가상자산의 시세정보를 제공하는 프론트엔드 SPA
* [CoinGecko API v3](https://www.coingecko.com/api/documentations/v3#/)를 활용

## 프로젝트 구조
```
src
├── App.tsx                         # App 메인 페이지, 글로벌 CSS 및 라우팅
├── components                      # 가장 작은 단위의 기본 컴포넌트
│   ├── BookmarkSelector.tsx        # 북마크 선택용 별 컴포넌트
│   ├── Button.tsx                  # 버튼 컴포넌트
│   ├── CoinPrice.tsx               # 가상자산 가격 컴포넌트
│   ├── CoinTitle.tsx               # 가상자산 제목 컴포넌트
│   ├── ColoredPrice.tsx            # 가격에 상승, 하락에 따라 색을 입혀주는 컴포넌트
│   ├── Container.tsx               # 기본 레이아웃 컨테이너 컴포넌트
│   ├── Empty.tsx                   # 내용이 없을 때 비어있음을 표시하는 컴포넌트
│   ├── Input.tsx                   # 입력 Input 컴포넌트
│   ├── Loader.tsx                  # 로딩중을 표시하는 컴포넌트
│   ├── MarketInfoGrid.tsx          # 다양한 마켓 정보를 표시해주는 컴포넌트의 그리드 컴포넌트
│   ├── MarketInfoGridItem.tsx      # 다양한 마켓 정보를 표시해주는 컴포넌트
│   ├── Select.tsx                  # 셀렉트박스 컴포넌트
│   ├── MoneySign.tsx               # 통화에 따른 통화 마크를 표시해주는 컴포넌트
│   ├── Tab.tsx                     # 탭 컴포넌트 
│   ├── Table                       # 테이블 컴포넌트 모음
│   │   ├── Cell.tsx                # 테이블 셀 컴포넌트
│   │   ├── Row.tsx                 # 테이블 Row 컴포넌트
│   │   ├── THCell.tsx              # 테이블 헤더 셀 컴포넌트
│   │   └── Table.tsx               # 테이블 컴포넌트
│   ├── Tabs.tsx                    # 탭 부모 컴포넌트
│   ├── Toast.tsx                   # 토스트 기본 아이템 컴포넌트
│   ├── ToastProvider.tsx           # 토스트를 제공하는 프로바이더, Context 사용, useToast Hooks을 제공한다
│   └── index.ts                    # export of all components
├── config
│   └── index.ts
├── containers                      # 하나 이상의 기능을 수행하거나 여러 컴포넌트의 조합으로 이루어진 컴포넌트
│   ├── CoinDescription.tsx         # 코인 설명을 toggle하는 Collapsible 컴포넌트
│   ├── CoinExchangeRate.tsx        # 가상자산 <-> 실물통화 가격을 계산해주는 컴포넌트
│   ├── CryptocurrencyList.tsx      # CoinGecko API를 활용해 옵션에 따라 가상자산을 리스팅하는 컴포넌트
│   └── Header.tsx                  # App의 헤더 컴포넌트
├── hooks                           # Custom Hooks
│   ├── index.ts                    # export of all hooks
│   └── useBookmarks.ts             # 로컬 스토리지와 State를 활용한 가상자산 북마크 기능 Hooks
├── index.tsx                       # React App 진입점
├── pages                           # 페이지를 구성하는 단위
│   ├── CryptocurrencyDetail.tsx    # 가상자산 상세 페이지, 해당 가상 자산의 상세 정보 및 가격, 가상자산<->실물통화 가격 변환, 설명 보기 등 기능 제공
│   └── Markets.tsx                 # 가상자산 리스트 탭 페이지, 가상자산 탭과 북마크 탭으로 구성되어 있음
├── react-app-env.d.ts
├── reportWebVitals.ts
├── services                        # 외부 서비스 관련 
│   ├── API.tsx                     # CoinGecko API 연결
│   └── types                   
│       └── API.types.tsx           # API 요청 및 리턴에 대한 인터페이스
└── utils
    ├── formatNumber.ts             # 자릿수에 따라 Number Formatting 처리하는 함수
    └── index.ts                    # export of all utils
```

## 실행방법
0. 시스템에 node.js가 설치되어 있어야 합니다. (개발 당시 버전 기준 v14.15.1, Mac OS X이며 Windows 10에서도 정상 실행 테스트 완료)
1. `npm install` or `yarn` 명령어로 의존성 모듈을 설치합니다.
2. 설치가 완료되면 `npm run start` or `yarn start`를 통해 로컬 서버를 띄워 실행할 수 있습니다. 브라우저에서 [http://localhost:3000](http://localhost:3000) 로 접속하세요.
3. `npm run build` or `yarn build` 명령어로 serving을 위한 빌드 파일을 생성할 수 있습니다. 빌드 완료 후 결과 파일은 `build/`에 생성됩니다.

## Dependencies
* react-icons : 아이콘 Assets을 쉽게 사용하기 위해서 사용
* axios : HTTP Request를 편하게 다루기 위해 사용
* bignumber.js : 자바스크립트 부동 소수점 계산 오류를 피하고 15자리 이상의 큰 수를 처리하기 위해 사용
* styled-components : CSS in JS를 사용한 스타일링
* styled-reset : 브라우저마다 다른 렌더링을 최대한 피하기 위해 Reset CSS 사용
* react-app-polyfill : IE 11 지원을 위한 Polyfill
* core-js : IE 11에서 styled-component를 지원하기 위해 사용
* husky, lint-staged, prettier : 코드 포매팅을 위한 라이브러리
  
## 비고
 * 본 Web App은 CRA(Create React App)로 생성되었으며 아래부터는 기존 CRA의 Readme입니다.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
