import React from 'react';
import styled from 'styled-components';

interface TableProps {
  dark?: boolean;
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ dark = false, children }) => {
  return (
    <StyledTable cellPadding="0" cellSpacing="0" dark={dark}>
      {children}
    </StyledTable>
  );
};

const StyledTable = styled.table<{ dark: boolean }>`
  width: 100%;
  border-collapse: collapse;
  color: ${(props) => (props.dark ? '#fff' : '#000')};
  a {
    color: #7e8186;
  }
`;
