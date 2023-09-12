import { useState } from 'react';
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
  width: 100vw;
  height: 4.8rem;
  position: fixed;
  top: 0;
  font-size: 0.9rem;
  padding: 1.25rem 7rem;
  color: white;
  z-index: 9999;

  @media (max-width: 765px) {
    padding: 1.25rem 4rem;
  }

  @media (max-width: 574px) {
    padding: 1.25rem 1.5rem;
    font-size: 0.6rem;
  }
`;

const Col = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.h1`
  margin-right: 3rem;
  width: 5.9rem;
  font-size: 1.9rem;
  font-weight: 900;
  color: ${(props) => props.theme.red};

  @media (max-width: 676px) {
    margin-right: 0;
    width: 5.6rem;
    font-size: 1.25rem;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 1.25rem;
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
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 0.3rem;
  bottom: -0.6rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};

  @media (max-width: 574px) {
    width: 0.2rem;
    height: 0.2rem;
    border-radius: 0.2rem;
  }
`;

const Search = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 1.25rem;
  cursor: pointer;
`;

const SearchIcon = styled(motion.svg)`
  position: absolute;
  left: -1.25rem;
  z-index: 1;
  cursor: pointer;
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
        <Logo>
          <Link to='/'>Yooflix</Link>
        </Logo>
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
          <SearchIcon
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -180 : 0 }}
            transition={{ type: 'linear' }}
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
            height='1em'
            viewBox='0 0 512 512'
          >
            <path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z' />
          </SearchIcon>
          <Input
            {...register('keyword', { required: true, minLength: 2 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: 'linear' }}
            placeholder='제목을 입력해주세요.'
          />
        </Search>
      </Col>
    </Nav>
  );
}
