import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Div = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: beige;
`;

export default function Search() {
  const {
    state: { keyword },
  } = useLocation();

  return <Div></Div>;
}
