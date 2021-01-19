import React, { memo } from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

export const Container: React.FC<Props> = memo(({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
});

const StyledContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;
