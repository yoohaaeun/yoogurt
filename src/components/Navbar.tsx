import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AiOutlineSearch } from 'react-icons/ai';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.h1`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  font-size: 25px;
  font-weight: 900;
  color: ${(props) => props.theme.red};
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  position: relative;
  transition: color 0.3s ease-in-out;
  display: felx;
  flex-direction: column;
  justify-content: center;

  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -8px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const Search = styled.span`
  font-size: 20px;
`;

export default function Navbar() {
  const homeMatch = useMatch('/');
  const tvMatch = useMatch('tv');

  return (
    <Nav>
      <Col>
        <Logo>Yooflix</Logo>
        <Items>
          <Item>
            <Link to='/'>홈 {homeMatch && <Circle layoutId='circle' />}</Link>
          </Item>
          <Item>
            <Link to='/tv'>
              시리즈 {tvMatch && <Circle layoutId='circle' />}
            </Link>
          </Item>
          <Item>영화</Item>
          <Item>New! 요즘 대세 콘텐츠</Item>
        </Items>
      </Col>
      <Col>
        <Search>
          <AiOutlineSearch />
        </Search>
      </Col>
    </Nav>
  );
}
