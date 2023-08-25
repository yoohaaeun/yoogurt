import { useQuery } from '@tanstack/react-query';
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  IContentResult,
} from '../api';
import styled from 'styled-components';
import Banner from '../components/Banner';
import Slider from '../components/Slider';
import TestSlider from '../components/TestSlider';

const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
`;

const Container = styled.div`
  top: 820px;
  position: absolute;
`;

export default function Home() {
  const { data: nowPlayingMovies } = useQuery<IContentResult>(
    ['nowPlaying', 'nowPlaying'],
    getNowPlayingMovies
  );

  const { data: popularMovies } = useQuery<IContentResult>(
    ['popular', 'popular'],
    getPopularMovies
  );

  const { data: topRatedMovies } = useQuery<IContentResult>(
    ['top_rated', 'top_rated'],
    getTopRatedMovies
  );

  const { data: upcomingMovies } = useQuery<IContentResult>(
    ['upcoming', 'upcoming'],
    getUpcomingMovies
  );

  return (
    <Wrapper>
      <Banner data={nowPlayingMovies} />
      <Container>
        <Slider data={popularMovies} title={'보고 또 봐도 좋은 인기 영화'} />
        <Slider data={nowPlayingMovies} title={'현재 상영 중인 영화'} />
        <Slider data={topRatedMovies} title={'평점이 높은 영화'} />
        <Slider data={upcomingMovies} title={'두근두근 Coming Soon'} />
      </Container>
    </Wrapper>
  );
}
