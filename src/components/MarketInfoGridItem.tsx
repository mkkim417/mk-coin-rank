import React, { memo } from 'react';
import styled from 'styled-components';

interface MarketInfoGridItemProps {
  title: string;
  data: React.ReactNode;
}

export const MarketInfoGridItem: React.FC<MarketInfoGridItemProps> = memo(
  ({ title, data }) => {
    return (
      <StyledDiv>
        <TitleDiv>{title}</TitleDiv>
        <DataDiv>{data}</DataDiv>
      </StyledDiv>
    );
  },
);

const StyledDiv = styled.div`
  width: calc(50% - 10px);
  border: 1px solid rgb(52, 60, 72);
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const TitleDiv = styled.div`
  text-align: right;
  font-weight: 700;
  font-size: 0.7rem;
  margin-bottom: 2px;
`;

const DataDiv = styled.div`
  font-size: 1rem;
  text-align: right;
  margin-top: auto;
`;
