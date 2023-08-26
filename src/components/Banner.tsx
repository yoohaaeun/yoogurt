import styled from 'styled-components';
import { IContentResult } from '../api';
import { makeImagePath } from '../utils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 85vh;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 60px;
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
`;

interface IBanner {
  data: IContentResult;
}

export default function Banner({ data }: IBanner) {
  return (
    <Wrapper>
      <Title>{data?.results[0].title}</Title>
      <Overview>{data?.results[0].overview}</Overview>
    </Wrapper>
  );
}
