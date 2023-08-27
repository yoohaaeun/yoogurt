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
import { makeImagePath } from '../utils';
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';

const Wrapper = styled.div<{ $bgPhoto: string }>`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  overflow-x: hidden;
  background-attachment: fixed;
`;

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0 150px 60px 150px;
`;

export default function Home() {
  const { scrollY } = useScroll();
  const bgAnimation = useAnimation();

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

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (y > 150) {
      bgAnimation.start({
        backgroundColor: 'rgba(0,0,0,0.8)',
      });
    } else {
      bgAnimation.start({
        backgroundColor: 'rgba(0,0,0,0)',
      });
    }
  });

  return (
    <Wrapper
      $bgPhoto={makeImagePath(nowPlayingMovies?.results[0].backdrop_path || '')}
    >
      <Container
        animate={bgAnimation}
        initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      >
        {nowPlayingMovies && <Banner data={nowPlayingMovies} />}

        {popularMovies && (
          <Slider
            data={popularMovies}
            category={'popular'}
            title={'보고 또 봐도 좋은 인기 영화'}
          />
        )}
        {nowPlayingMovies && (
          <Slider
            data={nowPlayingMovies}
            category={'nowPlaying'}
            title={'현재 상영 중인 영화'}
          />
        )}
        {topRatedMovies && (
          <Slider
            data={topRatedMovies}
            category={'top_rated'}
            title={'평점이 높은 영화'}
          />
        )}
        {upcomingMovies && (
          <Slider
            data={upcomingMovies}
            category={'upcoming'}
            title={'두근두근 Coming Soon'}
          />
        )}
      </Container>
    </Wrapper>
  );
}
