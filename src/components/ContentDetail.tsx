import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { useMovieDetails } from '../api';

const Overlay = styled(motion.div)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  z-index: 99;
`;

const Container = styled(motion.div)`
  position: fixed;
  width: 40vw;
  height: 80vh;
  top: 120px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 100;
  overflow: auto;
`;

const Cover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
  border-radius: 10px 10px 0 0;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const Overview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

export default function ContentDetail() {
  const navigate = useNavigate();
  const onOverlayCLick = () => navigate('/');
  const { movieId } = useParams();
  const { data } = useMovieDetails(Number(movieId));

  return (
    <>
      {data && (
        <>
          <Overlay
            onClick={onOverlayCLick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <Container>
            <>
              <Cover
                style={{
                  backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                    data.backdrop_path,
                    'w500'
                  )})`,
                }}
              />
              <Title>{data.title}</Title>
              <Overview>{data.overview}</Overview>
              <p>장르 : {data.genres[0].name}</p>
              <p>id : {data.id}</p>
              <p>original_title : {data.original_title}</p>
              <p>영화의 인기도 : {data.popularity}</p>
              <p>개봉일 : {data.release_date}</p>
              <p>러닝타임 : {data.runtime}</p>
              <p>개봉여부 : {data.status}</p>
              <p>슬로건 : {data.tagline}</p>
              <p>평점: {data.vote_average}</p>
              <p>투표자 수 : {data.vote_count}</p>
              {data?.poster_path && (
                <img
                  src={makeImagePath(data.poster_path || '')}
                  style={{ width: '200px' }}
                  alt=''
                />
              )}
              {data?.backdrop_path && (
                <img
                  src={makeImagePath(data.backdrop_path || '')}
                  style={{ width: '200px' }}
                  alt=''
                />
              )}
              {data?.production_companies && (
                <img
                  src={makeImagePath(
                    data.production_companies[0].logo_path || ''
                  )}
                  style={{ width: '200px' }}
                  alt=''
                />
              )}

              {data?.production_companies && (
                <img
                  src={makeImagePath(
                    data.production_companies[1].logo_path || ''
                  )}
                  style={{ width: '200px' }}
                  alt=''
                />
              )}
            </>
          </Container>
        </>
      )}
    </>
  );
}
