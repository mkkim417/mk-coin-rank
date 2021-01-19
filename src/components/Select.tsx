import React, { memo } from 'react';
import styled from 'styled-components';

export interface SelectOptionProps {
  name: string;
  value: string | number;
}

interface SelectProps {
  name: string;
  value: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
  options: SelectOptionProps[];
}

export const Select: React.FC<SelectProps> = memo(
  ({ name, value, onChange, disabled, options }) => {
    return (
      <StyledSelect
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {options.map((n) => (
          <option key={n.value} value={n.value}>
            {n.name}
          </option>
        ))}
      </StyledSelect>
    );
  },
);

const StyledSelect = styled.select`
  padding: 0.3rem;
`;
