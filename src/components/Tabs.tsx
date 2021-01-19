import React, { memo } from 'react';
import styled from 'styled-components';

interface TabsProps {
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = memo(({ children }) => {
  return <StyledTabs>{children}</StyledTabs>;
});

const StyledTabs = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f4f4f4;
  padding: 0.3rem;
`;
