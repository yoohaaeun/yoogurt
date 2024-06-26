import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSearchResults } from '../api';
import ContentDetail from '../components/ContentDetail';
import { makeImagePath } from '../utils';

const Wrapper = styled.div`
  width: 100vw;
  padding: 7.5rem 7rem;
  background-color: ${(props) => props.theme.black.darker};
  min-height: 100vh;

  @media (max-width: 765px) {
    padding: 7.5rem 4rem;
  }

  @media (max-width: 574px) {
    padding: 7.5rem 1.5rem;
  }
`;

const Text = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 1.9rem;

  span {
    margin-left: 0.6rem;
    color: ${(props) => props.theme.gray.lighter};
  }

  @media (max-width: 765px) {
    font-size: 1.4rem;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;

  p {
    margin-bottom: 6rem;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease 0s;
  cursor: pointer;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 0.9rem;
    margin-bottom: 0.9rem;
    background-color: ${(props) => props.theme.black.black};
    font-size: 0.8rem;
  }

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

export default function Search() {
  const navigate = useNavigate();
  const {
    state: { keyword },
  } = useLocation();
  const { data: movieData } = useSearchResults('movie', keyword);
  const { data: tvData } = useSearchResults('tv', keyword);
  const { contentId } = useParams();
  const onClicked = (contentId: number) => {
    navigate(`/search/${contentId}`, {
      state: { keyword },
    });
  };

  const contentType =
    contentId &&
    movieData?.results.find((movie) => movie.id === parseInt(contentId))
      ? 'movie'
      : contentId && tvData?.results.find((tv) => tv.id === parseInt(contentId))
      ? 'tv'
      : null;

  return (
    <Wrapper>
      <Text>
        영화
        <span>{movieData?.results.length}</span>
      </Text>
      <Container>
        {movieData?.results.length === 0 ? (
          <p>'{keyword}'검색 결과가 없습니다.</p>
        ) : (
          movieData?.results.map((movie) => (
            <Item
              key={movie.id}
              onClick={() => {
                onClicked(movie.id);
              }}
            >
              {movie.backdrop_path === null ? (
                <div>이미지 없음</div>
              ) : (
                <img
                  src={makeImagePath(movie.backdrop_path || '')}
                  alt={movie.name}
                />
              )}
              <h5>{movie.title}</h5>
            </Item>
          ))
        )}
      </Container>

      <Text>
        TV프로그램
        <span>{tvData?.results.length}</span>
      </Text>
      <Container>
        {tvData?.results.length === 0 ? (
          <p>'{keyword}'검색 결과가 없습니다.</p>
        ) : (
          tvData?.results.map((tv) => (
            <Item
              key={tv.id}
              onClick={() => {
                onClicked(tv.id);
              }}
            >
              {tv.backdrop_path === null ? (
                <div>이미지 없음</div>
              ) : (
                <img
                  src={makeImagePath(tv.backdrop_path || '')}
                  alt={tv.name}
                />
              )}
              <h5>{tv.name}</h5>
            </Item>
          ))
        )}
      </Container>
      {contentId && <ContentDetail type={contentType} />}
    </Wrapper>
  );
}
