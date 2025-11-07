import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFinternetStore = create(
  persist(
    (set) => ({
      // User data
      user: {
        name: "",
        finternetAddress: "",
        id: "",
      },

      // Credentials
      credentials: [],

      // Current flow state
      currentStep: "address-creation",

      // Actions
      createIdentity: (name) =>
        set((state) => ({
          user: {
            name,
            finternetAddress: `${name
              .toLowerCase()
              .replace(/\s+/g, "")}@finternet`,
            id: `FIN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          },
          currentStep: "credential-linking",
        })),

      linkCredential: (credentialId) =>
        set((state) => ({
          credentials: [
            ...state.credentials,
            {
              id: credentialId,
              linkedAt: new Date().toISOString(),
              status: "verified",
            },
          ],
        })),

      setCurrentStep: (step) => set({ currentStep: step }),

      hasCredential: (credentialId) => (state) =>
        state.credentials.some((c) => c.id === credentialId),

      // Add reset function for testing
      reset: () =>
        set({
          user: { name: "", finternetAddress: "", id: "" },
          credentials: [],
          currentStep: "address-creation",
        }),
    }),
    {
      name: "finternet-storage", // localStorage key
      partialPersist: (state) => ({
        user: state.user,
        credentials: state.credentials,
        currentStep: state.currentStep,
      }),
    }
  )
);

export default useFinternetStore;
