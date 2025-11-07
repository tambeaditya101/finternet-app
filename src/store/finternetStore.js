import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFinternetStore = create(
  persist(
    (set, get) => ({
      // ==================== ASSIGNMENT 1: Identity & Credentials ====================

      // User data
      user: {
        name: "",
        finternetAddress: "",
        id: "",
      },

      // Credentials
      credentials: [],

      // Current flow state
      currentStep: "address-creation", // 'address-creation' | 'credential-linking' | 'dashboard' | 'property-marketplace' | 'portfolio'

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

      // ==================== ASSIGNMENT 2: Property Portfolio ====================

      // Wallet balance (in USD)
      walletBalance: 10000,

      // Property portfolio
      propertyPortfolio: [],
      // Structure: [{ propertyId, tokensOwned, purchasePrice, purchaseDate }]

      // Transaction history
      transactions: [],
      // Structure: [{ id, type, propertyId, propertyName, tokensAmount, totalCost, date }]

      // Actions for Property Purchase
      purchaseProperty: (propertyId, propertyName, tokenAmount, tokenPrice) => {
        const totalCost = tokenAmount * tokenPrice;
        const currentBalance = get().walletBalance;

        // Check if user has enough balance
        if (currentBalance < totalCost) {
          return { success: false, error: "Insufficient balance" };
        }

        const transactionId = `TXN-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 6)
          .toUpperCase()}`;
        const purchaseDate = new Date().toISOString();

        set((state) => {
          // Check if user already owns tokens of this property
          const existingProperty = state.propertyPortfolio.find(
            (p) => p.propertyId === propertyId
          );

          let updatedPortfolio;
          if (existingProperty) {
            // Add to existing holdings
            updatedPortfolio = state.propertyPortfolio.map((p) =>
              p.propertyId === propertyId
                ? {
                    ...p,
                    tokensOwned: p.tokensOwned + tokenAmount,
                    totalInvested: p.totalInvested + totalCost,
                    lastPurchaseDate: purchaseDate,
                  }
                : p
            );
          } else {
            // Add new property to portfolio
            updatedPortfolio = [
              ...state.propertyPortfolio,
              {
                propertyId,
                propertyName,
                tokensOwned: tokenAmount,
                purchasePrice: tokenPrice,
                totalInvested: totalCost,
                purchaseDate,
                lastPurchaseDate: purchaseDate,
              },
            ];
          }

          return {
            walletBalance: state.walletBalance - totalCost,
            propertyPortfolio: updatedPortfolio,
            transactions: [
              {
                id: transactionId,
                type: "purchase",
                propertyId,
                propertyName,
                tokensAmount: tokenAmount,
                tokenPrice,
                totalCost,
                date: purchaseDate,
              },
              ...state.transactions,
            ],
          };
        });

        return { success: true, transactionId };
      },

      // Get portfolio statistics
      getPortfolioStats: () => {
        const state = get();
        const totalInvested = state.propertyPortfolio.reduce(
          (sum, property) => sum + property.totalInvested,
          0
        );
        const portfolioCount = state.propertyPortfolio.length;
        const totalTokensOwned = state.propertyPortfolio.reduce(
          (sum, property) => sum + property.tokensOwned,
          0
        );

        return {
          totalInvested,
          portfolioCount,
          totalTokensOwned,
          availableBalance: state.walletBalance,
        };
      },

      // Get property ownership details
      getPropertyOwnership: (propertyId) => {
        const state = get();
        return state.propertyPortfolio.find((p) => p.propertyId === propertyId);
      },

      // Add funds to wallet (for demo/testing)
      addFunds: (amount) =>
        set((state) => ({
          walletBalance: state.walletBalance + amount,
        })),

      // ==================== RESET ====================

      // Reset everything
      reset: () =>
        set({
          user: { name: "", finternetAddress: "", id: "" },
          credentials: [],
          currentStep: "address-creation",
          walletBalance: 10000,
          propertyPortfolio: [],
          transactions: [],
        }),

      // Reset only property data (keep identity)
      resetPropertyData: () =>
        set({
          walletBalance: 10000,
          propertyPortfolio: [],
          transactions: [],
        }),
    }),
    {
      name: "finternet-storage", // localStorage key
      partialPersist: (state) => ({
        user: state.user,
        credentials: state.credentials,
        currentStep: state.currentStep,
        walletBalance: state.walletBalance,
        propertyPortfolio: state.propertyPortfolio,
        transactions: state.transactions,
      }),
    }
  )
);

export default useFinternetStore;
