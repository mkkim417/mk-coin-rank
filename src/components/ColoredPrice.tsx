import React, { memo } from 'react';
import styled from 'styled-components';

interface Props {
  price: number;
  children: React.ReactNode;
}

export const ColoredPrice: React.FC<Props> = memo(({ price, children }) => {
  return (
    <StyledSpan colored={price > 0 ? 'red' : price < 0 ? 'blue' : undefined}>
      {children}
    </StyledSpan>
  );
});

const StyledSpan = styled.span<{
  colored?: string;
}>`
  color: ${(props) =>
    props.colored === 'red'
      ? 'rgb(234, 39, 105)'
      : props.colored === 'blue'
      ? 'rgb(90, 125, 243)'
      : 'inherit'};
`;
