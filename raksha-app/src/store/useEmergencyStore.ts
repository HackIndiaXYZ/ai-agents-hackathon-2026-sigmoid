import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Shelter, Resource, FamilyMember, MOCK_SHELTERS, MOCK_RESOURCES, MOCK_FAMILY, MOCK_ALERTS } from './mockData';

export type EmergencyType = 'FLOOD' | 'EARTHQUAKE' | 'FIRE' | 'CYCLONE' | 'GENERAL' | 'UNKNOWN';

export interface EmergencyState {
  // Current Situation
  emergencyType: EmergencyType;
  severity: number; // 1-10
  sosStatus: 'IDLE' | 'ARMED' | 'TRIGGERED';
  panicModeActive: boolean;
  isProcessing: boolean;
  
  // Data
  shelters: Shelter[];
  resources: Resource[];
  family: FamilyMember[];
  alerts: typeof MOCK_ALERTS;

  // App State
  location: { lat: number; lng: number } | null;
  
  // Actions
  triggerSOS: () => void;
  armSOS: () => void;
  disarmSOS: () => void;
  updateLocation: (lat: number, lng: number) => void;
  setEmergencyType: (type: EmergencyType) => void;
  setSeverity: (severity: number) => void;
  reset: () => void;
}

export const useEmergencyStore = create<EmergencyState>()(
  persist(
    (set) => ({
      emergencyType: 'UNKNOWN',
      severity: 1,
      sosStatus: 'IDLE',
      panicModeActive: false,
      isProcessing: false,
      
      shelters: MOCK_SHELTERS,
      resources: MOCK_RESOURCES,
      family: MOCK_FAMILY,
      alerts: MOCK_ALERTS,
      
      location: { lat: 28.6139, lng: 77.2090 }, // Default location (New Delhi)

      triggerSOS: () => set({ sosStatus: 'TRIGGERED', panicModeActive: true }),
      armSOS: () => set({ sosStatus: 'ARMED' }),
      disarmSOS: () => set({ sosStatus: 'IDLE', panicModeActive: false }),
      updateLocation: (lat, lng) => set({ location: { lat, lng } }),
      setEmergencyType: (type) => set({ emergencyType: type }),
      setSeverity: (severity) => set({ severity }),
      
      reset: () => set({
        emergencyType: 'UNKNOWN',
        severity: 1,
        sosStatus: 'IDLE',
        panicModeActive: false,
        isProcessing: false,
      })
    }),
    {
      name: 'raksha-survival-storage',
    }
  )
);
