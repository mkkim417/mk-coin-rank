import React, { memo } from 'react';
import styled from 'styled-components';
import { AiOutlineInbox } from 'react-icons/ai';

interface Props {
  description?: React.ReactNode | string;
}

export const Empty: React.FC<Props> = memo(({ description }) => {
  const svgStyle = {};
  return (
    <StyledEmptyContainer>
      <AiOutlineInbox size={40} color="#fff" style={svgStyle} />
      <Description>
        {description ? description : '표시할 내용이 없습니다.'}
      </Description>
    </StyledEmptyContainer>
  );
});

const StyledEmptyContainer = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  box-sizing: border-box;
  color: #6f747d;
`;
const Description = styled.p`
  font-size: 0.9rem;
`;
