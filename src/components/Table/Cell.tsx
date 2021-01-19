import React from 'react';
import styled from 'styled-components';

interface CellProps {
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

export const Cell: React.FC<CellProps> = ({ align, children }) => {
  return <StyledTd align={align ? align : 'left'}>{children}</StyledTd>;
};

const StyledTd = styled.td<{
  align: 'left' | 'center' | 'right';
  colored?: string;
}>`
  border-top: 1px solid rgb(52, 60, 72);
  font-size: 0.85rem;
  text-align: ${(props) => props.align};
  border-bottom: 1px solid rgb(52, 60, 72);
  padding: 0.5rem 0.4rem;
`;
