import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import authService from "../services/authService";

const useAuthStore = create(
  devtools(
    persist(
      immer((set, get) => ({
        user: null,
        accessToken: null,
        _hasHydrated: false,
        isRefreshing: false,
        actions: {
          login: (userData, token) =>
            set((state) => {
              state.user = userData;
              state.accessToken = token;
            }),
          setRefreshing: (status) => set({ isRefreshing: status }),
          logout: () =>
            set((state) => {
              state.user = null;
              state.accessToken = null;
            }),

          setHasHydrated: (status) =>
            set((state) => {
              state._hasHydrated = status;
            }),
          initializeAuth: async () => {
            try {
              const response = await authService.getMe();

              if (response && response.data) {
                set((state) => {
                  state.user = response.data;
                });
                return true;
              }
              return false;
            } catch (error) {
              get().actions.logout();
              return false;
            }
          },
        },
      })),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          user: state.user,
          accessToken: state.accessToken,
        }),
        onRehydrateStorage: () => (state) => {
          state.actions.setHasHydrated(true);
        },
      },
    ),
  ),
);

export default useAuthStore;
