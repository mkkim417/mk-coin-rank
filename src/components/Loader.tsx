import React, { memo } from 'react';
import styled from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface Props {
  size?: number;
}

export const Loader: React.FC<Props> = memo(({ size = 30 }) => {
  const svgStyle = {};
  return (
    <StyledLoader>
      <StyledLoaderIcon size={size} color="#fff" style={svgStyle} />
    </StyledLoader>
  );
});

const StyledLoader = styled.div`
  text-align: center;
  padding: 1rem;
  box-sizing: border-box;
`;
const StyledLoaderIcon = styled(AiOutlineLoading3Quarters)`
  vertical-align: middle;
  animation: rotate 1.5s linear infinite;
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;
