import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.span`
  color: white;
  svg {
    height: 25px;
  }
`;

export default function Navbar() {
  return (
    <Nav>
      <Col>
        <Logo>Yooflix</Logo>
        <Items>
          <Item>
            <Link to='/'>Home</Link>
          </Item>
          <Item>
            <Link to='/tv'>Tv</Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search>
          <svg
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            ></path>
          </svg>
        </Search>
      </Col>
    </Nav>
  );
}
