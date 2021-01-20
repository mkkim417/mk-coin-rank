import React, { memo } from 'react';
import styled from 'styled-components';

interface RowProps {
  children: React.ReactNode;
}

export const Row: React.FC<RowProps> = memo(({ children }) => {
  return <StyledRow>{children}</StyledRow>;
});

const StyledRow = styled.tr``;
