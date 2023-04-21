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
    },
    deleteAnimeFromStore(anime: AnimeTypeStore) {
      this.storedAnime = this.storedAnime.filter((item) => item.selectedAnime.title !== anime.selectedAnime.title);
    }
  },
  getters: {
    getStoredAnime: (state) => {
      return state.storedAnime;
    },
    getLoadedAnime: (state) => {
      return state.loadedAnime;
    },
    getAnimeTypeStoreById: (state) => (id: number) => {
      return state.storedAnime.find((anime) => anime.selectedAnime.mal_id === id);
    }
  }
});
