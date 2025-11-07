# Finternet Prototype — Identity & Tokenised Property Platform

This project is a frontend prototype demonstrating two core assignments from the Finternet Labs take-home:

- **Assignment 1:** Identity Creation, Credential Verification, and Agentic Action Flow
- **Assignment 2:** Tokenised Property Marketplace, Purchase Flow, and Portfolio

---

## 🚀 Live Demo

https://finternet-app-nu.vercel.app/

---

## 📋 Summary of the Prototype

### Assignment 1: Identity and Credential System

- User-friendly identity creation with Finternet address generation
- Modular credential verification system for KYC, Income, and Wallet verification
- Secure management of verified credentials linked to user profile
- AI-powered agentic actions interacting with credentials
- Conversational UI for agent actions with typing animations and success feedback
- Persistent state across browser sessions via Zustand + localStorage
- Reset/Logout functionality for fresh onboarding

### Assignment 2: Tokenised Property Marketplace

- Browse a curated list of six diverse tokenised real estate properties
- View detailed property info including returns, occupancy, features, and pricing
- Interactive purchase modal with token calculator and wallet balance check
- Success screen confirming purchases with confetti and portfolio navigation
- Portfolio view summarizing owned properties, total investment, and returns
- Independent flow from Assignment 1 for separate evaluation

---

## 🛠️ Tech Stack

- **React 18** with functional components and hooks
- **Vite** build tool for fast dev and build
- **Tailwind CSS v3** for styling and design system
- **Framer Motion** for rich animations and transitions
- **Zustand** for state management with persistence middleware
- **Lucide React** icon set

---

## 📁 Project Structure

```
src/
├── components/
│ ├── agent/ # Assignment 1 Agentic Panel, Dialogue, Modals
│ ├── onboarding/ # Address creation and credential verification
│ ├── property/ # Assignment 2 Marketplace, Purchase, Portfolio
│ ├── common/ # Reusable components: Card, Button, Badge, Toast
├── data/ # Mock data for credentials, properties, and actions
├── store/ # Zustand store with user, credentials, portfolio state
├── utils/ # Animation utilities and helpers
└── App.jsx # Main app entry with flow control
```

---

## 💡 User Flow Overview

1. **Start:** User creates Finternet identity with unique handle
2. **Credential Linking:** Verify KYC, Income, Wallet credentials optionally
3. **Dashboard:** Access Agentic Actions powered by verified credentials
4. **Property Marketplace:** Browse and purchase tokenised properties independently
5. **Purchase Flow:** Enter token amount, see cost and wallet balance, buy tokens
6. **Portfolio:** View owned properties, investment summary, and transactions
7. **Logout:** Reset state and restart onboarding at any time

---

## 🔍 Key Implementation Highlights

- Used Zustand middleware for localStorage-based persistence
- Designed conversational agent UX with stepwise message animation and progress
- Created interactive modals with purchase flow validation and confirmation
- Maintained consistent glassmorphic design and responsive layouts
- Followed accessibility best practices in color contrast and keyboard focus

---

## 📌 Important Notes

- **Separation of Assignments:**  
  Assignment 1 and Assignment 2 flows are maintained independently without forced linkage.  
  Real-world scenarios would require KYC verification before purchasing assets — this can be integrated by adding credential checks in purchase modals.

- **State Management:**  
  Shared global state patterns allow future integration with minimal friction.

- **Testing:**  
  Manual end-to-end tests cover typical user paths: onboarding, verification, agent actions, property purchase, portfolio browsing.

---

## 🚧 Future Enhancements

- Integrate KYC enforcement in the purchase flow for compliance
- Add backend or blockchain storage for decentralized identity and asset records
- Implement real-time transaction updates and notifications
- Expand portfolio with resale/swap abilities
- Add multi-currency support and fiat on-ramps

---
