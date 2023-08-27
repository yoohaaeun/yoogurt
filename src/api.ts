import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
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
    }
  );
}
