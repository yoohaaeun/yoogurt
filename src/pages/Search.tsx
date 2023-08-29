import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSearchResults } from '../api';
import { makeImagePath } from '../utils';

const Wrapper = styled.div`
  width: 100vw;
  background-color: ${(props) => props.theme.black.darker};
  padding: 7.5rem 3.75rem;
`;

const Text = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 1.9rem;

  span {
    margin-left: 0.6rem;
    color: lightgray;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;

  p {
    margin-bottom: 6rem;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 0.9rem;
    margin-bottom: 0.9rem;
    background-color: black;
    font-size: 0.8rem;
  }

  img {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 0.9rem;
    margin-bottom: 0.9rem;
  }

  h2 {
    line-height: 1.4;
    text-align: center;
  }
`;

export default function Search() {
  const {
    state: { keyword },
  } = useLocation();
  const { data: movieData } = useSearchResults('movie', keyword);
  const { data: tvData } = useSearchResults('tv', keyword);

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
            <Item key={movie.id}>
              {movie.backdrop_path === null ? (
                <div>이미지 없음</div>
              ) : (
                <img
                  src={makeImagePath(movie.backdrop_path || '')}
                  alt={movie.name}
                />
              )}
              <h2>{movie.title}</h2>
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
            <Item key={tv.id}>
              {tv.backdrop_path === null ? (
                <div>이미지 없음</div>
              ) : (
                <img
                  src={makeImagePath(tv.backdrop_path || '')}
                  alt={tv.name}
                />
              )}
              <h2>{tv.name}</h2>
            </Item>
          ))
        )}
      </Container>
    </Wrapper>
  );
}
