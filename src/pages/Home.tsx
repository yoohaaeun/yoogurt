import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getMovies, IGetMoviesResult } from '../api';
import { makeImagePath } from '../utils';

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  width: 100vw;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ $bgPhoto: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 68px;
`;

const Overview = styled.p`
  font-size: 28px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  border-radius: 5px;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }

  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  border-radius: 0 0 5px 5px;

  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: 'tween',
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: 'tween',
    },
  },
};

const offset = 6;

export default function Home() {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ['movies', 'nowPlaying'],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={incraseIndex}
            $bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                transition={{ type: 'tween', duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ''}
                      key={movie.id}
                      variants={boxVariants}
                      initial='normal'
                      whileHover='hover'
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: 'tween' }}
                      $bgPhoto={makeImagePath(movie.backdrop_path)}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {movieId ? (
              <motion.div
                layoutId={movieId}
                style={{
                  position: 'absolute',
                  width: '40vw',
                  height: '80vh',
                  backgroundColor: '#E3E1DB',
                  top: 50,
                  left: 0,
                  right: 0,
                  margin: '0 auto',
                  borderRadius: '10px',
                }}
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
