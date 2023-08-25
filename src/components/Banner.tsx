import styled from 'styled-components';
import { makeImagePath } from '../utils';

const Wrapper = styled.div<{ $bgPhoto: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  position: relative;
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
    <Wrapper $bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}>
      <Title>{data?.results[0].title}</Title>
      <Overview>{data?.results[0].overview}</Overview>
    </Wrapper>
  );
}
