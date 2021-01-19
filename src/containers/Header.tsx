import React from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import { AiOutlineLeft } from 'react-icons/ai';

export default function Header() {
  const history = useHistory();

  return (
    <StyledHeader>
      <BackButtonContainer>
        <AiOutlineLeft size={30} onClick={() => history.goBack()} />
      </BackButtonContainer>
      <LogoLink to="/">MkCoinRank</LogoLink>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: relative;
  padding: 0.7rem;
  background-color: #3265c2;
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
`;
const LogoLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const BackButtonContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
