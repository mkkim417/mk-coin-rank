import React, { useState } from 'react';
import { Button } from 'components';
import styled from 'styled-components';

interface Props {
  description: string;
}

const CoinDescription: React.FC<Props> = ({ description }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <Button onClick={() => setIsOpen((prevState) => !prevState)} block>
        설명 보기
      </Button>
      {isOpen ? (
        <DescriptionContainer
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : null}
    </div>
  );
};

const DescriptionContainer = styled.div`
  font-size: 0.85rem;
  line-height: 1.7;
  margin-top: 15px;
`;

export default CoinDescription;
