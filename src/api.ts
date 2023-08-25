const API_KEY = '76819e38cf8b722862e7930703629b13';
const BASE_PATH = 'https://api.themoviedb.org/3';
const LANGUAGE = 'ko-KR';

interface IContent {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  overview: string;
}

export interface IContentResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IContent[];
  total_pages: number;
  total_results: number;
}

// MOVIE LISTS

function getMoviesByCategory(category: string) {
  return fetch(
    `${BASE_PATH}/movie/${category}?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
}

export function getNowPlayingMovies() {
  return getMoviesByCategory('now_playing');
}

export function getPopularMovies() {
  return getMoviesByCategory('popular');
}

export function getTopRatedMovies() {
  return getMoviesByCategory('top_rated');
}

export function getUpcomingMovies() {
  return getMoviesByCategory('upcoming');
}

// TV SERIES LISTS

function getTVSeriesByCategory(category: string) {
  return fetch(
    `${BASE_PATH}/tv/${category}?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
}

export function getPopularTVSeries() {
  return getTVSeriesByCategory('popular');
}

export function getTopRatedTVSeries() {
  return getTVSeriesByCategory('top_rated');
}

export function getAiringTodayTVSeries() {
  return getTVSeriesByCategory('airing_today');
}

export function getOnTheAirTVSeries() {
  return getTVSeriesByCategory('on_the_air');
}

interface IGenre {
  id: number;
  name: string;
}

export interface IGetGenreListResult {
  genres: IGenre[];
}

// GENRES

export function getGenres(type: string) {
  return fetch(
    `${BASE_PATH}/genre/${type}/list?language=ko&api_key=${API_KEY}`
  ).then((response) => response.json());
}

export function getMediaByGenre(type: string, genreName: string) {
  return getGenres(type).then((genres) => {
    const genre = genres.genres.find(
      (g: { name: string }) => g.name === genreName
    );
    if (genre) {
      return fetch(
        `${BASE_PATH}/${type}/${genre.id}?language=ko&api_key=${API_KEY}`
      ).then((response) => response.json());
    } else {
      return Promise.reject(`Genre ${genreName} not found`);
    }
  });
}

// TRENDING

export function getWeeklyTrendingMovies() {
  return fetch(
    `${BASE_PATH}/trending/movie/week?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
}

export function getWeeklyTrendingTVSeries() {
  return fetch(
    `${BASE_PATH}/trending/tv/week?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
}
