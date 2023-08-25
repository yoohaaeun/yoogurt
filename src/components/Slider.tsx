import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { useState } from 'react';
import ContentDetail from './ContentDetail';
import { makeImagePath } from '../utils';

const Wrapper = styled.div`
  width: 100vw;
  height: 280px;
  margin-bottom: 10px;
  padding: 0 60px;
  top: -120px;
  background-color: red;
`;

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: pink;
  position: relative;
`;

const Row = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  background-color: yellow;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 100px;
  width: 350px;
  height: 200px;
  border-radius: 10px;
`;

const Buttons = styled.div``;

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

interface ISlider {
  data: any;
  title: string;
}

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
  const decreaseIndex = () => {
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
      <Title onClick={increaseIndex}>{title}</Title>
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
                  $bgPhoto={makeImagePath(movie.backdrop_path)}
                />
              ))}
          </Row>
        </AnimatePresence>
        <Buttons>
          <button onClick={decreaseIndex}>이전</button>
          <button onClick={increaseIndex}>다음</button>
        </Buttons>
      </Container>
      <ContentDetail />
    </Wrapper>
  );
}
