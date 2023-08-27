import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { useState } from 'react';
import ContentDetail from './ContentDetail';
import { makeImagePath } from '../utils';
import SlideBtn from './SlideBtn';
import { IContentResult } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  height: 280px;
  margin-bottom: 130px;
`;

const Title = styled.div`
  font-size: 1.5rem;
  margin-bottom: 20px;
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
  height: 250px;
  border-radius: 15px;
  cursor: pointer;

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

interface ISlider {
  data: IContentResult;
  title: string;
  category: string;
}

const rowVariants = {
  hidden: (isBack: boolean) => ({
    x: isBack ? -window.outerWidth - 10 : window.outerWidth + 10,
  }),
  visible: {
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? window.outerWidth + 10 : -window.outerWidth - 10,
  }),
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

export default function Slider({ data, title, category }: ISlider) {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isBack, setIsback] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const prevPage = () => {
    if (data && !leaving) {
      setIsback(true);
      toggleLeaving();
      const totalMovies = data.results.length;
      const minIndex = 0;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === minIndex ? maxIndex : prev - 1));
    }
  };

  const nextPage = () => {
    if (data && !leaving) {
      setIsback(false);
      toggleLeaving();
      const totalMovies = data.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const onBoxClicked = (category: string, movieId: number) => {
    navigate(`/movies/${category}/${movieId}`);
  };

  const clickedMovie =
    movieId && data?.results.find((movie) => movie.id === +movieId);

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Container>
        <AnimatePresence
          custom={isBack}
          initial={false}
          onExitComplete={toggleLeaving}
        >
          <Row
            custom={isBack}
            variants={rowVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ type: 'tween', duration: 1 }}
            key={index}
          >
            {data?.results
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  layoutId={category + movie.id + ''}
                  onClick={() => onBoxClicked(category, movie.id)}
                  key={movie.id}
                  variants={boxVariants}
                  initial='normal'
                  whileHover='hover'
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
        <SlideBtn prevBtn={prevPage} nextBtn={nextPage} />
      </Container>
      {movieId && (
        <ContentDetail clickedMovie={clickedMovie} category={category} />
      )}
    </Wrapper>
  );
}
