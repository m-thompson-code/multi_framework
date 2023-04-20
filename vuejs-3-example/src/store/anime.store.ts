import { defineStore } from "pinia";
import { getAnime } from "../api/api-anime";
import { AnimeData } from "../models/api-anime-data.model";

export type AnimeTypeStore = {
  selectedAnime: AnimeData;
  description: string;
  isCool: boolean;
};

export const useAnimeStore = defineStore({
  id: "anime",
  state: () => ({
    storedAnime: [] as AnimeTypeStore[],
    loadedAnime: [] as AnimeData[]
  }),
  actions: {
    async fetchAnime(query: string) {
      const data = await getAnime(query);
      console.log("fetched", data);
      this.loadedAnime = data;
    },
    saveAnimeToStore(anime: AnimeTypeStore) {
      this.storedAnime = [...this.storedAnime, anime];
    }
  },
  getters: {
    getStoredAnime: (state) => {
      return state.storedAnime;
    },
    getLoadedAnime: (state) => {
      return state.loadedAnime;
    }
  }
});
