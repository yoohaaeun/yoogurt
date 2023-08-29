import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_PATH = 'https://api.themoviedb.org/3';
const LANGUAGE = 'ko-KR';

export interface IContent {
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

export async function getMoviesByCategory(category: string) {
  const response = await axios.get(
    `${BASE_PATH}/movie/${category}?api_key=${API_KEY}&language=${LANGUAGE}`
  );
  return response.data;
}

export function useMoviesByCategory(category: string) {
  return useQuery<IContentResult>(
    ['movies', category],
    () => getMoviesByCategory(category),
    {
      staleTime: 1000 * 60 * 5,
      enabled: !!category,
    }
  );
}

// TV SERIES LISTS

export async function getTVSeriesByCategory(category: string) {
  const response = await axios.get(
    `${BASE_PATH}/tv/${category}?api_key=${API_KEY}&language=${LANGUAGE}`
  );
  return response.data;
}

export function useTVSeriesByCategory(category: string) {
  return useQuery<IContentResult>(
    ['tvSeries', category],
    () => getTVSeriesByCategory(category),
    {
      staleTime: 1000 * 60 * 5,
      enabled: !!category,
    }
  );
}

// GENRES

export async function getGenres(type: string) {
  const response = await axios.get(
    `${BASE_PATH}/genre/${type}/list?language=ko&api_key=${API_KEY}`
  );
  return response.data;
}

export async function getMediaByGenre(type: string, genreName: string) {
  const genresResponse = await getGenres(type);
  const genre = genresResponse.genres.find(
    (g: { name: string }) => g.name === genreName
  );

  if (genre) {
    const response = await axios.get(
      `${BASE_PATH}/${type}/${genre.id}?language=ko&api_key=${API_KEY}`
    );
    return response.data;
  } else {
    return Promise.reject(`Genre ${genreName} not found`);
  }
}

export function useMediaByGenre(type: string, genreName: string) {
  return useQuery<IContentResult>(
    ['media', type, genreName],
    () => getMediaByGenre(type, genreName),
    {
      staleTime: 1000 * 60 * 5,
      enabled: !!type || !!genreName,
    }
  );
}

// TRENDING

export async function getWeeklyTrendingMedia(type: string) {
  const response = await axios.get(
    `${BASE_PATH}/trending/${type}/week?api_key=${API_KEY}&language=${LANGUAGE}`
  );
  return response.data;
}

export function useWeeklyTrendingMedia(type: string) {
  return useQuery<IContentResult>(
    ['trendingMedia', type],
    () => getWeeklyTrendingMedia(type),
    {
      staleTime: 1000 * 60 * 5,
      enabled: !!type,
    }
  );
}

// Details

interface IGenres {
  id: number;
  name: string;
}

interface IproductionCompanies {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface IDetail {
  backdrop_path: string;
  genres: IGenres[];
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IproductionCompanies[];
  release_date: string;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export async function getMovieDetails(movieId: number) {
  const response = await axios.get(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`
  );
  return response.data;
}

export function useMovieDetails(movieId: number) {
  return useQuery<IDetail>(
    ['movieDetail', movieId],
    () => getMovieDetails(movieId),
    {
      staleTime: 1000 * 60 * 5,
      enabled: !!movieId,
    }
  );
}

// Videos

interface Video {
  key: any;
  type: string;
}

interface IVideos {
  id: number;
  results: Video[];
}

export async function getMovieVideos(movieId: number) {
  const response = await axios.get(
    `${BASE_PATH}/movie/${movieId}/videos?api_key=${API_KEY}&language=${LANGUAGE}`
  );
  return response.data;
}

export function useMovieVideos(movieId: number) {
  return useQuery<IVideos>(
    ['movieVideos', movieId],
    () => getMovieVideos(movieId),
    {
      staleTime: 1000 * 60 * 5,
      enabled: !!movieId,
    }
  );
}

// Credits

interface CastMember {
  character: string;
  name: string;
  profile_path: string | null;
}

interface ICredits {
  id: number;
  cast: CastMember[];
}

export async function getMovieCredits(movieId: number) {
  const response = await axios.get(
    `${BASE_PATH}/movie/${movieId}/credits?api_key=${API_KEY}&language=${LANGUAGE}`
  );
  return response.data;
}

export function useMovieCredits(movieId: number) {
  return useQuery<ICredits>(
    ['movieCredits', movieId],
    () => getMovieCredits(movieId),
    {
      staleTime: 1000 * 60 * 5,
      enabled: !!movieId,
    }
  );
}

// SEARCH >

interface SearchResult {
  backdrop_path: string | null;
  id: number;
  title?: string;
  poster_path: string | null;
  name?: string;
}

interface SearchResponse {
  page: number;
  results: SearchResult[];
  total_pages: number;
  total_results: number;
}

export async function getSearchResults(type: string, keyword: string) {
  const response = await axios.get(
    `${BASE_PATH}/search/${type}?query=${keyword}&api_key=${API_KEY}&language=${LANGUAGE}`
  );
  return response.data;
}

export function useSearchResults(type: string, keyword: string) {
  return useQuery<SearchResponse>(
    ['searchResults', type, keyword],
    () => getSearchResults(type, keyword),
    {
      staleTime: 1000 * 60 * 5,
      enabled: !!type || !!keyword,
    }
  );
}
