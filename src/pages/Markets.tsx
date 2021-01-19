import React from 'react';
import { Container, Tabs, Tab } from 'components';
import styled from 'styled-components';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import CryptocurrencyList from 'containers/CryptocurrencyList';

export default function Markets() {
  const { path } = useRouteMatch();

  return (
    <div>
      <TabsContainer>
        <Container>
          <Tabs>
            <Tab to="/markets">가상자산 목록</Tab>
            <Tab to="/markets/bookmarks">북마크</Tab>
          </Tabs>
        </Container>
      </TabsContainer>
      <ListContainer>
        <Container>
          <Switch>
            <Route exact path={`${path}`} component={CryptocurrencyList} />
            <Route
              path={`${path}/bookmarks`}
              render={() => (
                <div>
                  <CryptocurrencyList
                    isUseOptionControl={false}
                    bookmarkPageMode={true}
                  />
                </div>
              )}
            />
          </Switch>
        </Container>
      </ListContainer>
    </div>
  );
}

const TabsContainer = styled.div`
  background-color: #f4f4f4;
`;
const ListContainer = styled.div`
  background-color: #252e3d;
`;
