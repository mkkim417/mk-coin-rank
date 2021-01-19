import React, { memo, forwardRef } from 'react';
import styled from 'styled-components';

interface InputCustomProps {
  inputRef?: React.RefObject<HTMLInputElement>;
  prefix?: string;
}
export type InputProps = InputCustomProps &
  React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = memo(
  ({ prefix, inputRef, ...props }) => {
    return (
      <InputContainer>
        {prefix && <Prefix>{prefix}</Prefix>}
        <StyledInput ref={inputRef} {...props} />
      </InputContainer>
    );
  },
);

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Prefix = styled.div`
  border: 1px solid rgb(52, 60, 72);
  padding: 0.3rem 0.6rem;
  background-color: #171d27;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const StyledInput = styled(
  forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => (
    <input ref={ref} {...props} />
  )),
)`
  border: 1px solid rgb(52, 60, 72);
  background-color: #363f50;
  color: #fff;
  flex: 1 1 0;
  padding: 0.3rem;
  &:focus {
    outline: none;
  }
`;
