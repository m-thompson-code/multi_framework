import { AnimeData } from "./../models/api-anime-data.model";
import { GeneralHttpClient } from "./general-http-client";

const ANIME_API = "https://api.jikan.moe/v4/anime";
const httpClient = new GeneralHttpClient();

export const getAnime = async (query: string): Promise<AnimeData[]> => {
  const response = await httpClient.get<{ data: AnimeData[] }>(`${ANIME_API}?q=${query}&limit=6`);
  const [error, data] = response;

  if (error) {
    return [];
  }
  return data.data;
};
