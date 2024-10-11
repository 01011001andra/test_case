import { defineStore } from "pinia";

export const useStore = defineStore("auth", {
  state: () => ({
    access_token: null as string | null,
    refresh_token: null as string | null,
    company: null as string | null,
    authenticated: null as boolean | null,
  }),
  actions: {
    setCredentials(
      access_token: string,
      refresh_token: string,
      company: string
    ) {
      this.access_token = access_token;
      this.refresh_token = refresh_token;
      this.company = company;
      this.authenticated = true;
    },
    clearCredentials() {
      this.access_token = null;
      this.refresh_token = null;
      this.company = null;
      this.authenticated = false;
      const auth = useCookie("auth");
      auth.value = null;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
