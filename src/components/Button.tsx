import React, { memo } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  block?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = memo(
  ({ block = false, disabled = false, children, ...props }) => {
    return (
      <StyledButton block={block} disabled={disabled} {...props}>
        {children}
      </StyledButton>
    );
  },
);

const StyledButton = styled.button<{ block: boolean }>`
  padding: 0.5rem 0.8rem;
  background-color: #fff;
  color: #3266c2;
  border: 0px none;
  border-radius: 5px;
  text-align: center;
  width: ${(props) => (props.block ? '100%' : 'auto')};
  cursor: pointer;
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  &.active {
    background-color: #fff;
    font-weight: 700;
    color: #3266c2;
  }
`;
