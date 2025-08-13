import { create } from "zustand"

interface AppState {
  isSidebarOpen: boolean
  toggleSidebar: () => void
  theme: "light" | "dark" | "system"
  setTheme: (theme: "light" | "dark" | "system") => void
}

export const useAppStore = create<AppState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  theme: "system",
  setTheme: (theme) => set({ theme }),
}))
