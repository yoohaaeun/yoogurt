import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { makeImagePath } from '../utils';

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

export default function ContentBox({ movie, onClick }: any) {
  const { id, backdrop_path, title } = movie;

  return (
    <Box
      layoutId={id + ''}
      variants={boxVariants}
      initial='normal'
      whileHover='hover'
      onClick={() => onClick(id)}
      transition={{ type: 'tween' }}
      $bgPhoto={makeImagePath(backdrop_path)}
    >
      <Info variants={infoVariants}>
        <h4>{title}</h4>
      </Info>
    </Box>
  );
}
