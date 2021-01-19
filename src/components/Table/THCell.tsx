import React from 'react';
import styled from 'styled-components';

interface THCellProps {
  align?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
}

export const THCell: React.FC<THCellProps> = ({ align, children }) => {
  return <StyledTh align={align ? align : 'left'}>{children}</StyledTh>;
};

const StyledTh = styled.th<{
  align: 'left' | 'center' | 'right';
  colored?: string;
}>`
  border-top: 1px solid rgb(52, 60, 72);
  text-align: ${(props) => props.align};
  border-bottom: 1px solid rgb(52, 60, 72);
  padding: 0.5rem 0.4rem;
  font-size: 0.7rem;
  font-weight: bold;
  color: #828080;
`;
