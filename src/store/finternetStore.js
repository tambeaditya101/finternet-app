import { create } from "zustand";

const useFinternetStore = create((set) => ({
  // User data
  user: {
    name: "",
    finternetAddress: "",
    id: "",
  },

  // Credentials
  credentials: [],

  // Current flow state
  currentStep: "address-creation", // address-creation, credential-linking, dashboard

  // Actions
  createIdentity: (name) =>
    set((state) => ({
      user: {
        name,
        finternetAddress: `${name.toLowerCase().replace(/\s+/g, "")}@finternet`,
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
}));

export default useFinternetStore;
