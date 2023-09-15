import { useMoviesByCategory } from '../api';
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
import ContentDetail from '../components/ContentDetail';
import { useParams } from 'react-router-dom';

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
  padding: 4rem 7rem;

  @media (max-width: 765px) {
    padding: 4rem 4rem;
  }

  @media (max-width: 574px) {
    padding: 4rem 1.5rem;
  }
`;

export default function Home() {
  const nowPlayingMoviesQuery = useMoviesByCategory('now_playing');
  const popularMoviesQuery = useMoviesByCategory('popular');
  const topRatedMoviesQuery = useMoviesByCategory('top_rated');
  const upcomingMoviesQuery = useMoviesByCategory('upcoming');
  const { contentId } = useParams();
  const { scrollY } = useScroll();
  const bgAnimation = useAnimation();

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
    <>
      {nowPlayingMoviesQuery.data && (
        <Wrapper
          $bgPhoto={makeImagePath(
            nowPlayingMoviesQuery.data?.results[0].backdrop_path || ''
          )}
        >
          <Container
            animate={bgAnimation}
            initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
          >
            {nowPlayingMoviesQuery.data && (
              <Banner
                data={nowPlayingMoviesQuery.data.results[0]}
                type={TYPE}
              />
            )}

            {popularMoviesQuery.data && (
              <Slider
                data={popularMoviesQuery.data}
                category={'popular'}
                title={'보고 또 봐도 좋은 인기 영화'}
                type={TYPE}
              />
            )}
            {nowPlayingMoviesQuery.data && (
              <Slider
                data={nowPlayingMoviesQuery.data}
                category={'now_playing'}
                title={'현재 상영 중인 영화'}
                type={TYPE}
              />
            )}
            {topRatedMoviesQuery.data && (
              <Slider
                data={topRatedMoviesQuery.data}
                category={'top_rated'}
                title={'평점이 높은 영화'}
                type={TYPE}
              />
            )}
            {upcomingMoviesQuery.data && (
              <Slider
                data={upcomingMoviesQuery.data}
                category={'upcoming'}
                title={'두근두근 Coming Soon'}
                type={TYPE}
              />
            )}
          </Container>
          {contentId && <ContentDetail type={TYPE} />}
        </Wrapper>
      )}
    </>
  );
}

const TYPE = 'movie';
