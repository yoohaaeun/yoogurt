import styled from 'styled-components';
import { makeImagePath } from '../utils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 250px 0;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 68px;
`;

const Overview = styled.p`
  font-size: 28px;
  width: 50%;
`;

export default function Banner({ data }: any) {
  return (
    <Wrapper>
      <Title>{data?.results[0].title}</Title>
      <Overview>{data?.results[0].overview}</Overview>
    </Wrapper>
  );
}
