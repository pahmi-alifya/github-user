import { create } from "zustand";

export const useRepositoriesStore = create((set) => ({
  repositories: [],
  loading: false,
  getRepositories: (user = "pahmi1998") => {
    try {
      set({ loading: true });
      fetch(
        `https://api.github.com/users/${user}/repos?per_page=99&sort=updated`
      )
        .then((res) => res.json())
        .then((res) => {
          set({ repositories: res, loading: false });
          if (res.message === "Not Found") set({ repositories: [] });
        });
    } catch (error) {
      set({ repositories: [], loading: false });
    }
  },
}));
