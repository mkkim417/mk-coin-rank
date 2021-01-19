import React, { memo } from 'react';
import styled from 'styled-components';

interface MarketInfoGridProps {
  children: React.ReactNode;
}

export const MarketInfoGrid: React.FC<MarketInfoGridProps> = memo(
  ({ children }) => {
    return <StyledDiv>{children}</StyledDiv>;
  },
);

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
