import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { useState } from 'react';
import ContentDetail from './ContentDetail';
import { makeImagePath } from '../utils';

const Wrapper = styled.div`
  width: 100%;
  height: 280px;
  margin-bottom: 10px;
  top: -120px;
`;

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Row = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 100px;
  width: 19%;
  height: 200px;
  border-radius: 10px;

  &:first-child {
    transform-origin: center left;
  }

  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 10px;
  border-radius: 0 0 5px 5px;
  opacity: 0;

  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Buttons = styled.div`
  z-index: 9999;
`;

interface ISlider {
  data: any;
  title: string;
}

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
    y: -30,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

const offset = 5;

export default function TestSlider({ data, title }: ISlider) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Container>
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
              .map((movie: any) => (
                <Box
                  key={movie.id}
                  variants={boxVariants}
                  initial='normal'
                  whileHover='hover'
                  transition={{ type: 'tween' }}
                  $bgPhoto={makeImagePath(movie.backdrop_path)}
                >
                  {' '}
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
        <Buttons>
          <button onClick={increaseIndex}>다음</button>
        </Buttons>
      </Container>
      <ContentDetail />
    </Wrapper>
  );
}
