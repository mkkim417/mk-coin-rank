import React from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Header from 'containers/Header';
import Markets from 'pages/Markets';
import CryptocurrencyDetail from 'pages/CryptocurrencyDetail';
import reset from 'styled-reset';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/markets" />} />
          <Route path="/markets" component={Markets} />
          <Route
            path="/cryptocurrency/:coin_id"
            component={CryptocurrencyDetail}
          />
        </Switch>
      </Router>
    </div>
  );
}

const GlobalStyle = createGlobalStyle`
  ${reset}
  body{
    background-color: #252e3e;
    font-family: AppleSDGothicNeo-Regular, Helvetica, sans-serif;
  }
`;

export default App;
