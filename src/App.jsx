import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useFinternetStore from "./store/finternetStore";
import AddressCreation from "./components/onboarding/AddressCreation";
import CredentialLinking from "./components/onboarding/CredentialLinking";
// import AgenticPanel from "./components/agent/AgenticPanel";

function App() {
  const currentStep = useFinternetStore((state) => state.currentStep);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-finternet-primary to-finternet-secondary bg-clip-text text-transparent mb-2">
            Finternet
          </h1>
          <p className="text-gray-400">The Financial System of the Future</p>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {currentStep === "address-creation" && (
            <AddressCreation key="address" />
          )}
          {currentStep === "credential-linking" && (
            <CredentialLinking key="credentials" />
          )}
          {
            currentStep === "dashboard"
            //  && <AgenticPanel key="dashboard" />
          }
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
