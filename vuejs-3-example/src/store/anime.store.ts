import { defineStore } from "pinia";
import { getAnime } from "../api/api-anime";
import { AnimeData } from "../models/api-anime-data.model";
import { User } from "./auth.store";

export type AnimeTypeStore = {
  selectedAnime: AnimeData;
  description: string;
  isCool: boolean;
  user: User;
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
    },
    editAnimeInStore(animeId: number, newDescription: string) {
      this.storedAnime = this.storedAnime.map((item) => {
        if (item.selectedAnime.mal_id === animeId) {
          item.description = newDescription;
        }
        return item;
      });
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
