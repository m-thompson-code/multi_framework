import { defineStore } from "pinia";

export type User = {
  name: string;
};

export const useAuthenticationStore = defineStore({
  id: "authentication",
  state: () => ({
    user: null as User | null
  }),
  actions: {
    login(name: string) {
      this.user = {
        name
      };
    },
    logout() {
      this.user = null;
    }
  },
  getters: {
    getUser: (state) => {
      return state.user;
    }
  }
});
