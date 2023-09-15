import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { useState } from 'react';
import { makeImagePath } from '../utils';
import SlideBtn from './SlideBtn';
import { IContentResult } from '../api';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 8rem;

  &:last-child {
    margin-bottom: 2rem;
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
`;

const Container = styled.div`
  width: 100%;
  height: 16rem;
  position: relative;

  @media (max-width: 765px) {
    height: 12rem;
  }
`;

const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.6rem;
  position: absolute;
  top: 0;
  left: 0;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  width: 100%;
  height: 16rem;
  border-radius: 1rem;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }

  &:last-child {
    transform-origin: center right;
  }

  @media (max-width: 765px) {
    height: 12rem;
  }
`;

const Info = styled(motion.div)`
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 0.6rem;
  opacity: 0;

  h4 {
    text-align: center;
    font-size: 1.1rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.57);
  }
`;

interface ISlider {
  data: IContentResult;
  title: string;
  category: string;
  type: string;
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

export default function Slider({ data, title, category, type }: ISlider) {
  const navigate = useNavigate();
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

  const onClicked = (contentId: number, type: string) => {
    if (type === 'movie') {
      navigate(`/home/${contentId}`);
    } else if (type === 'tv') {
      navigate(`/tvSeries/${contentId}`);
    }
  };

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
              .map((content) => (
                <Box
                  layoutId={category + content.id + ''}
                  onClick={() => onClicked(content.id, type)}
                  key={content.id}
                  variants={boxVariants}
                  initial='normal'
                  whileHover='hover'
                  transition={{ type: 'tween' }}
                  $bgPhoto={makeImagePath(
                    content.backdrop_path || content.poster_path
                  )}
                >
                  <Info variants={infoVariants}>
                    <h4>{content.title ? content.title : content.name}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
        <SlideBtn prevBtn={prevPage} nextBtn={nextPage} />
      </Container>
    </Wrapper>
  );
}
