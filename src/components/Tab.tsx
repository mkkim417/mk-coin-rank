import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface TabProps {
  to: string;
  children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = memo(({ to, children }) => {
  return (
    <StyledTab exact to={to}>
      {children}
    </StyledTab>
  );
});

const StyledTab = styled(NavLink)`
  padding: 0.3rem 0.5rem;
  background-color: #f4f4f4;
  color: #797979;
  text-decoration: none;
  flex: 1;
  text-align: center;
  &.active {
    background-color: #fff;
    font-weight: 700;
    color: #3266c2;
  }
`;
