import React, { memo } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface Props {
  onClick?: (event: React.MouseEvent<SVGElement>) => void;
  size: number;
  active: boolean;
}

export const BookmarkSelector: React.FC<Props> = memo(
  ({ onClick, size, active }) => {
    const svgStyle = {
      cursor: 'pointer',
      verticalAlign: 'middle',
    };
    return (
      <>
        {active ? (
          <AiFillStar
            onClick={onClick}
            size={size}
            color="#f6b305"
            style={svgStyle}
          />
        ) : (
          <AiOutlineStar onClick={onClick} size={size} style={svgStyle} />
        )}
      </>
    );
  },
);
