import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { cloudStorageAdapter } from './cloudStorage';

interface AppState {
  // Settings
  hapticsEnabled: boolean;
  biometryEnabled: boolean;

  // Actions
  setHapticsEnabled: (enabled: boolean) => void;
  setBiometryEnabled: (enabled: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hapticsEnabled: true,
      biometryEnabled: true,

      setHapticsEnabled: (enabled) => set({ hapticsEnabled: enabled }),
      setBiometryEnabled: (enabled) => set({ biometryEnabled: enabled }),
    }),
    {
      name: 'app-settings',
      storage: createJSONStorage(() => cloudStorageAdapter),
    }
  )
);
