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
  background-attachment: fixed;
`;

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 4rem 7rem;

  @media (max-width: 765px) {
    padding: 4rem 4rem;
  }

  @media (max-width: 574px) {
    padding: 4rem 1.5rem;
  }
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding: 1rem 0;
  z-index: 99;
  list-style: none;
`;

const ListItem = styled.li<{ $active: boolean }>`
  width: fit-content;
  height: auto;
  cursor: pointer;
  border: 1px solid white;
  border-radius: 0.5rem;
  padding: 0.3rem 0.7rem;
  background-color: rgba(109, 109, 110, 0.8);
  color: ${(props) => props.theme.white.darker};

  &:hover {
    background-color: rgba(109, 109, 110, 0.5);
    color: ${(props) => props.theme.white.lighter};
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.57);
  }

  ${(props) =>
    props.$active &&
    css`
      background-color: rgba(255, 232, 191, 0.8);
      color: ${(props) => props.theme.white.lighter};
    `}

  @media (max-width: 765px) {
    font-size: 0.9rem;
  }

  @media (max-width: 574px) {
    font-size: 0.75rem;
  }
`;

const Banner = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 60vh;

  h2 {
    margin-bottom: 1.25rem;
    font-size: 3.5rem;
  }

  p {
    width: 50%;
    font-size: 1.25rem;
    line-height: 1.5;
    margin-bottom: 1.25rem;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(109, 109, 110, 0.7);
    width: 8rem;
    padding: 0.6rem 0.6rem;
    border-radius: 0.3rem;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background-color: rgba(109, 109, 110, 0.5);
    }
  }

  @media (max-width: 900px) {
    h2 {
      font-size: 3rem;
    }

    p {
      width: 80%;
      font-size: 1.1rem;
    }
  }

  @media (max-width: 574px) {
    h2 {
      font-size: 2.5rem;
    }

    p {
      width: 90%;
      font-size: 1rem;
    }

    div {
      width: 6.9rem;
      font-size: 0.9rem;

      span {
        position: relative;
        top: -1px;
      }
    }
  }
`;

const InfoIcon = styled(LuInfo)`
  font-size: 1.5rem;
  margin-right: 0.4rem;
`;

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 3rem;
`;

const Heading = styled.h2`
  font-size: 1.6rem;
  margin-right: 1.25rem;
  margin-bottom: 1.25rem;
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
    color: ${(props) => props.theme.gray.lighter};
    transition: color 0.3s ease-in-out;
  }

  &:hover {
    transform: scale(1.15);

    h5 {
      color: ${(props) => props.theme.white.lighter};
    }
  }

  @media (max-width: 574px) {
    &:hover {
      transform: scale(1.05);
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
    <Wrapper
      $bgPhoto={makeImagePath(
        movies?.results[0].backdrop_path || movies?.results[0].poster_path || ''
      )}
    >
      <Container
        animate={bgAnimation}
        initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      >
        <List>
          {genreList?.map((genre: Genre) => (
            <ListItem
              key={genre.id}
              onClick={() => handleGenreClick(genre.id, genre.name)}
              $active={genreTitle === genre.name}
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
