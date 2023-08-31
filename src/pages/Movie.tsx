import { useState } from 'react';
import { Genre, useContentByGenre, useGenreList } from '../api';

export default function Movie() {
  const [genreId, setGenreId] = useState<number | undefined>();
  const { data: movieGenres } = useGenreList(TYPE);
  const genreList = movieGenres?.genres;
  const { data: movies } = useContentByGenre(TYPE, genreId);

  const handleGenreClick = (id: number) => {
    setGenreId(id);
  };

  return (
    <div>
      <h2>장르 목록</h2>
      <ul>
        {genreList?.map((genre: Genre) => (
          <li key={genre.id} onClick={() => handleGenreClick(genre.id)}>
            {genre.name}
          </li>
        ))}
      </ul>
      <div>
        <h2>선택한 장르의 영화 목록</h2>
        <ul>
          {movies?.results.map((movie: any) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const TYPE = 'movie';
