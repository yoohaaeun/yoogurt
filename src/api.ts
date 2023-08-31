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

export interface Genre {
  id: number;
  name: string;
}

interface MovieGenres {
  genres: Genre[];
}

export async function getGenreList(type: string) {
  const response = await axios.get(
    `${BASE_PATH}/genre/${type}/list?api_key=${API_KEY}&language=${LANGUAGE}`
  );
  return response.data;
}

export function useGenreList(type: string) {
  return useQuery<MovieGenres>(['genreList', type], () => getGenreList(type), {
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !!type,
  });
}

// DISCOVER

export async function getContentByGenre(
  type: string,
  genreId: number | undefined
) {
  const response = await axios.get(
    `${BASE_PATH}/discover/${type}?api_key=${API_KEY}&language=${LANGUAGE}&with_genres=${genreId}`
  );
  return response.data;
}

export function useContentByGenre(type: string, genreId: number | undefined) {
  return useQuery<IContentResult>(
    ['contentByGenre', genreId],
    () => getContentByGenre(type, genreId),
    {
      staleTime: 1000 * 60 * 5,
      enabled: !!genreId,
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
  original_title?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IproductionCompanies[];
  release_date?: string;
  first_air_date?: string;
  runtime: number;
  status: string;
  tagline: string;
  title?: string;
  name?: string;
  vote_average: number;
  vote_count: number;
  number_of_seasons: number;
  number_of_episodes: number;
}

export async function getContentDetails(
  type: string | null,
  contentId: number
) {
  const response = await axios.get(
    `${BASE_PATH}/${type}/${contentId}?api_key=${API_KEY}&language=${LANGUAGE}`
  );
  return response.data;
}

export function useContentDetails(type: string | null, contentId: number) {
  return useQuery<IDetail>(
    ['movieDetail', type, contentId],
    () => getContentDetails(type, contentId),
    {
      staleTime: 1000 * 60 * 5,
      enabled: !!type || !!contentId,
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

export async function getContentVideos(type: string | null, contentId: number) {
  const response = await axios.get(
    `${BASE_PATH}/${type}/${contentId}/videos?api_key=${API_KEY}&language=${LANGUAGE}`
  );
  return response.data;
}

export function useContentVideos(type: string | null, contentId: number) {
  return useQuery<IVideos>(
    ['movieVideos', type, contentId],
    () => getContentVideos(type, contentId),
    {
      staleTime: 1000 * 60 * 5,
      enabled: !!contentId,
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

export async function getContentCredits(
  type: string | null,
  contentId: number
) {
  const response = await axios.get(
    `${BASE_PATH}/${type}/${contentId}/credits?api_key=${API_KEY}&language=${LANGUAGE}`
  );
  return response.data;
}

export function useContentCredits(type: string | null, contentId: number) {
  return useQuery<ICredits>(
    ['movieCredits', type, contentId],
    () => getContentCredits(type, contentId),
    {
      staleTime: 1000 * 60 * 5,
      enabled: !!type || !!contentId,
    }
  );
}

// SEARCH

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

export async function getSearchResults(type: string | null, keyword: string) {
  const response = await axios.get(
    `${BASE_PATH}/search/${type}?query=${keyword}&api_key=${API_KEY}&language=${LANGUAGE}`
  );
  return response.data;
}

export function useSearchResults(type: string | null, keyword: string) {
  return useQuery<SearchResponse>(
    ['searchResults', type, keyword],
    () => getSearchResults(type, keyword),
    {
      staleTime: 1000 * 60 * 5,
      enabled: !!type || !!keyword,
    }
  );
}
