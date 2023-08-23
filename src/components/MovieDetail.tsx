import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { makeImagePath } from '../utils';

const Overlay = styled(motion.div)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
`;

const Container = styled(motion.div)`
  position: fixed;
  width: 40vw;
  height: 80vh;
  top: 50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 10px;
  background-color: ${(props) => props.theme.black.lighter};
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

export default function MovieDetail({ clickedMovie }: any) {
  console.log(clickedMovie);

  const navigate = useNavigate();
  const { movieId } = useParams();
  const onOverlayCLick = () => navigate('/');

  return (
    <AnimatePresence>
      {movieId ? (
        <>
          <Overlay
            onClick={onOverlayCLick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <Container layoutId={movieId}>
            {clickedMovie && (
              <>
                <Cover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedMovie.backdrop_path,
                      'w500'
                    )})`,
                  }}
                />
                <Title>{clickedMovie.title}</Title>
                <Overview>{clickedMovie.overview}</Overview>
              </>
            )}
          </Container>
        </>
      ) : null}
    </AnimatePresence>
  );
}
