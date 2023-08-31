import { useTVSeriesByCategory } from '../api';
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
  padding: 0 150px 60px 150px;
`;

export default function TvSeries() {
  const topRatedTvQuery = useTVSeriesByCategory('top_rated');
  const onTheAirTvQuery = useTVSeriesByCategory('on_the_air');
  const popularTvQuery = useTVSeriesByCategory('popular');
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
      {topRatedTvQuery.data && (
        <Wrapper
          $bgPhoto={makeImagePath(
            topRatedTvQuery.data?.results[0].backdrop_path || ''
          )}
        >
          <Container
            animate={bgAnimation}
            initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
          >
            {topRatedTvQuery.data && (
              <Banner data={topRatedTvQuery.data.results[0]} type={TYPE} />
            )}
            {topRatedTvQuery.data && (
              <Slider
                data={topRatedTvQuery.data}
                category={'top_rated'}
                title={'믿고 보는 유플릭스 추천작'}
                type={TYPE}
              />
            )}
            {popularTvQuery.data && (
              <Slider
                data={popularTvQuery.data}
                category={'popular'}
                title={'인기 콘텐츠'}
                type={TYPE}
              />
            )}
            {onTheAirTvQuery.data && (
              <Slider
                data={onTheAirTvQuery.data}
                category={'on_the_air'}
                title={'현재 방영 중인 TV 프로그램'}
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

const TYPE = 'tv';
