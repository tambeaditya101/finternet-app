# Finternet Prototype — Design & Implementation Notes

## Overview

This document details design rationale, architecture, and key considerations behind the Finternet Labs assignments prototype combining Identity & Agentic Actions with a Tokenised Property Marketplace.

---

## Design Philosophy

- **Consistency:**  
  Conservative reuse of design tokens, glassmorphism, typography, and colors for a cohesive feel.

- **Transparency & Trust:**  
  Clear visual indicators for verification status and locked actions. Feedback animations for credibility.

- **Progressive Disclosure:**  
  Stepwise credential onboarding avoids overwhelming users. Agentic actions reveal capabilities based on what is verified.

- **Separation of Concerns:**  
  Assignment 1 and 2 flows are separated for ease of evaluation yet designed so they can be integrated later.

---

## Architecture

- **State Management:**  
  Zustand enables simple, centralized state with persistence to localStorage, tracking identity, credentials, portfolio, wallet.

- **Component Structure:**  
  Modular components segmented by feature (onboarding, agent, property) ensure maintainability.

- **Animation:**  
  Framer Motion provides smooth, meaningful transitions enhancing perceived responsiveness and delight.

- **Routing Simulation:**  
  Instead of full client-side routing, flow managed with a simple `currentStep` state manages screens.

---

## Key Challenges & Solutions

- **Duplicate agent messages** solved with useRef initial guards.
- **Credential re-verification** enabled directly from dashboard for user flexibility.
- **Cross-assignment integration (planned)** - Left separate for clarity and to reduce complexity.
- **Realistic purchase constraints** — KYC requirement can be added as an enhancement.

---

## User Experience Highlights

- Clear onboarding with dynamic credential badging and progress.
- Conversational agent guides users with real-time progress and transparency.
- Property marketplace showcases real-life investment options with detailed summary, calculators.
- Seamless flow from purchase to portfolio visualization, rewarding progress with confetti and success states.

---

## README & Documentation Implications

- README explains separation and possibility of integration via credential checks.
- Detailed user journey and technical stack included.
- Future improvements and technical decisions documented.

---

**Prepared with care to demonstrate both technical and UX mastery at Finternet Labs.**
