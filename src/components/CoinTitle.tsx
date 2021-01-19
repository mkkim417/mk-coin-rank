import React, { memo } from 'react';
import styled from 'styled-components';

interface Props {
  imageSrc: string;
  name: string;
  subName?: string;
}

export const CoinTitle: React.FC<Props> = memo(
  ({ imageSrc, name, subName }) => {
    return (
      <StyledDiv>
        <img src={imageSrc} alt={name} />
        <CoinNameContainer>
          <CoinName>{name}</CoinName>
          {subName && <CoinSubName>{subName}</CoinSubName>}
        </CoinNameContainer>
      </StyledDiv>
    );
  },
);

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const CoinNameContainer = styled.span`
  display: inline-block;
  margin-left: 8px;
`;

const CoinName = styled.p`
  display: block;
  margin: 0;
`;

const CoinSubName = styled.small`
  display: block;
  color: #717a89;
`;
