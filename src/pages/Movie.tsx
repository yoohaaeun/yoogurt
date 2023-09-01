import { useState } from 'react';
import { Genre, useContentByGenre, useGenreList } from '../api';
import styled, { css } from 'styled-components';
import { LuInfo } from 'react-icons/lu';
import { makeImagePath } from '../utils';
import { useNavigate, useParams } from 'react-router-dom';
import ContentDetail from '../components/ContentDetail';
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';

const Wrapper = styled.div<{ $bgPhoto: string }>`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  overflow-x: hidden;
  background-attachment: fixed;
`;

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 4rem 3.75rem;
`;

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  position: fixed;
  top: 4rem;
  padding: 1rem 0;
  margin-bottom: 50px;
  list-style: none;
  z-index: 99;
`;

const ListItem = styled.li<{ active: boolean }>`
  width: fit-content;
  height: auto;
  cursor: pointer;
  border: 1px solid white;
  border-radius: 8px;
  padding: 5px 10px;
  background-color: rgba(109, 109, 110, 0.7);
  color: ${(props) => props.theme.white.darker};

  &:hover {
    background-color: rgba(109, 109, 110, 0.5);
    color: ${(props) => props.theme.white.lighter};
  }

  ${(props) =>
    props.active &&
    css`
      background-color: rgba(255, 0, 0, 0.7);
      color: ${(props) => props.theme.white.lighter};
    `}
`;

const Banner = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 60vh;

  h2 {
    margin-bottom: 20px;
    font-size: 3.5rem;
  }

  p {
    width: 50%;
    font-size: 1.25rem;
    line-height: 1.5;
    margin-bottom: 20px;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(109, 109, 110, 0.7);
    width: 130px;
    padding: 10px 10px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;

    span {
      position: relative;
      top: 1px;
    }

    &:hover {
      background-color: rgba(109, 109, 110, 0.5);
    }
  }
`;

const InfoIcon = styled(LuInfo)`
  font-size: 1.5rem;
  margin-right: 6px;
`;

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  gap: 3rem;
`;

const Heading = styled.h2`
  font-size: 1.6rem;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease 0s;
  cursor: pointer;

  img {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 0.9rem;
    margin-bottom: 0.9rem;
  }

  h5 {
    line-height: 1.4;
    text-align: center;
    color: lightgray;
    transition: color 0.3s ease-in-out;
  }

  &:hover {
    transform: scale(1.15);

    h5 {
      color: white;
    }
  }
`;

export default function Movie() {
  const { contentId } = useParams();
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const bgAnimation = useAnimation();
  const [genreId, setGenreId] = useState<number>(DEFAULT_GENRE_ID);
  const [genreTitle, setGenreTitle] = useState<string>(DEFAULT_GENRE_TITLE);
  const { data: movieGenres } = useGenreList(TYPE);
  const { data: movies } = useContentByGenre(TYPE, genreId);
  const genreList = movieGenres?.genres;

  const onClicked = (contentId: number | undefined) => {
    navigate(`/movie/${contentId}`);
  };

  const handleGenreClick = (id: number, title: string) => {
    setGenreId(id);
    setGenreTitle(title);
  };

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (y > 150) {
      bgAnimation.start({
        backgroundColor: 'rgba(0,0,0,0.8)',
      });
    } else {
      bgAnimation.start({
        backgroundColor: 'rgba(0,0,0,0)',
      });
    }
  });

  return (
    <Wrapper $bgPhoto={makeImagePath(movies?.results[0].backdrop_path || '')}>
      <Container
        animate={bgAnimation}
        initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      >
        <List>
          {genreList?.map((genre: Genre) => (
            <ListItem
              key={genre.id}
              onClick={() => handleGenreClick(genre.id, genre.name)}
              active={genreTitle === genre.name}
            >
              {genre.name}
            </ListItem>
          ))}
        </List>

        <Banner>
          <h2>{movies?.results[0].title}</h2>
          <p>{movies?.results[0].overview}</p>
          <div
            onClick={() => {
              onClicked(movies?.results[0].id);
            }}
          >
            <InfoIcon />
            <span>상세 정보</span>
          </div>
        </Banner>

        <Heading>{`${genreTitle} 영화`}</Heading>
        <Section>
          {movies?.results.map((movie: any) => (
            <Item
              key={movie.id}
              onClick={() => {
                onClicked(movie.id);
              }}
            >
              <img
                src={makeImagePath(
                  movie.backdrop_path || movie.poster_path || ''
                )}
                alt={movie.name}
              />
              <h5>{movie.title}</h5>
            </Item>
          ))}
        </Section>
        {contentId && <ContentDetail type={TYPE} />}
      </Container>
    </Wrapper>
  );
}

const TYPE = 'movie';
const DEFAULT_GENRE_ID = 28;
const DEFAULT_GENRE_TITLE = '액션';
