import { AnimeData } from "./api-anime-data.model";

export type AnimeFormType = {
  selectedAnime: AnimeData | null;
  description: string;
  isCool: boolean;
};
