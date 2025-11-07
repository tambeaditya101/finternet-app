import React from "react";
import useFinternetStore from "./store/finternetStore";
import AddressCreation from "./components/onboarding/AddressCreation";
import CredentialLinking from "./components/onboarding/CredentialLinking";
import AgenticPanel from "./components/agent/AgenticPanel";
import PropertyMarketplace from "./components/property/PropertyMarketplace";
import PropertyPortfolio from "./components/property/PropertyPortfolio";

function App() {
  const currentStep = useFinternetStore((state) => state.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case "address-creation":
        return <AddressCreation />;
      case "credential-linking":
        return <CredentialLinking />;
      case "dashboard":
        return <AgenticPanel />;
      case "property-marketplace":
        return <PropertyMarketplace />;
      case "portfolio":
        return <PropertyPortfolio />;
      default:
        return <AddressCreation />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      {renderStep()}
    </div>
  );
}

export default App;
