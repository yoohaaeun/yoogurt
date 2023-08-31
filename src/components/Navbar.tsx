import React, { useState } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { useForm } from 'react-hook-form';

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
  z-index: 9999;
`;

const Col = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.h1`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  font-size: 25px;
  font-weight: 900;
  color: ${(props) => props.theme.red};
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  position: relative;
  transition: color 0.3s ease-in-out;
  display: felx;
  flex-direction: column;
  justify-content: center;

  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -8px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const Search = styled.form`
  display: flex;
  align-items: center;
  font-size: 20px;
  position: absolute;
  cursor: pointer;

  svg {
    z-index: 1;
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0.6rem;
  padding: 0.5rem 0.3rem;
  padding-left: 3rem;
  border: 1px solid ${(props) => props.theme.white.lighter};
  background-color: rgba(0, 0, 0, 0.8);
  color: ${(props) => props.theme.white.lighter};
`;

interface IForm {
  keyword: string;
}

export default function Navbar() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useMatch('/');
  const tvMatch = useMatch('/tvSeries');
  const movieMatch = useMatch('/movie');
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({ scaleX: 0 });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (y > 170) {
      navAnimation.start({
        backgroundColor: 'rgba(0,0,0,1)',
      });
    } else {
      navAnimation.start({
        backgroundColor: 'rgba(0,0,0,0)',
      });
    }
  });

  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    navigate(`/search?keyword=${data.keyword}`, {
      state: { keyword: data.keyword },
    });
  };

  return (
    <Nav animate={navAnimation} initial={{ backgroundColor: 'rgba(0,0,0,0)' }}>
      <Col>
        <Logo>Yooflix</Logo>
        <Items>
          <Item>
            <Link to='/'>홈 {homeMatch && <Circle layoutId='circle' />}</Link>
          </Item>
          <Item>
            <Link to='/tvSeries'>
              TV프로그램 {tvMatch && <Circle layoutId='circle' />}
            </Link>
          </Item>
          <Item>
            <Link to='/movie'>
              영화 {movieMatch && <Circle layoutId='circle' />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -180 : 0 }}
            transition={{ type: 'linear' }}
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
            height='1em'
            viewBox='0 0 512 512'
          >
            <path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z' />
          </motion.svg>
          <Input
            {...register('keyword', { required: true, minLength: 2 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: 'linear' }}
            placeholder='제목, 사람, 장르'
          />
        </Search>
      </Col>
    </Nav>
  );
}
